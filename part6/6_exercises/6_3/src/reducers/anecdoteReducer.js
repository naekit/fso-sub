import { createSlice } from '@reduxjs/toolkit'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    voteFor(state, action) {
      const id = action.payload
      const objToChange = state.find(a => a.id === id)
      const changedObj = {
        ...objToChange,
        votes: objToChange.votes + 1
      }
      const newState = state.map(a => a.id !== id ? a : changedObj)
      return newState.sort((a,b) => b.votes - a.votes)
    },
    appendNote(state,action){
      state.push(action.payload)
    },
    setAnecdotes(state,action){
      return action.payload
    }
  }
})

export const { addAnecdote, voteFor, setAnecdotes } = anecdoteSlice.actions
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