import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { RootState } from '../../store'
import { Spin } from 'antd'

interface ProtectedRouteProps {
  children: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAuthenticated, isLoading, isInitialized } = useSelector((state: RootState) => state.auth)
  const location = useLocation()

  // Show loading spinner while checking authentication
  if (isLoading || !isInitialized) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Spin size="large" />
      </div>
    )
  }

  // Check if user is authenticated
  if (!isAuthenticated || !user) {
    // Redirect to login with the current location as return path
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Check if token exists
  if (!user?.token) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute
