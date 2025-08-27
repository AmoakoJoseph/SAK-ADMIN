import React, { useState } from 'react'
import { 
  Modal, 
  Descriptions, 
  Tag, 
  Button, 
  Space, 
  Image, 
  List, 
  Card, 
  Row, 
  Col, 
  Statistic, 
  Timeline,
  Divider,
  Badge,
  Tooltip,
  message
} from 'antd'
import { 
  EditOutlined, 
  DeleteOutlined, 
  DownloadOutlined, 
  EyeOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  FileTextOutlined,
  PictureOutlined,
  DollarOutlined,
  CalendarOutlined,
  UserOutlined,
  ShareAltOutlined
} from '@ant-design/icons'
import { useSelector, useDispatch } from 'react-redux'
import { RootState } from '../../store'
import { updatePlan, deletePlan } from '../../store/slices/plansSlice'

interface PlanDetailsProps {
  plan: any
  visible: boolean
  onClose: () => void
  onEdit: (plan: any) => void
}

const PlanDetails: React.FC<PlanDetailsProps> = ({ plan, visible, onClose, onEdit }) => {
  const dispatch = useDispatch()
  const [imagePreviewVisible, setImagePreviewVisible] = useState(false)
  const [selectedImage, setSelectedImage] = useState('')

  if (!plan) return null

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

  const handleStatusChange = (newStatus: string) => {
    dispatch(updatePlan({ ...plan, status: newStatus }))
    message.success(`Plan status updated to ${newStatus}`)
  }

  const handleDelete = () => {
    dispatch(deletePlan(plan.id))
    message.success('Plan deleted successfully')
    onClose()
  }

  const handleImagePreview = (url: string) => {
    setSelectedImage(url)
    setImagePreviewVisible(true)
  }

                // Mock data for demonstration
              const mockImages = [
                'https://picsum.photos/300/200?random=1',
                'https://picsum.photos/300/200?random=2',
                'https://picsum.photos/300/200?random=3',
                'https://picsum.photos/300/200?random=4'
              ]

  const mockFiles = [
    { name: 'Floor_Plan.pdf', size: '2.4 MB', type: 'PDF' },
    { name: 'Elevation_Views.pdf', size: '1.8 MB', type: 'PDF' },
    { name: 'Electrical_Layout.dwg', size: '3.2 MB', type: 'DWG' },
    { name: 'Plumbing_Plan.pdf', size: '1.5 MB', type: 'PDF' },
    { name: 'Specifications.docx', size: '0.8 MB', type: 'DOCX' }
  ]

  const mockActivity = [
    { time: '2024-01-15 14:30', action: 'Plan published', user: 'Admin User' },
    { time: '2024-01-14 16:45', action: 'Images uploaded', user: 'Content Manager' },
    { time: '2024-01-13 09:20', action: 'Plan created', user: 'Architect' },
    { time: '2024-01-12 11:15', action: 'Initial review completed', user: 'Reviewer' }
  ]

  return (
    <>
      <Modal
        title={
          <div className="flex items-center space-x-2">
            <FileTextOutlined className="text-primary-500" />
            <span>Plan Details</span>
          </div>
        }
        open={visible}
        onCancel={onClose}
        width={1000}
        footer={[
          <Button key="close" onClick={onClose}>
            Close
          </Button>,
          <Button 
            key="edit" 
            type="primary" 
            icon={<EditOutlined />}
            onClick={() => onEdit(plan)}
          >
            Edit Plan
          </Button>
        ]}
      >
        <div className="space-y-6">
          {/* Header with basic info */}
          <Card>
            <Row gutter={[16, 16]} align="middle">
              <Col span={16}>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{plan.title}</h2>
                <p className="text-gray-600 mb-3">{plan.description}</p>
                <Space>
                  <Tag color="blue">{plan.type}</Tag>
                  <Badge 
                    status={getStatusColor(plan.status) as any} 
                    text={plan.status}
                    icon={getStatusIcon(plan.status)}
                  />
                  {plan.featured && <Tag color="green">Featured</Tag>}
                </Space>
              </Col>
              <Col span={8} className="text-right">
                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-2">Starting from</div>
                  <div className="text-2xl font-bold text-orange-500">
                    ₵{plan.tiers?.[0]?.price?.toLocaleString() || '0'}
                  </div>
                  <div className="text-xs text-gray-400">
                    {plan.tiers?.length || 0} pricing tiers available
                  </div>
                </div>
              </Col>
            </Row>
          </Card>

          {/* Statistics */}
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Downloads"
                  value={plan.downloads}
                  prefix={<DownloadOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Views"
                  value={plan.views}
                  prefix={<EyeOutlined />}
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Revenue"
                  value={plan.downloads * (plan.tiers?.[1]?.price || 0)}
                  prefix="₵"
                />
              </Card>
            </Col>
            <Col span={6}>
              <Card>
                <Statistic
                  title="Rating"
                  value={4.8}
                  suffix="/5"
                />
              </Card>
            </Col>
          </Row>

          {/* Pricing Tiers */}
          <Card title={<><DollarOutlined /> Pricing Tiers</>}>
            {plan.tiers && plan.tiers.length > 0 ? (
              <Row gutter={[16, 16]}>
                {plan.tiers.map((tier: any, index: number) => (
                  <Col span={8} key={tier.id || index}>
                    <Card 
                      size="small" 
                      className={`text-center ${index === 1 ? 'border-orange-500 border-2' : ''}`}
                      title={
                        <div className="flex items-center justify-center space-x-2">
                          <span className="font-bold">{tier.name}</span>
                          {index === 1 && <Tag color="orange">Popular</Tag>}
                        </div>
                      }
                    >
                      <div className="text-2xl font-bold text-green-600 mb-4">
                        ₵{tier.price?.toLocaleString() || '0'}
                      </div>
                      <div className="space-y-2">
                        {tier.features?.map((feature: string, featureIndex: number) => (
                          <div key={featureIndex} className="text-sm text-gray-600 flex items-center">
                            <CheckCircleOutlined className="text-green-500 mr-2" />
                            {feature}
                          </div>
                        ))}
                      </div>
                    </Card>
                  </Col>
                ))}
              </Row>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <DollarOutlined className="text-4xl mb-4" />
                <p>No pricing tiers configured for this plan</p>
              </div>
            )}
          </Card>

          {/* Plan Images */}
          <Card title={<><PictureOutlined /> Plan Images</>}>
            <Row gutter={[16, 16]}>
              {mockImages.map((image, index) => (
                <Col span={6} key={index}>
                  <div 
                    className="relative cursor-pointer group"
                    onClick={() => handleImagePreview(image)}
                  >
                    <Image
                      src={image}
                      alt={`Plan view ${index + 1}`}
                      className="rounded-lg"
                      preview={false}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-200 rounded-lg flex items-center justify-center">
                      <EyeOutlined className="text-white opacity-0 group-hover:opacity-100 text-xl" />
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Card>

          {/* Plan Files */}
          <Card title={<><FileTextOutlined /> Plan Files</>}>
            <List
              dataSource={mockFiles}
              renderItem={(file) => (
                <List.Item
                  actions={[
                    <Button type="text" icon={<DownloadOutlined />} size="small">
                      Download
                    </Button>
                  ]}
                >
                  <List.Item.Meta
                    avatar={<FileTextOutlined className="text-blue-500 text-lg" />}
                    title={file.name}
                    description={`${file.size} • ${file.type}`}
                  />
                </List.Item>
              )}
            />
          </Card>

          {/* Plan Details */}
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Card title="Plan Information">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="Plan ID">{plan.id}</Descriptions.Item>
                  <Descriptions.Item label="Type">{plan.type}</Descriptions.Item>
                  <Descriptions.Item label="Status">
                    <Badge 
                      status={getStatusColor(plan.status) as any} 
                      text={plan.status}
                    />
                  </Descriptions.Item>
                  <Descriptions.Item label="Pricing Tiers">{plan.tiers?.length || 0} tiers</Descriptions.Item>
                  <Descriptions.Item label="Featured">
                    <Tag color={plan.featured ? 'green' : 'default'}>
                      {plan.featured ? 'Yes' : 'No'}
                    </Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="Created">
                    <CalendarOutlined className="mr-1" />
                    {new Date(plan.createdAt).toLocaleDateString()}
                  </Descriptions.Item>
                  <Descriptions.Item label="Last Updated">
                    <CalendarOutlined className="mr-1" />
                    {new Date(plan.updatedAt).toLocaleDateString()}
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
            <Col span={12}>
              <Card title="Quick Actions">
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Button 
                    type="primary" 
                    icon={<EditOutlined />} 
                    block
                    onClick={() => onEdit(plan)}
                  >
                    Edit Plan
                  </Button>
                  <Button 
                    icon={<ShareAltOutlined />} 
                    block
                  >
                    Share Plan
                  </Button>
                  <Button 
                    icon={<DownloadOutlined />} 
                    block
                  >
                    Download All Files
                  </Button>
                  <Divider />
                  <div className="text-sm font-medium mb-2">Change Status:</div>
                  <Space wrap>
                    <Button 
                      size="small" 
                      onClick={() => handleStatusChange('Draft')}
                      disabled={plan.status === 'Draft'}
                    >
                      Draft
                    </Button>
                    <Button 
                      size="small" 
                      onClick={() => handleStatusChange('Pending Review')}
                      disabled={plan.status === 'Pending Review'}
                    >
                      Pending Review
                    </Button>
                    <Button 
                      size="small" 
                      onClick={() => handleStatusChange('Published')}
                      disabled={plan.status === 'Published'}
                    >
                      Publish
                    </Button>
                    <Button 
                      size="small" 
                      onClick={() => handleStatusChange('Archived')}
                      disabled={plan.status === 'Archived'}
                    >
                      Archive
                    </Button>
                  </Space>
                </Space>
              </Card>
            </Col>
          </Row>

                                {/* Activity Timeline */}
                      <Card title="Activity Timeline">
                        <Timeline
                          items={mockActivity.map((activity, index) => ({
                            key: index,
                            dot: <UserOutlined style={{ fontSize: '16px' }} />,
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
      </Modal>

      {/* Image Preview Modal */}
      <Modal
        open={imagePreviewVisible}
        footer={null}
        onCancel={() => setImagePreviewVisible(false)}
        width="auto"
        centered
      >
        <Image
          src={selectedImage}
          alt="Plan preview"
          style={{ maxWidth: '100%', maxHeight: '80vh' }}
        />
      </Modal>
    </>
  )
}

export default PlanDetails
