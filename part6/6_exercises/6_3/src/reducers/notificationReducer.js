import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const notificationReducer = createSlice({
    name:'notification',
    initialState,
    reducers: {
        setNotification(state, action){
            const message = action.payload
            return message
        },
        resetNotification(state, action){
            const reset = ''
            return reset
        }
    }
})

export const { setNotification, resetNotification } = notificationReducer.actions
export default notificationReducer.reducer