import { giveVote } from '../reducers/anecdoteReducer'

export default function AnecdoteList({ dispatch, anecdotes }) {

  const vote = (id) => {
    dispatch(giveVote(id))
  }

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