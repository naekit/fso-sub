const notesRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Note = require('../models/note')
const User = require('../models/user')


notesRouter.get('/', async (req,res) => {
    const notes = await Note.find({}).populate('user', {username: 1, name: 1})

    res.json(notes)
})


notesRouter.get('/:id', async (req,res,next) => {
    
    const note = await Note.findById(req.params.id)
    if(note) {
        res.json(note)
    } else {
        res.status(404).end()
    }
    
    // WITHOUT Express async errors library
    // try {
    //     const note = await Note.findById(req.params.id)
    //     if(note) {
    //         res.json(note)
    //     } else {
    //         res.status(404).end()
    //     }
    // } catch(expectation) {
    //     next(expectation)
    // }
    // ------ Non ASYNC/AWAIT Code ------
    // Note.findById(req.params.id)
    //     .then(note => {
    //         if(note) {
    //             res.json(note)
    //         } else {
    //             res.status(404).end()
    //         }
    //     })
    //     .catch(error => next(error))
})

const getTokenFrom = req => {
    const authorization = req.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')){
        return authorization.substring(7)
    }
    return null
}


notesRouter.post('/', async (req,res,next) => {
    const body = req.body
    const token = getTokenFrom(req)

    const decodeToken = jwt.verify(token, process.env.SECRET)
    if(!decodeToken.id) {
        return res.status(401).json({ 
            error: 'token missing or invalid' 
        })
    }

    const user = await User.findById(decodeToken.id)

    const note = new Note ({
        content: body.content,
        important: body.important === undefined ? false: body.important,
        date: new Date(),
        user: user._id
    })
    
    const savedNote = await note.save()
    user.notes = user.notes.concat(savedNote._id)
    await user.save()

    res.json(savedNote)

    // CODE WITHOUT EXPRESS-ASYNC-ERRORS Library

    // try{
    //     const savedNote = await note.save()
    //     res.status(201).json(savedNote)
    // } catch(exception){
    //     next(exception)
    // }
})

notesRouter.delete('/:id', async (req,res,next) => {

    await Note.findByIdAndRemove(req.params.id)
    res.status(204).end()

    // CODE WITHOUT EXPRESS-ASYNC-ERRORS Library
    // try{
    //     await Note.findByIdAndRemove(req.params.id)
    //     res.status(204).end()
    // } catch(exception){
    //     next(exception)
    // }

    //  Non async/await syntax
    // Note.findByIdAndRemove(req.params.id)
    //     .then(() => {
    //         res.status(204).end()
    //     })
    //     .catch(error => next(error))
})

notesRouter.put('/:id', (req,res,next) => {
    const body = req.body

    const note = {
        content: body.content,
        important: body.important
    }

    Note.findByIdAndUpdate(req.params.id, note, {new: true})
        .then(updatedNote => {
            res.json(updatedNote)
        })
        .catch(error => next(error))
})

module.exports = notesRouter