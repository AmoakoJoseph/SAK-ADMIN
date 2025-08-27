import React, { useState } from 'react'
import { 
  Card, 
  Tabs, 
  Form, 
  Input, 
  Button, 
  Switch, 
  Select, 
  Upload, 
  message,
  Row,
  Col,
  Divider,
  Typography,
  Space,
  Alert,
  Modal,
  List,
  Tag,
  Badge,
  Tooltip,
  Popconfirm
} from 'antd'
import { 
  SettingOutlined,
  SecurityScanOutlined,
  MailOutlined,
  CreditCardOutlined,
  DatabaseOutlined,
  SaveOutlined,
  ReloadOutlined,
  UploadOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined,
  BellOutlined,
  GlobalOutlined,
  FileTextOutlined,
  KeyOutlined,
  SafetyOutlined
} from '@ant-design/icons'


const { Option } = Select
const { TextArea } = Input
const { Title, Text } = Typography


const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState('general')
  const [loading, setLoading] = useState(false)
  const [emailModalVisible, setEmailModalVisible] = useState(false)
  const [editingTemplate, setEditingTemplate] = useState<any>(null)
  const [form] = Form.useForm()

  // Mock data
  const emailTemplates = [
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to SAK CONSTRUCTIONS GH',
      type: 'welcome',
      lastModified: '2024-01-15',
      status: 'active'
    },
    {
      id: '2',
      name: 'Order Confirmation',
      subject: 'Your Order Has Been Confirmed',
      type: 'order_confirmation',
      lastModified: '2024-01-10',
      status: 'active'
    },
    {
      id: '3',
      name: 'Password Reset',
      subject: 'Reset Your Password',
      type: 'password_reset',
      lastModified: '2024-01-08',
      status: 'active'
    },
    {
      id: '4',
      name: 'Payment Success',
      subject: 'Payment Received Successfully',
      type: 'payment_success',
      lastModified: '2024-01-05',
      status: 'inactive'
    }
  ]

  const systemLogs = [
    {
      id: '1',
      type: 'info',
      message: 'System backup completed successfully',
      timestamp: '2024-01-20 14:30:00',
      user: 'System'
    },
    {
      id: '2',
      type: 'warning',
      message: 'High memory usage detected',
      timestamp: '2024-01-20 13:45:00',
      user: 'System'
    },
    {
      id: '3',
      type: 'error',
      message: 'Database connection timeout',
      timestamp: '2024-01-20 12:15:00',
      user: 'System'
    },
    {
      id: '4',
      type: 'info',
      message: 'New user registration: john.doe@example.com',
      timestamp: '2024-01-20 11:20:00',
      user: 'Admin'
    }
  ]

  const handleSave = async (values: any) => {
    setLoading(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Settings saved successfully!')
    } catch (error) {
      message.error('Failed to save settings')
    } finally {
      setLoading(false)
    }
  }

  const handleEmailTemplateEdit = (template: any) => {
    setEditingTemplate(template)
    setEmailModalVisible(true)
  }

  const handleEmailTemplateSave = async (values: any) => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Email template updated successfully!')
      setEmailModalVisible(false)
      setEditingTemplate(null)
    } catch (error) {
      message.error('Failed to update email template')
    } finally {
      setLoading(false)
    }
  }

  const handleBackup = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      message.success('System backup completed successfully!')
    } catch (error) {
      message.error('Backup failed')
    } finally {
      setLoading(false)
    }
  }

  const handleClearCache = async () => {
    setLoading(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Cache cleared successfully!')
    } catch (error) {
      message.error('Failed to clear cache')
    } finally {
      setLoading(false)
    }
  }

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'info':
        return <BellOutlined style={{ color: '#1890ff' }} />
      case 'warning':
        return <BellOutlined style={{ color: '#faad14' }} />
      case 'error':
        return <BellOutlined style={{ color: '#ff4d4f' }} />
      default:
        return <BellOutlined />
    }
  }

  const getLogColor = (type: string) => {
    switch (type) {
      case 'info':
        return 'blue'
      case 'warning':
        return 'orange'
      case 'error':
        return 'red'
      default:
        return 'default'
    }
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2} className="mb-2">
          <SettingOutlined className="mr-2" />
          System Settings
        </Title>
        <Text type="secondary">
          Manage your system configuration, security settings, and preferences
        </Text>
      </div>

      <Card>
        <Tabs activeKey={activeTab} onChange={setActiveTab} type="card" items={[
          {
            key: 'general',
            label: 'General Settings',
            children: (
            <Form
              layout="vertical"
              onFinish={handleSave}
              initialValues={{
                companyName: 'SAK CONSTRUCTIONS GH',
                contactEmail: 'admin@sakconstructions.com',
                contactPhone: '+233 20 123 4567',
                address: 'Accra, Ghana',
                timezone: 'Africa/Accra',
                currency: 'GHS',
                language: 'en',
                maintenanceMode: false,
                allowRegistration: true,
                requireEmailVerification: true
              }}
            >
              <Row gutter={[24, 0]}>
                <Col xs={24} lg={12}>
                  <Title level={4}>Company Information</Title>
                  <Form.Item
                    name="companyName"
                    label="Company Name"
                    rules={[{ required: true, message: 'Please enter company name' }]}
                  >
                    <Input prefix={<GlobalOutlined />} />
                  </Form.Item>
                  <Form.Item
                    name="contactEmail"
                    label="Contact Email"
                    rules={[
                      { required: true, message: 'Please enter contact email' },
                      { type: 'email', message: 'Please enter a valid email' }
                    ]}
                  >
                    <Input prefix={<MailOutlined />} />
                  </Form.Item>
                  <Form.Item
                    name="contactPhone"
                    label="Contact Phone"
                  >
                    <Input prefix={<BellOutlined />} />
                  </Form.Item>
                  <Form.Item
                    name="address"
                    label="Address"
                  >
                    <TextArea rows={3} />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Title level={4}>System Preferences</Title>
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
                  <Form.Item
                    name="currency"
                    label="Default Currency"
                  >
                    <Select>
                      <Option value="GHS">GHS - Ghanaian Cedi</Option>
                      <Option value="USD">USD - US Dollar</Option>
                      <Option value="EUR">EUR - Euro</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="language"
                    label="Default Language"
                  >
                    <Select>
                      <Option value="en">English</Option>
                      <Option value="fr">French</Option>
                      <Option value="es">Spanish</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="maintenanceMode"
                    label="Maintenance Mode"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    name="allowRegistration"
                    label="Allow User Registration"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    name="requireEmailVerification"
                    label="Require Email Verification"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                Save General Settings
              </Button>
            </Form>
            )
          },
          {
            key: 'security',
            label: 'Security',
            children: (
            <Form
              layout="vertical"
              onFinish={handleSave}
              initialValues={{
                sessionTimeout: 30,
                maxLoginAttempts: 5,
                lockoutDuration: 15,
                requireTwoFactor: false,
                passwordMinLength: 8,
                requireSpecialChars: true,
                requireNumbers: true,
                requireUppercase: true,
                enableAuditLog: true,
                logRetentionDays: 90
              }}
            >
              <Row gutter={[24, 0]}>
                <Col xs={24} lg={12}>
                  <Title level={4}>Authentication</Title>
                  <Form.Item
                    name="sessionTimeout"
                    label="Session Timeout (minutes)"
                  >
                    <Select>
                      <Option value={15}>15 minutes</Option>
                      <Option value={30}>30 minutes</Option>
                      <Option value={60}>1 hour</Option>
                      <Option value={120}>2 hours</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="maxLoginAttempts"
                    label="Maximum Login Attempts"
                  >
                    <Select>
                      <Option value={3}>3 attempts</Option>
                      <Option value={5}>5 attempts</Option>
                      <Option value={10}>10 attempts</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="lockoutDuration"
                    label="Account Lockout Duration (minutes)"
                  >
                    <Select>
                      <Option value={5}>5 minutes</Option>
                      <Option value={15}>15 minutes</Option>
                      <Option value={30}>30 minutes</Option>
                      <Option value={60}>1 hour</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="requireTwoFactor"
                    label="Require Two-Factor Authentication"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Title level={4}>Password Policy</Title>
                  <Form.Item
                    name="passwordMinLength"
                    label="Minimum Password Length"
                  >
                    <Select>
                      <Option value={6}>6 characters</Option>
                      <Option value={8}>8 characters</Option>
                      <Option value={10}>10 characters</Option>
                      <Option value={12}>12 characters</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    name="requireSpecialChars"
                    label="Require Special Characters"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    name="requireNumbers"
                    label="Require Numbers"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    name="requireUppercase"
                    label="Require Uppercase Letters"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    name="enableAuditLog"
                    label="Enable Audit Logging"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    name="logRetentionDays"
                    label="Log Retention Period (days)"
                  >
                    <Select>
                      <Option value={30}>30 days</Option>
                      <Option value={60}>60 days</Option>
                      <Option value={90}>90 days</Option>
                      <Option value={365}>1 year</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Space>
                <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                  Save Security Settings
                </Button>
                <Button icon={<SafetyOutlined />}>
                  Test Security Configuration
                </Button>
              </Space>
            </Form>
            )
          },
          {
            key: 'email',
            label: 'Email Templates',
            children: (
              <>
                <div className="mb-4">
                  <Space>
                    <Button type="primary" icon={<PlusOutlined />}>
                      Add New Template
                    </Button>
                    <Button icon={<UploadOutlined />}>
                      Import Templates
                    </Button>
                    <Button icon={<DownloadOutlined />}>
                      Export Templates
                    </Button>
                  </Space>
                </div>

                <List
                  dataSource={emailTemplates}
                  renderItem={(template) => (
                    <List.Item
                      actions={[
                        <Button 
                          key="edit" 
                          type="link" 
                          icon={<EditOutlined />}
                          onClick={() => handleEmailTemplateEdit(template)}
                        >
                          Edit
                        </Button>,
                        <Button 
                          key="preview" 
                          type="link" 
                          icon={<EyeOutlined />}
                        >
                          Preview
                        </Button>,
                        <Popconfirm
                          title="Are you sure you want to delete this template?"
                          onConfirm={() => message.success('Template deleted')}
                        >
                          <Button key="delete" type="link" danger icon={<DeleteOutlined />}>
                            Delete
                          </Button>
                        </Popconfirm>
                      ]}
                    >
                      <List.Item.Meta
                        avatar={<FileTextOutlined style={{ fontSize: 24, color: '#1890ff' }} />}
                        title={
                          <Space>
                            {template.name}
                            <Tag color={template.status === 'active' ? 'green' : 'default'}>
                              {template.status}
                            </Tag>
                          </Space>
                        }
                        description={
                          <div>
                            <div><strong>Subject:</strong> {template.subject}</div>
                            <div><strong>Type:</strong> {template.type}</div>
                            <div><strong>Last Modified:</strong> {template.lastModified}</div>
                          </div>
                        }
                      />
                    </List.Item>
                  )}
                />

                {/* Email Template Edit Modal */}
                <Modal
                  title="Edit Email Template"
                  open={emailModalVisible}
                  onCancel={() => {
                    setEmailModalVisible(false)
                    setEditingTemplate(null)
                  }}
                  footer={null}
                  width={800}
                >
                  <Form
                    layout="vertical"
                    onFinish={handleEmailTemplateSave}
                    initialValues={editingTemplate || {}}
                  >
                    <Form.Item
                      name="name"
                      label="Template Name"
                      rules={[{ required: true, message: 'Please enter template name' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="subject"
                      label="Email Subject"
                      rules={[{ required: true, message: 'Please enter email subject' }]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="content"
                      label="Email Content"
                      rules={[{ required: true, message: 'Please enter email content' }]}
                    >
                      <TextArea rows={15} placeholder="Enter email content here. You can use variables like {{user_name}}, {{order_id}}, etc." />
                    </Form.Item>
                    <Form.Item>
                      <Space>
                        <Button type="primary" htmlType="submit" loading={loading}>
                          Save Template
                        </Button>
                        <Button onClick={() => setEmailModalVisible(false)}>
                          Cancel
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                </Modal>
              </>
            )
          },
          {
            key: 'payment',
            label: 'Payment Settings',
            children: (
            <Form
              layout="vertical"
              onFinish={handleSave}
              initialValues={{
                enableMobileMoney: true,
                enableBankTransfer: true,
                enableCreditCard: false,
                currency: 'GHS',
                taxRate: 12.5,
                enableTax: true,
                enableDiscounts: true,
                maxDiscountPercent: 20,
                requirePaymentConfirmation: true,
                autoApprovePayments: false
              }}
            >
              <Row gutter={[24, 0]}>
                <Col xs={24} lg={12}>
                  <Title level={4}>Payment Methods</Title>
                  <Form.Item
                    name="enableMobileMoney"
                    label="Enable Mobile Money"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    name="enableBankTransfer"
                    label="Enable Bank Transfer"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    name="enableCreditCard"
                    label="Enable Credit Card"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    name="currency"
                    label="Default Currency"
                  >
                    <Select>
                      <Option value="GHS">GHS - Ghanaian Cedi</Option>
                      <Option value="USD">USD - US Dollar</Option>
                      <Option value="EUR">EUR - Euro</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col xs={24} lg={12}>
                  <Title level={4}>Payment Rules</Title>
                  <Form.Item
                    name="enableTax"
                    label="Enable Tax"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    name="taxRate"
                    label="Tax Rate (%)"
                  >
                    <Input type="number" min={0} max={100} />
                  </Form.Item>
                  <Form.Item
                    name="enableDiscounts"
                    label="Enable Discounts"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    name="maxDiscountPercent"
                    label="Maximum Discount (%)"
                  >
                    <Input type="number" min={0} max={100} />
                  </Form.Item>
                  <Form.Item
                    name="requirePaymentConfirmation"
                    label="Require Payment Confirmation"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                  <Form.Item
                    name="autoApprovePayments"
                    label="Auto-approve Payments"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>
              <Divider />
              <Space>
                <Button type="primary" htmlType="submit" loading={loading} icon={<SaveOutlined />}>
                  Save Payment Settings
                </Button>
                <Button icon={<CreditCardOutlined />}>
                  Test Payment Gateway
                </Button>
              </Space>
            </Form>
            )
          },
          {
            key: 'maintenance',
            label: 'System Maintenance',
            children: (
              <>
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={12}>
                    <Card title="Backup & Restore" className="h-full">
                      <Space direction="vertical" className="w-full">
                        <Alert
                          message="Last Backup: 2024-01-20 14:30:00"
                          description="System backup completed successfully"
                          type="success"
                          showIcon
                        />
                        <Button 
                          type="primary" 
                          icon={<DownloadOutlined />}
                          onClick={handleBackup}
                          loading={loading}
                          block
                        >
                          Create Backup
                        </Button>
                        <Button icon={<UploadOutlined />} block>
                          Restore from Backup
                        </Button>
                        <Button icon={<ReloadOutlined />} block>
                          Schedule Auto Backup
                        </Button>
                      </Space>
                    </Card>
                  </Col>
                  <Col xs={24} lg={12}>
                    <Card title="Cache & Performance" className="h-full">
                      <Space direction="vertical" className="w-full">
                        <Alert
                          message="Cache Status: Healthy"
                          description="All cache systems are functioning normally"
                          type="info"
                          showIcon
                        />
                        <Button 
                          icon={<ReloadOutlined />}
                          onClick={handleClearCache}
                          loading={loading}
                          block
                        >
                          Clear Cache
                        </Button>
                        <Button icon={<DatabaseOutlined />} block>
                          Optimize Database
                        </Button>
                        <Button icon={<SettingOutlined />} block>
                          Performance Settings
                        </Button>
                      </Space>
                    </Card>
                  </Col>
                </Row>

                <Card title="System Logs" className="mt-6">
                  <List
                    dataSource={systemLogs}
                    renderItem={(log) => (
                      <List.Item>
                        <List.Item.Meta
                          avatar={getLogIcon(log.type)}
                          title={
                            <Space>
                              <span>{log.message}</span>
                              <Tag color={getLogColor(log.type)}>{log.type}</Tag>
                            </Space>
                          }
                          description={
                            <div>
                              <div><strong>Time:</strong> {log.timestamp}</div>
                              <div><strong>User:</strong> {log.user}</div>
                            </div>
                          }
                        />
                      </List.Item>
                    )}
                  />
                </Card>
              </>
            )
          }
        ]} />
      </Card>
    </div>
  )
}

export default Settings 
