import axios from 'axios'
const baseUrl = '/api/persons'

const getAll = () => {
    return axios.get(baseUrl).then(res => res.data)
}

const create = (newObject) => {
    return axios.post(baseUrl, newObject).then(res => res.data)
}

const del = (id) => {
    if(window.confirm('Do you really want to delete user')){
        return axios.delete(`${baseUrl}/${id}`)
    }
    return
}

const update = (id, newObject) => {
    if(window.confirm('Person exists, do you want to change the number?')){
        return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
    }
    return
}

const numberService = { getAll, create, del, update }

export default numberService