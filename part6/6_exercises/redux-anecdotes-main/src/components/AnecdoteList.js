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
    const notification = useSelector(state => state.notifications.message)
    const state = useSelector(({filter, anecdotes }) => {
        if(filter){
            return anecdotes.filter(anecdote => anecdote
                .content
                .toLowerCase()
                .includes(filter.toLowerCase())
            )
        } else{
            return anecdotes
        }
    })

    const vote = (anecdote) => {
        dispatch(voteFor(anecdote))
        dispatch(setNotification(`you voted for '${anecdote.content}'`, 2))
    }
    
    return (
        <>
        {notification && <Notification />}
        {state.map(anecdote => 
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