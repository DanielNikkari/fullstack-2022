import { giveVote } from '../reducers/anecdoteReducer'
import { useSelector } from 'react-redux'

export default function AnecdoteList({ dispatch }) {

  const vote = (id) => {
    dispatch(giveVote(id))
  }

  const anecdotes = useSelector(state => {
    return state.filter === 'ALL' ? state.anecdotes.sort((a, b) => b.votes - a.votes) : state.anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
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
          <button onClick={() => vote(anecdote.id)}>vote</button>
        </div>
      </div>
    )}
    </div>
  )
}