import { createSlice } from "@reduxjs/toolkit";
import users from "../services/users";

const usersSlice = createSlice({
    name: 'users',
    initialState: [],
    reducers: {
        setUsers(state, action){
            const users = action.payload || state
            return users
        }
    }
})

export const { setUsers } = usersSlice.actions

export const initializeUsers = () => {
    return async dispatch => {
        const allUsers = await users.getUsers()
        dispatch(setUsers(allUsers))
    }
}

export default usersSlice.reducer