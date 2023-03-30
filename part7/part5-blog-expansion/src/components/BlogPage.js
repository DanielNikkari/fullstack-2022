import { useSelector, useDispatch } from 'react-redux'
import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { initBlogs } from '../reducers/blogsReducer'
import blogService from '../services/blogs'
import TextField from '@mui/material/TextField'

export const BlogPage = ({ likeBlog }) => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)

  useEffect(() => {
    dispatch(initBlogs())
  }, [])

  if (!blog) {
    return (
      <div>
        Loading...<Link to={'/'}>back</Link>
      </div>
    )
  }

  const handleAddComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    event.target.comment.value = ''

    await blogService.addComment(id, comment)

    dispatch(initBlogs())
  }

  return (
    <div>
      <div>
        <h2>
          {blog.title} by {blog.author}
        </h2>
        <a href={blog.url}>{blog.url}</a>
        <br />
        <div id="likes">
          {blog.likes}
          <button className="like-button" onClick={() => likeBlog(blog)}>
            like
          </button>
          <br />
        </div>
        <br />
        added by {blog.user.username}
        <div>
          <h4>Comments</h4>
          <form onSubmit={handleAddComment}>
            <TextField
              id="standard-basic"
              label="Your comment"
              variant="standard"
              name="comment"
              size="small"
            />
            <button className="create-button" type="submit">
              Add comment
            </button>
          </form>
          {blog.comments ? (
            <ul>
              {blog.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
      <Link to={'/'}>back</Link>
    </div>
  )
}
