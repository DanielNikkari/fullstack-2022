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

// eslint-disable-next-line import/no-anonymous-default-export
export default { setToken, getAll, createBlog }