import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  FolderOutlined,
  MessageOutlined,
  SecurityScanOutlined,
  BarChartOutlined,
  SettingOutlined,
} from '@ant-design/icons'

const MobileNavigation: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    {
      key: '/',
      label: 'Dashboard',
      icon: <DashboardOutlined className="mobile-nav-icon" />,
    },
    {
      key: '/plans',
      label: 'Plans',
      icon: <FileTextOutlined className="mobile-nav-icon" />,
    },
    {
      key: '/users',
      label: 'Users',
      icon: <UserOutlined className="mobile-nav-icon" />,
    },
    {
      key: '/orders',
      label: 'Orders',
      icon: <ShoppingCartOutlined className="mobile-nav-icon" />,
    },
    {
      key: '/files',
      label: 'Files',
      icon: <FolderOutlined className="mobile-nav-icon" />,
    },
    {
      key: '/communications',
      label: 'Messages',
      icon: <MessageOutlined className="mobile-nav-icon" />,
    },
    {
      key: '/security',
      label: 'Security',
      icon: <SecurityScanOutlined className="mobile-nav-icon" />,
    },
    {
      key: '/analytics',
      label: 'Analytics',
      icon: <BarChartOutlined className="mobile-nav-icon" />,
    },
    {
      key: '/settings',
      label: 'Settings',
      icon: <SettingOutlined className="mobile-nav-icon" />,
    },
  ]

  const handleNavClick = (path: string) => {
    navigate(path)
  }

  return (
    <div className="mobile-nav">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => handleNavClick(item.key)}
            className={`mobile-nav-item ${location.pathname === item.key ? 'active' : ''}`}
          >
            {item.icon}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default MobileNavigation
