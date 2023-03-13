import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import { createNew } from '../services/anecdotes'

export default function AnecdoteForm({ dispatch }) {

  const handleCreateAnecdote = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    const newAnecdote = await createNew(content)
    console.log(`newAnecdote: ${newAnecdote.content}`)
    dispatch(createAnecdote(newAnecdote))

    dispatch(setNotification(`anecdote '${content}' created`))
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