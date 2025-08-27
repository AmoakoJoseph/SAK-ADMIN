import React, { useState } from 'react'
import { Layout, Menu, Avatar, Dropdown, Button, Drawer } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import {
  DashboardOutlined,
  FileTextOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  SettingOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  FolderOutlined,
  MessageOutlined,
  SecurityScanOutlined,
  CloseOutlined,
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { logout } from '../../store/slices/authSlice'
import MobileNavigation from './MobileNavigation'
import useMobile from '../../hooks/useMobile'
import NotificationCenter from '../ui/NotificationCenter'

const { Header, Sider, Content } = Layout

const AdminLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false)
  const { isMobile } = useMobile()
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  const menuItems = [
    {
      key: '/',
      icon: <DashboardOutlined />,
      label: 'Dashboard',
    },
    {
      key: '/plans',
      icon: <FileTextOutlined />,
      label: 'Plans Management',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: 'Users & Accounts',
    },
    {
      key: '/orders',
      icon: <ShoppingCartOutlined />,
      label: 'Orders & Payments',
    },
    {
      key: '/files',
      icon: <FolderOutlined />,
      label: 'Downloads & Files',
    },
    {
      key: '/communications',
      icon: <MessageOutlined />,
      label: 'Communications',
    },
    {
      key: '/security',
      icon: <SecurityScanOutlined />,
      label: 'Security & Access',
    },
    {
      key: '/analytics',
      icon: <BarChartOutlined />,
      label: 'Analytics & Reports',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: 'System Settings',
    },
  ]

  const userMenuItems = [
    {
      key: 'profile',
      label: 'Profile',
      icon: <UserOutlined />,
    },
    {
      key: 'logout',
      label: 'Logout',
      icon: <LogoutOutlined />,
    },
  ]

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key)
    if (isMobile) {
      setMobileDrawerVisible(false)
    }
  }

  const handleUserMenuClick = ({ key }: { key: string }) => {
    if (key === 'profile') {
      navigate('/profile')
    } else if (key === 'logout') {
      // Clear user data from localStorage
      localStorage.removeItem('user')
      // Dispatch logout action
      dispatch(logout())
      // Navigate to login page
      navigate('/login')
    }
  }

  const handleMobileMenuToggle = () => {
    setMobileDrawerVisible(!mobileDrawerVisible)
  }

  return (
    <Layout style={{ minHeight: '100vh' }}>
      {/* Desktop Sidebar */}
      {!isMobile && (
        <Sider 
          trigger={null} 
          collapsible 
          collapsed={collapsed}
          className="sidebar"
          width={250}
        >
          <div className="p-4 border-b border-gray-200">
            <h1 className={`text-xl font-bold text-primary-500 ${collapsed ? 'text-center' : ''}`}>
              {collapsed ? 'SAK' : 'SAK CONSTRUCTIONS'}
            </h1>
          </div>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            className="border-0"
          />
        </Sider>
      )}
      
      {/* Mobile Drawer */}
      {isMobile && (
                 <Drawer
           title={
             <div className="flex items-center justify-between">
               <h1 className="text-lg font-bold text-primary-500">SAK CONSTRUCTIONS</h1>
               <Button
                 type="text"
                 icon={<CloseOutlined />}
                 onClick={() => setMobileDrawerVisible(false)}
               />
             </div>
           }
           placement="left"
           onClose={() => setMobileDrawerVisible(false)}
           open={mobileDrawerVisible}
           width={280}
           styles={{ body: { padding: 0 } }}
         >
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
            className="border-0"
            style={{ border: 'none' }}
          />
        </Drawer>
      )}
      
      <Layout>
        <Header className="header flex items-center justify-between px-6">
          <Button
            type="text"
            icon={isMobile ? <MenuFoldOutlined /> : (collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />)}
            onClick={isMobile ? handleMobileMenuToggle : () => setCollapsed(!collapsed)}
            className="text-lg"
          />
          
          <div className="flex items-center space-x-4">
            <NotificationCenter />
            
            <Dropdown
              menu={{
                items: userMenuItems,
                onClick: handleUserMenuClick,
              }}
              placement="bottomRight"
            >
              <div className="flex items-center space-x-2 cursor-pointer">
                <Avatar size="small" src={user?.avatar}>
                  {user?.name?.charAt(0)}
                </Avatar>
                {!isMobile && <span className="text-sm font-medium">{user?.name}</span>}
              </div>
            </Dropdown>
          </div>
        </Header>
        
        <Content className={`main-content p-6 ${isMobile ? 'mobile-content' : ''}`}>
          <Outlet />
        </Content>
      </Layout>
      
      {/* Mobile Navigation */}
      {isMobile && <MobileNavigation />}
    </Layout>
  )
}

export default AdminLayout
