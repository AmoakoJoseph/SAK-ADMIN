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
  Eye,
  FileText,
  Shield,
  Clock,
  Star
} from 'lucide-react'

interface UserReportData {
  totalUsers: number
  activeUsers: number
  newUsersThisMonth: number
  userGrowthRate: number
  userRetentionRate: number
  averageUserLifetime: number
  userSegments: Array<{
    segment: string
    count: number
    percentage: number
    revenue: number
    averageOrderValue: number
  }>
  userActivityByMonth: Array<{
    month: string
    newUsers: number
    activeUsers: number
    churnedUsers: number
  }>
  topPerformingUsers: Array<{
    id: string
    name: string
    email: string
    plan: string
    joinDate: string
    totalOrders: number
    totalSpent: number
    lastActive: string
    status: string
  }>
  userEngagement: {
    averageSessionDuration: number
    pagesPerSession: number
    bounceRate: number
    returnRate: number
    averageTimeOnSite: number
  }
  userSatisfaction: {
    averageRating: number
    totalReviews: number
    positiveReviews: number
    negativeReviews: number
    satisfactionScore: number
  }
  userBehavior: {
    mostPopularPlans: Array<{
      plan: string
      category: string
      userCount: number
      percentage: number
    }>
    averagePlanDownloads: number
    repeatPurchaseRate: number
    referralRate: number
  }
}

