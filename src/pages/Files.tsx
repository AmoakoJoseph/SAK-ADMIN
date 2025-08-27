import React, { useState } from 'react'
import { 
  Card, 
  Button, 
  Table, 
  Upload, 
  message, 
  Modal, 
  Form, 
  Input, 
  Select, 
  Space, 
  Tag, 
  Progress, 
  Row, 
  Col, 
  Typography, 
  Divider,
  Tabs,
  List,
  Badge,
  Tooltip,
  Popconfirm,

  Statistic
} from 'antd'
import { 
  UploadOutlined,
  FolderOutlined,
  FileOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  ShareAltOutlined,
  CloudUploadOutlined,
  CloudDownloadOutlined,
  ReloadOutlined,
  SearchOutlined,
  FolderAddOutlined,
  FileZipOutlined,
  FilePdfOutlined,
  FileImageOutlined,
  FileTextOutlined
} from '@ant-design/icons'

const { Title, Text } = Typography
const { Option } = Select

const { TextArea } = Input

interface FileItem {
  id: string
  name: string
  type: 'file' | 'folder'
  size: number
  format: string
  path: string
  uploadedBy: string
  uploadedAt: string
  downloads: number
  status: 'active' | 'archived' | 'processing'
  tags: string[]
  description?: string
  thumbnail?: string
  isPublic: boolean
}

