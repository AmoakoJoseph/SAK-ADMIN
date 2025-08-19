import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  UserPlus, 
  UserCheck, 
  UserX,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Filter,
  Download,
  Eye
} from 'lucide-react'

interface UserAnalytics {
  totalUsers: number
  activeUsers: number
  newUsersThisMonth: number
  userGrowthRate: number
  topUserTypes: Array<{
    type: string
    count: number
    percentage: number
  }>
  userActivityByMonth: Array<{
    month: string
    newUsers: number
    activeUsers: number
  }>
  topPerformingUsers: Array<{
    id: string
    name: string
    email: string
    plan: string
    totalDownloads: number
    totalViews: number
    revenue: number
    lastActive: string
  }>
  userEngagement: {
    averageSessionDuration: number
    pagesPerSession: number
    bounceRate: number
    returnRate: number
  }
}

const UserAnalytics = () => {
  const [analytics, setAnalytics] = useState<UserAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30d')
  const [selectedMetric, setSelectedMetric] = useState('users')

  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockAnalytics: UserAnalytics = {
        totalUsers: 1247,
        activeUsers: 892,
        newUsersThisMonth: 156,
        userGrowthRate: 12.5,
        topUserTypes: [
          { type: 'Architects', count: 456, percentage: 36.6 },
          { type: 'Engineers', count: 234, percentage: 18.8 },
          { type: 'Contractors', count: 198, percentage: 15.9 },
          { type: 'Designers', count: 156, percentage: 12.5 },
          { type: 'Students', count: 89, percentage: 7.1 },
          { type: 'Others', count: 114, percentage: 9.1 }
        ],
        userActivityByMonth: [
          { month: 'Jan', newUsers: 89, activeUsers: 234 },
          { month: 'Feb', newUsers: 92, activeUsers: 245 },
          { month: 'Mar', newUsers: 78, activeUsers: 267 },
          { month: 'Apr', newUsers: 103, activeUsers: 289 },
          { month: 'May', newUsers: 134, activeUsers: 312 },
          { month: 'Jun', newUsers: 156, activeUsers: 345 }
        ],
        topPerformingUsers: [
          {
            id: '1',
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            plan: 'Premium',
            totalDownloads: 156,
            totalViews: 892,
            revenue: 2340.00,
            lastActive: '2024-01-15T10:30:00Z'
          },
          {
            id: '2',
            name: 'David Wilson',
            email: 'david.wilson@example.com',
            plan: 'Enterprise',
            totalDownloads: 134,
            totalViews: 756,
            revenue: 1890.00,
            lastActive: '2024-01-14T14:20:00Z'
          },
          {
            id: '3',
            name: 'Sarah Brown',
            email: 'sarah.brown@example.com',
            plan: 'Basic',
            totalDownloads: 98,
            totalViews: 567,
            revenue: 490.00,
            lastActive: '2024-01-13T09:15:00Z'
          },
          {
            id: '4',
            name: 'Michael Chen',
            email: 'michael.chen@example.com',
            plan: 'Premium',
            totalDownloads: 87,
            totalViews: 445,
            revenue: 870.00,
            lastActive: '2024-01-12T16:45:00Z'
          },
          {
            id: '5',
            name: 'Emily Davis',
            email: 'emily.davis@example.com',
            plan: 'Basic',
            totalDownloads: 76,
            totalViews: 398,
            revenue: 380.00,
            lastActive: '2024-01-11T11:30:00Z'
          }
        ],
        userEngagement: {
          averageSessionDuration: 8.5,
          pagesPerSession: 4.2,
          bounceRate: 23.4,
          returnRate: 67.8
        }
      }
      
      setAnalytics(mockAnalytics)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-GH', {
      style: 'currency',
      currency: 'GHS'
    }).format(amount)
  }

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
      </div>
    )
  }

  if (!analytics) {
    return (
      <div className="text-center py-12">
        <BarChart3 size={48} className="text-brand-lightGray mx-auto mb-4" />
        <h3 className="text-lg font-medium text-brand-charcoal mb-2">No analytics data available</h3>
        <p className="text-brand-lightGray">Unable to load user analytics at this time.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal">User Analytics</h1>
          <p className="text-brand-lightGray">Comprehensive insights into user behavior and performance</p>
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
            <span>Export</span>
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Total Users</p>
              <p className="text-2xl font-bold text-brand-charcoal">{analytics.totalUsers.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <Users size={24} className="text-brand-orange" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Active Users</p>
              <p className="text-2xl font-bold text-brand-charcoal">{analytics.activeUsers.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-success-50 rounded-lg">
              <UserCheck size={24} className="text-success-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">New This Month</p>
              <p className="text-2xl font-bold text-brand-charcoal">{analytics.newUsersThisMonth}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <UserPlus size={24} className="text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Growth Rate</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold text-brand-charcoal">{formatPercentage(analytics.userGrowthRate)}</p>
                <TrendingUp size={20} className="text-success-600 ml-2" />
              </div>
            </div>
            <div className="p-3 bg-warning-50 rounded-lg">
              <TrendingUp size={24} className="text-warning-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-brand-charcoal">User Growth Trend</h3>
            <Filter size={16} className="text-brand-lightGray" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={48} className="text-brand-lightGray mx-auto mb-2" />
              <p className="text-sm text-brand-lightGray">Chart integration with Recharts/Chart.js</p>
              <p className="text-xs text-brand-lightGray">Monthly user growth visualization</p>
            </div>
          </div>
        </div>

        {/* User Types Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-brand-charcoal">User Types Distribution</h3>
            <PieChart size={16} className="text-brand-lightGray" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart size={48} className="text-brand-lightGray mx-auto mb-2" />
              <p className="text-sm text-brand-lightGray">Chart integration with Recharts/Chart.js</p>
              <p className="text-xs text-brand-lightGray">User type percentage breakdown</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Engagement Metrics */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <h3 className="text-lg font-semibold text-brand-charcoal mb-4">User Engagement Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="p-3 bg-primary-50 rounded-lg inline-block mb-3">
              <Activity size={24} className="text-brand-orange" />
            </div>
            <p className="text-sm font-medium text-brand-lightGray">Avg. Session Duration</p>
            <p className="text-xl font-bold text-brand-charcoal">{analytics.userEngagement.averageSessionDuration}m</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-blue-50 rounded-lg inline-block mb-3">
              <BarChart3 size={24} className="text-blue-600" />
            </div>
            <p className="text-sm font-medium text-brand-lightGray">Pages per Session</p>
            <p className="text-xl font-bold text-brand-charcoal">{analytics.userEngagement.pagesPerSession}</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-warning-50 rounded-lg inline-block mb-3">
              <TrendingDown size={24} className="text-warning-600" />
            </div>
            <p className="text-sm font-medium text-brand-lightGray">Bounce Rate</p>
            <p className="text-xl font-bold text-brand-charcoal">{formatPercentage(analytics.userEngagement.bounceRate)}</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-success-50 rounded-lg inline-block mb-3">
              <TrendingUp size={24} className="text-success-600" />
            </div>
            <p className="text-sm font-medium text-brand-lightGray">Return Rate</p>
            <p className="text-xl font-bold text-brand-charcoal">{formatPercentage(analytics.userEngagement.returnRate)}</p>
          </div>
        </div>
      </div>

      {/* Top Performing Users */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-brand-charcoal">Top Performing Users</h3>
          <button className="btn btn-secondary flex items-center space-x-2">
            <Download size={16} />
            <span>Export Report</span>
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-lightGray">
            <thead className="bg-primary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Last Active
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-brand-lightGray">
              {analytics.topPerformingUsers.map((user) => (
                <tr key={user.id} className="hover:bg-primary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <Users size={20} className="text-brand-orange" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-brand-charcoal">{user.name}</div>
                        <div className="text-sm text-brand-lightGray">{user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      user.plan === 'Premium' ? 'bg-primary-100 text-primary-800' :
                      user.plan === 'Enterprise' ? 'bg-purple-100 text-purple-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-charcoal">
                    {user.totalDownloads.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-charcoal">
                    {user.totalViews.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-charcoal">
                    {formatCurrency(user.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-lightGray">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {new Date(user.lastActive).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-brand-orange hover:text-primary-600" title="View user details">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserAnalytics
