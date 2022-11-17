import axios from 'axios'
const baseUrl = 'http://localhost:4000/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const create = async newObject => {
  const config = {
    headers: {
      Authorization: token
    }
  }

  const res = await axios.post(baseUrl, newObject, config)
  return res.data
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { getAll, setToken, create }