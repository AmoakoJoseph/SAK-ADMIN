import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  FileText, 
  Download, 
  Eye,
  DollarSign,
  Users,
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Filter
} from 'lucide-react'

interface PlanAnalytics {
  totalPlans: number
  totalRevenue: number
  totalDownloads: number
  totalViews: number
  categoryDistribution: {
    name: string
    count: number
    revenue: number
    percentage: number
  }[]
  monthlyStats: {
    month: string
    plans: number
    revenue: number
    downloads: number
  }[]
  topPlans: {
    name: string
    downloads: number
    revenue: number
    views: number
    rating: number
  }[]
  performanceMetrics: {
    conversionRate: number
    averageRating: number
    customerSatisfaction: number
    returnRate: number
  }
}

const PlanAnalytics = () => {
  const [analytics, setAnalytics] = useState<PlanAnalytics | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30d')
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    fetchAnalytics()
  }, [dateRange])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      // Mock data - replace with real API calls
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockAnalytics: PlanAnalytics = {
        totalPlans: 156,
        totalRevenue: 125000,
        totalDownloads: 2847,
        totalViews: 15600,
        categoryDistribution: [
          { name: 'Residential', count: 89, revenue: 85000, percentage: 57 },
          { name: 'Commercial', count: 34, revenue: 28000, percentage: 22 },
          { name: 'Industrial', count: 18, revenue: 12000, percentage: 12 },
          { name: 'Landscape', count: 15, revenue: 10000, percentage: 9 }
        ],
        monthlyStats: [
          { month: 'Jan', plans: 12, revenue: 8500, downloads: 180 },
          { month: 'Feb', plans: 15, revenue: 9200, downloads: 220 },
          { month: 'Mar', plans: 18, revenue: 10500, downloads: 280 },
          { month: 'Apr', plans: 14, revenue: 9800, downloads: 240 },
          { month: 'May', plans: 22, revenue: 11200, downloads: 320 },
          { month: 'Jun', plans: 25, revenue: 12500, downloads: 380 }
        ],
        topPlans: [
          { name: 'Modern Villa Design', downloads: 156, revenue: 46800, views: 1247, rating: 4.8 },
          { name: 'Commercial Office Complex', downloads: 89, revenue: 53400, views: 567, rating: 4.6 },
          { name: 'Sustainable Home', downloads: 67, revenue: 26800, views: 890, rating: 4.9 },
          { name: 'Luxury Apartment', downloads: 45, revenue: 18000, views: 456, rating: 4.7 },
          { name: 'Industrial Warehouse', downloads: 34, revenue: 20400, views: 234, rating: 4.5 }
        ],
        performanceMetrics: {
          conversionRate: 12.5,
          averageRating: 4.7,
          customerSatisfaction: 92,
          returnRate: 8.3
        }
      }
      
      setAnalytics(mockAnalytics)
    } catch (error) {
      console.error('Error fetching analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading || !analytics) {
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
          <h1 className="text-2xl font-bold text-brand-charcoal">Plan Analytics</h1>
          <p className="text-brand-lightGray">Comprehensive insights into plan performance and trends</p>
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
              <p className="text-sm font-medium text-brand-lightGray">Total Plans</p>
              <p className="text-2xl font-bold text-brand-charcoal">{analytics.totalPlans}</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <FileText size={24} className="text-brand-orange" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <TrendingUp size={16} className="text-success-600" />
            <span className="text-sm font-medium text-success-600">+12.5%</span>
            <span className="text-sm text-brand-lightGray">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Total Revenue</p>
              <p className="text-2xl font-bold text-brand-charcoal">${analytics.totalRevenue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-success-50 rounded-lg">
              <DollarSign size={24} className="text-success-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <TrendingUp size={16} className="text-success-600" />
            <span className="text-sm font-medium text-success-600">+8.3%</span>
            <span className="text-sm text-brand-lightGray">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Total Downloads</p>
              <p className="text-2xl font-bold text-brand-charcoal">{analytics.totalDownloads.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <Download size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <TrendingUp size={16} className="text-success-600" />
            <span className="text-sm font-medium text-success-600">+15.2%</span>
            <span className="text-sm text-brand-lightGray">vs last period</span>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Total Views</p>
              <p className="text-2xl font-bold text-brand-charcoal">{analytics.totalViews.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Eye size={24} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-4 flex items-center space-x-2">
            <TrendingUp size={16} className="text-success-600" />
            <span className="text-sm font-medium text-success-600">+18.7%</span>
            <span className="text-sm text-brand-lightGray">vs last period</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-lg font-semibold text-brand-charcoal mb-6">Monthly Trends</h3>
          <div className="h-64 flex items-center justify-center bg-primary-50 rounded-lg">
            <div className="text-center">
              <BarChart3 size={48} className="text-brand-lightGray mx-auto mb-2" />
              <p className="text-brand-lightGray">Monthly trends chart</p>
              <p className="text-sm text-brand-lightGray">Integrate with Recharts or Chart.js</p>
            </div>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-lg font-semibold text-brand-charcoal mb-6">Category Distribution</h3>
          <div className="space-y-4 mb-6">
            {analytics.categoryDistribution.map((category, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 rounded-full bg-primary-500"></div>
                  <span className="text-sm font-medium text-brand-charcoal">{category.name}</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-brand-charcoal">{category.count} plans</div>
                  <div className="text-xs text-brand-lightGray">${category.revenue.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
          <div className="h-32 flex items-center justify-center bg-primary-50 rounded-lg">
            <div className="text-center">
              <PieChart size={32} className="text-brand-lightGray mx-auto mb-2" />
              <p className="text-sm text-brand-lightGray">Pie chart visualization</p>
            </div>
          </div>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-sm font-medium text-brand-lightGray mb-2">Conversion Rate</h3>
          <p className="text-2xl font-bold text-brand-charcoal">{analytics.performanceMetrics.conversionRate}%</p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-brand-orange h-2 rounded-full" 
                style={{ width: `${analytics.performanceMetrics.conversionRate}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-sm font-medium text-brand-lightGray mb-2">Average Rating</h3>
          <p className="text-2xl font-bold text-brand-charcoal">{analytics.performanceMetrics.averageRating}/5.0</p>
          <div className="mt-2 flex items-center">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(analytics.performanceMetrics.averageRating)
                    ? 'text-yellow-400'
                    : 'text-gray-300'
                }`}
              >
                ★
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-sm font-medium text-brand-lightGray mb-2">Customer Satisfaction</h3>
          <p className="text-2xl font-bold text-brand-charcoal">{analytics.performanceMetrics.customerSatisfaction}%</p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-success-600 h-2 rounded-full" 
                style={{ width: `${analytics.performanceMetrics.customerSatisfaction}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-sm font-medium text-brand-lightGray mb-2">Return Rate</h3>
          <p className="text-2xl font-bold text-brand-charcoal">{analytics.performanceMetrics.returnRate}%</p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-warning-600 h-2 rounded-full" 
                style={{ width: `${analytics.performanceMetrics.returnRate}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Top Performing Plans */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <h3 className="text-lg font-semibold text-brand-charcoal mb-6">Top Performing Plans</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-lightGray">
            <thead className="bg-primary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Plan Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Downloads
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Views
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Rating
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Performance
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-brand-lightGray">
              {analytics.topPlans.map((plan, index) => (
                <tr key={index} className="hover:bg-primary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-primary-100 text-primary-800 rounded-full flex items-center justify-center text-sm font-medium mr-3">
                        {index + 1}
                      </div>
                      <span className="text-sm font-medium text-brand-charcoal">{plan.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-charcoal">
                    {plan.downloads.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-charcoal">
                    ${plan.revenue.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-charcoal">
                    {plan.views.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(plan.rating)
                              ? 'text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        >
                          ★
                        </div>
                      ))}
                      <span className="ml-2 text-sm text-brand-charcoal">{plan.rating}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-brand-orange h-2 rounded-full" 
                        style={{ 
                          width: `${(plan.downloads / analytics.topPlans[0].downloads) * 100}%` 
                        }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Analytics Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Download Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-lg font-semibold text-brand-charcoal mb-4">Download Trends</h3>
          <div className="h-32 flex items-center justify-center bg-primary-50 rounded-lg">
            <div className="text-center">
              <TrendingUp size={32} className="text-brand-lightGray mx-auto mb-2" />
              <p className="text-sm text-brand-lightGray">Trend chart</p>
            </div>
          </div>
        </div>

        {/* Revenue Analysis */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-lg font-semibold text-brand-charcoal mb-4">Revenue Analysis</h3>
          <div className="h-32 flex items-center justify-center bg-primary-50 rounded-lg">
            <div className="text-center">
              <DollarSign size={32} className="text-brand-lightGray mx-auto mb-2" />
              <p className="text-sm text-brand-lightGray">Revenue chart</p>
            </div>
          </div>
        </div>

        {/* User Engagement */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <h3 className="text-lg font-semibold text-brand-charcoal mb-4">User Engagement</h3>
          <div className="h-32 flex items-center justify-center bg-primary-50 rounded-lg">
            <div className="text-center">
              <Users size={32} className="text-brand-lightGray mx-auto mb-2" />
              <p className="text-sm text-brand-lightGray">Engagement chart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PlanAnalytics
