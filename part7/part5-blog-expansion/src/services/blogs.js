import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.get(baseUrl, config)
  return response.data
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.post(baseUrl, blog, config)
}

const updateLikes = async (id, blog) => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.put(`${baseUrl}/${id}`, blog, config)
}

const deleteBlog = async (id) => {
  const config = {
    headers: { Authorization: token }
  }

  await axios.delete(`${baseUrl}/${id}`, config)
}

const addComment = async (id, comment) => {
  const config = {
    headers: { Authorization: token }
  }
  await axios.post(`${baseUrl}/${id}/comments`, { comment }, config)
}

export default {
  setToken,
  getAll,
  createBlog,
  updateLikes,
  deleteBlog,
  addComment
}
