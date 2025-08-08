import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  FileText, 
  ShoppingCart, 
  DollarSign 
} from 'lucide-react'
import StatCard from '../components/dashboard/StatCard'
import RevenueChart from '../components/dashboard/RevenueChart'
import ActivityFeed from '../components/dashboard/ActivityFeed'

const Dashboard = () => {
  const stats = [
    {
      title: 'Total Plans',
      value: '1,234',
      change: 12.5,
      trend: 'up' as const,
      icon: FileText,
    },
    {
      title: 'Total Orders',
      value: '856',
      change: -2.3,
      trend: 'down' as const,
      icon: ShoppingCart,
    },
    {
      title: 'Total Revenue',
      value: '$45,678',
      change: 8.7,
      trend: 'up' as const,
      icon: DollarSign,
    },
    {
      title: 'Active Users',
      value: '2,341',
      change: 15.2,
      trend: 'up' as const,
      icon: Users,
    },
  ]

  const revenueData = [
    { date: '2024-01', revenue: 12000, orders: 45 },
    { date: '2024-02', revenue: 15000, orders: 52 },
    { date: '2024-03', revenue: 18000, orders: 61 },
    { date: '2024-04', revenue: 22000, orders: 73 },
    { date: '2024-05', revenue: 25000, orders: 85 },
    { date: '2024-06', revenue: 28000, orders: 92 },
  ]

  const activities = [
    {
      id: '1',
      type: 'order',
      message: 'New order #1234 received',
      timestamp: new Date(),
      user: 'John Doe',
    },
    {
      id: '2',
      type: 'plan',
      message: 'New plan "Modern Villa" uploaded',
      timestamp: new Date(Date.now() - 3600000),
      user: 'Admin',
    },
    {
      id: '3',
      type: 'user',
      message: 'New user registration',
      timestamp: new Date(Date.now() - 7200000),
      user: 'Jane Smith',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome to your SAK Admin dashboard</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Charts and Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Overview</h3>
            <RevenueChart data={revenueData} period="monthly" />
          </div>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-1">
          <div className="card">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
            <ActivityFeed activities={activities} onLoadMore={() => {}} loading={false} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard 