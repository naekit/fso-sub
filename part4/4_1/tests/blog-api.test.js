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
    
})