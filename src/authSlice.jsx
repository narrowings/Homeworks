import {createSlice} from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'not-authenticated', // puedes dejar 'checking' si quieres pero 'not-authenticated' es más claro
        uid: null,
        email: null,
        displayName: null,
        photoUrl: null,
        errorMessage: null
    },
    reducers:{
        register: (state, action) => {
            state.email = action.payload.email
        },
        login: (state, action) => {                   // 👈 AÑADIR ESTO
            state.status = 'authenticated'
            state.uid = action.payload.uid
            state.email = action.payload.email
            state.displayName = action.payload.displayName
            state.photoUrl = action.payload.photoURL
            state.errorMessage = null
        },
        logout : (state, action) => {
            state.status = 'not-authenticated'
            state.uid = null
            state.email = null
            state.displayName = null
            state.photoUrl = null
        }
    }
})

export const { register, login, logout } = authSlice.actions
