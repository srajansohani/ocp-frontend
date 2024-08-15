import { configureStore } from '@reduxjs/toolkit'
import { counterReducer } from './counter/counterSlice'
import { userReducer } from './userSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer
  },
})