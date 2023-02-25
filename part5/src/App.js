import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Login } from './components/Login'
import { CreateBlog } from './components/CreateBlog'
import { Notification } from './components/Notification'
import { ToggleVisibility } from './components/ToggleVisibility'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(false)

  const createBlogRef = useRef()

  const testSubmit = () => {
    return
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const blogs = await blogService.getAll()
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      } catch (exception) {
        setMessage('Login to get blogs')
        setError(true)
        setTimeout(() => {
          setMessage(null)
          setError(false)
        }, 5000)
      }
    }
    fetchBlogs()
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.sendCredentials({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      setUsername('')
      setPassword('')
      try {
        const blogs = await blogService.getAll()
        blogs.sort((a, b) => b.likes - a.likes)
        setBlogs(blogs)
      } catch (exception) {
        setMessage('Login to get blogs')
        setTimeout(() => {
          setMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setMessage('Wrong credentials')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const likeBlog = async (blog) => {

    const updateBlog = {
      user: blog.user.id,
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }

    try {
      await blogService.updateLikes(blog.id, updateBlog)
      const updatedBlogs = await blogService.getAll()
      updatedBlogs.sort((a, b) => b.likes - a.likes)
      setBlogs(updatedBlogs)
    } catch (e) {
      console.error(e)
      setMessage('Something went wrong, please try again')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  const blogsForm = () => {
    return(
      <div>
        <h2>blogs</h2>
        <h4>{user.username} logged in</h4>
        <button onClick={handleLogout}>Log out</button>
        <ToggleVisibility buttonLabel='new blog' ref={createBlogRef}>
          <CreateBlog setMessage={setMessage} setBlogs={setBlogs} setError={setError} createBlogRef={createBlogRef} testSubmit={testSubmit} />
        </ToggleVisibility>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} setMessage={setMessage} setError={setError} likeBlog={likeBlog} />
        )}
      </div>
    )
  }

  return (
    <div>
      {
        message !== null && <Notification message={message} error={error} />
      }

      {
        user === null
          ?
          <div>
            <Login handleLogin={handleLogin} username={username} password={password} setPassword={setPassword} setUsername={setUsername} />
            {blogs.map(blog =>
              <Blog key={blog.id} blog={blog} setBlogs={setBlogs} user={user} setMessage={setMessage} setError={setError} likeBlog={likeBlog} />
            )}
          </div>
          :
          blogsForm()
      }
    </div>
  )
}

export default App