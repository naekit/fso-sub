import axios from 'axios'
 
const baseURL = "http://localhost:3001/anecdotes"

const getAll = async () => {
    const res = await axios.get(baseURL)
    return res.data
}

const createAnecdote = async(content) => {
    const anecdoteObj = {
        content,
        votes: 0
    }
    const res = await axios.post(baseURL, anecdoteObj)
    return res.data
}

const updateVote = async(content) => {
    const updatedObj = {
        ...content,
        votes: content.votes +1
    }
    const res = await axios.put(`${baseURL}/${content.id}`, updatedObj)
    return res.data
}

const anecdoteService = { getAll, createAnecdote, updateVote }

export default anecdoteService