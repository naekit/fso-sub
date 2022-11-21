import { useSelector, useDispatch } from 'react-redux'
import { voteFor } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import Notification from './Notification'

const Anecdote = ({anecdote, handleVote}) => {
    return (
        <div>
            <div>
                {anecdote.content}
            </div>
            <div>
                has {anecdote.votes}
                <button onClick={handleVote}>vote</button>
            </div>
        </div>
    )
}

const AnecdoteList = () => {
    const dispatch = useDispatch()
    const state = useSelector(state => state.anecdotes)
    const notification = useSelector(state => state.notifications)
    const filter = useSelector(state => state.filter).toLowerCase()

    const filtered = state.filter(anecdote => anecdote.content.toLowerCase().includes(filter))

    const vote = (anecdote) => {
        dispatch(voteFor(anecdote.id))
        dispatch(setNotification(`you voted for '${anecdote.content}'`))
    }
    return (
        <>
        {notification && <Notification />}
        {filtered.map(anecdote => 
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleVote={() => vote(anecdote)}
            />
        )}
        </>
    )
}

export default AnecdoteList