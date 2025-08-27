import React, { useState, useEffect } from 'react'
import { 
  Badge, 
  Popover, 
  List, 
  Avatar, 
  Typography, 
  Button, 
  Space, 
  Tag, 
  Divider,
  Empty,
  Spin,
  Tabs
} from 'antd'
import { 
  BellOutlined, 
  CheckOutlined, 
  CloseOutlined, 
  InfoCircleOutlined,
  WarningOutlined,
  ExclamationCircleOutlined,
  CheckCircleOutlined
} from '@ant-design/icons'
import { App } from 'antd'

const { Text, Title } = Typography

interface Notification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
  action?: {
    label: string
    onClick: () => void
  }
}

interface NotificationCenterProps {
  count?: number
  onMarkAllRead?: () => void
  onClearAll?: () => void
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  count = 0,
  onMarkAllRead,
  onClearAll
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const { message } = App.useApp()

  // Mock notifications data
  useEffect(() => {
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'success',
        title: 'Payment Received',
        message: 'Payment of ₵2,500 has been received for Villa Plan',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
        read: false,
        action: {
          label: 'View Details',
          onClick: () => message.info('Viewing payment details...')
        }
      },
      {
        id: '2',
        type: 'info',
        title: 'New Plan Uploaded',
        message: 'Modern Villa Plan has been uploaded and is pending approval',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        read: false,
        action: {
          label: 'Review',
          onClick: () => message.info('Opening plan review...')
        }
      },
      {
        id: '3',
        type: 'warning',
        title: 'System Maintenance',
        message: 'Scheduled maintenance will begin in 30 minutes',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4), // 4 hours ago
        read: true
      },
      {
        id: '4',
        type: 'error',
        title: 'Login Attempt Failed',
        message: 'Multiple failed login attempts detected from IP 192.168.1.100',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6), // 6 hours ago
        read: false
      },
      {
        id: '5',
        type: 'success',
        title: 'User Registration',
        message: 'New user john.doe@example.com has registered',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8), // 8 hours ago
        read: true
      }
    ]
    setNotifications(mockNotifications)
  }, [])

  const getNotificationIcon = (type: Notification['type']) => {
    const iconConfig = {
      info: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
      success: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      warning: <WarningOutlined style={{ color: '#faad14' }} />,
      error: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
    }
    return iconConfig[type]
  }

  const getNotificationColor = (type: Notification['type']) => {
    const colorConfig = {
      info: 'blue',
      success: 'green',
      warning: 'orange',
      error: 'red'
    }
    return colorConfig[type]
  }

  const formatTimestamp = (timestamp: Date) => {
    const now = new Date()
    const diff = now.getTime() - timestamp.getTime()
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))

    if (minutes < 60) {
      return `${minutes} minutes ago`
    } else if (hours < 24) {
      return `${hours} hours ago`
    } else {
      return `${days} days ago`
    }
  }

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, read: true }
          : notification
      )
    )
    message.success('Marked as read')
  }

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    )
    message.success('All notifications marked as read')
    onMarkAllRead?.()
  }

  const handleClearAll = () => {
    setNotifications([])
    message.success('All notifications cleared')
    onClearAll?.()
  }

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
    message.success('Notification deleted')
  }

  const filteredNotifications = notifications.filter(notification => {
    if (activeTab === 'all') return true
    if (activeTab === 'unread') return !notification.read
    return notification.type === activeTab
  })

  const unreadCount = notifications.filter(n => !n.read).length

  const tabItems = [
    {
      key: 'all',
      label: `All (${notifications.length})`,
      children: null
    },
    {
      key: 'unread',
      label: `Unread (${unreadCount})`,
      children: null
    },
    {
      key: 'info',
      label: 'Info',
      children: null
    },
    {
      key: 'success',
      label: 'Success',
      children: null
    },
    {
      key: 'warning',
      label: 'Warning',
      children: null
    },
    {
      key: 'error',
      label: 'Error',
      children: null
    }
  ]

  const notificationContent = (
    <div style={{ width: 400, maxHeight: 500 }}>
      <div style={{ padding: '16px 0', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Title level={5} style={{ margin: 0 }}>
            Notifications
          </Title>
          <Space>
            <Button 
              type="text" 
              size="small" 
              onClick={handleMarkAllAsRead}
              disabled={unreadCount === 0}
            >
              Mark all read
            </Button>
            <Button 
              type="text" 
              size="small" 
              onClick={handleClearAll}
              disabled={notifications.length === 0}
            >
              Clear all
            </Button>
          </Space>
        </div>
      </div>

      <Tabs
        activeKey={activeTab}
        onChange={setActiveTab}
        items={tabItems}
        size="small"
        style={{ marginBottom: 16 }}
      />

      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px 0' }}>
          <Spin />
        </div>
      ) : filteredNotifications.length === 0 ? (
        <Empty 
          description="No notifications" 
          style={{ padding: '40px 0' }}
        />
      ) : (
        <List
          dataSource={filteredNotifications}
          renderItem={(notification) => (
            <List.Item
              style={{ 
                padding: '12px 16px',
                backgroundColor: notification.read ? 'transparent' : '#f6ffed',
                borderBottom: '1px solid #f0f0f0'
              }}
            >
              <List.Item.Meta
                avatar={
                  <Avatar 
                    icon={getNotificationIcon(notification.type)}
                    style={{ backgroundColor: 'transparent' }}
                  />
                }
                title={
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <Text strong={!notification.read}>
                        {notification.title}
                      </Text>
                      {!notification.read && (
                        <Tag color="green" size="small" style={{ marginLeft: 8 }}>
                          New
                        </Tag>
                      )}
                    </div>
                    <Space>
                      {!notification.read && (
                        <Button
                          type="text"
                          size="small"
                          icon={<CheckOutlined />}
                          onClick={() => handleMarkAsRead(notification.id)}
                        />
                      )}
                      <Button
                        type="text"
                        size="small"
                        icon={<CloseOutlined />}
                        onClick={() => handleDeleteNotification(notification.id)}
                      />
                    </Space>
                  </div>
                }
                description={
                  <div>
                    <Text type="secondary" style={{ fontSize: '12px' }}>
                      {notification.message}
                    </Text>
                    <div style={{ marginTop: 8 }}>
                      <Text type="secondary" style={{ fontSize: '11px' }}>
                        {formatTimestamp(notification.timestamp)}
                      </Text>
                      {notification.action && (
                        <Button
                          type="link"
                          size="small"
                          onClick={notification.action.onClick}
                          style={{ padding: 0, marginLeft: 8 }}
                        >
                          {notification.action.label}
                        </Button>
                      )}
                    </div>
                  </div>
                }
              />
            </List.Item>
          )}
        />
      )}
    </div>
  )

  return (
    <Popover
      content={notificationContent}
      trigger="click"
      placement="bottomRight"
      overlayStyle={{ width: 400 }}
    >
      <Badge count={unreadCount} size="small">
        <Button 
          type="text" 
          icon={<BellOutlined />} 
          className="text-lg"
        />
      </Badge>
    </Popover>
  )
}

export default NotificationCenter
