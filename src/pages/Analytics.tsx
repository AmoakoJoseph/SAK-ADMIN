import { useState } from 'react'
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Users,
  FileText,
  ShoppingCart,
  Calendar,
  Filter
} from 'lucide-react'
import PDFExporter from '../components/analytics/PDFExporter'
import toast from 'react-hot-toast'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend
} from 'recharts'

const Analytics = () => {
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d')
  const [isExporting, setIsExporting] = useState(false)

  // Mock data - replace with real API calls
  const revenueData = [
    { month: 'Jan', revenue: 12000, orders: 45 },
    { month: 'Feb', revenue: 15000, orders: 52 },
    { month: 'Mar', revenue: 18000, orders: 61 },
    { month: 'Apr', revenue: 22000, orders: 73 },
    { month: 'May', revenue: 25000, orders: 85 },
    { month: 'Jun', revenue: 28000, orders: 92 },
  ]

  const planPerformanceData = [
    { name: 'Residential', value: 45, color: '#3b82f6' },
    { name: 'Commercial', value: 30, color: '#10b981' },
    { name: 'Industrial', value: 15, color: '#f59e0b' },
    { name: 'Landscape', value: 10, color: '#ef4444' },
  ]

  const userGrowthData = [
    { month: 'Jan', users: 120, newUsers: 25 },
    { month: 'Feb', users: 145, newUsers: 30 },
    { month: 'Mar', users: 175, newUsers: 35 },
    { month: 'Apr', users: 210, newUsers: 40 },
    { month: 'May', users: 250, newUsers: 45 },
    { month: 'Jun', users: 295, newUsers: 50 },
  ]

  const topPlansData = [
    { name: 'Modern Villa Design', downloads: 156, revenue: 46800 },
    { name: 'Commercial Office Complex', downloads: 89, revenue: 53400 },
    { name: 'Sustainable Home', downloads: 67, revenue: 26800 },
    { name: 'Luxury Apartment', downloads: 45, revenue: 18000 },
    { name: 'Industrial Warehouse', downloads: 34, revenue: 20400 },
  ]

  const metrics = [
    {
      title: 'Total Revenue',
      value: '$156,000',
      change: 12.5,
      trend: 'up' as const,
      icon: DollarSign,
    },
    {
      title: 'Total Orders',
      value: '408',
      change: 8.7,
      trend: 'up' as const,
      icon: ShoppingCart,
    },
    {
      title: 'Active Users',
      value: '2,341',
      change: 15.2,
      trend: 'up' as const,
      icon: Users,
    },
    {
      title: 'Total Plans',
      value: '1,234',
      change: -2.3,
      trend: 'down' as const,
      icon: FileText,
    },
  ]

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <p className="text-gray-600">Business intelligence and insights</p>
        </div>
        <div className="flex items-center space-x-4">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="input"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <PDFExporter
            data={{
              revenueData,
              planPerformanceData,
              userGrowthData,
              topPlansData,
              metrics
            }}
            timeRange={timeRange}
            onExport={() => {
              setIsExporting(false)
              toast.success('PDF exported successfully!')
            }}
            isExporting={isExporting}
          />
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <div key={metric.title} className="card">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                <div className="flex items-center mt-2">
                  {metric.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 text-success-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-danger-500" />
                  )}
                  <span
                    className={`ml-1 text-sm font-medium ${
                      metric.trend === 'up' ? 'text-success-600' : 'text-danger-600'
                    }`}
                  >
                    {metric.change > 0 ? '+' : ''}{metric.change}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-primary-50 rounded-lg">
                <metric.icon className="w-6 h-6 text-primary-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue & Orders</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="revenue"
                stroke="#3b82f6"
                strokeWidth={2}
                name="Revenue ($)"
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="orders"
                stroke="#10b981"
                strokeWidth={2}
                name="Orders"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Plan Categories */}
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Plan Categories</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={planPerformanceData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {planPerformanceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* User Growth Chart */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">User Growth</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="users" fill="#3b82f6" name="Total Users" />
            <Bar dataKey="newUsers" fill="#10b981" name="New Users" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Performing Plans */}
      <div className="card">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Performing Plans</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Plan Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Downloads</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Performance</th>
              </tr>
            </thead>
            <tbody>
              {topPlansData.map((plan, index) => (
                <tr key={plan.name} className="border-b border-gray-100">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center text-xs font-medium mr-3">
                        {index + 1}
                      </span>
                      <span className="font-medium text-gray-900">{plan.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{plan.downloads}</td>
                  <td className="py-3 px-4 text-sm font-medium">${plan.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${(plan.downloads / topPlansData[0].downloads) * 100}%` }}
                      ></div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Insights</h3>
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="w-2 h-2 bg-success-500 rounded-full mt-2 mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Revenue Growth</p>
                <p className="text-sm text-gray-600">Revenue increased by 12.5% compared to last month</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">User Engagement</p>
                <p className="text-sm text-gray-600">Active users grew by 15.2% this month</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-2 h-2 bg-warning-500 rounded-full mt-2 mr-3"></div>
              <div>
                <p className="text-sm font-medium text-gray-900">Plan Performance</p>
                <p className="text-sm text-gray-600">Residential plans are the most popular category</p>
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <FileText className="w-5 h-5 text-primary-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">Upload New Plan</p>
                  <p className="text-xs text-gray-500">Add a new building plan to the marketplace</p>
                </div>
              </div>
            </button>
            <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors">
              <div className="flex items-center">
                <Users className="w-5 h-5 text-success-600 mr-3" />
                <div>
                  <p className="text-sm font-medium text-gray-900">View User Reports</p>
                  <p className="text-xs text-gray-500">Analyze user behavior and patterns</p>
                </div>
              </div>
            </button>
                         <button 
               onClick={() => {
                 setIsExporting(true)
                 // Trigger PDF export
                 const pdfExporter = document.querySelector('[data-pdf-exporter]') as HTMLButtonElement
                 if (pdfExporter) {
                   pdfExporter.click()
                 }
               }}
               disabled={isExporting}
               className="w-full text-left p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
             >
               <div className="flex items-center">
                 <DollarSign className="w-5 h-5 text-warning-600 mr-3" />
                 <div>
                   <p className="text-sm font-medium text-gray-900">Export Analytics PDF</p>
                   <p className="text-xs text-gray-500">Download comprehensive analytics report</p>
                 </div>
               </div>
             </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Analytics 