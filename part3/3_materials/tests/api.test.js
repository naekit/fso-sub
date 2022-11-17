const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Note = require('../models/note')
const User = require('../models/user')
// initializes before the tests

beforeEach(async () => {
    await Note.deleteMany({})
    // with insert many mongoose function
    await Note.insertMany(helper.initialNotes)

    // // with a for...of loop
    // for (let note of helper.initialNotes) {
    //     let noteObject = new Note(note)
    //     await noteObject.save()
    // }
    // With a Promise all method
    // const noteObjects = helper.initialNotes.map(note => new Note(note))

    // const promiseArray = noteObjects.map(note => note.save())
    // await Promise.all(promiseArray)

    // without Promise.all() Method
    // helper.initialNotes.forEach(async (note) => {
    //     let noteObject = new Note(note)
    //     await noteObject.save()
    //     console.log('saved')
    // })

    // console.log('done')

    // Without forEach loop
    // let noteObject = new Note(helper.initialNotes[0])
    // await noteObject.save()
    
    // noteObject = new Note(helper.initialNotes[1])
    // await noteObject.save()
})
// describe blocks for grouping tests

describe('when there is initially some notes saved', () => {
    
    test('notes are returned as json', async () => {
        await api
        .get('/api/notes')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    }, 100000)
    
    test('all notes returned', async () => {
        const response = await api.get('/api/notes')
        
        expect(response.body).toHaveLength(helper.initialNotes.length)
    })
    
    test('a specific note is within the returned notes', async() => {
        const response = await api.get('/api/notes')
        
        const contents = response.body.map(r => r.content)
        
        expect(contents).toContain('Browser can execute only Javascript')
    })
    

})

describe('viewing a specific note', () => {

    test('succeeds with valid id', async() => {
        const notesAtStart = await helper.notesInDb()
    
        const noteToView = notesAtStart[0]
    
        const resultNote = await api
            .get(`/api/notes/${noteToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const processNoteToView = JSON.parse(JSON.stringify(noteToView))
    
        expect(resultNote.body).toEqual(processNoteToView)
    })

    test('fails with statuscode 404 if note does not exist', async () => {
        const validNonExistingId = await helper.nonExistingId()

        console.log(validNonExistingId)

        await api
            .get(`/api/notes/${validNonExistingId}`)
            .expect(404)
    })

    test('fails with statuscode 400 id is invalid', async() => {
        const invalidId = '5b3c5de59070081q82g3442'

        await api
            .get(`/api/notes/${invalidId}`)
            .expect(400)
    })
})

describe('addition of a new note', () => {
    
    test('succeeds with valid data', async () => {
        const newNote = {
            content: 'async/await simplifies making async calls',
            important: true
        }
        
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const notesAtEnd = await helper.notesInDb()
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length + 1)
    
    
        const contents = notesAtEnd.map(r => r.content)
        expect(contents).toContain('async/await simplifies making async calls')
    })
    
    test('status 400 if invalid data', async () => {
        const newNote = {
            important: true
        }
    
        await api
            .post('/api/notes')
            .send(newNote)
            .expect(400)
    
        const notesAtEnd = await helper.notesInDb()
    
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length)
    })
})

describe('deletion of a note', () => {
    
    test('a note can be deleted', async() => {
        const notesAtStart = await helper.notesInDb()
        const noteToDelete = notesAtStart[0]
    
        await api
            .delete(`/api/notes/${noteToDelete.id}`)
            .expect(204)
    
        const notesAtEnd = await helper.notesInDb()
    
        expect(notesAtEnd).toHaveLength(helper.initialNotes.length - 1)
        
    
        const contents = notesAtEnd.map(r => r.content)
        expect(contents).not.toContain(noteToDelete.content)
    })

})

describe('when there is initially one user in db', () => {

    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('sekret', 10)
        const user = new User({ username: 'root', passwordHash})

        await user.save()
    })

    test('creation succeeds with a fresh username', async() => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'nikita',
            name: 'nikita natkha',
            password: 'kherson'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper status code and message if username taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salty'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.error).toContain('username must be unique')

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toEqual(usersAtStart)
    })
})


afterAll(() => {
    mongoose.connection.close()
})