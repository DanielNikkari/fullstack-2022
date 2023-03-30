import { useEffect } from 'react'
import '../styling/blog.css'
import PropTypes from 'prop-types'
import { toggleDetails } from '../reducers/detailsReducer'
import { useDispatch, useSelector } from 'react-redux'
import { showDelte, hideDelete } from '../reducers/showDeleteReducer'
import { displayNotification } from '../reducers/notificationReducer'
import { deleteBlogAction } from '../reducers/blogsReducer'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import Chip from '@mui/material/Chip'
import Stack from '@mui/material/Stack'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  const showDetails = useSelector((state) => state.details[blog.id])
  const showDelete = useSelector((state) => state.showDelete[blog.id])
  const navigate = useNavigate()

  useEffect(() => {
    if (user && blog.user.username === user.username) {
      dispatch(showDelte(blog.id))
    } else {
      dispatch(hideDelete(blog.id))
    }
  }, [user])

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
    <ListItem
      secondaryAction={
        showDelete ? (
          <Chip
            label="delete"
            style={{ backgroundColor: '#FF5B5B' }}
            onClick={deleteBlog}
          />
        ) : null
      }
    >
      <div className="blog">
        <Stack direction="row" spacing={1}>
          <ListItemButton onClick={() => navigate(`/blogs/${blog.id}`)}>
            <ListItemText
              primary={
                <Link
                  style={{ fontSize: 'large', color: 'white' }}
                  to={`/blogs/${blog.id}`}
                >
                  {blog.title} - {blog.author}
                </Link>
              }
            />
          </ListItemButton>
        </Stack>
      </div>
    </ListItem>
  )
}

Blog.ptopTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
