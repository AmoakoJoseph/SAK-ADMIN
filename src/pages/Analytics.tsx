import React, { useState } from 'react'
import { 
  Card, 
  Button, 
  Row, 
  Col, 
  Statistic, 
  Select, 
  DatePicker, 
  Space,
  Table,
  Tabs,
  Progress,
  List,
  Avatar,
  Tag,
  Badge,
  Modal,
  Form,
  Input,
  Checkbox,
  message,
  Tooltip,
  Divider
} from 'antd'
import { 
  BarChartOutlined, 
  LineChartOutlined,
  PieChartOutlined,
  DownloadOutlined,
  PrinterOutlined,
  EyeOutlined,
  DollarOutlined,
  UserOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  RiseOutlined,
  ArrowDownOutlined,
  CalendarOutlined,
  FilterOutlined,
  ReloadOutlined,
  SettingOutlined
} from '@ant-design/icons'
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
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  Legend
} from 'recharts'

const { Option } = Select
const { RangePicker } = DatePicker


const Analytics: React.FC = () => {
  const [dateRange, setDateRange] = useState<[string, string]>(['2024-01-01', '2024-01-31'])
  const [selectedPeriod, setSelectedPeriod] = useState('30')
  const [reportModalVisible, setReportModalVisible] = useState(false)
  const [form] = Form.useForm()

  // Mock data for charts
  const revenueData = [
    { month: 'Jan', revenue: 125000, orders: 45, users: 120 },
    { month: 'Feb', revenue: 98000, orders: 38, users: 95 },
    { month: 'Mar', revenue: 145000, orders: 52, users: 140 },
    { month: 'Apr', revenue: 132000, orders: 48, users: 125 },
    { month: 'May', revenue: 168000, orders: 62, users: 155 },
    { month: 'Jun', revenue: 189000, orders: 68, users: 175 }
  ]

  const planPerformanceData = [
    { name: 'Modern Villa', sales: 45, revenue: 112500, growth: 12.5 },
    { name: 'Cozy Bungalow', sales: 38, revenue: 68400, growth: 8.3 },
    { name: 'Luxury Townhouse', sales: 32, revenue: 102400, growth: 15.2 },
    { name: 'Rustic Cottage', sales: 28, revenue: 42000, growth: 5.8 },
    { name: 'Farmhouse Design', sales: 22, revenue: 44000, growth: 3.2 }
  ]

  const userActivityData = [
    { name: 'New Registrations', value: 45, color: '#4A90E2' },
    { name: 'Active Users', value: 120, color: '#50C878' },
    { name: 'Returning Users', value: 85, color: '#FF6B6B' },
    { name: 'Inactive Users', value: 30, color: '#FFD93D' }
  ]

  const paymentMethodData = [
    { name: 'Mobile Money', value: 65, color: '#4A90E2' },
    { name: 'Bank Transfer', value: 25, color: '#50C878' },
    { name: 'Credit Card', value: 10, color: '#FF6B6B' }
  ]

  const topCustomers = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      totalSpent: 45000,
      orders: 15,
      lastOrder: '2024-01-20',
      status: 'active'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      totalSpent: 38000,
      orders: 12,
      lastOrder: '2024-01-19',
      status: 'active'
    },
    {
      id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      totalSpent: 32000,
      orders: 8,
      lastOrder: '2024-01-18',
      status: 'active'
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      totalSpent: 28000,
      orders: 10,
      lastOrder: '2024-01-17',
      status: 'inactive'
    }
  ]

  const recentActivity = [
    {
      id: '1',
      action: 'New order placed',
      details: 'Modern Villa Plan - ₵2,500',
      time: '2 hours ago',
      user: 'John Doe',
      type: 'order'
    },
    {
      id: '2',
      action: 'Payment received',
      details: 'Payment of ₵1,800 via Mobile Money',
      time: '4 hours ago',
      user: 'Jane Smith',
      type: 'payment'
    },
    {
      id: '3',
      action: 'New user registered',
      details: 'User: mike.johnson@example.com',
      time: '6 hours ago',
      user: 'System',
      type: 'user'
    },
    {
      id: '4',
      action: 'Plan updated',
      details: 'Luxury Townhouse plan modified',
      time: '8 hours ago',
      user: 'Admin',
      type: 'plan'
    }
  ]

  const getGrowthIcon = (growth: number) => {
    return growth >= 0 ? <RiseOutlined /> : <ArrowDownOutlined />
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'order':
        return <ShoppingCartOutlined style={{ color: '#1890ff' }} />
      case 'payment':
        return <DollarOutlined style={{ color: '#52c41a' }} />
      case 'user':
        return <UserOutlined style={{ color: '#722ed1' }} />
      case 'plan':
        return <FileTextOutlined style={{ color: '#fa8c16' }} />
      default:
        return <FileTextOutlined />
    }
  }

  const [loading, setLoading] = useState(false)

  const handleGenerateReport = async () => {
    try {
      const values = await form.validateFields()
      setLoading(true)
      // Simulate report generation
      await new Promise(resolve => setTimeout(resolve, 2000))
      message.success('Report generated successfully!')
      setReportModalVisible(false)
    } catch (error) {
      message.error('Failed to generate report')
    } finally {
      setLoading(false)
    }
  }

  const customerColumns = [
    {
      title: 'Customer',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-gray-500 text-sm">{record.email}</div>
        </div>
      ),
    },
    {
      title: 'Total Spent',
      dataIndex: 'totalSpent',
      key: 'totalSpent',
      render: (value: number) => `₵${value.toLocaleString()}`,
    },
    {
      title: 'Orders',
      dataIndex: 'orders',
      key: 'orders',
    },
    {
      title: 'Last Order',
      dataIndex: 'lastOrder',
      key: 'lastOrder',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={status === 'active' ? 'green' : 'default'}>
          {status}
        </Tag>
      ),
    },
  ]

  const activityColumns = [
    {
      title: 'Activity',
      dataIndex: 'action',
      key: 'action',
      render: (text: string, record: any) => (
        <div className="flex items-center space-x-2">
          {getActivityIcon(record.type)}
          <span className="font-medium">{text}</span>
        </div>
      ),
    },
    {
      title: 'Details',
      dataIndex: 'details',
      key: 'details',
    },
    {
      title: 'Time',
      dataIndex: 'time',
      key: 'time',
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center">
            <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Analytics & Reports</h1>
            <p className="text-gray-600">Comprehensive business intelligence and reporting</p>
          </div>
          <Space>
            <Button icon={<DownloadOutlined />}>
              Export Data
            </Button>
            <Button icon={<PrinterOutlined />}>
              Print Report
            </Button>
            <Button type="primary" icon={<BarChartOutlined />} onClick={() => setReportModalVisible(true)}>
              Generate Report
            </Button>
          </Space>
        </div>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Select
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              style={{ width: '100%' }}
            >
              <Option value="7">Last 7 Days</Option>
              <Option value="30">Last 30 Days</Option>
              <Option value="90">Last 90 Days</Option>
              <Option value="365">Last Year</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <RangePicker 
              style={{ width: '100%' }}
              onChange={(dates) => {
                if (dates && dates[0] && dates[1]) {
                  setDateRange([dates[0].toISOString(), dates[1].toISOString()])
                }
              }}
            />
          </Col>
          <Col xs={24} sm={12} md={6}>
            <Button icon={<FilterOutlined />} block>
              Apply Filters
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Key Metrics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={3125000}
              prefix="₵"
              valueStyle={{ color: '#f97316' }}
              suffix={
                <span className="text-green-500 text-sm ml-2">
                  <RiseOutlined /> +15.2%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={1247}
              valueStyle={{ color: '#2d3748' }}
              suffix={
                <span className="text-green-500 text-sm ml-2">
                  <RiseOutlined /> +8.3%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Active Users"
              value={2891}
              valueStyle={{ color: '#2d3748' }}
              suffix={
                <span className="text-green-500 text-sm ml-2">
                  <RiseOutlined /> +12.1%
                </span>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Conversion Rate"
              value={4.8}
              valueStyle={{ color: '#2d3748' }}
              suffix={
                <span>
                  <span>%</span>
                  <span className="text-green-500 text-sm ml-2">
                    <RiseOutlined /> +2.1%
                  </span>
                </span>
              }
            />
          </Card>
        </Col>
      </Row>

      {/* Charts Section */}
      <Tabs 
        defaultActiveKey="overview" 
        type="card"
        items={[
          {
            key: 'overview',
            label: 'Overview',
            children: (
              <Row gutter={[16, 16]}>
                <Col xs={24} lg={16}>
                  <Card title="Revenue Trend" className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <RechartsTooltip 
                          formatter={(value: any) => [`₵${value.toLocaleString()}`, 'Revenue']}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#f97316" 
                          fill="#f97316" 
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
                <Col xs={24} lg={8}>
                  <Card title="Payment Methods" className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={paymentMethodData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {paymentMethodData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <RechartsTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </Card>
                </Col>
                <Col xs={24} lg={12}>
                  <Card title="Top Customers">
                    <Table
                      columns={customerColumns}
                      dataSource={topCustomers}
                      rowKey="id"
                      pagination={false}
                      size="small"
                    />
                  </Card>
                </Col>
              </Row>
            )
          },
          {
            key: 'activity',
            label: 'Recent Activity',
            children: (
              <Card title="System Activity">
                <Table
                  columns={activityColumns}
                  dataSource={recentActivity}
                  rowKey="id"
                  pagination={false}
                  size="small"
                />
              </Card>
            )
          }
        ]}
      />

      {/* Report Generation Modal */}
      <Modal
        title="Generate Custom Report"
        open={reportModalVisible}
        onOk={handleGenerateReport}
        onCancel={() => setReportModalVisible(false)}
        width={600}
        okText="Generate Report"
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            reportType: 'revenue',
            includeCharts: true,
            includeTables: true
          }}
        >
          <Form.Item
            name="reportName"
            label="Report Name"
            rules={[{ required: true, message: 'Please enter report name' }]}
          >
            <Input placeholder="Enter report name" />
          </Form.Item>

          <Form.Item
            name="reportType"
            label="Report Type"
            rules={[{ required: true, message: 'Please select report type' }]}
          >
            <Select placeholder="Select report type">
              <Option value="revenue">Revenue Report</Option>
              <Option value="orders">Orders Report</Option>
              <Option value="users">User Analytics Report</Option>
              <Option value="plans">Plan Performance Report</Option>
              <Option value="comprehensive">Comprehensive Report</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="dateRange"
            label="Date Range"
            rules={[{ required: true, message: 'Please select date range' }]}
          >
            <RangePicker style={{ width: '100%' }} />
          </Form.Item>

          <Form.Item
            name="includeCharts"
            label="Include Charts"
            valuePropName="checked"
          >
            <Checkbox>Include visual charts and graphs</Checkbox>
          </Form.Item>

          <Form.Item
            name="includeTables"
            label="Include Tables"
            valuePropName="checked"
          >
            <Checkbox>Include detailed data tables</Checkbox>
          </Form.Item>

          <Form.Item
            name="format"
            label="Export Format"
            rules={[{ required: true, message: 'Please select export format' }]}
          >
            <Select placeholder="Select export format">
              <Option value="pdf">PDF</Option>
              <Option value="excel">Excel</Option>
              <Option value="csv">CSV</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Analytics 
