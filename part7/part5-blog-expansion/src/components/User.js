import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initUsers } from '../reducers/usersReducer'
import { useParams, Link } from 'react-router-dom'

export const User = () => {
  const dispatch = useDispatch()
  const users = useSelector((state) => state.users)
  const id = useParams().id
  const user = users.find((u) => u.id === id)

  useEffect(() => {
    console.log('DISPATCHED')
    dispatch(initUsers())
  }, [])

  if (user === undefined) {
    return (
      <div>
        <div>Loading...</div>
        <Link to={'/users/'}>Back</Link>
      </div>
    )
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            {blog.title} by {blog.author}
          </li>
        ))}
      </ul>
      <Link to={'/users/'}>Back</Link>
    </div>
  )
}
