import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import { Login } from './components/Login'
import { CreateBlog } from './components/CreateBlog'
import { Notification } from './components/Notification'
import { ToggleVisibility } from './components/ToggleVisibility'
import { Users } from './components/Users'
import { User } from './components/User'
import { BlogPage } from './components/BlogPage'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs, updateBlog } from './reducers/blogsReducer'
import { setUser, logout, login } from './reducers/loginReducer'
import { Routes, Route, Link } from 'react-router-dom'
import './styling/App.css'
import { initUsers } from './reducers/usersReducer'

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
    dispatch(initUsers())
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
        <h5 className="loggedin-user">{user.username} logged in</h5>
        <button className="logout-button" onClick={handleLogout}>
          Log out
        </button>
        <ToggleVisibility buttonLabel="new blog" ref={createBlogRef}>
          <CreateBlog createBlogRef={createBlogRef} />
        </ToggleVisibility>
      </div>
    )
  }

  return (
    <div>
      <h1 id="app-header">Blogs App</h1>
      <Notification />
      <div>
        <Link to={'/'}>Blogs</Link>
        <Link to={'/users'}>Users</Link>
        {user === null ? <Login handleLogin={handleLogin} /> : blogsForm()}
      </div>
      <Routes>
        <Route
          path="/users"
          element={
            <div>
              <Users />
            </div>
          }
        />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogPage />} />
        <Route
          path="/"
          element={
            <div>
              {blogs.map((blog) => (
                <Blog
                  key={blog.id}
                  blog={blog}
                  user={user}
                  likeBlog={likeBlog}
                />
              ))}
            </div>
          }
        />
      </Routes>
    </div>
  )
}

export default App
