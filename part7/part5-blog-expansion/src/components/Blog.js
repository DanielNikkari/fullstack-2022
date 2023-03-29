import { useEffect } from 'react'
import '../styling/blog.css'
import PropTypes from 'prop-types'
import { toggleDetails } from '../reducers/detailsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { showDelte, hideDelete } from '../reducers/showDeleteReducer'
import { displayNotification } from '../reducers/notificationReducer'
import { deleteBlogAction } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'

const Blog = ({ blog, user, likeBlog }) => {
  const dispatch = useDispatch()
  const showDetails = useSelector((state) => state.details[blog.id])
  const showDelete = useSelector((state) => state.showDelete[blog.id])

  useEffect(() => {
    if (user && blog.user.username === user.username) {
      dispatch(showDelte(blog.id))
    } else {
      dispatch(hideDelete(blog.id))
    }
  }, [])

  const deleteBlog = async (event) => {
    event.preventDefault()

    if (!window.confirm(`Are you sure you want to delete ${blog.title}?`)) {
      return
    }

    if (user && blog.user.username === user.username) {
      dispatch(deleteBlogAction(blog))
    } else {
      dispatch(displayNotification('You can only delete your own blogs', true))
    }
  }

  return (
    <div className="blog">
      <div className="blog-title-author">
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} - {blog.author}
        </Link>
        {showDelete ? (
          <button className="delete-button" onClick={deleteBlog}>
            delete
          </button>
        ) : null}
      </div>
    </div>
  )
}

Blog.ptopTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
