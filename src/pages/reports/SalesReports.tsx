import { useState, useEffect } from 'react'
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  ShoppingCart, 
  Users, 
  Calendar,
  BarChart3,
  PieChart,
  Activity,
  Filter,
  Download,
  Eye,
  FileText,
  CreditCard,
  TrendingUpIcon
} from 'lucide-react'

interface SalesData {
  totalRevenue: number
  totalOrders: number
  averageOrderValue: number
  revenueGrowth: number
  orderGrowth: number
  topSellingPlans: Array<{
    id: string
    title: string
    category: string
    sales: number
    revenue: number
    growth: number
  }>
  revenueByMonth: Array<{
    month: string
    revenue: number
    orders: number
    growth: number
  }>
  revenueByCategory: Array<{
    category: string
    revenue: number
    percentage: number
    orders: number
  }>
  paymentMethodStats: Array<{
    method: string
    orders: number
    revenue: number
    percentage: number
  }>
  customerSegments: Array<{
    segment: string
    customers: number
    revenue: number
    averageOrderValue: number
  }>
}

const SalesReports = () => {
  const [salesData, setSalesData] = useState<SalesData | null>(null)
  const [loading, setLoading] = useState(true)
  const [dateRange, setDateRange] = useState('30d')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMetric, setSelectedMetric] = useState('revenue')

  useEffect(() => {
    fetchSalesData()
  }, [dateRange])

  const fetchSalesData = async () => {
    try {
      setLoading(true)
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      const mockSalesData: SalesData = {
        totalRevenue: 45678.50,
        totalOrders: 234,
        averageOrderValue: 195.21,
        revenueGrowth: 15.8,
        orderGrowth: 12.3,
        topSellingPlans: [
          {
            id: '1',
            title: 'Modern 3-Bedroom House',
            category: 'Residential',
            sales: 45,
            revenue: 6750.00,
            growth: 23.5
          },
          {
            id: '2',
            title: 'Commercial Office Complex',
            category: 'Commercial',
            sales: 32,
            revenue: 9600.00,
            growth: 18.2
          },
          {
            id: '3',
            title: 'Luxury Villa Design',
            category: 'Luxury',
            sales: 28,
            revenue: 14000.00,
            growth: 31.7
          },
          {
            id: '4',
            title: 'Apartment Building Plans',
            category: 'Residential',
            sales: 25,
            revenue: 5000.00,
            growth: 15.4
          },
          {
            id: '5',
            title: 'Industrial Warehouse',
            category: 'Industrial',
            sales: 22,
            revenue: 8800.00,
            growth: 12.8
          }
        ],
        revenueByMonth: [
          { month: 'Jan', revenue: 12500.00, orders: 67, growth: 8.5 },
          { month: 'Feb', revenue: 13800.00, orders: 74, growth: 10.4 },
          { month: 'Mar', revenue: 15200.00, orders: 82, growth: 10.1 },
          { month: 'Apr', revenue: 16800.00, orders: 89, growth: 10.5 },
          { month: 'May', revenue: 18500.00, orders: 98, growth: 10.1 },
          { month: 'Jun', revenue: 20100.00, orders: 108, growth: 8.6 }
        ],
        revenueByCategory: [
          { category: 'Residential', revenue: 18750.00, percentage: 41.1, orders: 120 },
          { category: 'Commercial', revenue: 15600.00, percentage: 34.2, orders: 78 },
          { category: 'Luxury', revenue: 8500.00, percentage: 18.6, orders: 35 },
          { category: 'Industrial', revenue: 2828.50, percentage: 6.1, orders: 1 }
        ],
        paymentMethodStats: [
          { method: 'Credit Card', orders: 156, revenue: 31200.00, percentage: 68.4 },
          { method: 'Mobile Money', orders: 45, revenue: 8900.00, percentage: 19.5 },
          { method: 'Bank Transfer', orders: 33, revenue: 5578.50, percentage: 12.1 }
        ],
        customerSegments: [
          { segment: 'New Customers', customers: 89, revenue: 17800.00, averageOrderValue: 200.00 },
          { segment: 'Returning Customers', customers: 98, revenue: 19600.00, averageOrderValue: 200.00 },
          { segment: 'Premium Customers', customers: 47, revenue: 8278.50, averageOrderValue: 176.14 }
        ]
      }
      
      setSalesData(mockSalesData)
    } catch (error) {
      console.error('Error fetching sales data:', error)
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
      </div>
    )
  }

  if (!salesData) {
    return (
      <div className="text-center py-12">
        <BarChart3 size={48} className="text-brand-lightGray mx-auto mb-4" />
        <h3 className="text-lg font-medium text-brand-charcoal mb-2">No sales data available</h3>
        <p className="text-brand-lightGray">Unable to load sales reports at this time.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal">Sales Reports</h1>
          <p className="text-brand-lightGray">Comprehensive sales analytics and performance insights</p>
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
              <p className="text-sm font-medium text-brand-lightGray">Total Revenue</p>
              <p className="text-2xl font-bold text-brand-charcoal">{formatCurrency(salesData.totalRevenue)}</p>
            </div>
            <div className="p-3 bg-primary-50 rounded-lg">
              <DollarSign size={24} className="text-brand-orange" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp size={16} className="text-success-600 mr-1" />
            <span className="text-sm text-success-600">{formatPercentage(salesData.revenueGrowth)}</span>
            <span className="text-sm text-brand-lightGray ml-1">vs last period</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Total Orders</p>
              <p className="text-2xl font-bold text-brand-charcoal">{formatNumber(salesData.totalOrders)}</p>
            </div>
            <div className="p-3 bg-blue-50 rounded-lg">
              <ShoppingCart size={24} className="text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <TrendingUp size={16} className="text-success-600 mr-1" />
            <span className="text-sm text-success-600">{formatPercentage(salesData.orderGrowth)}</span>
            <span className="text-sm text-brand-lightGray ml-1">vs last period</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Average Order Value</p>
              <p className="text-2xl font-bold text-brand-charcoal">{formatCurrency(salesData.averageOrderValue)}</p>
            </div>
            <div className="p-3 bg-success-50 rounded-lg">
              <TrendingUpIcon size={24} className="text-success-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-sm text-brand-lightGray">Per order</span>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-brand-lightGray">Active Customers</p>
              <p className="text-2xl font-bold text-brand-charcoal">{formatNumber(salesData.customerSegments.reduce((sum, seg) => sum + seg.customers, 0))}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-lg">
              <Users size={24} className="text-purple-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center">
            <span className="text-sm text-brand-lightGray">This period</span>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Trend Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-brand-charcoal">Revenue Trend</h3>
            <Filter size={16} className="text-brand-lightGray" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <BarChart3 size={48} className="text-brand-lightGray mx-auto mb-2" />
              <p className="text-sm text-brand-lightGray">Chart integration with Recharts/Chart.js</p>
              <p className="text-xs text-brand-lightGray">Monthly revenue growth visualization</p>
            </div>
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-brand-charcoal">Revenue by Category</h3>
            <PieChart size={16} className="text-brand-lightGray" />
          </div>
          <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <PieChart size={48} className="text-brand-lightGray mx-auto mb-2" />
              <p className="text-sm text-brand-lightGray">Chart integration with Recharts/Chart.js</p>
              <p className="text-xs text-brand-lightGray">Category revenue breakdown</p>
            </div>
          </div>
        </div>
      </div>

      {/* Top Selling Plans */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-brand-charcoal">Top Selling Plans</h3>
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
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Sales
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Growth
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-brand-lightGray">
              {salesData.topSellingPlans.map((plan) => (
                <tr key={plan.id} className="hover:bg-primary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-brand-charcoal">{plan.title}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                      {plan.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-charcoal">
                    {formatNumber(plan.sales)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-charcoal">
                    {formatCurrency(plan.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <TrendingUp size={16} className="text-success-600 mr-1" />
                      <span className="text-sm text-success-600">{formatPercentage(plan.growth)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-brand-orange hover:text-primary-600" title="View plan details">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Method Statistics */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <h3 className="text-lg font-semibold text-brand-charcoal mb-4">Payment Method Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {salesData.paymentMethodStats.map((method) => (
            <div key={method.method} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="p-3 bg-primary-50 rounded-lg inline-block mb-3">
                <CreditCard size={24} className="text-brand-orange" />
              </div>
              <p className="text-sm font-medium text-brand-lightGray">{method.method}</p>
              <p className="text-xl font-bold text-brand-charcoal">{formatNumber(method.orders)} orders</p>
              <p className="text-lg text-brand-charcoal">{formatCurrency(method.revenue)}</p>
              <p className="text-sm text-brand-lightGray">{formatPercentage(method.percentage)} of total</p>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Segments */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <h3 className="text-lg font-semibold text-brand-charcoal mb-4">Customer Segments</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {salesData.customerSegments.map((segment) => (
            <div key={segment.segment} className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="p-3 bg-success-50 rounded-lg inline-block mb-3">
                <Users size={24} className="text-success-600" />
              </div>
              <p className="text-sm font-medium text-brand-lightGray">{segment.segment}</p>
              <p className="text-xl font-bold text-brand-charcoal">{formatNumber(segment.customers)} customers</p>
              <p className="text-lg text-brand-charcoal">{formatCurrency(segment.revenue)}</p>
              <p className="text-sm text-brand-lightGray">Avg: {formatCurrency(segment.averageOrderValue)}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Revenue by Category Details */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <h3 className="text-lg font-semibold text-brand-charcoal mb-4">Revenue by Category</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-lightGray">
            <thead className="bg-primary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Percentage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Orders
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-brand-lightGray">
              {salesData.revenueByCategory.map((category) => (
                <tr key={category.category} className="hover:bg-primary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-brand-charcoal">{category.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-brand-charcoal">
                    {formatCurrency(category.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-charcoal">
                    {formatPercentage(category.percentage)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-charcoal">
                    {formatNumber(category.orders)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-brand-orange hover:text-primary-600" title="View category details">
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

export default SalesReports
