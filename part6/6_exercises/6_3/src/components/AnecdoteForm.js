import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNew = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      console.log(content)
      const anecdote = await anecdoteService.createAnecdote(content)
      dispatch(addAnecdote(anecdote))
      dispatch(setNotification(`${content} added`))
    }


    return (
        <>
        <h2>create new</h2>
        <form onSubmit={addNew}>
            <div><input name='anecdote'/></div>
            <button type='submit'>create</button>
        </form>
        </>
    )
}

export default AnecdoteForm