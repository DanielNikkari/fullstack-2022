import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { Login } from './components/Login'
import { CreateBlog } from './components/CreateBlog'
import { Notification } from './components/Notification'
import { ToggleVisibility } from './components/ToggleVisibility'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs, updateBlog } from './reducers/blogsReducer'
import { setUser, logout, login } from './reducers/loginReducer'
import './styling/App.css'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)
  const user = useSelector((state) => state.login)

  const createBlogRef = useRef()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    event.target.username.value = ''
    event.target.password.value = ''

    dispatch(login({ username, password }))
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    dispatch(logout())
  }

  const likeBlog = async (blog) => {
    const updatedBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    dispatch(updateBlog(blog.id, updatedBlog))
  }

  const blogsForm = () => {
    return (
      <div>
        <h4 className="loggedin-user">{user.username} logged in</h4>
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
        <ToggleVisibility buttonLabel="new blog" ref={createBlogRef}>
          <CreateBlog createBlogRef={createBlogRef} />
        </ToggleVisibility>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} likeBlog={likeBlog} />
        ))}
      </div>
    )
  }

  return (
    <div>
      <h1 id="app-header">Blogs</h1>
      <Notification />

      {user === null ? (
        <div>
          <Login handleLogin={handleLogin} />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} user={user} likeBlog={likeBlog} />
          ))}
        </div>
      ) : (
        blogsForm()
      )}
    </div>
  )
}

export default App