const UserReports = () => {
  const [userData, setUserData] = useState<UserReportData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30d')
  const [selectedSegment, setSelectedSegment] = useState('all')
  const [selectedMetric, setSelectedMetric] = useState('users')

  useEffect(() => {
    fetchUserData()
  }, [dateRange])

  const fetchUserData = async () => {
    try {
      setLoading(true)
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockUserData: UserReportData = {
        totalUsers: 1247,
        activeUsers: 892,
        newUsersThisMonth: 156,
        userGrowthRate: 12.5,
        userRetentionRate: 78.3,
        averageUserLifetime: 18.5,
        userSegments: [
          { segment: 'New Users', count: 156, percentage: 12.5, revenue: 23400.00, averageOrderValue: 150.00 },
          { segment: 'Active Users', count: 892, percentage: 71.5, revenue: 156800.00, averageOrderValue: 175.78 },
          { segment: 'Premium Users', count: 234, percentage: 18.8, revenue: 46800.00, averageOrderValue: 200.00 },
          { segment: 'Inactive Users', count: 355, percentage: 28.5, revenue: 0.00, averageOrderValue: 0.00 }
        ],
        userActivityByMonth: [
          { month: 'Jan', newUsers: 89, activeUsers: 234, churnedUsers: 12 },
          { month: 'Feb', newUsers: 92, activeUsers: 245, churnedUsers: 8 },
          { month: 'Mar', newUsers: 78, activeUsers: 267, churnedUsers: 15 },
          { month: 'Apr', newUsers: 103, activeUsers: 289, churnedUsers: 11 },
          { month: 'May', newUsers: 134, activeUsers: 312, churnedUsers: 9 },
          { month: 'Jun', newUsers: 156, activeUsers: 345, churnedUsers: 7 }
        ],
        topPerformingUsers: [
          {
            id: '1',
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            plan: 'Premium',
            joinDate: '2023-03-15T10:30:00Z',
            totalOrders: 45,
            totalSpent: 6750.00,
            lastActive: '2024-01-15T10:30:00Z',
            status: 'Active'
          },
          {
            id: '2',
            name: 'David Wilson',
            email: 'david.wilson@example.com',
            plan: 'Enterprise',
            joinDate: '2023-02-20T14:20:00Z',
            totalOrders: 38,
            totalSpent: 11400.00,
            lastActive: '2024-01-14T14:20:00Z',
            status: 'Active'
          },
          {
            id: '3',
            name: 'Sarah Brown',
            email: 'sarah.brown@example.com',
            plan: 'Basic',
            joinDate: '2023-05-10T09:15:00Z',
            totalOrders: 32,
            totalSpent: 6400.00,
            lastActive: '2024-01-13T09:15:00Z',
            status: 'Active'
          },
          {
            id: '4',
            name: 'Michael Chen',
            email: 'michael.chen@example.com',
            plan: 'Premium',
            joinDate: '2023-07-22T16:45:00Z',
            totalOrders: 28,
            totalSpent: 4200.00,
            lastActive: '2024-01-12T16:45:00Z',
            status: 'Active'
          },
          {
            id: '5',
            name: 'Emily Davis',
            email: 'emily.davis@example.com',
            plan: 'Basic',
            joinDate: '2023-09-05T11:30:00Z',
            totalOrders: 25,
            totalSpent: 3750.00,
            lastActive: '2024-01-11T11:30:00Z',
            status: 'Active'
          }
        ],
        userEngagement: {
          averageSessionDuration: 8.5,
          pagesPerSession: 4.2,
          bounceRate: 23.4,
          returnRate: 67.8,
          averageTimeOnSite: 12.3
        },
        userSatisfaction: {
          averageRating: 4.6,
          totalReviews: 456,
          positiveReviews: 398,
          negativeReviews: 58,
          satisfactionScore: 87.3
        },
        userBehavior: {
          mostPopularPlans: [
            { plan: 'Modern 3-Bedroom House', category: 'Residential', userCount: 234, percentage: 18.8 },
            { plan: 'Commercial Office Complex', category: 'Commercial', userCount: 189, percentage: 15.2 },
            { plan: 'Luxury Villa Design', category: 'Luxury', userCount: 156, percentage: 12.5 },
            { plan: 'Apartment Building Plans', category: 'Residential', userCount: 134, percentage: 10.7 },
            { plan: 'Industrial Warehouse', category: 'Industrial', userCount: 98, percentage: 7.9 }
          ],
          averagePlanDownloads: 3.2,
          repeatPurchaseRate: 45.6,
          referralRate: 23.4
        }
      }
      
      setUserData(mockUserData)
    } catch (error) {
      console.error('Error fetching user data:', error)
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

  const formatNumber = (value: number) => {
    return value.toLocaleString()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
      </div>
    )
  }

  if (!userData) {
    return (
      <div className="text-center py-12">
        <Users size={48} className="text-brand-lightGray mx-auto mb-4" />
        <h3 className="text-lg font-medium text-brand-charcoal mb-2">No user data available</h3>
        <p className="text-brand-lightGray">Unable to load user reports at this time.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal">User Reports</h1>
          <p className="text-brand-lightGray">Comprehensive user analytics and behavior insights</p>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Total Users</p>
              <p className="text-2xl font-bold text-brand-charcoal">{formatNumber(userData.totalUsers)}</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <Users size={24} className="text-brand-orange" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp size={16} className="text-success-600 mr-1" />
            <span className="text-sm text-success-600">{formatPercentage(userData.userGrowthRate)}</span>
            <span className="text-sm text-brand-lightGray ml-1">vs last period</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Active Users</p>
              <p className="text-2xl font-bold text-brand-charcoal">{formatNumber(userData.activeUsers)}</p>
            </div>
            <div className="p-3 bg-success-50 rounded-lg">
              <UserCheck size={24} className="text-success-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-sm text-brand-lightGray">This period</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">New This Month</p>
              <p className="text-2xl font-bold text-brand-charcoal">{formatNumber(userData.newUsersThisMonth)}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <UserPlus size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-sm text-brand-lightGray">New registrations</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Retention Rate</p>
              <p className="text-2xl font-bold text-brand-charcoal">{formatPercentage(userData.userRetentionRate)}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Shield size={24} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-sm text-brand-lightGray">User retention</span>
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
              <p className="text-xs text-brand-lightGray">Monthly user growth and churn</p>
            </div>
          </div>
        </div>

        {/* User Segments Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-brand-charcoal">User Segments</h3>
            <PieChart size={16} className="text-brand-lightGray" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart size={48} className="text-brand-lightGray mx-auto mb-2" />
              <p className="text-sm text-brand-lightGray">Chart integration with Recharts/Chart.js</p>
              <p className="text-xs text-brand-lightGray">User segment distribution</p>
            </div>
          </div>
        </div>
      </div>

      {/* User Engagement Metrics */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <h3 className="text-lg font-semibold text-brand-charcoal mb-4">User Engagement Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          <div className="text-center">
            <div className="p-3 bg-primary-50 rounded-lg inline-block mb-3">
              <Activity size={24} className="text-brand-orange" />
            </div>
            <p className="text-sm font-medium text-brand-lightGray">Avg. Session Duration</p>
            <p className="text-xl font-bold text-brand-charcoal">{userData.userEngagement.averageSessionDuration}m</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-blue-50 rounded-lg inline-block mb-3">
              <BarChart3 size={24} className="text-blue-600" />
            </div>
            <p className="text-sm font-medium text-brand-lightGray">Pages per Session</p>
            <p className="text-xl font-bold text-brand-charcoal">{userData.userEngagement.pagesPerSession}</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-warning-50 rounded-lg inline-block mb-3">
              <TrendingDown size={24} className="text-warning-600" />
            </div>
            <p className="text-sm font-medium text-brand-lightGray">Bounce Rate</p>
            <p className="text-xl font-bold text-brand-charcoal">{formatPercentage(userData.userEngagement.bounceRate)}</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-success-50 rounded-lg inline-block mb-3">
              <TrendingUp size={24} className="text-success-600" />
            </div>
            <p className="text-sm font-medium text-brand-lightGray">Return Rate</p>
            <p className="text-xl font-bold text-brand-charcoal">{formatPercentage(userData.userEngagement.returnRate)}</p>
          </div>

          <div className="text-center">
            <div className="p-3 bg-purple-50 rounded-lg inline-block mb-3">
              <Clock size={24} className="text-purple-600" />
            </div>
            <p className="text-sm font-medium text-brand-lightGray">Time on Site</p>
            <p className="text-xl font-bold text-brand-charcoal">{userData.userEngagement.averageTimeOnSite}m</p>
          </div>
        </div>
      </div>

      {/* User Satisfaction */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <h3 className="text-lg font-semibold text-brand-charcoal mb-4">User Satisfaction</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="p-3 bg-yellow-50 rounded-lg inline-block mb-3">
              <Star size={24} className="text-yellow-600" />
            </div>
            <p className="text-sm font-medium text-brand-lightGray">Average Rating</p>
            <p className="text-2xl font-bold text-brand-charcoal">{userData.userSatisfaction.averageRating}/5.0</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-blue-50 rounded-lg inline-block mb-3">
              <FileText size={24} className="text-blue-600" />
            </div>
            <p className="text-sm font-medium text-brand-lightGray">Total Reviews</p>
            <p className="text-2xl font-bold text-brand-charcoal">{formatNumber(userData.userSatisfaction.totalReviews)}</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-success-50 rounded-lg inline-block mb-3">
              <TrendingUp size={24} className="text-success-600" />
            </div>
            <p className="text-sm font-medium text-brand-lightGray">Positive Reviews</p>
            <p className="text-2xl font-bold text-brand-charcoal">{formatNumber(userData.userSatisfaction.positiveReviews)}</p>
          </div>
          
          <div className="text-center">
            <div className="p-3 bg-primary-50 rounded-lg inline-block mb-3">
              <Activity size={24} className="text-brand-orange" />
            </div>
            <p className="text-sm font-medium text-brand-lightGray">Satisfaction Score</p>
            <p className="text-2xl font-bold text-brand-charcoal">{formatPercentage(userData.userSatisfaction.satisfactionScore)}</p>
          </div>
        </div>
      </div>

      {/* Top Performing Users */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-brand-charcoal">Top Performing Users</h3>
          <button className="btn btn-secondary flex items-center space-x-2">
            <Download size={16} />
            <span>Export List</span>
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
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Total Spent
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
              {userData.topPerformingUsers.map((user) => (
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
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-lightGray">
                    {formatDate(user.joinDate)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-charcoal">
                    {formatNumber(user.totalOrders)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-charcoal">
                    {formatCurrency(user.totalSpent)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-lightGray">
                    {formatDate(user.lastActive)}
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

      {/* User Behavior Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <h3 className="text-lg font-semibold text-brand-charcoal mb-4">User Behavior Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-md font-medium text-brand-charcoal mb-3">Most Popular Plans</h4>
            <div className="space-y-3">
              {userData.userBehavior.mostPopularPlans.map((plan, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-brand-charcoal">{plan.plan}</p>
                    <p className="text-xs text-brand-lightGray">{plan.category}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-brand-charcoal">{formatNumber(plan.userCount)} users</p>
                    <p className="text-xs text-brand-lightGray">{formatPercentage(plan.percentage)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h4 className="text-md font-medium text-brand-charcoal mb-3">Behavior Metrics</h4>
            <div className="space-y-4">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-brand-lightGray">Average Plan Downloads</p>
                <p className="text-2xl font-bold text-brand-charcoal">{userData.userBehavior.averagePlanDownloads}</p>
                <p className="text-xs text-brand-lightGray">per user</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-brand-lightGray">Repeat Purchase Rate</p>
                <p className="text-2xl font-bold text-brand-charcoal">{formatPercentage(userData.userBehavior.repeatPurchaseRate)}</p>
                <p className="text-xs text-brand-lightGray">of users make repeat purchases</p>
              </div>
              
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-sm font-medium text-brand-lightGray">Referral Rate</p>
                <p className="text-2xl font-bold text-brand-charcoal">{formatPercentage(userData.userBehavior.referralRate)}</p>
                <p className="text-xs text-brand-lightGray">of users refer others</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserReports
