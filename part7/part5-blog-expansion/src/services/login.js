import axios from 'axios'
const baseUrl = '/api/login'

const sendCredentials = async (credentials) => {
  const response = await axios.post(baseUrl, credentials)
  return response.data
}

export default { sendCredentials }
