import { createSlice } from '@reduxjs/toolkit'

const initialState = {message: ''}

const notificationReducer = createSlice({
    name:'notification',
    initialState,
    reducers: {
        setNotify(state, action){
            const message = action.payload
            return { message }
        },
        resetNotification(state, action){
            const reset = { message: '' }
            return reset
        }
    }
})

export const { setNotify, resetNotification } = notificationReducer.actions

export const setNotification = (content, time = 5) => {
    return async dispatch => {
        await dispatch(setNotify(content))
        setTimeout(() => {
            dispatch(resetNotification())
        }, (time * 1000))
    }
}

export default notificationReducer.reducer