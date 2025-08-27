import { Routes, Route } from 'react-router-dom'
import { Layout } from 'antd'
import AdminLayout from './components/layout/AdminLayout'
import Dashboard from './pages/Dashboard'
import Plans from './pages/Plans'
import Users from './pages/Users'
import Orders from './pages/Orders'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'
import Profile from './pages/Profile'
import Files from './pages/Files'
import Communications from './pages/Communications'
import Security from './pages/Security'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import NotificationProvider from './components/ui/NotificationProvider'

function App() {
  return (
    <NotificationProvider>
      <Layout className="admin-layout">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/" element={<AdminLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="plans" element={<Plans />} />
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="analytics" element={<Analytics />} />
            <Route path="files" element={<Files />} />
            <Route path="communications" element={<Communications />} />
            <Route path="security" element={<Security />} />
            <Route path="settings" element={<Settings />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </Layout>
    </NotificationProvider>
  )
}

export default App
