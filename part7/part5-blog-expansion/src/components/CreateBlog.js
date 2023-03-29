import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import '../styling/App.css'

export const CreateBlog = ({ createBlogRef }) => {
  const dispatch = useDispatch()

  const handleCreateBlog = async (event) => {
    event.preventDefault()
    const title = event.target.title.value
    const author = event.target.author.value
    const url = event.target.url.value

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    const blog = {
      title,
      author,
      url
    }

    dispatch(createBlog(blog))
    createBlogRef.current.toggleVisibility()
  }

  return (
    <div>
      <h3>Create new blog</h3>
      <form onSubmit={handleCreateBlog}>
        <div>
          <input
            id="createblog-title"
            placeholder="Title"
            type="text"
            name="title"
          />
        </div>
        <div>
          <input
            id="createblog-author"
            placeholder="Author"
            type="text"
            name="author"
          />
        </div>
        <div>
          <input id="createblog-url" placeholder="URL" type="text" name="url" />
        </div>
        <button className="create-button" type="submit">
          Create
        </button>
      </form>
    </div>
  )
}
