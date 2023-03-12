import { useSelector, useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'

const App = () => {
  
  const dispatch = useDispatch()

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter dispatch={dispatch} />
      <AnecdoteList dispatch={dispatch} />
      <AnecdoteForm dispatch={dispatch} />
    </div>
  )
}

export default App