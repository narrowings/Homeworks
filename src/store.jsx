import {configureStore} from '@reduxjs/toolkit'
import counterReducer from './counterSlice.jsx'
import stackReducer from "./stackSlice.jsx"

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        stack: stackReducer
    },
})