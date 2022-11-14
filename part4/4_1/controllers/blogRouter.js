const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})

    res.json(blogs)
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

blogRouter.post('/', async (req,res,next) => {
    const body = req.body
    const user = await User.findById(body.userId)
    
    console.log(body.userId)
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.json(savedBlog)
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