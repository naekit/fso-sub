import axios from 'axios'
const baseUrl = 'http://localhost:4000/api/users'

const getUsers = async () => {
  const res = await axios.get(baseUrl)
  return res.data
}

const getUser = async (id) => {
    const res = await axios.get(`${baseUrl}/${id}`)
    return res.data
}

const users = { getUsers, getUser }
export default users