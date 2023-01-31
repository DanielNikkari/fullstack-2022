import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { Login } from './components/Login'
import { CreateBlog } from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [url, setUrl] = useState("")

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
        setErrorMessage('Login to get blogs')
        setTimeout(() => {
          setErrorMessage(null)
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
        setErrorMessage('Login to get blogs')
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      }
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
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

    await blogService.createBlog(blog)
    const blogs = await blogService.getAll()
    setBlogs(blogs)
    setAuthor("")
    setTitle("")
    setUrl("")
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