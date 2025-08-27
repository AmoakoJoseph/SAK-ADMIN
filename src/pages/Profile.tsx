import React, { useState } from 'react'
import { 
  Card, 
  Form, 
  Input, 
  Button, 
  Avatar, 
  Upload, 
  message, 
  Tabs, 
  Row, 
  Col, 
  Divider, 
  Typography, 
  Space, 
  Tag, 
  List, 
  Timeline, 
  Switch, 
  Select, 
  Modal,
  Alert,
  Badge,
  Tooltip,
  Popconfirm
} from 'antd'
import { 
  UserOutlined,
  LockOutlined,
  BellOutlined,
  SecurityScanOutlined,
  EditOutlined,
  SaveOutlined,
  CameraOutlined,
  KeyOutlined,
  HistoryOutlined,
  SettingOutlined,
  MailOutlined,
  PhoneOutlined,
  GlobalOutlined,
  CalendarOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  CheckCircleOutlined,
  ExclamationCircleOutlined
} from '@ant-design/icons'


const { Option } = Select
const { Title, Text } = Typography
const { TextArea } = Input

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('personal')
  const [loading, setLoading] = useState(false)
  const [editing, setEditing] = useState(false)
  const [passwordModalVisible, setPasswordModalVisible] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form] = Form.useForm()
  const [passwordForm] = Form.useForm()

  // Mock user data
  const userData = {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@sakconstructions.com',
    phone: '+233 20 123 4567',
    role: 'Super Admin',
    avatar: undefined,
    department: 'Management',
    location: 'Accra, Ghana',
    timezone: 'Africa/Accra',
    language: 'English',
    bio: 'Experienced construction manager with over 10 years in the industry. Passionate about delivering quality projects and leading successful teams.',
    joinDate: '2023-01-15',
    lastLogin: '2024-01-20 14:30:00',
    status: 'active',
    twoFactorEnabled: true,
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true
  }

  const recentActivity = [
    {
      id: '1',
      action: 'Updated profile information',
      timestamp: '2024-01-20 14:30:00',
      type: 'profile'
    },
    {
      id: '2',
      action: 'Changed password',
      timestamp: '2024-01-18 10:15:00',
      type: 'security'
    },
    {
      id: '3',
      action: 'Logged in from new device',
      timestamp: '2024-01-15 09:45:00',
      type: 'login'
    },
    {
      id: '4',
      action: 'Updated notification preferences',
      timestamp: '2024-01-12 16:20:00',
      type: 'settings'
    }
  ]

  const loginHistory = [
    {
      id: '1',
      device: 'Chrome on Windows 10',
      location: 'Accra, Ghana',
      ip: '192.168.1.100',
      timestamp: '2024-01-20 14:30:00',
      status: 'success'
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'Accra, Ghana',
      ip: '192.168.1.101',
      timestamp: '2024-01-18 10:15:00',
      status: 'success'
    },
    {
      id: '3',
      device: 'Firefox on MacBook',
      location: 'Kumasi, Ghana',
      ip: '192.168.1.102',
      timestamp: '2024-01-15 09:45:00',
      status: 'success'
    }
  ]

  const handleSaveProfile = async (values: any) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Profile updated successfully!')
      setEditing(false)
    } catch (error) {
      message.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  const handleChangePassword = async (values: any) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Password changed successfully!')
      setPasswordModalVisible(false)
      passwordForm.resetFields()
    } catch (error) {
      message.error('Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  const handleUploadAvatar = (info: any) => {
    if (info.file.status === 'done') {
      message.success('Avatar uploaded successfully!')
    } else if (info.file.status === 'error') {
      message.error('Failed to upload avatar')
    }
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'profile':
        return <UserOutlined style={{ color: '#1890ff' }} />
      case 'security':
        return <LockOutlined style={{ color: '#52c41a' }} />
      case 'login':
        return <SecurityScanOutlined style={{ color: '#722ed1' }} />
      case 'settings':
        return <SettingOutlined style={{ color: '#fa8c16' }} />
      default:
        return <UserOutlined />
    }
  }

  const getLoginStatusIcon = (status: string) => {
    return status === 'success' ? 
      <CheckCircleOutlined style={{ color: '#52c41a' }} /> : 
      <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2} className="mb-2">
          <UserOutlined className="mr-2" />
          User Profile
        </Title>
        <Text type="secondary">
          Manage your personal information, security settings, and preferences
        </Text>
      </div>

      <Row gutter={[24, 24]}>
        {/* Profile Header */}
        <Col xs={24} lg={8}>
          <Card>
            <div className="text-center">
              <div className="mb-4">
                <Badge
                  dot
                  offset={[-5, 5]}
                  color={userData.status === 'active' ? 'green' : 'red'}
                >
                  <Avatar 
                    size={120} 
                    icon={<UserOutlined />}
                    src={userData.avatar}
                  />
                </Badge>
              </div>
              <Title level={3} className="mb-2">{userData.name}</Title>
              <Text type="secondary" className="mb-2 block">{userData.email}</Text>
              <Tag color="blue" className="mb-4">{userData.role}</Tag>
              
              <Space direction="vertical" className="w-full">
                <Button 
                  type="primary" 
                  icon={<EditOutlined />}
                  onClick={() => setEditing(!editing)}
                  block
                >
                  {editing ? 'Cancel Edit' : 'Edit Profile'}
                </Button>
                <Button 
                  icon={<CameraOutlined />}
                  block
                >
                  Change Avatar
                </Button>
                <Button 
                  icon={<KeyOutlined />}
                  onClick={() => setPasswordModalVisible(true)}
                  block
                >
                  Change Password
                </Button>
              </Space>

              <Divider />

              <div className="text-left">
                <div className="mb-2">
                  <Text strong>Department:</Text> {userData.department}
                </div>
                <div className="mb-2">
                  <Text strong>Location:</Text> {userData.location}
                </div>
                <div className="mb-2">
                  <Text strong>Member Since:</Text> {userData.joinDate}
                </div>
                <div className="mb-2">
                  <Text strong>Last Login:</Text> {userData.lastLogin}
                </div>
              </div>
            </div>
          </Card>
        </Col>

        {/* Profile Content */}
        <Col xs={24} lg={16}>
          <Card>
            <Tabs 
              activeKey={activeTab} 
              onChange={setActiveTab}
              items={[
                {
                  key: 'personal',
                  label: 'Personal Information',
                  children: (
                    <Form
                      layout="vertical"
                      form={form}
                      onFinish={handleSaveProfile}
                      initialValues={userData}
                      disabled={!editing}
                    >
                      <Row gutter={[16, 0]}>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="name"
                            label="Full Name"
                            rules={[{ required: true, message: 'Please enter your name' }]}
                          >
                            <Input prefix={<UserOutlined />} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="email"
                            label="Email Address"
                            rules={[
                              { required: true, message: 'Please enter your email' },
                              { type: 'email', message: 'Please enter a valid email' }
                            ]}
                          >
                            <Input prefix={<MailOutlined />} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="phone"
                            label="Phone Number"
                          >
                            <Input prefix={<PhoneOutlined />} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="department"
                            label="Department"
                          >
                            <Select>
                              <Option value="Management">Management</Option>
                              <Option value="Engineering">Engineering</Option>
                              <Option value="Sales">Sales</Option>
                              <Option value="Support">Support</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="location"
                            label="Location"
                          >
                            <Input prefix={<GlobalOutlined />} />
                          </Form.Item>
                        </Col>
                        <Col xs={24} md={12}>
                          <Form.Item
                            name="timezone"
                            label="Timezone"
                          >
                            <Select>
                              <Option value="Africa/Accra">Africa/Accra (GMT+0)</Option>
                              <Option value="UTC">UTC (GMT+0)</Option>
                              <Option value="America/New_York">America/New_York (GMT-5)</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col xs={24}>
                          <Form.Item
                            name="bio"
                            label="Bio"
                          >
                            <TextArea rows={4} placeholder="Tell us about yourself..." />
                          </Form.Item>
                        </Col>
                      </Row>
                      
                      {editing && (
                        <div className="mt-4">
                          <Space>
                            <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                              Save Changes
                            </Button>
                            <Button onClick={() => setEditing(false)}>
                              Cancel
                            </Button>
                          </Space>
                        </div>
                      )}
                    </Form>
                  )
                },
                {
                  key: 'security',
                  label: 'Security',
                  children: (
                    <>
                      <div className="mb-6">
                        <Alert
                          message="Security Settings"
                          description="Manage your account security and authentication preferences"
                          type="info"
                          showIcon
                        />
                      </div>

                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                          <Card title="Two-Factor Authentication" size="small">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">2FA Status</div>
                                <div className="text-gray-500 text-sm">
                                  {userData.twoFactorEnabled ? 'Enabled' : 'Disabled'}
                                </div>
                              </div>
                              <Switch 
                                checked={userData.twoFactorEnabled}
                                onChange={(checked) => message.info(`2FA ${checked ? 'enabled' : 'disabled'}`)}
                              />
                            </div>
                          </Card>
                        </Col>
                        <Col xs={24} md={12}>
                          <Card title="Password" size="small">
                            <div className="flex justify-between items-center">
                              <div>
                                <div className="font-medium">Last Changed</div>
                                <div className="text-gray-500 text-sm">2024-01-18</div>
                              </div>
                              <Button 
                                size="small" 
                                icon={<KeyOutlined />}
                                onClick={() => setPasswordModalVisible(true)}
                              >
                                Change
                              </Button>
                            </div>
                          </Card>
                        </Col>
                      </Row>

                      <Card title="Login History" className="mt-4">
                        <List
                          dataSource={loginHistory}
                          renderItem={(item) => (
                            <List.Item>
                              <List.Item.Meta
                                avatar={getLoginStatusIcon(item.status)}
                                title={
                                  <div className="flex justify-between">
                                    <span>{item.device}</span>
                                    <Text type="secondary">{item.timestamp}</Text>
                                  </div>
                                }
                                description={
                                  <div>
                                    <div><strong>Location:</strong> {item.location}</div>
                                    <div><strong>IP Address:</strong> {item.ip}</div>
                                  </div>
                                }
                              />
                            </List.Item>
                          )}
                        />
                      </Card>
                    </>
                  )
                },
                {
                  key: 'notifications',
                  label: 'Notifications',
                  children: (
                    <>
                      <div className="mb-6">
                        <Alert
                          message="Notification Preferences"
                          description="Choose how you want to receive notifications"
                          type="info"
                          showIcon
                        />
                      </div>

                      <Row gutter={[16, 16]}>
                        <Col xs={24} md={12}>
                          <Card title="Email Notifications" size="small">
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-medium">System Updates</div>
                                  <div className="text-gray-500 text-sm">Receive system notifications</div>
                                </div>
                                <Switch 
                                  checked={userData.emailNotifications}
                                  onChange={(checked) => message.info(`Email notifications ${checked ? 'enabled' : 'disabled'}`)}
                                />
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-medium">Order Updates</div>
                                  <div className="text-gray-500 text-sm">Receive order status updates</div>
                                </div>
                                <Switch 
                                  checked={userData.emailNotifications}
                                  onChange={(checked) => message.info(`Order notifications ${checked ? 'enabled' : 'disabled'}`)}
                                />
                              </div>
                            </div>
                          </Card>
                        </Col>
                        <Col xs={24} md={12}>
                          <Card title="Push Notifications" size="small">
                            <div className="space-y-4">
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-medium">Browser Notifications</div>
                                  <div className="text-gray-500 text-sm">Receive browser push notifications</div>
                                </div>
                                <Switch 
                                  checked={userData.pushNotifications}
                                  onChange={(checked) => message.info(`Push notifications ${checked ? 'enabled' : 'disabled'}`)}
                                />
                              </div>
                              <div className="flex justify-between items-center">
                                <div>
                                  <div className="font-medium">SMS Notifications</div>
                                  <div className="text-gray-500 text-sm">Receive SMS notifications</div>
                                </div>
                                <Switch 
                                  checked={userData.smsNotifications}
                                  onChange={(checked) => message.info(`SMS notifications ${checked ? 'enabled' : 'disabled'}`)}
                                />
                              </div>
                            </div>
                          </Card>
                        </Col>
                      </Row>
                    </>
                  )
                },
                {
                  key: 'activity',
                  label: 'Activity',
                  children: (
                    <Card title="Recent Activity">
                      <Timeline>
                        {recentActivity.map((activity) => (
                          <Timeline.Item 
                            key={activity.id}
                            dot={getActivityIcon(activity.type)}
                          >
                            <div className="flex justify-between">
                              <div>
                                <div className="font-medium">{activity.action}</div>
                                <div className="text-gray-500 text-sm">{activity.timestamp}</div>
                              </div>
                            </div>
                          </Timeline.Item>
                        ))}
                      </Timeline>
                    </Card>
                  )
                }
              ]}
            />
          </Card>
        </Col>
      </Row>

      {/* Change Password Modal */}
      <Modal
        title="Change Password"
        open={passwordModalVisible}
        onCancel={() => setPasswordModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          layout="vertical"
          form={passwordForm}
          onFinish={handleChangePassword}
        >
          <Form.Item
            name="currentPassword"
            label="Current Password"
            rules={[{ required: true, message: 'Please enter your current password' }]}
          >
            <Input.Password 
              prefix={<LockOutlined />}
              placeholder="Enter current password"
            />
          </Form.Item>
          
          <Form.Item
            name="newPassword"
            label="New Password"
            rules={[
              { required: true, message: 'Please enter a new password' },
              { min: 8, message: 'Password must be at least 8 characters' }
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />}
              placeholder="Enter new password"
            />
          </Form.Item>
          
          <Form.Item
            name="confirmPassword"
            label="Confirm New Password"
            rules={[
              { required: true, message: 'Please confirm your new password' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve()
                  }
                  return Promise.reject(new Error('Passwords do not match'))
                },
              }),
            ]}
          >
            <Input.Password 
              prefix={<LockOutlined />}
              placeholder="Confirm new password"
            />
          </Form.Item>
          
          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={loading}>
                Change Password
              </Button>
              <Button onClick={() => setPasswordModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Profile
