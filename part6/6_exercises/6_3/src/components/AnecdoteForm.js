import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const addNew = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      dispatch(addAnecdote(content))
      dispatch(setNotification(`${content} added`, 5))
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