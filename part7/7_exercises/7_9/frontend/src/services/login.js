import axios from 'axios'
const baseUrl = 'http://localhost:4000/api/login'

const login = async credentials => {
  const res = await axios.post(baseUrl, credentials)
  return res.data
}

// eslint-disable-next-line import/no-anonymous-default-export
export default { login }