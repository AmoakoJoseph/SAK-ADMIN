import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface User {
  id: string
  name: string
  email: string
  role: 'superAdmin' | 'admin' | 'contentManager' | 'orderProcessor' | 'support'
  status: 'active' | 'suspended' | 'banned'
  createdAt: string
  lastLogin: string
  avatar?: string
}

interface UsersState {
  users: User[]
  isLoading: boolean
  error: string | null
  selectedUser: User | null
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
  selectedUser: null,
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    fetchUsersSuccess: (state, action: PayloadAction<User[]>) => {
      state.isLoading = false
      state.users = action.payload
    },
    fetchUsersFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload)
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user.id === action.payload.id)
      if (index !== -1) {
        state.users[index] = action.payload
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user.id !== action.payload)
    },
  },
})

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  setSelectedUser,
  addUser,
  updateUser,
  deleteUser,
} = usersSlice.actions

export default usersSlice.reducer
