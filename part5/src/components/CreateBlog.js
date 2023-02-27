import { useState } from 'react'
import blogService from '../services/blogs'
import '../styling/App.css'

export const CreateBlog = ({ setMessage, setBlogs, setError, createBlogRef, testSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const blog = {
      title,
      author,
      url,
    }

    try {
      await blogService.createBlog(blog)
      createBlogRef.current.toggleVisibility()
      const blogs = await blogService.getAll()
      setBlogs(blogs)
      setMessage(`a new blog ${title} by ${author} created`)
      setAuthor('')
      setTitle('')
      setUrl('')
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

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={handleCreateBlog}>
        <div>
          <input id='createblog-title' placeholder='Title' type='text' value={title} name='title' onChange={ ({ target }) => {setTitle(target.value)} } />
        </div>
        <div>
          <input id='createblog-author' placeholder='Author' type='text' value={author} name='author' onChange={ ({ target }) => {setAuthor(target.value)} } />
        </div>
        <div>
          <input id='createblog-url' placeholder='URL' type='text' value={url} name='url' onChange={ ({ target }) => {setUrl(target.value)} } />
        </div>
        <button className='create-button' onClick={testSubmit} type='submit'>Create</button>
      </form>
    </div>
  )
}