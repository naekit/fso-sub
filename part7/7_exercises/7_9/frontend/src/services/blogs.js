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

const getOne = async (id) => {
  const res = await axios.get(`${baseUrl}/${id}`)
  return res.data
}

const addComment = async (id, comment) => {
  const res = await axios.post(`${baseUrl}/${id}/comments`, comment)
  console.log(res.data)
  return res.data
}

const update = async(content) => {
  const addLike = {
    ...content,
    likes: content.likes + 1
  }
  const res = await axios.put(`${baseUrl}/${content.id}`, addLike)
  return res.data
}

const remove = async (id) => {
  const config = {
    headers: {
      Authorization: token
    }
  }
  const res = await axios.delete(`${baseUrl}/${id}`, config)
  return res.data
}

const blogs = { 
  getAll, 
  setToken, 
  create, 
  update, 
  remove, 
  getOne,
  addComment
}
export default blogs