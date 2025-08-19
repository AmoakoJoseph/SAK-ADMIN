import React, { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  Users, 
  FileText, 
  DollarSign, 
  Calendar,
  Activity,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { adminAnalyticsService } from '../../services/admin/adminAnalytics'

// Mock data for development
const mockDashboardStats = {
  totalRevenue: 1250000,
  totalOrders: 3420,
  totalUsers: 1850,
  totalPlans: 456,
  revenueChange: 12.5,
  ordersChange: 8.3,
  usersChange: 15.7,
  plansChange: 22.1,
  recentActivity: [
    {
      id: '1',
      type: 'order',
      message: 'New order received for Commercial Plan',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      user: 'John Doe',
      amount: 5000
    },
    {
      id: '2',
      type: 'user',
      message: 'New user registration: Sarah Wilson',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      user: 'Sarah Wilson'
    },
    {
      id: '3',
      type: 'plan',
      message: 'New plan uploaded: Modern Office Complex',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      user: 'Architect Pro'
    }
  ],
  quickActions: [
    { name: 'Review Plans', count: 12, icon: FileText, color: 'bg-blue-500' },
    { name: 'Process Orders', count: 8, icon: DollarSign, color: 'bg-green-500' },
    { name: 'User Approvals', count: 5, icon: Users, color: 'bg-purple-500' },
    { name: 'System Health', count: 100, icon: CheckCircle, color: 'bg-green-500' }
  ]
}

interface StatCardProps {
  title: string
  value: string | number
  change: number
  icon: React.ReactNode
  trend: 'up' | 'down' | 'neutral'
}

const StatCard = ({ title, value, change, icon, trend }: StatCardProps) => {
  const getChangeColor = () => {
    if (trend === 'up') return 'text-success-600'
    if (trend === 'down') return 'text-danger-600'
    return 'text-brand-lightGray'
  }

  const getChangeIcon = () => {
    if (trend === 'up') return <TrendingUp size={16} className="text-success-600" />
    if (trend === 'down') return <TrendingDown size={16} className="text-danger-600" />
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-brand-lightGray">{title}</p>
          <p className="text-2xl font-bold text-brand-charcoal">{value}</p>
        </div>
        <div className="p-3 bg-primary-50 rounded-lg">
          {icon}
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-2">
        {getChangeIcon()}
        <span className={`text-sm font-medium ${getChangeColor()}`}>
          {change > 0 ? '+' : ''}{change}%
        </span>
        <span className="text-sm text-brand-lightGray">vs last month</span>
      </div>
    </div>
  )
}

interface RecentActivityProps {
  activities: Array<{
    id: string
    type: string
    description: string
    timestamp: string
    user: string
  }>
}

const RecentActivity = ({ activities }: RecentActivityProps) => (
  <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
    <h3 className="text-lg font-semibold text-brand-charcoal mb-4">Recent Activity</h3>
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <div className="p-2 bg-primary-50 rounded-full">
            <Activity size={16} className="text-brand-orange" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-brand-charcoal">{activity.description}</p>
            <div className="flex items-center space-x-2 mt-1">
              <span className="text-xs text-brand-lightGray">{activity.user}</span>
              <span className="text-xs text-brand-lightGray">•</span>
              <span className="text-xs text-brand-lightGray">{activity.timestamp}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
)

interface QuickActionsProps {
  onAction: (action: string) => void
}

const QuickActions = ({ onAction }: QuickActionsProps) => {
  const actions = [
    { name: 'Upload Plan', icon: FileText, action: 'upload-plan' },
    { name: 'Add User', icon: Users, action: 'add-user' },
    { name: 'Process Orders', icon: ShoppingCart, action: 'process-orders' },
    { name: 'View Reports', icon: TrendingUp, action: 'view-reports' },
  ]

  return (
    <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
      <h3 className="text-lg font-semibold text-brand-charcoal mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <button
            key={action.action}
            onClick={() => onAction(action.action)}
            className="flex items-center space-x-3 p-3 rounded-lg border border-brand-lightGray hover:border-brand-orange hover:bg-primary-50 transition-colors"
          >
            <action.icon size={20} className="text-brand-orange" />
            <span className="text-sm font-medium text-brand-charcoal">{action.name}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true)
      try {
        // Try to fetch from API first
        if (import.meta.env.VITE_API_BASE_URL) {
          const data = await adminAnalyticsService.getDashboardStats()
          setStats(data)
        } else {
          // Fallback to mock data if no API URL configured
          setStats(mockDashboardStats)
        }
      } catch (error) {
        console.warn('API call failed, using mock data:', error)
        // Use mock data as fallback
        setStats(mockDashboardStats)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const handleQuickAction = (action: string) => {
    // Handle quick actions
    console.log('Quick action:', action)
  }

  const mockActivities = [
    {
      id: '1',
      type: 'plan_upload',
      description: 'New building plan uploaded: Modern Villa Design',
      timestamp: '2 hours ago',
      user: 'John Doe'
    },
    {
      id: '2',
      type: 'order_completed',
      description: 'Order #12345 completed successfully',
      timestamp: '4 hours ago',
      user: 'System'
    },
    {
      id: '3',
      type: 'user_registered',
      description: 'New user registered: jane@example.com',
      timestamp: '6 hours ago',
      user: 'System'
    },
    {
      id: '4',
      type: 'plan_approved',
      description: 'Plan "Contemporary Bungalow" approved',
      timestamp: '1 day ago',
      user: 'Admin'
    }
  ]

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle size={48} className="text-danger-500 mx-auto mb-4" />
          <p className="text-danger-600 font-medium">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal">Dashboard</h1>
          <p className="text-brand-lightGray">Welcome back! Here's what's happening with your business.</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-brand-lightGray">
          <Clock size={16} />
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Revenue"
          value={`$${stats?.totalRevenue?.toLocaleString() || '0'}`}
          change={stats?.revenueChange || 0}
          icon={<DollarSign size={24} className="text-brand-orange" />}
          trend={stats?.revenueChange && stats.revenueChange > 0 ? 'up' : 'down'}
        />
        <StatCard
          title="Total Orders"
          value={stats?.totalOrders?.toLocaleString() || '0'}
          change={stats?.ordersChange || 0}
          icon={<ShoppingCart size={24} className="text-brand-orange" />}
          trend={stats?.ordersChange && stats.ordersChange > 0 ? 'up' : 'down'}
        />
        <StatCard
          title="Total Users"
          value={stats?.totalUsers?.toLocaleString() || '0'}
          change={stats?.usersChange || 0}
          icon={<Users size={24} className="text-brand-orange" />}
          trend={stats?.usersChange && stats.usersChange > 0 ? 'up' : 'down'}
        />
        <StatCard
          title="Total Plans"
          value={stats?.totalPlans?.toLocaleString() || '0'}
          change={stats?.plansChange || 0}
          icon={<FileText size={24} className="text-brand-orange" />}
          trend={stats?.plansChange && stats.plansChange > 0 ? 'up' : 'down'}
        />
      </div>

      {/* Charts and Additional Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart Placeholder */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-lg font-semibold text-brand-charcoal mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-center justify-center bg-primary-50 rounded-lg">
            <p className="text-brand-lightGray">Revenue chart will be displayed here</p>
          </div>
        </div>

        {/* Quick Actions */}
        <QuickActions onAction={handleQuickAction} />
      </div>

      {/* Recent Activity and Additional Widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity activities={mockActivities} />
        
        {/* System Status */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-lg font-semibold text-brand-charcoal mb-4">System Status</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-charcoal">Database</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-charcoal">API</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                Healthy
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-charcoal">Storage</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-warning-100 text-warning-800">
                Warning
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-brand-charcoal">Email Service</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-success-100 text-success-800">
                Healthy
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
