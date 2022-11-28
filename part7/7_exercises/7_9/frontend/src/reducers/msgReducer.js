import { createSlice } from "@reduxjs/toolkit";

const initialState = {message: ''}

let timed

const msgReducer = createSlice({
    name:'msg',
    initialState,
    reducers: {
        addMsg(state, action){
            const message = action.payload
            return { message }
        },
        resetMsg(state, action){
            const reset = { message: '' }
            return reset
        }
    }
})

export const { addMsg, resetMsg } = msgReducer.actions

export const setMsg = (content, time = 5) => {
    return async dispatch => {
        clearInterval(timed)
        await dispatch(addMsg(content))
        timed = setTimeout(() => {
            dispatch(resetMsg())
        }, (time * 1000))
    }
}

export default msgReducer.reducer