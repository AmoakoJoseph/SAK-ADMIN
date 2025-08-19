import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  ShoppingCart, 
  DollarSign,
  Calendar,
  Download,
  BarChart3,
  PieChart,
  Activity,
  Eye,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react'
import { adminAnalyticsService } from '../services/admin/adminAnalytics'

const Analytics = () => {
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      // Mock data - replace with real API calls
      await new Promise(resolve => setTimeout(resolve, 1000))
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  // Mock data for demonstration
  const mockData = {
    revenue: {
      total: 125000,
      change: 12.5,
      trend: 'up',
      data: [
        { month: 'Jan', value: 85000 },
        { month: 'Feb', value: 92000 },
        { month: 'Mar', value: 105000 },
        { month: 'Apr', value: 98000 },
        { month: 'May', value: 112000 },
        { month: 'Jun', value: 125000 }
      ]
    },
    orders: {
      total: 156,
      change: 8.3,
      trend: 'up',
      data: [
        { month: 'Jan', value: 120 },
        { month: 'Feb', value: 135 },
        { month: 'Mar', value: 142 },
        { month: 'Apr', value: 138 },
        { month: 'May', value: 149 },
        { month: 'Jun', value: 156 }
      ]
    },
    users: {
      total: 2847,
      change: 15.2,
      trend: 'up',
      data: [
        { month: 'Jan', value: 2100 },
        { month: 'Feb', value: 2250 },
        { month: 'Mar', value: 2400 },
        { month: 'Apr', value: 2550 },
        { month: 'May', value: 2700 },
        { month: 'Jun', value: 2847 }
      ]
    },
    plans: {
      total: 89,
      change: -2.1,
      trend: 'down',
      data: [
        { month: 'Jan', value: 95 },
        { month: 'Feb', value: 92 },
        { month: 'Mar', value: 88 },
        { month: 'Apr', value: 85 },
        { month: 'May', value: 87 },
        { month: 'Jun', value: 89 }
      ]
    }
  }

  const topPlans = [
    { name: 'Modern Villa Design', revenue: 45000, orders: 18, conversion: 12.5 },
    { name: 'Commercial Office Complex', revenue: 38000, orders: 8, conversion: 8.2 },
    { name: 'Sustainable Home', revenue: 32000, orders: 14, conversion: 10.8 },
    { name: 'Landscape Garden Design', revenue: 28000, orders: 23, conversion: 15.3 }
  ]

  const topCategories = [
    { name: 'Residential', revenue: 85000, percentage: 68 },
    { name: 'Commercial', revenue: 28000, percentage: 22.4 },
    { name: 'Landscape', revenue: 12000, percentage: 9.6 }
  ]

  const recentActivity = [
    { type: 'order', description: 'New order #ORD-2024-005 received', time: '2 minutes ago', status: 'success' },
    { type: 'user', description: 'New user registration: alice@example.com', time: '15 minutes ago', status: 'info' },
    { type: 'plan', description: 'Plan "Modern Villa Design" updated', time: '1 hour ago', status: 'success' },
    { type: 'payment', description: 'Payment failed for order #ORD-2024-004', time: '2 hours ago', status: 'error' },
    { type: 'user', description: 'User bob.wilson@example.com suspended', time: '3 hours ago', status: 'warning' }
  ]

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCart size={16} />
      case 'user':
        return <Users size={16} />
      case 'plan':
        return <FileText size={16} />
      case 'payment':
        return <DollarSign size={16} />
      default:
        return <Activity size={16} />
    }
  }

  const getActivityStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-success-600'
      case 'error':
        return 'text-danger-600'
      case 'warning':
        return 'text-warning-600'
      case 'info':
        return 'text-info-600'
      default:
        return 'text-brand-lightGray'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal">Analytics & Reports</h1>
          <p className="text-brand-lightGray">Comprehensive insights into your business performance</p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="btn btn-secondary flex items-center space-x-2">
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Total Revenue</p>
              <p className="text-2xl font-bold text-brand-charcoal">${mockData.revenue.total.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <DollarSign size={24} className="text-brand-orange" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            {mockData.revenue.trend === 'up' ? (
              <TrendingUp size={16} className="text-success-600" />
            ) : (
              <TrendingDown size={16} className="text-danger-600" />
            )}
            <span className={`text-sm font-medium ${mockData.revenue.trend === 'up' ? 'text-success-600' : 'text-danger-600'}`}>
              {mockData.revenue.change > 0 ? '+' : ''}{mockData.revenue.change}%
            </span>
            <span className="text-sm text-brand-lightGray">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Total Orders</p>
              <p className="text-2xl font-bold text-brand-charcoal">{mockData.orders.total}</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <ShoppingCart size={24} className="text-brand-orange" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            {mockData.orders.trend === 'up' ? (
              <TrendingUp size={16} className="text-success-600" />
            ) : (
              <TrendingDown size={16} className="text-danger-600" />
            )}
            <span className={`text-sm font-medium ${mockData.orders.trend === 'up' ? 'text-success-600' : 'text-danger-600'}`}>
              {mockData.orders.change > 0 ? '+' : ''}{mockData.orders.change}%
            </span>
            <span className="text-sm text-brand-lightGray">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Total Users</p>
              <p className="text-2xl font-bold text-brand-charcoal">{mockData.users.total.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <Users size={24} className="text-brand-orange" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            {mockData.users.trend === 'up' ? (
              <TrendingUp size={16} className="text-success-600" />
            ) : (
              <TrendingDown size={16} className="text-danger-600" />
            )}
            <span className={`text-sm font-medium ${mockData.users.trend === 'up' ? 'text-success-600' : 'text-danger-600'}`}>
              {mockData.users.change > 0 ? '+' : ''}{mockData.users.change}%
            </span>
            <span className="text-sm text-brand-lightGray">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Active Plans</p>
              <p className="text-2xl font-bold text-brand-charcoal">{mockData.plans.total}</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <FileText size={24} className="text-brand-orange" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            {mockData.plans.trend === 'up' ? (
              <TrendingUp size={16} className="text-success-600" />
            ) : (
              <TrendingDown size={16} className="text-danger-600" />
            )}
            <span className={`text-sm font-medium ${mockData.plans.trend === 'up' ? 'text-success-600' : 'text-danger-600'}`}>
              {mockData.plans.change > 0 ? '+' : ''}{mockData.plans.change}%
            </span>
            <span className="text-sm text-brand-lightGray">vs last period</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-brand-charcoal">Revenue Trend</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setSelectedMetric('revenue')}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedMetric === 'revenue' 
                    ? 'bg-brand-orange text-white' 
                    : 'bg-primary-50 text-brand-charcoal hover:bg-primary-100'
                }`}
              >
                Revenue
              </button>
              <button
                onClick={() => setSelectedMetric('orders')}
                className={`px-3 py-1 text-sm rounded-md ${
                  selectedMetric === 'orders' 
                    ? 'bg-brand-orange text-white' 
                    : 'bg-primary-50 text-brand-charcoal hover:bg-primary-100'
                }`}
              >
                Orders
              </button>
            </div>
          </div>
          <div className="h-64 flex items-center justify-center bg-primary-50 rounded-lg">
            <div className="text-center">
              <BarChart3 size={48} className="text-brand-lightGray mx-auto mb-2" />
              <p className="text-brand-lightGray">Chart will be displayed here</p>
              <p className="text-sm text-brand-lightGray">Integrate with Recharts or Chart.js</p>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-lg font-semibold text-brand-charcoal mb-6">Revenue by Category</h3>
          <div className="space-y-4">
            {topCategories.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-primary-500"></div>
                  <span className="text-sm font-medium text-brand-charcoal">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-brand-charcoal">${category.revenue.toLocaleString()}</div>
                  <div className="text-xs text-brand-lightGray">{category.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 h-32 flex items-center justify-center bg-primary-50 rounded-lg">
            <div className="text-center">
              <PieChart size={32} className="text-brand-lightGray mx-auto mb-2" />
              <p className="text-sm text-brand-lightGray">Pie chart visualization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Plans and Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performing Plans */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-lg font-semibold text-brand-charcoal mb-6">Top Performing Plans</h3>
          <div className="space-y-4">
            {topPlans.map((plan, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-primary-50 rounded-lg">
                <div className="flex-1">
                  <div className="text-sm font-medium text-brand-charcoal">{plan.name}</div>
                  <div className="text-xs text-brand-lightGray">
                    {plan.orders} orders • {plan.conversion}% conversion
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-brand-charcoal">${plan.revenue.toLocaleString()}</div>
                  <div className="text-xs text-brand-lightGray">Revenue</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-lg font-semibold text-brand-charcoal mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className={`p-2 bg-primary-50 rounded-full ${getActivityStatusColor(activity.status)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-sm text-brand-charcoal">{activity.description}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Clock size={12} className="text-brand-lightGray" />
                    <span className="text-xs text-brand-lightGray">{activity.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Analytics Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Growth */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-lg font-semibold text-brand-charcoal mb-4">User Growth</h3>
          <div className="h-32 flex items-center justify-center bg-primary-50 rounded-lg">
            <div className="text-center">
              <TrendingUp size={32} className="text-brand-lightGray mx-auto mb-2" />
              <p className="text-sm text-brand-lightGray">Growth chart</p>
            </div>
          </div>
        </div>

        {/* Conversion Funnel */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-lg font-semibold text-brand-charcoal mb-4">Conversion Funnel</h3>
          <div className="h-32 flex items-center justify-center bg-primary-50 rounded-lg">
            <div className="text-center">
              <BarChart3 size={32} className="text-brand-lightGray mx-auto mb-2" />
              <p className="text-sm text-brand-lightGray">Funnel chart</p>
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-lg font-semibold text-brand-charcoal mb-4">Geographic Distribution</h3>
          <div className="h-32 flex items-center justify-center bg-primary-50 rounded-lg">
            <div className="text-center">
              <Activity size={32} className="text-brand-lightGray mx-auto mb-2" />
              <p className="text-sm text-brand-lightGray">Map visualization</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics 