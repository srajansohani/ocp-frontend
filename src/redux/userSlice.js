import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userId: null,
    isAuthenticated: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUserId: (state,action)=>{
            state.userId = action.payload
        },
        authenticate: (state)=>{
            state.isAuthenticated = true;
        }
    }
})

export const {addUserId,authenticate} = userSlice.actions;

export const userReducer = userSlice.reducer;
