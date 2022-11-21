import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote(state, action) {
      const anecdote = action.payload
      const newState = state.map(a => a.id !== anecdote.id ? a : anecdote)
      return newState.sort((a,b) => b.votes - a.votes)
    },
    appendAnecdote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      const anecdotes = action.payload
      return anecdotes.sort((a,b) => b.votes - a.votes)
    }
  }
})

export const { addVote, setAnecdotes, appendAnecdote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const voteFor = (content) => {
  return async dispatch => {
    const anecdoteVote = await anecdoteService.updateVote(content)
    dispatch(addVote(anecdoteVote))
  }
}

export const addAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createAnecdote(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer

// const reducer = (state = initialState, action) => {
//   switch(action.type){
//     case 'VOTE':
//       const id = action.data.id
//       const objToChange = state.find(obj => obj.id === id)
//       const changedObj = {
//         ...objToChange, votes: objToChange.votes +1
//       }
//       const newState = state.map(obj => obj.id !== id ? obj: changedObj)
//       return newState.sort((a,b) => b.votes - a.votes)
//     case 'ADD':
//       const addNew = {
//         content: action.data.content,
//         id: getId(),
//         votes: 0
//       }
//       return state.concat(addNew)
//     default:
//       return state
//   }
// }

// export const voteFor = (id) => {
//   return {
//     type: 'VOTE',
//     data: { id }
//   }
// }

// export const addAnecdote = (content) => {
//   return {
//     type: 'ADD',
//     data: { content }
//   }
// }

// export default reducer