import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, voteAnecdote } from './requests'

import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import NotificationContext, { useNotificationDispatch } from './NotificationContext'


const App = () => {

  const queryClient = useQueryClient()

  const voteMutation = useMutation(voteAnecdote, {
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })

  const notificationDispatch = useNotificationDispatch(NotificationContext)

  const handleVote = (anecdote) => {
    voteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 }, {
      onSuccess: () => {
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: `anecdote '${anecdote.content}' voted` })
        setTimeout(() => {
          notificationDispatch({ type: 'CLEAR_NOTFICATION' })
        }, 5000)
      },
      onError: () => {
        notificationDispatch({ type: 'SET_NOTIFICATION', payload: `something went wrong, please try again` })
        setTimeout(() => {
          notificationDispatch({ type: 'CLEAR_NOTFICATION' })
        }, 5000)
      }
    })
  }

  const anecdotes = useQuery(
    'anecdotes',
    getAnecdotes,
    {
      retry: 1
    }
  )

  if (anecdotes.isLoading) {
    return <div>Loading...</div>
  }

  if (!anecdotes.isSuccess) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>
      <Notification />
      <AnecdoteForm queryClient={queryClient} />
    
      {anecdotes.data.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
