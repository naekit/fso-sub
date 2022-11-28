import { connect } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {

    const addNew = async (event) => {
      event.preventDefault()
      const content = event.target.anecdote.value
      event.target.anecdote.value = ''
      props.addAnecdote(content)
      props.setNotification(`${content} added`, 5)
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

const mapDispatchToProps = {
    addAnecdote,
    setNotification,
}

const ConnectedForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedForm