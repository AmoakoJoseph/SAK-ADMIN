import { Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/auth/ProtectedRoute'
import AdminLayout from './components/layout/AdminLayout'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Plans from './pages/Plans'
import Orders from './pages/Orders'
import Users from './pages/Users'
import Analytics from './pages/Analytics'
import Settings from './pages/Settings'

// Settings sub-pages
import PaymentConfig from './pages/settings/PaymentConfig'
import EmailTemplates from './pages/settings/EmailTemplates'
import Security from './pages/settings/Security'

// Plan sub-pages
import UploadPlans from './pages/plans/UploadPlans'
import PendingApproval from './pages/plans/PendingApproval'
import PlanAnalytics from './pages/plans/PlanAnalytics'

// User sub-pages
import UserPendingApproval from './pages/users/PendingApproval'
import UserAnalytics from './pages/users/UserAnalytics'

// Order sub-pages
import PendingOrders from './pages/orders/PendingOrders'
import Refunds from './pages/orders/Refunds'

// Report pages
import SalesReports from './pages/reports/SalesReports'
import UserReports from './pages/reports/UserReports'

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        
        {/* Protected routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }>
          <Route index element={<Dashboard />} />
          
          {/* Plans routes */}
          <Route path="plans" element={<Plans />} />
          <Route path="plans/upload" element={<UploadPlans />} />
          <Route path="plans/pending-approval" element={<PendingApproval />} />
          <Route path="plans/analytics" element={<PlanAnalytics />} />
          
          {/* Orders routes */}
          <Route path="orders" element={<Orders />} />
          <Route path="orders/pending" element={<PendingOrders />} />
          <Route path="orders/refunds" element={<Refunds />} />
          
          {/* Users routes */}
          <Route path="users" element={<Users />} />
          <Route path="users/pending-approval" element={<UserPendingApproval />} />
          <Route path="users/analytics" element={<UserAnalytics />} />
          
          {/* Analytics routes */}
          <Route path="analytics" element={<Analytics />} />
          
          {/* Reports routes */}
          <Route path="reports/sales" element={<SalesReports />} />
          <Route path="reports/users" element={<UserReports />} />
          
          {/* Settings routes */}
          <Route path="settings" element={<Settings />} />
          <Route path="settings/payment" element={<PaymentConfig />} />
          <Route path="settings/email" element={<EmailTemplates />} />
          <Route path="settings/security" element={<Security />} />
        </Route>
      </Routes>
    </AuthProvider>
  )
}

export default App 