import React, { useState } from 'react'
import { 
  Card, 
  Button, 
  Table, 
  Form, 
  Input, 
  Select, 
  message, 
  Modal, 
  Space, 
  Tag, 
  Row, 
  Col, 
  Typography, 
  Divider,
  Tabs,
  List,
  Badge,
  Tooltip,
  Popconfirm,
  Alert,
  Statistic,
  Switch,
  Tree,
  Checkbox,
  DatePicker,
  TimePicker,
  InputNumber,
  Descriptions,
  Timeline
} from 'antd'
import { 
  SecurityScanOutlined,
  UserOutlined,
  LockOutlined,
  SafetyOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  FilterOutlined,
  SettingOutlined,
  KeyOutlined,

  AuditOutlined,
  GlobalOutlined,
  MobileOutlined,
  DesktopOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  StopOutlined,
  WarningOutlined,
  InfoCircleOutlined,
  TeamOutlined,
  FileProtectOutlined,
  DatabaseOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography
const { Option } = Select
const { TextArea } = Input
const { RangePicker } = DatePicker

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  status: 'active' | 'inactive'
  createdAt: string
  lastModified: string
}

interface AuditLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  ipAddress: string
  userAgent: string
  timestamp: string
  status: 'success' | 'failed' | 'warning'
  details: string
}

interface SecurityEvent {
  id: string
  type: 'login_attempt' | 'permission_denied' | 'suspicious_activity' | 'system_alert'
  severity: 'low' | 'medium' | 'high' | 'critical'
  title: string
  description: string
  timestamp: string
  status: 'open' | 'investigating' | 'resolved' | 'false_positive'
  ipAddress?: string
  userId?: string
}

interface IPWhitelist {
  id: string
  ipAddress: string
  description: string
  addedBy: string
  addedAt: string
  status: 'active' | 'inactive'
  expiresAt?: string
}

