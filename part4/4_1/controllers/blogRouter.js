const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', (req, res) => {
    Blog
      .find({})
      .then(blogs => {
        res.json(blogs)
      })
})

blogRouter.get('/:id', (req,res,next) => {
    Blog
        .findById(req.params.id)
        .then(post => {
            if(post){
                res.json(post)
            } else {
                res.status(404).end()
            }
        })
        .catch(err => next(err))
})

blogRouter.post('/', (req,res,next) => {
    const body = req.body
    
    const blog = new Blog(body)

    blog.save()
        .then(savedPost => {
            res.status(201).json(savedPost)
        })
        .catch(err => next(err))
})

blogRouter.delete('/:id', (req,res,next) => {
    Blog.findByIdAndRemove(req.params.id)
        .then(() => {
            res.status(204).end()
        })
        .catch(err => next(err))
})

blogRouter.put('/:id', (req,res,next) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
        .then(updatedPost => {
            res.json(updatedPost)
        })
        .catch(err => next(err))
})

module.exports = blogRouter