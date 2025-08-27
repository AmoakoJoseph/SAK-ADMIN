import React, { useState, useEffect } from 'react'
import { 
  Card, 
  Button, 
  Table, 
  Tag, 
  Space, 
  Input, 
  Select, 
  DatePicker, 
  Row, 
  Col,
  Modal,
  Form,
  Avatar,
  Switch,
  message,
  Popconfirm,
  Tooltip,
  Badge,
  Tabs,
  List,
  Descriptions,
  Timeline
} from 'antd'
import { 
  UserAddOutlined, 
  SearchOutlined, 
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  UserOutlined,
  LockOutlined,
  UnlockOutlined,
  MailOutlined,
  PhoneOutlined,
  CalendarOutlined,
  CrownOutlined,
  TeamOutlined,
  SettingOutlined
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { 
  fetchUsersStart, 
  fetchUsersSuccess, 
  fetchUsersFailure,
  addUser,
  updateUser,
  deleteUser 
} from '../store/slices/usersSlice'

const { Option } = Select
const { RangePicker } = DatePicker


const Users: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [userDetailsVisible, setUserDetailsVisible] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { users, isLoading } = useSelector((state: RootState) => state.users)

  // Mock data for demonstration
  const mockUsers = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
      phone: '+233 24 123 4567',
      role: 'superAdmin',
          status: 'active',
      avatar: undefined,
          createdAt: '2024-01-15',
      lastLogin: '2024-01-20 14:30',
      totalOrders: 15,
      totalSpent: 45000
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
      phone: '+233 20 987 6543',
      role: 'contentManager',
          status: 'active',
      avatar: undefined,
          createdAt: '2024-01-10',
      lastLogin: '2024-01-19 09:15',
      totalOrders: 8,
      totalSpent: 28000
        },
        {
          id: '3',
      name: 'Mike Johnson',
      email: 'mike.johnson@example.com',
      phone: '+233 26 555 1234',
      role: 'orderProcessor',
          status: 'suspended',
      avatar: undefined,
      createdAt: '2024-01-08',
      lastLogin: '2024-01-18 16:45',
      totalOrders: 3,
      totalSpent: 12000
    },
    {
      id: '4',
      name: 'Sarah Wilson',
      email: 'sarah.wilson@example.com',
      phone: '+233 27 777 8888',
      role: 'support',
      status: 'active',
      avatar: undefined,
          createdAt: '2024-01-05',
      lastLogin: '2024-01-20 11:20',
      totalOrders: 12,
      totalSpent: 38000
    }
  ]

  useEffect(() => {
    // Simulate loading users
    dispatch(fetchUsersStart())
    setTimeout(() => {
      dispatch(fetchUsersSuccess(mockUsers))
    }, 1000)
  }, [dispatch])

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'superAdmin': return 'red'
      case 'admin': return 'purple'
      case 'contentManager': return 'blue'
      case 'orderProcessor': return 'green'
      case 'support': return 'orange'
      default: return 'default'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'superAdmin': return <CrownOutlined />
      case 'admin': return <SettingOutlined />
      case 'contentManager': return <TeamOutlined />
      case 'orderProcessor': return <UserOutlined />
      case 'support': return <UserOutlined />
      default: return <UserOutlined />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'green'
      case 'suspended': return 'orange'
      case 'banned': return 'red'
      default: return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircleOutlined />
      case 'suspended': return <ClockCircleOutlined />
      case 'banned': return <LockOutlined />
      default: return <UserOutlined />
    }
  }

  const handleAddUser = () => {
    setEditingUser(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    form.setFieldsValue(user)
    setIsModalVisible(true)
  }

  const handleDeleteUser = (userId: string) => {
    dispatch(deleteUser(userId))
    message.success('User deleted successfully')
  }

  const handleViewUser = (user: any) => {
    setSelectedUser(user)
    setUserDetailsVisible(true)
  }

  const handleStatusChange = (userId: string, newStatus: string) => {
    const user = users.find(u => u.id === userId)
    if (user) {
      dispatch(updateUser({ ...user, status: newStatus }))
      message.success(`User status updated to ${newStatus}`)
    }
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      if (editingUser) {
        dispatch(updateUser({ ...editingUser, ...values }))
        message.success('User updated successfully')
      } else {
        const newUser = {
          id: Date.now().toString(),
          ...values,
          createdAt: new Date().toISOString(),
          lastLogin: null,
          totalOrders: 0,
          totalSpent: 0
        }
        dispatch(addUser(newUser))
        message.success('User created successfully')
      }
      setIsModalVisible(false)
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  const columns = [
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => (
        <div className="flex items-center space-x-3">
          <Avatar src={record.avatar} size="large">
            {text.charAt(0)}
          </Avatar>
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-sm text-gray-500">{record.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={getRoleColor(role)} icon={getRoleIcon(role)}>
          {role.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
        </Tag>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={getStatusColor(status) as any} 
          text={status.charAt(0).toUpperCase() + status.slice(1)}
          icon={getStatusIcon(status)}
        />
      ),
    },
    {
      title: 'Activity',
      key: 'activity',
      render: (record: any) => (
        <div className="text-sm">
          <div>Orders: {record.totalOrders}</div>
          <div>Spent: ₵{record.totalSpent.toLocaleString()}</div>
        </div>
      ),
    },
    {
      title: 'Last Login',
      dataIndex: 'lastLogin',
      key: 'lastLogin',
      render: (lastLogin: string) => (
        <div className="text-sm">
          {lastLogin ? new Date(lastLogin).toLocaleDateString() : 'Never'}
        </div>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (record: any) => (
        <Space>
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              size="small"
              onClick={() => handleViewUser(record)}
            />
          </Tooltip>
          <Tooltip title="Edit User">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => handleEditUser(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this user?"
            onConfirm={() => handleDeleteUser(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete User">
              <Button type="text" icon={<DeleteOutlined />} size="small" danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const mockActivity = [
    { time: '2024-01-20 14:30', action: 'User logged in', ip: '192.168.1.100' },
    { time: '2024-01-19 16:45', action: 'Updated profile information', ip: '192.168.1.100' },
    { time: '2024-01-18 09:20', action: 'Downloaded plan files', ip: '192.168.1.100' },
    { time: '2024-01-17 11:15', action: 'Made a purchase', ip: '192.168.1.100' }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Users & Accounts</h1>
          <p className="text-gray-600">Manage user accounts and permissions</p>
        </div>
        <Button type="primary" icon={<UserAddOutlined />} size="large" onClick={handleAddUser}>
          Add User
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Search users..."
              prefix={<SearchOutlined />}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select placeholder="Role" allowClear style={{ width: '100%' }}>
              <Option value="superAdmin">Super Admin</Option>
              <Option value="admin">Admin</Option>
              <Option value="contentManager">Content Manager</Option>
              <Option value="orderProcessor">Order Processor</Option>
              <Option value="support">Support</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select placeholder="Status" allowClear style={{ width: '100%' }}>
              <Option value="active">Active</Option>
              <Option value="suspended">Suspended</Option>
              <Option value="banned">Banned</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <RangePicker style={{ width: '100%' }} placeholder={['Start Date', 'End Date']} />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Button icon={<FilterOutlined />} block>
              Apply Filters
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Users Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={users}
          loading={isLoading}
          rowKey="id"
          pagination={{
            total: users.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} users`,
          }}
        />
      </Card>

      {/* Add/Edit User Modal */}
      <Modal
        title={editingUser ? 'Edit User' : 'Add New User'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={600}
        okText={editingUser ? 'Update' : 'Create'}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            status: 'active',
            role: 'support'
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter full name' }]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: 'Please enter email' },
                  { type: 'email', message: 'Please enter a valid email' }
                ]}
              >
                <Input placeholder="Enter email address" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="phone"
                label="Phone Number"
                rules={[{ required: true, message: 'Please enter phone number' }]}
              >
                <Input placeholder="Enter phone number" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="role"
                label="Role"
                rules={[{ required: true, message: 'Please select role' }]}
              >
                <Select placeholder="Select role">
                  <Option value="superAdmin">Super Admin</Option>
                  <Option value="admin">Admin</Option>
                  <Option value="contentManager">Content Manager</Option>
                  <Option value="orderProcessor">Order Processor</Option>
                  <Option value="support">Support</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Option value="active">Active</Option>
                  <Option value="suspended">Suspended</Option>
                  <Option value="banned">Banned</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="password"
                label="Password"
                rules={[
                  { required: !editingUser, message: 'Please enter password' },
                  { min: 6, message: 'Password must be at least 6 characters' }
                ]}
              >
                <Input.Password placeholder="Enter password" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* User Details Modal */}
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <UserOutlined className="text-primary-500" />
            <span>User Details</span>
          </div>
        }
        open={userDetailsVisible}
        onCancel={() => setUserDetailsVisible(false)}
        width={800}
        footer={[
          <Button key="close" onClick={() => setUserDetailsVisible(false)}>
            Close
          </Button>,
          <Button 
            key="edit" 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => {
              setUserDetailsVisible(false)
              handleEditUser(selectedUser)
            }}
          >
            Edit User
          </Button>
        ]}
      >
        {selectedUser && (
          <div className="space-y-6">
            {/* User Header */}
            <Card>
              <Row gutter={[16, 16]} align="middle">
                <Col span={16}>
                  <div className="flex items-center space-x-4">
                    <Avatar src={selectedUser.avatar} size={64}>
                      {selectedUser.name.charAt(0)}
                    </Avatar>
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">{selectedUser.name}</h2>
                      <p className="text-gray-600 mb-2">{selectedUser.email}</p>
                      <Space>
                        <Tag color={getRoleColor(selectedUser.role)} icon={getRoleIcon(selectedUser.role)}>
                          {selectedUser.role.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                        </Tag>
                        <Badge 
                          status={getStatusColor(selectedUser.status) as any} 
                          text={selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                        />
                      </Space>
                    </div>
                  </div>
                </Col>
                <Col span={8} className="text-right">
                  <Space direction="vertical">
                    <Button 
                      icon={selectedUser.status === 'active' ? <LockOutlined /> : <UnlockOutlined />}
                      onClick={() => handleStatusChange(
                        selectedUser.id, 
                        selectedUser.status === 'active' ? 'suspended' : 'active'
                      )}
                    >
                      {selectedUser.status === 'active' ? 'Suspend' : 'Activate'}
                    </Button>
                    <Button icon={<MailOutlined />}>
                      Send Email
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>

            {/* User Information */}
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="User Information">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="User ID">{selectedUser.id}</Descriptions.Item>
                    <Descriptions.Item label="Email">
                      <MailOutlined className="mr-1" />
                      {selectedUser.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Phone">
                      <PhoneOutlined className="mr-1" />
                      {selectedUser.phone}
                    </Descriptions.Item>
                    <Descriptions.Item label="Role">
                      <Tag color={getRoleColor(selectedUser.role)}>
                        {selectedUser.role.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </Tag>
                    </Descriptions.Item>
                    <Descriptions.Item label="Status">
                      <Badge 
                        status={getStatusColor(selectedUser.status) as any} 
                        text={selectedUser.status.charAt(0).toUpperCase() + selectedUser.status.slice(1)}
                      />
                    </Descriptions.Item>
                    <Descriptions.Item label="Member Since">
                      <CalendarOutlined className="mr-1" />
                      {new Date(selectedUser.createdAt).toLocaleDateString()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Last Login">
                      <CalendarOutlined className="mr-1" />
                      {selectedUser.lastLogin ? new Date(selectedUser.lastLogin).toLocaleString() : 'Never'}
                    </Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Activity Summary">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Total Orders:</span>
                      <span className="font-bold">{selectedUser.totalOrders}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Total Spent:</span>
                      <span className="font-bold">₵{selectedUser.totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Average Order Value:</span>
                      <span className="font-bold">
                        ₵{selectedUser.totalOrders > 0 ? (selectedUser.totalSpent / selectedUser.totalOrders).toLocaleString() : '0'}
                      </span>
        </div>
      </div>
                </Card>
              </Col>
            </Row>

            {/* Activity Timeline */}
            <Card title="Recent Activity">
              <Timeline
                items={mockActivity.map((activity, index) => ({
                  key: index,
                  children: (
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-sm text-gray-500">IP: {activity.ip}</div>
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(activity.time).toLocaleString()}
                      </div>
                    </div>
                  )
                }))}
              />
            </Card>
        </div>
      )}
      </Modal>
    </div>
  )
}

export default Users 
