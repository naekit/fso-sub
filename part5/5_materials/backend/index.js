const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const logger = require('./utils/logger')

const server = http.createServer(app)

server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`)
})



// ------ OLD CODE BEFORE REFACTORING PROJECT STRUCTURE -----
// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')
// const app = express()
// const Note = require('./models/note')

// app.use(express.static('build'))
// app.use(express.json())
// app.use(cors())

// const requestLogger = (req,res,next) => {
//     console.log('Method:', req.method);
//     console.log('Path: ', req.path);
//     console.log('Body: ', req.body);
//     console.log('---');
//     next()
// }

// app.use(requestLogger)

// // OLD CODE FOR REFERENCE

// // const url = `mongodb+srv://natkha:<PASSWORD>@cluster0.vtkzzsz.mongodb.net/noteApp?retryWrites=true&w=majority`

// // mongoose.connect(url)

// // const noteSchema = new mongoose.Schema({
// //     content: String,
// //     date: Date,
// //     important: Boolean,
// // })

// // noteSchema.set('toJSON', {
// //     transform: (document, returnedObject) => {
// //         returnedObject.id = returnedObject._id.toString()
// //         delete returnedObject._id
// //         delete returnedObject.__v
// //     }
// // })

// // const Note = mongoose.model('Note', noteSchema)


// // let notes = [
// //     {
// //       id: 1,
// //       content: "HTML is easy",
// //       date: "2022-05-30T17:30:31.098Z",
// //       important: true
// //     },
// //     {
// //       id: 2,
// //       content: "Browser can execute only Javascript",
// //       date: "2022-05-30T18:39:34.091Z",
// //       important: false
// //     },
// //     {
// //       id: 3,
// //       content: "GET and POST are the most important methods of HTTP protocol",
// //       date: "2022-05-30T19:20:14.298Z",
// //       important: true
// //     }
// // ]

// app.get('/', (req, res) => {
//     res.send(`<h1>Hello World!</h1>`)
// })

// app.get('/api/notes', (req, res) => {
//     Note.find({}).then(notes => {
//         res.json(notes)
//     })
// })

// app.get('/api/notes/:id', (req, res) => {
//     Note.findById(req.params.id)
//         .then(note => {
//             if (note) {
//                 res.json(note)
//             } else {
//                 res.status(404).end()
//             }
//         })
//         .catch(err => next(err))
//     // const id = +req.params.id
//     // const note = notes.find(note => note.id === id)

//     // if(note){
//     //     res.json(note)
//     // } else {
//     //     res.status(404).end()
//     // }
// })

// app.delete('/api/notes/:id', (req, res, next) => {

//     Note.findByIdAndRemove(req.params.id)
//         .then(result => {
//             res.status(204).end()
//         })
//         .catch(error => next(error))

//     // OLD CODE BEFORE MONGO DB
//     // 
//     // const id = +req.params.id
//     // notes = notes.filter(note => note.id !== id)

//     // res.status(204).end()
// })

// // OLD ID GENERATING FUNCTION BEFORE MONGO DB

// // const generateId = () => {
// //     const maxId = notes.length > 0 ? Math.max(...notes.map(n => n.id)): 0
// //     return maxId + 1
// // }

// app.put('/api/notes/:id', (req,res,next) => {
//     const { content, important } = req.body

//     Note.findByIdAndUpdate(
//         req.params.id, 
//         { content, important}, 
//         { new: true, runValidators: true, context: 'query'}
//         )
//         .then(updatedNote => {
//             res.json(updatedNote)
//         })
//         .catch(error => next(error))
// })

// app.post('/api/notes', (req,res,next) => {
//     const body = req.body

//     if(body.content === undefined){
//         return res.status(400).json({
//             error: 'content missing'
//         })
//     }

//     const note = new Note({
//         content: body.content,
//         important: body.important || false,
//         date: new Date(),
//     })

//     note.save()
//         .then(savedNote => {
//             res.json(savedNote)
//         })
//         .catch(error => next(error))
// })

// // Unknown Endpoint Middleware

// const unknownEndpoint = (req,res) => {
//     res.status(404).send({error: 'unknown endpoint'})
// }

// app.use(unknownEndpoint)

// // Error Handling Middleware

// const errorHandler = (error, req, res, next) => {
//     console.log(error.message)

//     if(error.name === 'CasError'){
//         return res.status(400).send({error: 'malformatted id'})
//     } else if (error.name == 'ValidationError') {
//         return res.status(400).json({error: error.message})
//     }

//     next(error)
// }

// app.use(errorHandler)

// const PORT = process.env.PORT
// app.listen(PORT, () => {
//     console.log(`Server running on port ${PORT}`)
// })