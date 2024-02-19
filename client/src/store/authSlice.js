import { createSlice } from "@reduxjs/toolkit";

const token = localStorage.getItem('token') ? localStorage.getItem('token') : null
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false,
        user: null,
        token: token,
        error: null
    },
    reducers: {
        addLoginUsers: (state, action) => {
            {
                state.user = action.payload
            }
        }
    },
    //     extraReducers: {

    //     }
})

export const { addLoginUsers } = authSlice.actions

export default authSlice.reducer