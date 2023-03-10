import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

const App = () => {
  const anecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList dispatch={dispatch} anecdotes={anecdotes} />
      <AnecdoteForm dispatch={dispatch} />
    </div>
  )
}

export default App