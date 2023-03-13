import { giveVote, setAnecdotes } from '../reducers/anecdoteReducer'
import { useSelector } from 'react-redux'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { useEffect } from 'react'
import { getAll, incrementVote } from '../services/anecdotes'

export default function AnecdoteList({ dispatch }) {

  useEffect(() => {
    getAll().then(res => dispatch(setAnecdotes(res)))
  }, [])

  const vote = async (id, content) => {
    await incrementVote(id)
    dispatch(giveVote(id))
    dispatch(setNotification(`you voted '${content}'`))
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
  }

  const anecdotes = useSelector(state => {
    return state.filter === 'ALL' ? [...state.anecdotes].sort((a, b) => b.votes - a.votes) : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase()
    .includes(state.filter.toLowerCase()))
    .sort((a, b) => b.votes - a.votes)
  })

  return (
    <div>
    {anecdotes.map(anecdote =>
      <div key={anecdote.id}>
        <div>
          {anecdote.content}
        </div>
        <div>
          has {anecdote.votes}
          <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}