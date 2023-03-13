import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'

export default function AnecdoteForm({ dispatch }) {

  const handleCreateAnecdote = (event) => {
    event.preventDefault()
    dispatch(createAnecdote(event.target.anecdote.value))
    dispatch(setNotification(`anecdote '${event.target.anecdote.value}' created`))
    event.target.anecdote.value = ''
    setTimeout(() => {
      dispatch(removeNotification())
    }, 5000)
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