const Files: React.FC = () => {
  const [activeTab, setActiveTab] = useState('files')
  const [uploadModalVisible, setUploadModalVisible] = useState(false)
  const [folderModalVisible, setFolderModalVisible] = useState(false)
  const [fileDetailsModalVisible, setFileDetailsModalVisible] = useState(false)
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [searchText, setSearchText] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [form] = Form.useForm()
  const [folderForm] = Form.useForm()

  // Mock data
  const mockFiles: FileItem[] = [
    {
      id: '1',
      name: 'Modern Villa Plan A',
      type: 'file',
      size: 24576000,
      format: 'PDF',
      path: '/plans/villas/',
      uploadedBy: 'John Doe',
      uploadedAt: '2024-01-20 14:30:00',
      downloads: 156,
      status: 'active',
      tags: ['villa', 'modern', 'luxury'],
      description: 'Complete architectural plans for a modern 4-bedroom villa',
      thumbnail: 'https://picsum.photos/200/150?random=1',
      isPublic: true
    },
    {
      id: '2',
      name: 'Bungalow Design B',
      type: 'file',
      size: 18432000,
      format: 'ZIP',
      path: '/plans/bungalows/',
      uploadedBy: 'Jane Smith',
      uploadedAt: '2024-01-19 10:15:00',
      downloads: 89,
      status: 'active',
      tags: ['bungalow', 'traditional', 'family'],
      description: 'Traditional 3-bedroom bungalow with detailed specifications',
      thumbnail: 'https://picsum.photos/200/150?random=2',
      isPublic: true
    }
  ]

  const storageStats = {
    totalStorage: 1024000000000,
    usedStorage: 456789123456,
    totalFiles: 156,
    totalFolders: 24
  }

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const getFileIcon = (format: string) => {
    switch (format.toLowerCase()) {
      case 'pdf':
        return <FilePdfOutlined style={{ color: '#ff4d4f' }} />
      case 'zip':
        return <FileZipOutlined style={{ color: '#1890ff' }} />
      case 'jpg':
      case 'jpeg':
      case 'png':
        return <FileImageOutlined style={{ color: '#52c41a' }} />
      default:
        return <FileTextOutlined style={{ color: '#722ed1' }} />
    }
  }

  const handleUpload = async () => {
    setUploading(true)
    setUploadProgress(0)
    
    try {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            return 100
          }
          return prev + 10
        })
      }, 200)

      await new Promise(resolve => setTimeout(resolve, 2000))
      
      message.success('File uploaded successfully!')
      setUploadModalVisible(false)
      form.resetFields()
    } catch (error) {
      message.error('Upload failed. Please try again.')
    } finally {
      setUploading(false)
      setUploadProgress(0)
    }
  }

  const handleCreateFolder = async (values: any) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      message.success('Folder created successfully!')
      setFolderModalVisible(false)
      folderForm.resetFields()
    } catch (error) {
      message.error('Failed to create folder')
    }
  }

  const handleDownload = (file: FileItem) => {
    message.success(`Downloading ${file.name}...`)
    setTimeout(() => {
      message.success('Download completed!')
    }, 2000)
  }

  const fileColumns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: FileItem) => (
        <div className="flex items-center space-x-2">
          {getFileIcon(record.format)}
          <div>
            <div className="font-medium">{text}</div>
            <div className="text-xs text-gray-500">{record.path}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size',
      render: (size: number) => formatFileSize(size),
    },
    {
      title: 'Downloads',
      dataIndex: 'downloads',
      key: 'downloads',
      render: (downloads: number) => (
        <Badge count={downloads} showZero style={{ backgroundColor: '#52c41a' }} />
      ),
    },
    {
      title: 'Uploaded By',
      dataIndex: 'uploadedBy',
      key: 'uploadedBy',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => {
        const statusConfig = {
          active: { color: 'green', text: 'Active' },
          archived: { color: 'orange', text: 'Archived' },
          processing: { color: 'blue', text: 'Processing' }
        }
        const config = statusConfig[status as keyof typeof statusConfig]
        return <Tag color={config.color}>{config.text}</Tag>
      },
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (text: string, record: FileItem) => (
        <Space>
          <Tooltip title="Download">
            <Button 
              type="text" 
              icon={<DownloadOutlined />} 
              onClick={() => handleDownload(record)}
            />
          </Tooltip>
          <Tooltip title="View Details">
            <Button 
              type="text" 
              icon={<EyeOutlined />} 
              onClick={() => {
                setSelectedFile(record)
                setFileDetailsModalVisible(true)
              }}
            />
          </Tooltip>
          <Tooltip title="Share">
            <Button 
              type="text" 
              icon={<ShareAltOutlined />} 
            />
          </Tooltip>
          <Tooltip title="Edit">
            <Button type="text" icon={<EditOutlined />} />
          </Tooltip>
          <Popconfirm
            title="Are you sure you want to delete this file?"
            onConfirm={() => message.success(`Deleted ${record.name}`)}
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
          <FolderOutlined className="mr-2" />
          File Management
        </Title>
        <Text type="secondary">
          Manage building plans, documents, and digital assets
        </Text>
      </div>

      {/* Storage Statistics */}
      <Row gutter={[16, 16]} className="mb-6">
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Storage"
              value={formatFileSize(storageStats.totalStorage)}
              prefix={<CloudUploadOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Used Storage"
              value={formatFileSize(storageStats.usedStorage)}
              prefix={<CloudDownloadOutlined />}
            />
            <Progress 
              percent={Math.round((storageStats.usedStorage / storageStats.totalStorage) * 100)} 
              size="small" 
              className="mt-2"
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Files"
              value={storageStats.totalFiles}
              prefix={<FileOutlined />}
            />
          </Card>
        </Col>
        <Col xs={24} sm={12} md={6}>
          <Card>
            <Statistic
              title="Total Folders"
              value={storageStats.totalFolders}
              prefix={<FolderOutlined />}
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
              key: 'files',
              label: 'Files',
              children: (
                <>
                  <div className="mb-4">
                    <Row gutter={[16, 16]} className="mb-4">
                      <Col xs={24} md={8}>
                        <Input
                          placeholder="Search files..."
                          prefix={<SearchOutlined />}
                          value={searchText}
                          onChange={(e) => setSearchText(e.target.value)}
                        />
                      </Col>
                      <Col xs={24} md={4}>
                        <Select
                          placeholder="Filter by type"
                          value={filterType}
                          onChange={setFilterType}
                          style={{ width: '100%' }}
                        >
                          <Option value="all">All Types</Option>
                          <Option value="pdf">PDF</Option>
                          <Option value="zip">ZIP</Option>
                          <Option value="image">Images</Option>
                        </Select>
                      </Col>
                      <Col xs={24} md={12}>
                        <Space>
                          <Button 
                            type="primary" 
                            icon={<UploadOutlined />}
                            onClick={() => setUploadModalVisible(true)}
                          >
                            Upload Files
                          </Button>
                          <Button 
                            icon={<FolderAddOutlined />}
                            onClick={() => setFolderModalVisible(true)}
                          >
                            New Folder
                          </Button>
                          <Button icon={<ReloadOutlined />}>
                            Refresh
                          </Button>
                        </Space>
                      </Col>
                    </Row>
                  </div>

                  <Table
                    columns={fileColumns}
                    dataSource={mockFiles}
                    rowKey="id"
                    pagination={{
                      pageSize: 10,
                      showSizeChanger: true,
                      showQuickJumper: true,
                      showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} files`
                    }}
                  />
                </>
              )
            },
            {
              key: 'recent',
              label: 'Recent Uploads',
              children: (
                <List
                  dataSource={mockFiles.slice(0, 5)}
                  renderItem={(file) => (
                    <List.Item
                      actions={[
                        <Button type="text" icon={<DownloadOutlined />} onClick={() => handleDownload(file)} />,
                        <Button type="text" icon={<EyeOutlined />} />,
                        <Button type="text" icon={<DeleteOutlined />} danger />
                      ]}
                    >
                      <List.Item.Meta
                        avatar={getFileIcon(file.format)}
                        title={file.name}
                        description={`${formatFileSize(file.size)} • Uploaded by ${file.uploadedBy} • ${new Date(file.uploadedAt).toLocaleDateString()}`}
                      />
                    </List.Item>
                  )}
                />
              )
            }
          ]}
        />
      </Card>

      {/* Upload Modal */}
      <Modal
        title="Upload Files"
        open={uploadModalVisible}
        onCancel={() => setUploadModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleUpload}
        >
          <Form.Item
            name="files"
            label="Select Files"
            rules={[{ required: true, message: 'Please select files to upload' }]}
          >
            <Upload.Dragger>
              <p className="ant-upload-drag-icon">
                <CloudUploadOutlined />
              </p>
              <p className="ant-upload-text">Click or drag files to this area to upload</p>
              <p className="ant-upload-hint">
                Support for PDF, ZIP, JPG, PNG files. Max file size: 100MB
              </p>
            </Upload.Dragger>
          </Form.Item>

          <Form.Item
            name="folder"
            label="Upload to Folder"
          >
            <Select placeholder="Select folder">
              <Option value="/plans/villas/">Villa Plans</Option>
              <Option value="/plans/bungalows/">Bungalow Plans</Option>
              <Option value="/plans/townhouses/">Townhouse Plans</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="description"
            label="Description"
          >
            <TextArea rows={3} placeholder="Enter file description..." />
          </Form.Item>

          {uploading && (
            <div className="mb-4">
              <Progress percent={uploadProgress} status="active" />
              <Text type="secondary">Uploading files...</Text>
            </div>
          )}

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit" loading={uploading}>
                Upload Files
              </Button>
              <Button onClick={() => setUploadModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* Create Folder Modal */}
      <Modal
        title="Create New Folder"
        open={folderModalVisible}
        onCancel={() => setFolderModalVisible(false)}
        footer={null}
        width={500}
      >
        <Form
          form={folderForm}
          layout="vertical"
          onFinish={handleCreateFolder}
        >
          <Form.Item
            name="name"
            label="Folder Name"
            rules={[{ required: true, message: 'Please enter folder name' }]}
          >
            <Input placeholder="Enter folder name" />
          </Form.Item>

          <Form.Item
            name="path"
            label="Parent Folder"
          >
            <Select placeholder="Select parent folder">
              <Option value="/">Root</Option>
              <Option value="/plans/">Plans</Option>
              <Option value="/plans/villas/">Villa Plans</Option>
              <Option value="/plans/bungalows/">Bungalow Plans</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Create Folder
              </Button>
              <Button onClick={() => setFolderModalVisible(false)}>
                Cancel
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>

      {/* File Details Modal */}
      <Modal
        title="File Details"
        open={fileDetailsModalVisible}
        onCancel={() => setFileDetailsModalVisible(false)}
        footer={[
          <Button key="download" type="primary" icon={<DownloadOutlined />} onClick={() => selectedFile && handleDownload(selectedFile)}>
            Download
          </Button>,
          <Button key="close" onClick={() => setFileDetailsModalVisible(false)}>
            Close
          </Button>
        ]}
        width={600}
      >
        {selectedFile && (
          <div>
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <img 
                  src={selectedFile.thumbnail || 'https://picsum.photos/200/150'} 
                  alt={selectedFile.name}
                  className="w-full rounded"
                />
              </Col>
              <Col span={16}>
                <Title level={4}>{selectedFile.name}</Title>
                <Text type="secondary">{selectedFile.description}</Text>
                
                <Divider />
                
                <Row gutter={[16, 16]}>
                  <Col span={12}>
                    <div><strong>Size:</strong> {formatFileSize(selectedFile.size)}</div>
                    <div><strong>Format:</strong> {selectedFile.format}</div>
                    <div><strong>Downloads:</strong> {selectedFile.downloads}</div>
                  </Col>
                  <Col span={12}>
                    <div><strong>Uploaded By:</strong> {selectedFile.uploadedBy}</div>
                    <div><strong>Uploaded:</strong> {new Date(selectedFile.uploadedAt).toLocaleDateString()}</div>
                    <div><strong>Status:</strong> 
                      <Tag color="green" className="ml-1">{selectedFile.status}</Tag>
                    </div>
                  </Col>
                </Row>
                
                <Divider />
                
                <div>
                  <strong>Tags:</strong>
                  <div className="mt-2">
                    {selectedFile.tags.map(tag => (
                      <Tag key={tag} className="mb-1">{tag}</Tag>
                    ))}
                  </div>
                </div>
                
                <Divider />
                
                <div>
                  <strong>Path:</strong> {selectedFile.path}
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Modal>
    </div>
  )
}

export default Files
