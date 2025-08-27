import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loginSuccess, initializeAuth } from '../store/slices/authSlice'

interface User {
  id: string
  name: string
  email: string
  role: 'superAdmin' | 'admin' | 'contentManager' | 'orderProcessor' | 'support'
  avatar?: string
  token: string
}

export const useAuthInit = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    // Check for existing authentication in localStorage
    const userStr = localStorage.getItem('user')
    const adminToken = localStorage.getItem('adminToken')
    
    if (userStr && adminToken) {
      try {
        const user: User = JSON.parse(userStr)
        // Ensure the user has a token
        if (user.token || adminToken) {
          const userWithToken = {
            ...user,
            token: user.token || adminToken
          }
          dispatch(loginSuccess(userWithToken))
        } else {
          dispatch(initializeAuth())
        }
      } catch (error) {
        console.warn('Failed to parse user from localStorage:', error)
        // Clear invalid data
        localStorage.removeItem('user')
        localStorage.removeItem('adminToken')
        dispatch(initializeAuth())
      }
    } else {
      dispatch(initializeAuth())
    }
  }, [dispatch])
}
