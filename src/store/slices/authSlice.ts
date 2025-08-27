import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
  email: string
  role: 'superAdmin' | 'admin' | 'contentManager' | 'orderProcessor' | 'support'
  avatar?: string
  token: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  isInitialized: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false,
  isInitialized: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    loginSuccess: (state, action: PayloadAction<User>) => {
      state.isLoading = false
      state.isAuthenticated = true
      state.user = action.payload
      state.isInitialized = true
      state.error = null
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    logout: (state) => {
      state.user = null
      state.isAuthenticated = false
      state.isInitialized = true
      state.error = null
    },
    clearError: (state) => {
      state.error = null
    },
    initializeAuth: (state) => {
      state.isInitialized = true
    },
  },
})

export const { loginStart, loginSuccess, loginFailure, logout, clearError, initializeAuth } = authSlice.actions
export default authSlice.reducer
