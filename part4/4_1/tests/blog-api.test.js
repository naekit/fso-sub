const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test-helper')

const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})

    for(let blog of helper.initialBlogs){
        let blogObj = new Blog(blog)
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
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const title = blogsAtEnd.map(r => r.title)
    expect(title).toContain('consistency')
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
        .expect(400)
    await api
        .post('/api/blogs')
        .send(blogNoTitle)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})