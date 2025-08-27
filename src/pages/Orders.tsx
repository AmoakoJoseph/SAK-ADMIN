import React, { useState } from 'react'
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
  message,
  Popconfirm,
  Tooltip,
  Badge,
  Descriptions,
  Timeline,
  Statistic,
  Alert
} from 'antd'
import { 
  ShoppingCartOutlined, 
  SearchOutlined, 
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  DollarOutlined,
  UserOutlined,
  FileTextOutlined,
  CreditCardOutlined,
  BankOutlined,
  MobileOutlined,
  CalendarOutlined,
  DownloadOutlined,
  PrinterOutlined,
  MailOutlined,
  ExclamationCircleOutlined,
  ReloadOutlined
} from '@ant-design/icons'
import { useOrders, useUpdateOrderStatus, useDeleteOrder } from '../hooks/useQueries'

const { Option } = Select
const { RangePicker } = DatePicker


const Orders: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingOrder, setEditingOrder] = useState<any>(null)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [orderDetailsVisible, setOrderDetailsVisible] = useState(false)
  const [refundModalVisible, setRefundModalVisible] = useState(false)
  const [form] = Form.useForm()
  const [refundForm] = Form.useForm()
  
  // Mock data for demonstration
  const mockOrders = [
    {
      id: 'ORD-001',
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      customerPhone: '+233 24 123 4567',
      planTitle: 'Modern Villa Plan',
      planId: 'PLAN-001',
      amount: 2500,
      status: 'Completed',
      paymentMethod: 'Mobile Money',
      paymentStatus: 'Paid',
      orderDate: '2024-01-20 14:30',
      completedDate: '2024-01-20 15:45',
      transactionId: 'TXN-2024-001',
      notes: 'Customer requested expedited delivery'
    },
    {
      id: 'ORD-002',
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@example.com',
      customerPhone: '+233 20 987 6543',
      planTitle: 'Cozy Bungalow Design',
      planId: 'PLAN-002',
      amount: 1800,
      status: 'Pending',
      paymentMethod: 'Bank Transfer',
      paymentStatus: 'Pending',
      orderDate: '2024-01-19 09:15',
      completedDate: null,
      transactionId: 'TXN-2024-002',
      notes: 'Awaiting bank confirmation'
    },
    {
      id: 'ORD-003',
      customerName: 'Mike Johnson',
      customerEmail: 'mike.johnson@example.com',
      customerPhone: '+233 26 555 1234',
      planTitle: 'Luxury Townhouse',
      planId: 'PLAN-003',
      amount: 3200,
      status: 'Cancelled',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Refunded',
      orderDate: '2024-01-18 16:45',
      completedDate: null,
      transactionId: 'TXN-2024-003',
      notes: 'Customer requested cancellation'
    },
    {
      id: 'ORD-004',
      customerName: 'Sarah Wilson',
      customerEmail: 'sarah.wilson@example.com',
      customerPhone: '+233 27 777 8888',
      planTitle: 'Rustic Cottage',
      planId: 'PLAN-004',
      amount: 1500,
      status: 'Processing',
      paymentMethod: 'Mobile Money',
      paymentStatus: 'Paid',
      orderDate: '2024-01-17 11:20',
      completedDate: null,
      transactionId: 'TXN-2024-004',
      notes: 'Files being prepared for delivery'
    }
  ]

  // TanStack Query hooks
  const { data: ordersData, isLoading, error, refetch } = useOrders()
  const updateOrderStatusMutation = useUpdateOrderStatus()
  const deleteOrderMutation = useDeleteOrder()
  
  // Extract orders from API response or use mock data
  const orders = ordersData?.data || mockOrders

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'green'
      case 'Processing': return 'blue'
      case 'Pending': return 'orange'
      case 'Cancelled': return 'red'
      case 'Refunded': return 'gray'
      default: return 'default'
    }
  }



  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'Mobile Money': return <MobileOutlined />
      case 'Bank Transfer': return <BankOutlined />
      case 'Credit Card': return <CreditCardOutlined />
      default: return <DollarOutlined />
    }
  }

  const handleEditOrder = (order: any) => {
    setEditingOrder(order)
    form.setFieldsValue(order)
    setIsModalVisible(true)
  }

  const handleDeleteOrder = (orderId: string) => {
    deleteOrderMutation.mutate(orderId, {
      onSuccess: () => {
        message.success('Order deleted successfully')
      },
      onError: (error) => {
        message.error('Failed to delete order')
        console.error('Delete order error:', error)
      }
    })
  }

  const handleViewOrder = (order: any) => {
    setSelectedOrder(order)
    setOrderDetailsVisible(true)
  }



  const handleRefund = (order: any) => {
    setSelectedOrder(order)
    setRefundModalVisible(true)
  }

  const handleRefundSubmit = async () => {
    try {
      const values = await refundForm.validateFields()
      const updatedOrder = { 
        ...selectedOrder, 
        status: 'Refunded' as const,
        paymentStatus: 'Refunded',
        refundAmount: values.refundAmount,
        refundReason: values.refundReason,
        refundDate: new Date().toISOString()
      }
      updateOrderStatusMutation.mutate(
        { orderId: selectedOrder.id, status: 'Refunded' },
        {
          onSuccess: () => {
            message.success('Refund processed successfully')
            setRefundModalVisible(false)
            refundForm.resetFields()
          },
          onError: (error) => {
            message.error('Failed to process refund')
            console.error('Refund error:', error)
          }
        }
      )
    } catch (error) {
      console.error('Refund validation failed:', error)
    }
  }

  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'id',
      key: 'id',
      render: (id: string) => (
        <span className="font-mono text-sm font-medium">{id}</span>
      ),
    },
    {
      title: 'Customer',
      key: 'customer',
      render: (record: any) => (
        <div>
          <div className="font-medium">{record.customerName}</div>
          <div className="text-sm text-gray-500">{record.customerEmail}</div>
        </div>
      ),
    },
    {
      title: 'Plan',
      dataIndex: 'planTitle',
      key: 'planTitle',
      render: (title: string, record: any) => (
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-gray-500">ID: {record.planId}</div>
        </div>
      ),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount: number) => (
        <span className="font-bold text-primary-500">₵{amount.toLocaleString()}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={getStatusColor(status) as any} 
          text={status}
        />
      ),
    },
    {
      title: 'Payment',
      key: 'payment',
      render: (record: any) => (
        <div>
          <div className="flex items-center space-x-1">
            {getPaymentMethodIcon(record.paymentMethod)}
            <span className="text-sm">{record.paymentMethod}</span>
          </div>
          <div className="text-sm text-gray-500">{record.paymentStatus}</div>
        </div>
      ),
    },
    {
      title: 'Date',
      dataIndex: 'orderDate',
      key: 'orderDate',
      render: (date: string) => (
        <div className="text-sm">
          {new Date(date).toLocaleDateString()}
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
              onClick={() => handleViewOrder(record)}
            />
          </Tooltip>
          <Tooltip title="Edit Order">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => handleEditOrder(record)}
            />
          </Tooltip>
          {record.status === 'Completed' && (
            <Tooltip title="Process Refund">
              <Button 
                type="text"
                icon={<DollarOutlined />} 
                size="small"
                onClick={() => handleRefund(record)}
              />
            </Tooltip>
          )}
          <Popconfirm
            title="Are you sure you want to delete this order?"
            onConfirm={() => handleDeleteOrder(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete Order">
              <Button type="text" icon={<DeleteOutlined />} size="small" danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  const mockActivity = [
    { time: '2024-01-20 15:45', action: 'Order completed', user: 'System' },
    { time: '2024-01-20 15:30', action: 'Payment confirmed', user: 'Payment Gateway' },
    { time: '2024-01-20 14:30', action: 'Order placed', user: 'John Doe' },
    { time: '2024-01-20 14:25', action: 'Payment initiated', user: 'John Doe' }
  ]

  const orderStats = {
    total: 1247,
    completed: 892,
    pending: 234,
    processing: 89,
    cancelled: 32,
    revenue: 3125000
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Orders & Payments</h1>
          <p className="text-gray-600">Manage customer orders and payment processing</p>
        </div>
        <Space>
          <Button icon={<DownloadOutlined />}>
            Export Orders
          </Button>
          <Button icon={<PrinterOutlined />}>
            Print Report
          </Button>
        </Space>
      </div>

      {/* Statistics */}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={orderStats.total}
              valueStyle={{ color: '#2d3748' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Revenue"
              value={orderStats.revenue}
              prefix="₵"
              valueStyle={{ color: '#f97316' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Completion Rate"
              value={((orderStats.completed / orderStats.total) * 100).toFixed(1)}
              suffix="%"
              valueStyle={{ color: '#10b981' }}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Pending Orders"
              value={orderStats.pending}
              valueStyle={{ color: '#f59e0b' }}
            />
          </Card>
        </Col>
      </Row>

      {/* Filters */}
      <Card>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Input
              placeholder="Search orders..."
              prefix={<SearchOutlined />}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select placeholder="Status" allowClear style={{ width: '100%' }}>
              <Option value="Completed">Completed</Option>
              <Option value="Processing">Processing</Option>
              <Option value="Pending">Pending</Option>
              <Option value="Cancelled">Cancelled</Option>
              <Option value="Refunded">Refunded</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select placeholder="Payment Method" allowClear style={{ width: '100%' }}>
              <Option value="Mobile Money">Mobile Money</Option>
              <Option value="Bank Transfer">Bank Transfer</Option>
              <Option value="Credit Card">Credit Card</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <RangePicker style={{ width: '100%' }} placeholder={['Start Date', 'End Date']} />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Button block>
              Apply Filters
            </Button>
          </Col>
        </Row>
      </Card>

      {/* Error Alert */}
      {error && (
        <Alert
          message="Error Loading Orders"
          description="Failed to load orders. Please try again."
          type="error"
          showIcon
          action={
            <Button size="small" onClick={() => refetch()}>
              Retry
            </Button>
          }
        />
      )}

      {/* Orders Table */}
      <Card>
        <div className="mb-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Button 
              icon={<ReloadOutlined />} 
              onClick={() => refetch()}
              loading={isLoading}
            >
              Refresh
            </Button>
            {updateOrderStatusMutation.isPending && (
              <span className="text-gray-500">Updating order...</span>
            )}
            {deleteOrderMutation.isPending && (
              <span className="text-gray-500">Deleting order...</span>
            )}
          </div>
        </div>
        
        <Table
          columns={columns}
          dataSource={orders}
          loading={isLoading}
          rowKey="id"
          pagination={{
            total: orders.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} orders`,
          }}
        />
      </Card>

      {/* Edit Order Modal */}
      <Modal
        title={editingOrder ? 'Edit Order' : 'Order Details'}
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        width={600}
        footer={[
          <Button key="cancel" onClick={() => setIsModalVisible(false)}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={() => setIsModalVisible(false)}>
            Update Order
          </Button>
        ]}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="customerName"
                label="Customer Name"
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="customerEmail"
                label="Customer Email"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="amount"
                label="Amount"
              >
                <Input prefix="₵" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
              >
                <Select>
                  <Option value="Completed">Completed</Option>
                  <Option value="Processing">Processing</Option>
                  <Option value="Pending">Pending</Option>
                  <Option value="Cancelled">Cancelled</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            name="notes"
            label="Notes"
          >
            <Input.TextArea rows={3} />
          </Form.Item>
        </Form>
      </Modal>

      {/* Order Details Modal */}
      <Modal
        title={
                    <div className="flex items-center space-x-2">
            <ShoppingCartOutlined className="text-primary-500" />
            <span>Order Details</span>
          </div>
        }
        open={orderDetailsVisible}
        onCancel={() => setOrderDetailsVisible(false)}
        width={900}
        footer={[
          <Button key="close" onClick={() => setOrderDetailsVisible(false)}>
            Close
          </Button>,
          <Button 
            key="edit" 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => {
              setOrderDetailsVisible(false)
              handleEditOrder(selectedOrder)
            }}
          >
            Edit Order
          </Button>
        ]}
      >
        {selectedOrder && (
          <div className="space-y-6">
            {/* Order Header */}
            <Card>
              <Row gutter={[16, 16]} align="middle">
                <Col span={16}>
                  <h2 className="text-xl font-bold text-gray-900 mb-2">Order {selectedOrder.id}</h2>
                  <p className="text-gray-600 mb-3">{selectedOrder.planTitle}</p>
                  <Space>
                    <Badge 
                      status={getStatusColor(selectedOrder.status) as any} 
                      text={selectedOrder.status}
                    />
                    <Tag color="blue">{selectedOrder.paymentMethod}</Tag>
                    <Tag color={selectedOrder.paymentStatus === 'Paid' ? 'green' : 'orange'}>
                      {selectedOrder.paymentStatus}
                    </Tag>
                  </Space>
                </Col>
                <Col span={8} className="text-right">
                  <div className="text-2xl font-bold text-primary-500">
                    ₵{selectedOrder.amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500">Total Amount</div>
                </Col>
              </Row>
            </Card>

            {/* Order Information */}
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <Card title="Customer Information">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Name">{selectedOrder.customerName}</Descriptions.Item>
                    <Descriptions.Item label="Email">{selectedOrder.customerEmail}</Descriptions.Item>
                    <Descriptions.Item label="Phone">{selectedOrder.customerPhone}</Descriptions.Item>
                    <Descriptions.Item label="Order Date">
                      {new Date(selectedOrder.orderDate).toLocaleString()}
                    </Descriptions.Item>
                    {selectedOrder.completedDate && (
                      <Descriptions.Item label="Completed Date">
                        {new Date(selectedOrder.completedDate).toLocaleString()}
                      </Descriptions.Item>
                    )}
                  </Descriptions>
                </Card>
              </Col>
              <Col span={12}>
                <Card title="Payment Information">
                  <Descriptions column={1} size="small">
                    <Descriptions.Item label="Transaction ID">{selectedOrder.transactionId}</Descriptions.Item>
                    <Descriptions.Item label="Payment Method">{selectedOrder.paymentMethod}</Descriptions.Item>
                    <Descriptions.Item label="Payment Status">{selectedOrder.paymentStatus}</Descriptions.Item>
                    <Descriptions.Item label="Amount">₵{selectedOrder.amount.toLocaleString()}</Descriptions.Item>
                  </Descriptions>
                </Card>
              </Col>
            </Row>

            {/* Quick Actions */}
            <Card title="Quick Actions">
              <Space wrap>
                <Button 
                  icon={<MailOutlined />}
                  onClick={() => message.info('Email sent to customer')}
                >
                  Send Email
                </Button>
                <Button 
                  icon={<DownloadOutlined />}
                  onClick={() => message.info('Invoice downloaded')}
                >
                  Download Invoice
                </Button>
                {selectedOrder.status === 'Completed' && (
                  <Button 
                    icon={<DollarOutlined />}
                    onClick={() => handleRefund(selectedOrder)}
                  >
                    Process Refund
                  </Button>
                )}
                <Button 
                  icon={<PrinterOutlined />}
                  onClick={() => message.info('Order details printed')}
                >
                  Print Order
                </Button>
              </Space>
            </Card>

            {/* Activity Timeline */}
            <Card title="Order Timeline">
              <Timeline
                items={mockActivity.map((activity, index) => ({
                  key: index,
                  children: (
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{activity.action}</div>
                        <div className="text-sm text-gray-500">by {activity.user}</div>
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

      {/* Refund Modal */}
      <Modal
        title="Process Refund"
        open={refundModalVisible}
        onOk={handleRefundSubmit}
        onCancel={() => setRefundModalVisible(false)}
        width={500}
        okText="Process Refund"
        cancelText="Cancel"
      >
        <Form
          form={refundForm}
          layout="vertical"
          initialValues={{
            refundAmount: selectedOrder?.amount || 0
          }}
        >
          <Form.Item
            name="refundAmount"
            label="Refund Amount (₵)"
            rules={[{ required: true, message: 'Please enter refund amount' }]}
          >
            <Input prefix="₵" type="number" />
          </Form.Item>
          <Form.Item
            name="refundReason"
            label="Refund Reason"
            rules={[{ required: true, message: 'Please enter refund reason' }]}
          >
            <Input.TextArea rows={3} placeholder="Enter reason for refund..." />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Orders 
