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
  return request.then(response => {
    return response.data})
}

const update = (id, newObject) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(res => res.data)
}

const remove = (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  console.log(id)
  return axios.delete(`${baseUrl}/${id}`, config).then(res => res.data)
}


export default { getAll, setToken, create, update, remove }