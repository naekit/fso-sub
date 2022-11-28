const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogRouter.get('/', async (req, res) => {
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1}).populate('comments', {text: 1})

    res.json(blogs)
})

blogRouter.get('/:id', async (req,res,next) => {
    const blog = await Blog.findById(req.params.id).populate('comments', {text: 1})
    if(blog){
        res.json(blog)
    } else {
        res.status(404).end()
    }
})


blogRouter.post('/', async (req,res,next) => {
    const body = req.body

    const user = req.user
    if(user === null){
        res.status(401).end()
    }
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0,
        user: user._id
    })

    const savedBlog = await blog.save()
    console.log(savedBlog)
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
})

blogRouter.post('/:id/comments', async(req,res,next) => {
    const body = req.body
    const id = req.params.id

    const comment = new Comment({
        text: body.text,
        blog: id
    })

    const savedComment = await comment.save()
    const blogOf = await Blog.findById(id)

    blogOf.comments.push(savedComment)
    blogOf.save()
    res.status(201).json(savedComment)
})

blogRouter.delete('/:id', async (req,res,next) => {
    const blog = await Blog.findById(req.params.id)
    if(blog.user.toString() === req.user._id.toString()){
        await Blog.findByIdAndRemove(req.params.id)
        res.status(204).end()
    }
})

blogRouter.put('/:id', (req,res,next) => {
    const body = req.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        comments: body.comments
    }


    Blog.findByIdAndUpdate(body.id, blog, {new: true}).populate('user', {username: 1, name: 1})
        .then(updatedPost => {
            res.json(updatedPost)
        })
        
        .catch(err => next(err))
})

module.exports = blogRouter