import axios from "axios"
const baseUrl = "http://localhost:3001/persons"

const getAll = () => {
  return axios.get(baseUrl)
}

const add = (newObj) => {
  return axios.post(baseUrl, newObj)
}

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

const update = (id, newObj) => {
  const request = axios.put(`${baseUrl}/${id}`, newObj)
  return request.then((response) => response.data)
}

export default { getAll, add, deletePerson, update }
