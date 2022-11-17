const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const app = require('../app')
const api = supertest(app)
const helper = require('./test-helper')

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash})

    await user.save()
})

beforeEach(async () => {
    await Blog.deleteMany({})
    const users = await User.find({})
    const user = users[0]
    const id = users[0]._id

    for(let blog of helper.initialBlogs){
        let blogObj = new Blog({...blog, user: id.toString()})
        await blogObj.save()
    }
})

test('correct number of json obj blogs', async() => {
    const response = await api
        .get('/api/blogs')
        .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(helper.initialBlogs.length)  
})

test('id property named id, and defined', async() => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

describe('requires user authenticator', () => {
    let authToken

    beforeEach(async () => {
        const user = {
            username: 'root',
            password: 'sekret',
        }

        const login = await api
            .post('/api/login')
            .send(user)
        authToken = login.body.token
    })

    test('post method increase blogs by 1 and contents are correct', async () => {
        const newBlog = {
            title: "consistency",
            author: "nikita natkha",
            url: "https://www.stagedchaos.com",
            likes: 999,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization',`bearer ${authToken}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

        const title = blogsAtEnd.map(r => r.title)
        expect(title).toContain('consistency')
    })

    test('adding blog fails without proper authenticator', async () => {
        const newBlog = {
            title: "consistency",
            author: "nikita natkha",
            url: "https://www.stagedchaos.com",
            likes: 999,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })

    test('if likes property missing likes default to 0', async () => {
        const newBlog = {
            title: "consistency",
            author: "nikita natkha",
            url: "https://www.stagedchaos.com"
        }

        const zeroBlog = await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization',`bearer ${authToken}`)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        expect(zeroBlog.body.likes).toBe(0)
    })

    test('if title or url missing in post get 400 error', async () => {
        const blogNoUrl = {
            title: 'good',
            author: 'man',
            likes: 1
        }
        const blogNoTitle = {
            author: 'man',
            likes: 1,
            url: 'good.com'
        }
        await api
            .post('/api/blogs')
            .send(blogNoUrl)
            .set('Authorization',`bearer ${authToken}`)
            .expect(400)
        await api
            .post('/api/blogs')
            .send(blogNoTitle)
            .set('Authorization',`bearer ${authToken}`)
            .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
    })
    test('delete specific blog post', async () => {
        const postsAtStart = await helper.blogsInDb()
        const blogToDelete = postsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .set('Authorization',`bearer ${authToken}`)
            .expect(204)
        const postsAtEnd = await helper.blogsInDb()

        expect(postsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

        const titles = postsAtEnd.map(p => p.title)
        expect(titles).not.toContain(blogToDelete.title)
    })


    test('updates blog with correct info', async () => {
        const postsAtStart = await helper.blogsInDb()
        const blogToUpdate = postsAtStart[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send({...blogToUpdate, likes: 10})
            .expect(200)
        const postsAtEnd = await helper.blogsInDb()

        expect(postsAtEnd[0].likes).toBe(10)
    })
})

describe('user tests', () => {

    test('creation succeeds with new username', async() => {
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

    test('creation fails with proper status code if username taken', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'root',
            name: 'nikita natkha',
            password: 'kherson'
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