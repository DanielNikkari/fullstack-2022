import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Login } from './components/Login'
import { CreateBlog } from './components/CreateBlog'
import { Notification } from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")
  const [error, setError] = useState(false)

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
      window.localStorage.setItem("loggedUser", JSON.stringify(user))
      setUsername("")
      setPassword("")
      try {
        const blogs = await blogService.getAll()
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

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url,
    }

    try {
      await blogService.createBlog(blog)
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setMessage(`a new blog ${title} by ${author} created`)
      setAuthor("")
      setTitle("")
      setUrl("")
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (exception) {
      setMessage('Failed to create blog, please try again')
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
      <CreateBlog title={title} author={author} url={url} setTitle={setTitle} setAuthor={setAuthor} setUrl={setUrl} handleCreateBlog={handleCreateBlog} />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
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
      <Login handleLogin={handleLogin} username={username} password={password} setPassword={setPassword} setUsername={setUsername} />
      :
      blogsForm()
    }
    </div>
  )
}

export default App