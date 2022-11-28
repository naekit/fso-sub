import { createSlice } from "@reduxjs/toolkit";
import blogs from "../services/blogs";
import login from "../services/login";
import { setMsg } from "./msgReducer";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        name: null,
        token: null,
        username: null
    },
    reducers: {
        setUser(state, action){
            return action.payload
        },
        resetUser(state,action){
            return null
        }
    }
})

export const { setUser, resetUser, addToken } = userSlice.actions

export const loginUser = (userObj) => {
    return async dispatch => {
        try {
            const user = await login.login(userObj)
            window.localStorage.setItem('userAppToken', JSON.stringify(user))
            dispatch(setUser(user))
        } catch (error) {
            const message = error.response.data.error || 'Unauthorized!'
            dispatch(setMsg(message))
        }
    }
}

export const setToken = () => {
    return async dispatch => {
        const loggedUserJSON = window.localStorage.getItem('userAppToken')
        if(loggedUserJSON){
            const user = JSON.parse(loggedUserJSON)
            blogs.setToken(user.token)
            dispatch(setUser(user))
        }
    }
}

export default userSlice.reducer