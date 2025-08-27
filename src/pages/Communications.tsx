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
  Switch
} from 'antd'
import { 
  MailOutlined,
  BellOutlined,
  MessageOutlined,
  SendOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CopyOutlined,
  UserOutlined,
  PlusOutlined,
  ReloadOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  InfoCircleOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography
const { Option } = Select

const { TextArea } = Input

interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  type: 'welcome' | 'order_confirmation' | 'download_ready' | 'password_reset'
  status: 'active' | 'draft' | 'archived'
  createdBy: string
  createdAt: string
  usageCount: number
}

interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  target: 'all' | 'specific' | 'role_based'
  status: 'scheduled' | 'sent' | 'failed'
  scheduledAt: string
  recipients: number
  opened: number
  clicked: number
}

const Communications: React.FC = () => {
  const [activeTab, setActiveTab] = useState('templates')
  const [templateModalVisible, setTemplateModalVisible] = useState(false)
  const [notificationModalVisible, setNotificationModalVisible] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [sending, setSending] = useState(false)
  const [form] = Form.useForm()
  const [notificationForm] = Form.useForm()

  // Mock data
  const mockTemplates: EmailTemplate[] = [
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to SAK CONSTRUCTIONS GH!',
      content: 'Dear {{user_name}},\n\nWelcome to SAK CONSTRUCTIONS GH! We\'re excited to have you on board.\n\nBest regards,\nSAK Team',
      type: 'welcome',
      status: 'active',
      createdBy: 'John Doe',
      createdAt: '2024-01-15 10:00:00',
      usageCount: 156
    },
    {
      id: '2',
      name: 'Order Confirmation',
      subject: 'Order Confirmation - {{order_number}}',
      content: 'Dear {{customer_name}},\n\nThank you for your order! Your order number is {{order_number}}.\n\nBest regards,\nSAK Team',
      type: 'order_confirmation',
      status: 'active',
      createdBy: 'Jane Smith',
      createdAt: '2024-01-14 09:30:00',
      usageCount: 89
    }
  ]

  const mockNotifications: Notification[] = [
    {
      id: '1',
      title: 'New Plan Available',
      message: 'A new luxury villa plan has been added to our collection!',
      type: 'info',
      target: 'all',
      status: 'sent',
      scheduledAt: '2024-01-20 10:00:00',
      recipients: 1250,
      opened: 890,
      clicked: 234
    },
    {
      id: '2',
      title: 'System Maintenance',
      message: 'Scheduled maintenance on January 25th from 2-4 AM',
      type: 'warning',
      target: 'all',
      status: 'scheduled',
      scheduledAt: '2024-01-25 02:00:00',
      recipients: 0,
      opened: 0,
      clicked: 0
    }
  ]

  const stats = {
    totalEmails: 2456,
    sentToday: 89,
    openRate: 67.5,
    clickRate: 23.4,
    totalNotifications: 156,
    activeTemplates: 12
  }

  const handleSaveTemplate = async (values: any) => {
    setSending(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Template saved successfully!')
      setTemplateModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Failed to save template')
    } finally {
      setSending(false)
    }
  }

  const handleSendNotification = async (values: any) => {
    setSending(true)
    try {
      await new Promise(resolve => setTimeout(resolve, 2000))
      message.success('Notification sent successfully!')
      setNotificationModalVisible(false)
      notificationForm.resetFields()
    } catch (error) {
      message.error('Failed to send notification')
    } finally {
      setSending(false)
    }
  }

  const getStatusColor = (status: string) => {
    const statusConfig = {
      active: 'green',
      draft: 'orange',
      archived: 'red',
      sent: 'green',
      scheduled: 'blue',
      failed: 'red'
    }
    return statusConfig[status as keyof typeof statusConfig] || 'default'
  }

  const getTypeIcon = (type: string) => {
    const iconConfig = {
      info: <InfoCircleOutlined style={{ color: '#1890ff' }} />,
      success: <CheckCircleOutlined style={{ color: '#52c41a' }} />,
      warning: <ExclamationCircleOutlined style={{ color: '#faad14' }} />,
      error: <ExclamationCircleOutlined style={{ color: '#ff4d4f' }} />
    }
    return iconConfig[type as keyof typeof iconConfig] || <InfoCircleOutlined />
  }

  const templateColumns = [
    {
      title: 'Template Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: EmailTemplate) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">{record.subject}</div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeLabels = {
          welcome: 'Welcome',
          order_confirmation: 'Order Confirmation',
          download_ready: 'Download Ready',
          password_reset: 'Password Reset'
        }
        return <Tag color="blue">{typeLabels[type as keyof typeof typeLabels]}</Tag>
      },
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
      title: 'Usage',
      dataIndex: 'usageCount',
      key: 'usageCount',
      render: (count: number) => <Badge count={count} showZero />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: EmailTemplate) => (
        <Space>
          <Tooltip title="Edit Template">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              onClick={() => {
                setSelectedTemplate(record)
                setTemplateModalVisible(true)
              }}
            />
          </Tooltip>
          <Tooltip title="Preview">
            <Button type="text" icon={<EyeOutlined />} />
          </Tooltip>
          <Tooltip title="Duplicate">
            <Button type="text" icon={<CopyOutlined />} />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this template?"
            onConfirm={() => message.success(`Deleted template ${record.name}`)}
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

  const notificationColumns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Notification) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-xs text-gray-500">{record.message}</div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string, record: Notification) => (
        <div className="flex items-center space-x-1">
          {getTypeIcon(type)}
          <Tag color={getStatusColor(type)}>
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </Tag>
        </div>
      ),
    },
    {
      title: 'Target',
      dataIndex: 'target',
      key: 'target',
      render: (target: string) => {
        const targetLabels = {
          all: 'All Users',
          specific: 'Specific Users',
          role_based: 'Role Based'
        }
        return <Tag color="purple">{targetLabels[target as keyof typeof targetLabels]}</Tag>
      },
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
      title: 'Recipients',
      dataIndex: 'recipients',
      key: 'recipients',
      render: (recipients: number) => <Badge count={recipients} showZero />,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: Notification) => (
        <Space>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
          <Tooltip title="View Details">
            <Button type="text" icon={<EyeOutlined />} />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this notification?"
            onConfirm={() => message.success(`Deleted notification ${record.title}`)}
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

  return (
    <div className="p-6">
      <div className="mb-6">
        <Title level={2} className="mb-2">
          <MessageOutlined className="mr-2" />
          Communications
        </Title>
        <Text type="secondary">
          Manage email templates, notifications, and user communications
        </Text>
      </div>

      {/* Statistics */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Emails Sent"
              value={stats.totalEmails}
              prefix={<MailOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Sent Today"
              value={stats.sentToday}
              prefix={<SendOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Open Rate"
              value={stats.openRate}
              suffix="%"
              prefix={<EyeOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Click Rate"
              value={stats.clickRate}
              suffix="%"
              prefix={<CheckCircleOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* Main Content */}
      <Card>
        <Tabs 
          activeKey={activeTab} 
          onChange={setActiveTab}
          items={[
            {
              key: 'templates',
              label: 'Email Templates',
              children: (
                <>
                  <div className="mb-4">
                    <Space>
                      <Button 
                        type="primary" 
                        icon={<PlusOutlined />}
                        onClick={() => {
                          setSelectedTemplate(null)
                          setTemplateModalVisible(true)
                        }}
                      >
                        New Template
                      </Button>
                      <Button icon={<ReloadOutlined />}>
                        Refresh
                      </Button>
                    </Space>
                  </div>

                  <Table
                    columns={templateColumns}
                    dataSource={mockTemplates}
                    rowKey="id"
                    pagination={{
                      pageSize: 10,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} templates`
                    }}
                  />
                </>
              )
            },
            {
              key: 'notifications',
              label: 'Notifications',
              children: (
                <>
                  <div className="mb-4">
                    <Space>
                      <Button 
                        type="primary" 
                        icon={<BellOutlined />}
                        onClick={() => setNotificationModalVisible(true)}
                      >
                        Send Notification
                      </Button>
                      <Button icon={<ReloadOutlined />}>
                        Refresh
                      </Button>
                    </Space>
                  </div>

                  <Table
                    columns={notificationColumns}
                    dataSource={mockNotifications}
                    rowKey="id"
                    pagination={{
                      pageSize: 10,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} notifications`
                    }}
                  />
                </>
              )
            },
            {
              key: 'settings',
              label: 'Settings',
              children: (
                <Row gutter={[24, 24]}>
                  <Col xs={24} md={12}>
                    <Card title="Email Settings" size="small">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">SMTP Server</div>
                            <div className="text-gray-500 text-sm">smtp.gmail.com</div>
                          </div>
                          <Button size="small">Configure</Button>
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">From Email</div>
                            <div className="text-gray-500 text-sm">noreply@sakconstructions.com</div>
                          </div>
                          <Button size="small">Edit</Button>
                        </div>
                      </div>
                    </Card>
                  </Col>
                  <Col xs={24} md={12}>
                    <Card title="Notification Settings" size="small">
                      <div className="space-y-4">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">Push Notifications</div>
                            <div className="text-gray-500 text-sm">Browser notifications</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-medium">Email Notifications</div>
                            <div className="text-gray-500 text-sm">Email alerts</div>
                          </div>
                          <Switch defaultChecked />
                        </div>
                      </div>
                    </Card>
                  </Col>
                </Row>
              )
            }
          ]}
        />
      </Card>

      {/* Template Modal */}
      <Modal
        title={selectedTemplate ? 'Edit Template' : 'New Email Template'}
        open={templateModalVisible}
        onCancel={() => setTemplateModalVisible(false)}
        footer={null}
        width={800}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSaveTemplate}
          initialValues={selectedTemplate || {}}
        >
          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Template Name"
                rules={[{ required: true, message: 'Please enter template name' }]}
              >
                <Input placeholder="Enter template name" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Template Type"
                rules={[{ required: true, message: 'Please select template type' }]}
              >
                <Select placeholder="Select template type">
                  <Option value="welcome">Welcome Email</Option>
                  <Option value="order_confirmation">Order Confirmation</Option>
                  <Option value="download_ready">Download Ready</Option>
                  <Option value="password_reset">Password Reset</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="subject"
            label="Email Subject"
            rules={[{ required: true, message: 'Please enter email subject' }]}
          >
            <Input placeholder="Enter email subject" />
          </Form.Item>

          <Form.Item
            name="content"
            label="Email Content"
            rules={[{ required: true, message: 'Please enter email content' }]}
          >
            <TextArea rows={10} placeholder="Enter email content..." />
          </Form.Item>

          <Alert
            message="Template Variables"
            description="Use {{variable_name}} to insert dynamic content. Available variables: {{user_name}}, {{customer_name}}, {{order_number}}, {{download_link}}"
            type="info"
            showIcon
            className="mb-4"
          />

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={sending}>
                {selectedTemplate ? 'Update Template' : 'Create Template'}
              </Button>
              <Button onClick={() => setTemplateModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Notification Modal */}
      <Modal
        title="Send Notification"
        open={notificationModalVisible}
        onCancel={() => setNotificationModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={notificationForm}
          layout="vertical"
          onFinish={handleSendNotification}
        >
          <Form.Item
            name="title"
            label="Notification Title"
            rules={[{ required: true, message: 'Please enter notification title' }]}
          >
            <Input placeholder="Enter notification title" />
          </Form.Item>

          <Form.Item
            name="message"
            label="Notification Message"
            rules={[{ required: true, message: 'Please enter notification message' }]}
          >
            <TextArea rows={4} placeholder="Enter notification message" />
          </Form.Item>

          <Row gutter={[16, 0]}>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Notification Type"
                rules={[{ required: true, message: 'Please select notification type' }]}
              >
                <Select placeholder="Select type">
                  <Option value="info">Information</Option>
                  <Option value="success">Success</Option>
                  <Option value="warning">Warning</Option>
                  <Option value="error">Error</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="target"
                label="Target Audience"
                rules={[{ required: true, message: 'Please select target audience' }]}
              >
                <Select placeholder="Select target">
                  <Option value="all">All Users</Option>
                  <Option value="specific">Specific Users</Option>
                  <Option value="role_based">Role Based</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={sending}>
                Send Notification
              </Button>
              <Button onClick={() => setNotificationModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Communications
