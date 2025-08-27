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
  Upload, 
  Switch,
  InputNumber,
  message,
  Popconfirm,
  Tooltip,
  Badge
} from 'antd'
import { 
  PlusOutlined, 
  SearchOutlined, 
  FilterOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  PictureOutlined,
  DollarOutlined,
  MinusCircleOutlined
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../store'
import { 
  fetchPlansStart, 
  fetchPlansSuccess, 
  fetchPlansFailure,
  addPlan,
  updatePlan,
  deletePlan 
} from '../store/slices/plansSlice'
import PlanDetails from '../components/plans/PlanDetails'

const { Option } = Select
const { RangePicker } = DatePicker
const { TextArea } = Input

const Plans: React.FC = () => {
  const [viewMode, setViewMode] = useState<'table' | 'grid'>('table')
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingPlan, setEditingPlan] = useState<any>(null)
  const [detailsPlan, setDetailsPlan] = useState<any>(null)
  const [detailsVisible, setDetailsVisible] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useDispatch()
  const { plans, isLoading } = useSelector((state: RootState) => state.plans)

  // Mock data for demonstration with tiered pricing
  const mockPlans = [
    {
      id: '1',
      title: 'Modern Villa Plan',
      description: 'Contemporary 4-bedroom villa with open concept design',
      type: 'Villa',
      status: 'Published',
      tiers: [
        {
          id: '1-1',
          name: 'Basic',
          price: 1500,
          features: ['PDF Plans', 'Basic Specifications', 'Email Support']
        },
        {
          id: '1-2',
          name: 'Standard',
          price: 2500,
          features: ['PDF Plans', 'CAD Files', 'Detailed Specifications', 'Email Support', 'Phone Support']
        },
        {
          id: '1-3',
          name: 'Premium',
          price: 3500,
          features: ['PDF Plans', 'CAD Files', '3D Models', 'Detailed Specifications', 'Priority Support', 'Custom Modifications']
        }
      ],
      featured: true,
      createdAt: '2024-01-15',
      updatedAt: '2024-01-15',
      downloads: 45,
      views: 120
    },
    {
      id: '2',
      title: 'Cozy Bungalow Design',
      description: 'Charming 3-bedroom bungalow perfect for small families',
      type: 'Bungalow',
      status: 'Pending Review',
      tiers: [
        {
          id: '2-1',
          name: 'Basic',
          price: 1200,
          features: ['PDF Plans', 'Basic Specifications', 'Email Support']
        },
        {
          id: '2-2',
          name: 'Standard',
          price: 1800,
          features: ['PDF Plans', 'CAD Files', 'Detailed Specifications', 'Email Support', 'Phone Support']
        },
        {
          id: '2-3',
          name: 'Premium',
          price: 2500,
          features: ['PDF Plans', 'CAD Files', '3D Models', 'Detailed Specifications', 'Priority Support', 'Custom Modifications']
        }
      ],
      featured: false,
      createdAt: '2024-01-14',
      updatedAt: '2024-01-14',
      downloads: 23,
      views: 67
    },
    {
      id: '3',
      title: 'Luxury Townhouse',
      description: 'Elegant 5-bedroom townhouse with modern amenities',
      type: 'Townhouse',
      status: 'Draft',
      tiers: [
        {
          id: '3-1',
          name: 'Basic',
          price: 2000,
          features: ['PDF Plans', 'Basic Specifications', 'Email Support']
        },
        {
          id: '3-2',
          name: 'Standard',
          price: 3200,
          features: ['PDF Plans', 'CAD Files', 'Detailed Specifications', 'Email Support', 'Phone Support']
        },
        {
          id: '3-3',
          name: 'Premium',
          price: 4500,
          features: ['PDF Plans', 'CAD Files', '3D Models', 'Detailed Specifications', 'Priority Support', 'Custom Modifications']
        }
      ],
      featured: true,
      createdAt: '2024-01-13',
      updatedAt: '2024-01-13',
      downloads: 12,
      views: 89
    },
    {
      id: '4',
      title: 'Rustic Cottage',
      description: 'Charming 2-bedroom cottage with traditional design',
      type: 'Cottage',
      status: 'Published',
      tiers: [
        {
          id: '4-1',
          name: 'Basic',
          price: 1000,
          features: ['PDF Plans', 'Basic Specifications', 'Email Support']
        },
        {
          id: '4-2',
          name: 'Standard',
          price: 1500,
          features: ['PDF Plans', 'CAD Files', 'Detailed Specifications', 'Email Support', 'Phone Support']
        },
        {
          id: '4-3',
          name: 'Premium',
          price: 2200,
          features: ['PDF Plans', 'CAD Files', '3D Models', 'Detailed Specifications', 'Priority Support', 'Custom Modifications']
        }
      ],
      featured: false,
      createdAt: '2024-01-12',
      updatedAt: '2024-01-12',
      downloads: 34,
      views: 78
    }
  ]

  useEffect(() => {
    // Simulate loading plans
    dispatch(fetchPlansStart())
    setTimeout(() => {
      dispatch(fetchPlansSuccess(mockPlans))
    }, 1000)
  }, [dispatch])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Published': return 'green'
      case 'Pending Review': return 'orange'
      case 'Draft': return 'blue'
      case 'Archived': return 'gray'
      default: return 'default'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Published': return <CheckCircleOutlined />
      case 'Pending Review': return <ClockCircleOutlined />
      case 'Draft': return <FileTextOutlined />
      case 'Archived': return <FileTextOutlined />
      default: return <FileTextOutlined />
    }
  }

  const handleAddPlan = () => {
    setEditingPlan(null)
    form.resetFields()
    setIsModalVisible(true)
  }

  const handleEditPlan = (plan: any) => {
    setEditingPlan(plan)
    // Ensure plan has proper structure for editing
    const planData = {
      ...plan,
      tiers: plan.tiers || [
        {
          id: 'basic-tier',
          name: 'Basic',
          price: 1000,
          features: ['PDF Plans', 'Basic Specifications', 'Email Support']
        }
      ]
    }
    form.setFieldsValue(planData)
    setIsModalVisible(true)
  }

  const handleDeletePlan = (planId: string) => {
    dispatch(deletePlan(planId))
    message.success('Plan deleted successfully')
  }

  const handleViewDetails = (plan: any) => {
    setDetailsPlan(plan)
    setDetailsVisible(true)
  }

  const handleDetailsClose = () => {
    setDetailsVisible(false)
    setDetailsPlan(null)
  }

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields()
      
      // Add IDs to tiers if they don't exist
      const tiersWithIds = values.tiers?.map((tier: any, index: number) => ({
        ...tier,
        id: tier.id || `${Date.now()}-${index}`
      }))
      
      const planData = {
        ...values,
        tiers: tiersWithIds
      }
      
      if (editingPlan) {
        dispatch(updatePlan({ ...editingPlan, ...planData }))
        message.success('Plan updated successfully')
      } else {
        const newPlan = {
          id: Date.now().toString(),
          ...planData,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          downloads: 0,
          views: 0
        }
        dispatch(addPlan(newPlan))
        message.success('Plan created successfully')
      }
      setIsModalVisible(false)
    } catch (error) {
      console.error('Validation failed:', error)
    }
  }

  const columns = [
    {
      title: 'Plan',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: any) => (
        <div>
          <div className="font-medium">{text}</div>
          <div className="text-sm text-gray-500">{record.description}</div>
        </div>
      ),
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => <Tag color="blue">{type}</Tag>,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => (
        <Badge 
          status={getStatusColor(status) as any} 
          text={status}
          icon={getStatusIcon(status)}
        />
      ),
    },
    {
      title: 'Pricing Tiers',
      key: 'pricing',
      render: (record: any) => (
        <div className="space-y-1">
          {record.tiers?.map((tier: any) => (
            <div key={tier.id} className="flex justify-between items-center text-sm">
              <span className="font-medium">{tier.name}:</span>
              <span className="text-green-600">₵{tier.price?.toLocaleString() || '0'}</span>
            </div>
          )) || (
            <div className="text-gray-400 text-sm">No tiers configured</div>
          )}
        </div>
      ),
    },
    {
      title: 'Featured',
      dataIndex: 'featured',
      key: 'featured',
      render: (featured: boolean) => (
        <Tag color={featured ? 'green' : 'default'}>
          {featured ? 'Yes' : 'No'}
        </Tag>
      ),
    },
    {
      title: 'Stats',
      key: 'stats',
      render: (record: any) => (
        <div className="text-sm">
          <div>Downloads: {record.downloads}</div>
          <div>Views: {record.views}</div>
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
               onClick={() => handleViewDetails(record)}
             />
           </Tooltip>
          <Tooltip title="Edit Plan">
            <Button 
              type="text" 
              icon={<EditOutlined />} 
              size="small"
              onClick={() => handleEditPlan(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this plan?"
            onConfirm={() => handleDeletePlan(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Tooltip title="Delete Plan">
              <Button type="text" icon={<DeleteOutlined />} size="small" danger />
            </Tooltip>
          </Popconfirm>
        </Space>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Plans Management</h1>
          <p className="text-gray-600">Manage building plans and architectural designs</p>
        </div>
        <Button type="primary" icon={<PlusOutlined />} size="large" onClick={handleAddPlan}>
          Add New Plan
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <Row gutter={[16, 16]} align="middle">
          <Col xs={24} sm={12} md={6}>
            <Input
                placeholder="Search plans..."
              prefix={<SearchOutlined />}
              allowClear
            />
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select placeholder="Status" allowClear style={{ width: '100%' }}>
              <Option value="Published">Published</Option>
              <Option value="Pending Review">Pending Review</Option>
              <Option value="Draft">Draft</Option>
              <Option value="Archived">Archived</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select placeholder="Type" allowClear style={{ width: '100%' }}>
              <Option value="Villa">Villa</Option>
              <Option value="Bungalow">Bungalow</Option>
              <Option value="Townhouse">Townhouse</Option>
              <Option value="Cottage">Cottage</Option>
              <Option value="Farmhouse">Farmhouse</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={4}>
            <Select placeholder="Featured" allowClear style={{ width: '100%' }}>
              <Option value="true">Yes</Option>
              <Option value="false">No</Option>
            </Select>
          </Col>
          <Col xs={24} sm={12} md={6}>
            <RangePicker style={{ width: '100%' }} placeholder={['Start Date', 'End Date']} />
          </Col>
        </Row>
      </Card>

      {/* Plans Table */}
      <Card>
        <Table
          columns={columns}
          dataSource={plans}
          loading={isLoading}
          rowKey="id"
          pagination={{
            total: plans.length,
            pageSize: 10,
            showSizeChanger: true,
            showQuickJumper: true,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} plans`,
          }}
        />
      </Card>

      {/* Add/Edit Plan Modal */}
      <Modal
        title={editingPlan ? 'Edit Plan' : 'Add New Plan'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
        width={800}
        okText={editingPlan ? 'Update' : 'Create'}
        cancelText="Cancel"
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={{
            featured: false,
            status: 'Draft',
            tiers: [
              {
                id: 'basic-tier',
                name: 'Basic',
                price: 1000,
                features: ['PDF Plans', 'Basic Specifications', 'Email Support']
              },
              {
                id: 'standard-tier',
                name: 'Standard',
                price: 2000,
                features: ['PDF Plans', 'CAD Files', 'Detailed Specifications', 'Email Support', 'Phone Support']
              },
              {
                id: 'premium-tier',
                name: 'Premium',
                price: 3000,
                features: ['PDF Plans', 'CAD Files', '3D Models', 'Detailed Specifications', 'Priority Support', 'Custom Modifications']
              }
            ]
          }}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="title"
                label="Plan Title"
                rules={[{ required: true, message: 'Please enter plan title' }]}
              >
                <Input placeholder="Enter plan title" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="type"
                label="Plan Type"
                rules={[{ required: true, message: 'Please select plan type' }]}
              >
                <Select placeholder="Select plan type">
                  <Option value="Villa">Villa</Option>
                  <Option value="Bungalow">Bungalow</Option>
                  <Option value="Townhouse">Townhouse</Option>
                  <Option value="Cottage">Cottage</Option>
                  <Option value="Farmhouse">Farmhouse</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true, message: 'Please enter plan description' }]}
          >
            <TextArea rows={4} placeholder="Enter plan description" />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="status"
                label="Status"
                rules={[{ required: true, message: 'Please select status' }]}
              >
                <Select placeholder="Select status">
                  <Option value="Draft">Draft</Option>
                  <Option value="Pending Review">Pending Review</Option>
                  <Option value="Published">Published</Option>
                  <Option value="Archived">Archived</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="featured"
                label="Featured Plan"
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>

          {/* Pricing Tiers Section */}
          <Form.Item
            label="Pricing Tiers"
            required
          >
            <Form.List name="tiers">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Card 
                      key={key} 
                      size="small" 
                      className="mb-4"
                      title={`Tier ${name + 1}`}
                      extra={
                        <Button
                          type="text"
                          danger
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(name)}
                        />
                      }
                    >
                      <Row gutter={16}>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            label="Tier Name"
                            rules={[{ required: true, message: 'Please enter tier name' }]}
                          >
                            <Select placeholder="Select tier type">
                              <Option value="Basic">Basic</Option>
                              <Option value="Standard">Standard</Option>
                              <Option value="Premium">Premium</Option>
                              <Option value="Custom">Custom</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'price']}
                            label="Price (₵)"
                            rules={[{ required: true, message: 'Please enter price' }]}
                          >
                            <InputNumber
                              style={{ width: '100%' }}
                              placeholder="Enter price"
                              min={0}
                              formatter={value => `₵ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                              parser={value => value!.replace(/\₵\s?|(,*)/g, '')}
                            />
                          </Form.Item>
                        </Col>
                        <Col span={8}>
                          <Form.Item
                            {...restField}
                            name={[name, 'features']}
                            label="Features"
                            rules={[{ required: true, message: 'Please add at least one feature' }]}
                          >
                            <Select
                              mode="tags"
                              placeholder="Add features"
                              style={{ width: '100%' }}
                            >
                              <Option value="PDF Plans">PDF Plans</Option>
                              <Option value="CAD Files">CAD Files</Option>
                              <Option value="3D Models">3D Models</Option>
                              <Option value="Detailed Specifications">Detailed Specifications</Option>
                              <Option value="Basic Specifications">Basic Specifications</Option>
                              <Option value="Email Support">Email Support</Option>
                              <Option value="Phone Support">Phone Support</Option>
                              <Option value="Priority Support">Priority Support</Option>
                              <Option value="Custom Modifications">Custom Modifications</Option>
                              <Option value="Site Visit">Site Visit</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                  <Form.Item>
                    <Button 
                      type="dashed" 
                      onClick={() => add()} 
                      block 
                      icon={<PlusOutlined />}
                    >
                      Add Pricing Tier
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="media"
                label="Plan Images"
              >
                <Upload
                  listType="picture-card"
                  maxCount={5}
                  beforeUpload={() => false}
                  fileList={[]}
                >
                  <div>
                    <PictureOutlined />
                    <div style={{ marginTop: 8 }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="files"
                label="Plan Files"
              >
                <Upload
                  maxCount={10}
                  beforeUpload={() => false}
                  fileList={[]}
                >
                  <Button icon={<FileTextOutlined />}>Upload Files</Button>
                </Upload>
              </Form.Item>
            </Col>
          </Row>

                 </Form>
       </Modal>

       {/* Plan Details Modal */}
       <PlanDetails
         plan={detailsPlan}
         visible={detailsVisible}
         onClose={handleDetailsClose}
         onEdit={handleEditPlan}
       />
    </div>
  )
}

export default Plans 
