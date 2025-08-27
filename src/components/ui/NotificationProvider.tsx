import React from 'react'
import { App } from 'antd'

interface NotificationProviderProps {
  children: React.ReactNode
}

const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  return (
    <App>
      {children}
    </App>
  )
}

export default NotificationProvider
