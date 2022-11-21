import axios from 'axios'
 
const baseURL = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const res = await axios.get(baseURL)
    return res.data
}

const createAnecdote = async(anecdote) => {
    const anecdoteObj = {
        content: anecdote,
        votes: 0
    }
    const res = await axios.post(baseURL, anecdoteObj)
    return res.data
}

const anecdoteService = { getAll, createAnecdote }

export default anecdoteService