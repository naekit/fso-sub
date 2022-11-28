import { createSlice } from '@reduxjs/toolkit'
import blogs from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action){
      const blogs = action.payload || state
      return blogs.sort((a,b) => b.likes - a.likes)
    },
    appendBlog(state, action){
        state.push(action.payload)
    },
    appendLike(state, action){
        const blogNew = action.payload
        const newBlogs = state.map(b => b.id !== blogNew.id ? b: blogNew)
        return newBlogs.sort((a,b) => b.likes - a.likes)
    },
    removeBlog(state, action){
        return state.filter(b => b.id !== action.payload)
    },
    addComments(state, action) {
        console.log(action.payload)
        const blogId = action.payload.id
        const newComment = action.payload.content
        const blogChange = state.find(b => b.id === blogId)
        const newBlog = {...blogChange, comments: blogChange.comments.concat(newComment)}
        const newState = state.map(b => b.id !== blogId ? b: newBlog)
        return newState
    }
  }
})

export const { addComments ,setBlogs, appendBlog, appendLike } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const allBlogs = await blogs.getAll()
        dispatch(setBlogs(allBlogs))
    }
}

export const addBlog = (content) => {
    return async dispatch => {
        const newBlog = await blogs.create(content)
        dispatch(appendBlog(newBlog))
    }
}

export const addLike = (content) => {
    return async dispatch => {
        const newBlog = await blogs.update(content)
        dispatch(appendLike(newBlog))
    }
}

export const deleteBlog = (id) => {
    return async dispatch => {
        await blogs.remove(id)
        dispatch(setBlogs())
    }
}

export const addComment = (id, comment) => {
    return async dispatch => {
        const content = await blogs.addComment(id, comment)
        const updateBlog = {
            id,
            content
        }
        console.log(content)
        dispatch(addComments(updateBlog))
    }
}

export default blogSlice.reducer