const Security: React.FC = () => {
  const [activeTab, setActiveTab] = useState('roles')
  const [roleModalVisible, setRoleModalVisible] = useState(false)
  const [ipModalVisible, setIpModalVisible] = useState(false)
  const [selectedRole, setSelectedRole] = useState<Role | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<SecurityEvent | null>(null)
  const [saving, setSaving] = useState(false)
  const [form] = Form.useForm()
  const [ipForm] = Form.useForm()

  // Mock data
  const mockRoles: Role[] = [
    {
      id: '1',
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      permissions: ['all'],
      userCount: 2,
      status: 'active',
      createdAt: '2024-01-01 00:00:00',
      lastModified: '2024-01-20 14:30:00'
    },
    {
      id: '2',
      name: 'Admin',
      description: 'Administrative access to most features',
      permissions: ['plans:read', 'plans:write', 'users:read', 'users:write', 'orders:read', 'orders:write', 'analytics:read'],
      userCount: 5,
      status: 'active',
      createdAt: '2024-01-01 00:00:00',
      lastModified: '2024-01-19 10:15:00'
    },
    {
      id: '3',
      name: 'Content Manager',
      description: 'Manage plans and content',
      permissions: ['plans:read', 'plans:write', 'files:read', 'files:write'],
      userCount: 8,
      status: 'active',
      createdAt: '2024-01-01 00:00:00',
      lastModified: '2024-01-18 16:45:00'
    },
    {
      id: '4',
      name: 'Order Processor',
      description: 'Process orders and payments',
      permissions: ['orders:read', 'orders:write', 'users:read'],
      userCount: 12,
      status: 'active',
      createdAt: '2024-01-01 00:00:00',
      lastModified: '2024-01-17 09:30:00'
    }
  ]

  const mockAuditLogs: AuditLog[] = [
    {
      id: '1',
      userId: 'user1',
      userName: 'John Doe',
      action: 'LOGIN',
      resource: 'Authentication',
      ipAddress: '192.168.1.100',
      userAgent: 'Chrome/120.0.0.0 Windows 10',
      timestamp: '2024-01-20 14:30:00',
      status: 'success',
      details: 'Successful login from office network'
    },
    {
      id: '2',
      userId: 'user2',
      userName: 'Jane Smith',
      action: 'CREATE',
      resource: 'Plans',
      ipAddress: '192.168.1.101',
      userAgent: 'Safari/17.0 iPhone iOS 17',
      timestamp: '2024-01-20 13:45:00',
      status: 'success',
      details: 'Created new villa plan: Modern Villa A'
    },
    {
      id: '3',
      userId: 'user3',
      userName: 'Mike Johnson',
      action: 'UPDATE',
      resource: 'Users',
      ipAddress: '203.45.67.89',
      userAgent: 'Firefox/121.0.0.0 MacOS',
      timestamp: '2024-01-20 12:20:00',
      status: 'failed',
      details: 'Permission denied: Insufficient privileges'
    }
  ]

  const mockSecurityEvents: SecurityEvent[] = [
    {
      id: '1',
      type: 'login_attempt',
      severity: 'high',
      title: 'Multiple Failed Login Attempts',
      description: '5 failed login attempts detected from IP 203.45.67.89',
      timestamp: '2024-01-20 15:30:00',
      status: 'investigating',
      ipAddress: '203.45.67.89'
    },
    {
      id: '2',
      type: 'permission_denied',
      severity: 'medium',
      title: 'Unauthorized Access Attempt',
      description: 'User attempted to access admin settings without permission',
      timestamp: '2024-01-20 14:15:00',
      status: 'resolved',
      userId: 'user3'
    },
    {
      id: '3',
      type: 'suspicious_activity',
      severity: 'critical',
      title: 'Unusual File Download Pattern',
      description: 'Large number of file downloads detected from single IP',
      timestamp: '2024-01-20 13:00:00',
      status: 'open',
      ipAddress: '198.51.100.45'
    }
  ]

  const mockIPWhitelist: IPWhitelist[] = [
    {
      id: '1',
      ipAddress: '192.168.1.0/24',
      description: 'Office Network',
      addedBy: 'John Doe',
      addedAt: '2024-01-01 00:00:00',
      status: 'active'
    },
    {
      id: '2',
      ipAddress: '10.0.0.0/8',
      description: 'VPN Network',
      addedBy: 'Jane Smith',
      addedAt: '2024-01-05 10:00:00',
      status: 'active'
    },
    {
      id: '3',
      ipAddress: '172.16.0.0/12',
      description: 'Development Network',
      addedBy: 'Mike Johnson',
      addedAt: '2024-01-10 14:30:00',
      status: 'active',
      expiresAt: '2024-12-31 23:59:59'
    }
  ]

  const securityStats = {
    totalUsers: 156,
    activeSessions: 23,
    failedLogins: 12,
    securityEvents: 8,
    blockedIPs: 3,
    lastScan: '2024-01-20 15:00:00'
  }

  const permissionTree = [
    {
      title: 'Dashboard',
      key: 'dashboard',
      children: [
        { title: 'View Dashboard', key: 'dashboard:read' }
      ]
    },
    {
      title: 'Plans Management',
      key: 'plans',
      children: [
        { title: 'View Plans', key: 'plans:read' },
        { title: 'Create Plans', key: 'plans:create' },
        { title: 'Edit Plans', key: 'plans:write' },
        { title: 'Delete Plans', key: 'plans:delete' },
        { title: 'Approve Plans', key: 'plans:approve' }
      ]
    },
    {
      title: 'Users & Accounts',
      key: 'users',
      children: [
        { title: 'View Users', key: 'users:read' },
        { title: 'Create Users', key: 'users:create' },
        { title: 'Edit Users', key: 'users:write' },
        { title: 'Delete Users', key: 'users:delete' },
        { title: 'Manage Roles', key: 'users:roles' }
      ]
    },
    {
      title: 'Orders & Payments',
      key: 'orders',
      children: [
        { title: 'View Orders', key: 'orders:read' },
        { title: 'Process Orders', key: 'orders:write' },
        { title: 'Refund Orders', key: 'orders:refund' },
        { title: 'View Payments', key: 'payments:read' }
      ]
    },
    {
      title: 'Files & Downloads',
      key: 'files',
      children: [
        { title: 'View Files', key: 'files:read' },
        { title: 'Upload Files', key: 'files:upload' },
        { title: 'Delete Files', key: 'files:delete' },
        { title: 'Manage Downloads', key: 'files:downloads' }
      ]
    },
    {
      title: 'Analytics & Reports',
      key: 'analytics',
      children: [
        { title: 'View Analytics', key: 'analytics:read' },
        { title: 'Export Reports', key: 'analytics:export' },
        { title: 'Custom Reports', key: 'analytics:custom' }
      ]
    },
    {
      title: 'System Settings',
      key: 'settings',
      children: [
        { title: 'View Settings', key: 'settings:read' },
        { title: 'Edit Settings', key: 'settings:write' },
        { title: 'Security Settings', key: 'settings:security' }
      ]
    }
  ]

  const handleSaveRole = async (values: any) => {
    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Role saved successfully!')
      setRoleModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Failed to save role')
    } finally {
      setSaving(false)
    }
  }

  const handleAddIP = async (values: any) => {
    setSaving(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('IP address added to whitelist!')
      setIpModalVisible(false)
      ipForm.resetFields()
    } catch (error) {
      message.error('Failed to add IP address')
    } finally {
      setSaving(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    const severityConfig = {
      low: 'green',
      medium: 'orange',
      high: 'red',
      critical: 'red'
    }
    return severityConfig[severity as keyof typeof severityConfig] || 'default'
  }

  const getStatusColor = (status: string) => {
    const statusConfig = {
      active: 'green',
      inactive: 'red',
      success: 'green',
      failed: 'red',
      warning: 'orange',
      open: 'red',
      investigating: 'orange',
      resolved: 'green',
      false_positive: 'blue'
    }
    return statusConfig[status as keyof typeof statusConfig] || 'default'
  }

  const getEventIcon = (type: string) => {
    const iconConfig = {
      login_attempt: <UserOutlined style={{ color: '#1890ff' }} />,
      permission_denied: <LockOutlined style={{ color: '#ff4d4f' }} />,
      suspicious_activity: <WarningOutlined style={{ color: '#faad14' }} />,
      system_alert: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
    }
    return iconConfig[type as keyof typeof iconConfig] || <InfoCircleOutlined />
  }

  const roleColumns = [
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Role) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Permissions',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (permissions: string[]) => (
        <div>
          {permissions.includes('all') ? (
            <Tag color="red">All Permissions</Tag>
          ) : (
            <div className="space-y-1">
              {permissions.slice(0, 3).map(perm => (
                <Tag key={perm} color="blue" className="text-xs">
                  {perm}
                </Tag>
              ))}
              {permissions.length > 3 && (
                <Tag color="blue" className="text-xs">
                  +{permissions.length - 3} more
                </Tag>
              )}
            </div>
          )}
        </div>
      ),
    },
    {
      title: 'Users',
      dataIndex: 'userCount',
      key: 'userCount',
      render: (count: number) => <Badge count={count} showZero />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Last Modified',
      dataIndex: 'lastModified',
      key: 'lastModified',
      render: (date: string) => new Date(date).toLocaleDateString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Role) => (
        <Space>
          <Tooltip title="Edit Role">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => {
                setSelectedRole(record)
                setRoleModalVisible(true)
              }}
            />
          </Tooltip>
          <Tooltip title="View Permissions">
            <Button type="text" icon={<EyeOutlined />} />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this role?"
            onConfirm={() => message.success(`Deleted role ${record.name}`)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete">
              <Button type="text" icon={<DeleteOutlined />} danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const auditColumns = [
    {
      title: 'User',
      dataIndex: 'userName',
      key: 'userName',
      render: (text: string, record: AuditLog) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">ID: {record.userId}</div>
        </div>
      ),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (action: string) => <Tag color="blue">{action}</Tag>,
    },
    {
      title: 'Resource',
      dataIndex: 'resource',
      key: 'resource',
    },
    {
      title: 'IP Address',
      dataIndex: 'ipAddress',
      key: 'ipAddress',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: AuditLog) => (
        <Space>
          <Tooltip title="View Details">
            <Button type="text" icon={<EyeOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const securityEventColumns = [
    {
      title: 'Event',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: SecurityEvent) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string, record: SecurityEvent) => (
        <div className="flex items-center space-x-1">
          {getEventIcon(type)}
          <Tag color="purple">
            {type.replace('_', ' ').toUpperCase()}
          </Tag>
        </div>
      ),
    },
    {
      title: 'Severity',
      dataIndex: 'severity',
      key: 'severity',
      render: (severity: string) => (
        <Tag color={getSeverityColor(severity)}>
          {severity.toUpperCase()}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Tag color={getStatusColor(status)}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Tag>
      ),
    },
    {
      title: 'Timestamp',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (date: string) => new Date(date).toLocaleString(),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: SecurityEvent) => (
        <Space>
          <Tooltip title="Investigate">
            <Button type="text" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="Resolve">
            <Button type="text" icon={<CheckCircleOutlined />} />
          </Tooltip>
        </Space>
      ),
    },
  ]

  const tabItems = [
    {
      key: 'roles',
      label: 'Roles & Permissions',
      children: (
        <>
          <div className="mb-4">
            <Space>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => {
                  setSelectedRole(null)
                  setRoleModalVisible(true)
                }}
              >
                New Role
              </Button>
              <Button icon={<ReloadOutlined />}>
                Refresh
              </Button>
            </Space>
          </div>

          <Table
            columns={roleColumns}
            dataSource={mockRoles}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} roles`
            }}
          />
        </>
      ),
    },
    {
      key: 'audit',
      label: 'Audit Trail',
      children: (
        <>
          <div className="mb-4">
            <Row gutter={[16, 16]}>
              <Col xs={24} md={8}>
                <Input
                  placeholder="Search audit logs..."
                  prefix={<SearchOutlined />}
                />
              </Col>
              <Col xs={24} md={8}>
                <Select placeholder="Filter by action" style={{ width: '100%' }}>
                  <Option value="all">All Actions</Option>
                  <Option value="login">Login</Option>
                  <Option value="create">Create</Option>
                  <Option value="update">Update</Option>
                  <Option value="delete">Delete</Option>
                </Select>
              </Col>
              <Col xs={24} md={8}>
                <RangePicker style={{ width: '100%' }} />
              </Col>
            </Row>
          </div>

          <Table
            columns={auditColumns}
            dataSource={mockAuditLogs}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} logs`
            }}
          />
        </>
      ),
    },
    {
      key: 'events',
      label: 'Security Events',
      children: (
        <>
          <div className="mb-4">
            <Space>
              <Button icon={<ReloadOutlined />}>
                Refresh
              </Button>
              <Button icon={<SettingOutlined />}>
                Alert Settings
              </Button>
            </Space>
          </div>

          <Table
            columns={securityEventColumns}
            dataSource={mockSecurityEvents}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} events`
            }}
          />
        </>
      ),
    },
    {
      key: 'whitelist',
      label: 'IP Whitelist',
      children: (
        <>
          <div className="mb-4">
            <Space>
              <Button 
                type="primary" 
                icon={<PlusOutlined />}
                onClick={() => setIpModalVisible(true)}
              >
                Add IP Address
              </Button>
              <Button icon={<ReloadOutlined />}>
                Refresh
              </Button>
            </Space>
          </div>

          <Table
            dataSource={mockIPWhitelist}
            rowKey="id"
            columns={[
              {
                title: 'IP Address',
                dataIndex: 'ipAddress',
                key: 'ipAddress',
              },
              {
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
              },
              {
                title: 'Added By',
                dataIndex: 'addedBy',
                key: 'addedBy',
              },
              {
                title: 'Status',
                dataIndex: 'status',
                key: 'status',
                render: (status: string) => (
                  <Tag color={getStatusColor(status)}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </Tag>
                ),
              },
              {
                title: 'Actions',
                key: 'actions',
                render: (text: string, record: IPWhitelist) => (
                  <Space>
                    <Button type="text" icon={<EditOutlined />} />
                    <Popconfirm
                      title="Are you sure you want to remove this IP?"
                      onConfirm={() => message.success(`Removed IP ${record.ipAddress}`)}
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button type="text" icon={<DeleteOutlined />} danger />
                    </Popconfirm>
                  </Space>
                ),
              },
            ]}
          />
        </>
      ),
    },
    {
      key: 'settings',
      label: 'Security Settings',
      children: (
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Card title="Authentication Settings" size="small">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Two-Factor Authentication</div>
                    <div className="text-gray-500 text-sm">Require 2FA for all users</div>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Session Timeout</div>
                    <div className="text-gray-500 text-sm">Auto-logout after inactivity</div>
                  </div>
                  <InputNumber min={5} max={480} defaultValue={30} addonAfter="minutes" />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Password Policy</div>
                    <div className="text-gray-500 text-sm">Minimum 8 characters, mixed case</div>
                  </div>
                  <Button size="small">Configure</Button>
                </div>
              </div>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            <Card title="Access Control" size="small">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">IP Restrictions</div>
                    <div className="text-gray-500 text-sm">Allow access only from whitelisted IPs</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Geographic Restrictions</div>
                    <div className="text-gray-500 text-sm">Block access from certain countries</div>
                  </div>
                  <Switch />
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Device Restrictions</div>
                    <div className="text-gray-500 text-sm">Allow only registered devices</div>
                  </div>
                  <Switch />
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      ),
    },
  ]

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2} className="mb-2">
          <SecurityScanOutlined className="mr-2" />
          Security & Access Control
        </Title>
        <Text type="secondary">
          Manage roles, permissions, audit trails, and security settings
        </Text>
      </div>

      {/* Security Statistics */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Users"
              value={securityStats.totalUsers}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Active Sessions"
              value={securityStats.activeSessions}
              prefix={<DesktopOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Failed Logins"
              value={securityStats.failedLogins}
              prefix={<LockOutlined />}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Security Events"
              value={securityStats.securityEvents}
              prefix={<WarningOutlined />}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Card>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={tabItems}
        />
      </Card>

      {/* Role Modal */}
      <Modal
        title={selectedRole ? 'Edit Role' : 'New Role'}
        open={roleModalVisible}
        onCancel={() => setRoleModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveRole}
          initialValues={selectedRole || {}}
        >
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Role Name"
                rules={[{ required: true, message: 'Please enter role name' }]}
              >
                <Input placeholder="Enter role name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Option value="active">Active</Option>
                  <Option value="inactive">Inactive</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter role description' }]}
          >
            <TextArea rows={3} placeholder="Enter role description" />
          </Form.Item>

          <Form.Item
            name="permissions"
            label="Permissions"
            rules={[{ required: true, message: 'Please select permissions' }]}
          >
            <Tree
              checkable
              treeData={permissionTree}
              defaultExpandAll
              height={300}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={saving}>
                {selectedRole ? 'Update Role' : 'Create Role'}
              </Button>
              <Button onClick={() => setRoleModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* IP Whitelist Modal */}
      <Modal
        title="Add IP Address to Whitelist"
        open={ipModalVisible}
        onCancel={() => setIpModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          form={ipForm}
          layout="vertical"
          onFinish={handleAddIP}
        >
          <Form.Item
            name="ipAddress"
            label="IP Address/CIDR"
            rules={[{ required: true, message: 'Please enter IP address' }]}
          >
            <Input placeholder="e.g., 192.168.1.0/24 or 10.0.0.1" />
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter description' }]}
          >
            <Input placeholder="e.g., Office Network" />
          </Form.Item>

          <Form.Item
            name="expiresAt"
            label="Expires At (Optional)"
          >
            <DatePicker 
              showTime 
              placeholder="Select expiration date"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={saving}>
                Add IP Address
              </Button>
              <Button onClick={() => setIpModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Security
