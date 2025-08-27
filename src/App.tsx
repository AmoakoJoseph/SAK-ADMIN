import { Routes, Route } from 'react-router-dom'
import { Layout, Spin } from 'antd'
import { Suspense, lazy } from 'react'
import AdminLayout from './components/layout/AdminLayout'
import NotificationProvider from './components/ui/NotificationProvider'

// Lazy load pages for better chunk splitting
const Dashboard = lazy(() => import('./pages/Dashboard'))
const Plans = lazy(() => import('./pages/Plans'))
const Users = lazy(() => import('./pages/Users'))
const Orders = lazy(() => import('./pages/Orders'))
const Analytics = lazy(() => import('./pages/Analytics'))
const Settings = lazy(() => import('./pages/Settings'))
const Profile = lazy(() => import('./pages/Profile'))
const Files = lazy(() => import('./pages/Files'))
const Communications = lazy(() => import('./pages/Communications'))
const Security = lazy(() => import('./pages/Security'))
const Login = lazy(() => import('./pages/Login'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

// Loading component for lazy-loaded pages
const PageLoading = () => (
  <div className="flex items-center justify-center h-64">
    <Spin size="large" />
  </div>
)

function App() {
  return (
    <NotificationProvider>
      <Layout className="admin-layout">
        <Routes>
          <Route path="/login" element={
            <Suspense fallback={<PageLoading />}>
              <Login />
            </Suspense>
          } />
          <Route path="/forgot-password" element={
            <Suspense fallback={<PageLoading />}>
              <ForgotPassword />
            </Suspense>
          } />
          <Route path="/" element={<AdminLayout />}>
            <Route index element={
              <Suspense fallback={<PageLoading />}>
                <Dashboard />
              </Suspense>
            } />
            <Route path="plans" element={
              <Suspense fallback={<PageLoading />}>
                <Plans />
              </Suspense>
            } />
            <Route path="users" element={
              <Suspense fallback={<PageLoading />}>
                <Users />
              </Suspense>
            } />
            <Route path="orders" element={
              <Suspense fallback={<PageLoading />}>
                <Orders />
              </Suspense>
            } />
            <Route path="analytics" element={
              <Suspense fallback={<PageLoading />}>
                <Analytics />
              </Suspense>
            } />
            <Route path="files" element={
              <Suspense fallback={<PageLoading />}>
                <Files />
              </Suspense>
            } />
            <Route path="communications" element={
              <Suspense fallback={<PageLoading />}>
                <Communications />
              </Suspense>
            } />
            <Route path="security" element={
              <Suspense fallback={<PageLoading />}>
                <Security />
              </Suspense>
            } />
            <Route path="settings" element={
              <Suspense fallback={<PageLoading />}>
                <Settings />
              </Suspense>
            } />
            <Route path="profile" element={
              <Suspense fallback={<PageLoading />}>
                <Profile />
              </Suspense>
            } />
          </Route>
        </Routes>
      </Layout>
    </NotificationProvider>
  )
}

export default App
