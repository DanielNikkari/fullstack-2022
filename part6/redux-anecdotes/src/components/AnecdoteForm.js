import { createAnecdote } from '../reducers/anecdoteReducer'

export default function AnecdoteForm({ dispatch }) {

  const handleCreateAnecdote = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdote.value))
    event.target.anecdote.value = ''
  }

return(
  <div>
    <h2>create new</h2>
      <form onSubmit={handleCreateAnecdote}>
        <div><input name='anecdote' /></div>
        <button>create</button>
      </form>
  </div>
  )
}