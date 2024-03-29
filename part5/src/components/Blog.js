import { useState, useEffect } from 'react'
import blogService from '../services/blogs'
import '../styling/blog.css'
import PropTypes from 'prop-types'

const Blog = ({ blog, setBlogs, user, setMessage, setError, likeBlog }) => {
  const [details, setDetails] = useState(false)
  const [showDelete, setShowDelete] = useState(false)

  useEffect(() => {
    if (user && blog.user.username === user.username) {
      setShowDelete(true)
    }
  })

  const toggleDetails = () => {
    setDetails(!details)
  }

  const deleteBlog = async (event) => {
    event.preventDefault()

    if (!window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      return
    }

    if (user && blog.user.username === user.username) {
      try {
        const title = blog.title
        await blogService.deleteBlog(blog.id)
        const updatedBlogs = await blogService.getAll()
        updatedBlogs.sort((a, b) => b.likes - a.likes)
        setBlogs(updatedBlogs)
        setMessage(`the blog ${title} was deleted successfully`)
        setError(false)
        setTimeout(() => {
          setMessage(null)
          setError(false)
        }, 5000)
      } catch (e) {
        console.error(e)
        setMessage('Something went wrong, please try again')
        setError(true)
        setTimeout(() => {
          setMessage(null)
          setError(false)
        }, 5000)
      }
    } else {
      setMessage('You can only delete your own blogs')
      setError(true)
      setTimeout(() => {
        setMessage(null)
        setError(false)
      }, 5000)
    }
  }

  return (
    <div className='blog'>
      <div className='blog-title-author'>{blog.title} - {blog.author}<br/></div>
      {
        details
          ?
          <div className='blog-details'>
            <a id='blog-url' href={blog.url}>{blog.url}</a><br/>
            <div id='likes'>{blog.likes}<button className='like-button' onClick={() => likeBlog(blog)}>like</button><br/></div>
            {blog.user.username}<br/>
            {
              showDelete
                ?
                <div>
                  <button className='delete-button' onClick={deleteBlog}>delete</button>
                  <br/>
                </div>
                :
                null
            }
            <button className='toggle-details' onClick={toggleDetails}>hide</button>
          </div>
          :
          <button className='toggle-details' onClick={toggleDetails}>show</button>
      }
    </div>)}

Blog.ptopTypes = {
  blog: PropTypes.object.isRequired,
  setBlogs: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  setMessage: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired
}

export default Blog