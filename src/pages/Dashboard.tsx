import React from 'react'
import { Row, Col, Card, Statistic, Table, List, Avatar, Spin } from 'antd'
import { 
  DollarOutlined, 
  ShoppingCartOutlined, 
  UserOutlined, 
  FileTextOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined 
} from '@ant-design/icons'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { useDashboardStats } from '../hooks/useQueries'

const Dashboard: React.FC = () => {
  const { data: dashboardData, isLoading, error } = useDashboardStats();
  
  const stats = dashboardData?.data || {
    totalRevenue: 125000,
    totalOrders: 156,
    totalUsers: 89,
    totalPlans: 24,
    revenueGrowth: 12.5,
    orderGrowth: -2.3,
    userGrowth: 8.7,
    planGrowth: 15.2
  };
  const revenueData = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 },
    { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 },
    { name: 'Jun', value: 2390 },
  ]

  const orderStatusData = [
    { name: 'Completed', value: 400, color: '#52c41a' },
    { name: 'Pending', value: 300, color: '#faad14' },
    { name: 'Cancelled', value: 200, color: '#ff4d4f' },
  ]

  const recentOrders = [
    {
      key: '1',
      customer: 'John Doe',
      plan: 'Modern Villa Plan',
      amount: '₵2,500',
      status: 'Completed',
      date: '2024-01-15',
    },
    {
      key: '2',
      customer: 'Jane Smith',
      plan: 'Bungalow Design',
      amount: '₵1,800',
      status: 'Pending',
      date: '2024-01-14',
    },
    {
      key: '3',
      customer: 'Mike Johnson',
      plan: 'Townhouse Plan',
      amount: '₵3,200',
      status: 'Completed',
      date: '2024-01-13',
    },
  ]

  const systemAlerts = [
    {
      title: 'New plan uploaded',
      description: 'Modern Villa Plan has been uploaded and is pending approval',
      time: '2 hours ago',
    },
    {
      title: 'Payment received',
      description: 'Payment of ₵2,500 received for Villa Plan',
      time: '4 hours ago',
    },
    {
      title: 'User registration',
      description: 'New user registered: john.doe@example.com',
      time: '6 hours ago',
    },
  ]

  const orderColumns = [
    {
      title: 'Customer',
      dataIndex: 'customer',
      key: 'customer',
    },
    {
      title: 'Plan',
      dataIndex: 'plan',
      key: 'plan',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <span className={`px-2 py-1 rounded-full text-xs ${
          status === 'Completed' ? 'bg-green-100 text-green-800' :
          status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {status}
        </span>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome to SAK CONSTRUCTIONS GH Admin Panel</p>
      </div>

      {/* Key Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="Total Revenue"
              value={125000}
              prefix="₵"
              valueStyle={{ color: '#f97316' }}
              suffix={
                <span className="text-green-500 text-sm ml-2">
                  <ArrowUpOutlined /> +12.5%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="Total Orders"
              value={1247}
              valueStyle={{ color: '#2d3748' }}
              suffix={
                <span className="text-green-500 text-sm ml-2">
                  <ArrowUpOutlined /> +8.3%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="Active Users"
              value={2891}
              valueStyle={{ color: '#2d3748' }}
              suffix={
                <span className="text-green-500 text-sm ml-2">
                  <ArrowUpOutlined /> +15.2%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card className="stats-card">
            <Statistic
              title="Plan Downloads"
              value={3456}
              valueStyle={{ color: '#2d3748' }}
              suffix={
                <span className="text-green-500 text-sm ml-2">
                  <ArrowUpOutlined /> +22.1%
                </span>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Revenue Trend (Last 30 Days)" className="h-80">
            <ResponsiveContainer width="100%" height="100%" className="mobile-chart">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#f97316" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Order Status" className="h-80">
            <ResponsiveContainer width="100%" height="100%" className="mobile-chart">
              <PieChart>
                <Pie
                  data={orderStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {orderStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* Recent Activity */}
      <Row gutter={[16, 16]}>
        <Col xs={24} lg={16}>
          <Card title="Recent Orders" className="h-96">
            <Table
              columns={orderColumns}
              dataSource={recentOrders}
              pagination={false}
              size="small"
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="System Alerts" className="h-96">
            <List
              itemLayout="horizontal"
              dataSource={systemAlerts}
              renderItem={(item) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar style={{ backgroundColor: '#f97316' }}>!</Avatar>}
                    title={item.title}
                    description={
                      <div>
                        <p className="text-sm text-gray-600">{item.description}</p>
                        <p className="text-xs text-gray-400 mt-1">{item.time}</p>
                      </div>
                    }
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  )
}

export default Dashboard 
