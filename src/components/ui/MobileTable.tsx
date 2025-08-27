import React from 'react'
import { Card, Tag, Button, Tooltip, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons'

interface MobileTableProps {
  data: any[]
  columns: any[]
  onEdit?: (record: any) => void
  onDelete?: (record: any) => void
  onView?: (record: any) => void
  rowKey?: string
}

const MobileTable: React.FC<MobileTableProps> = ({
  data,
  columns,
  onEdit,
  onDelete,
  onView,
  rowKey = 'id'
}) => {
  const getStatusColor = (status: string) => {
    const statusConfig: { [key: string]: string } = {
      active: 'green',
      inactive: 'red',
      pending: 'orange',
      completed: 'green',
      published: 'green',
      draft: 'gray',
      'pending review': 'orange',
    }
    return statusConfig[status.toLowerCase()] || 'default'
  }

  const renderValue = (value: any, column: any, record: any) => {
    if (column.render) {
      return column.render(value, record)
    }
    
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No'
    }
    
    if (column.dataIndex === 'status') {
      return (
        <Tag color={getStatusColor(value)}>
          {value}
        </Tag>
      )
    }
    
    return value
  }

  return (
    <div className="space-y-3">
      {data.map((record) => (
        <Card key={record[rowKey]} size="small" className="mobile-list-item">
          <div className="space-y-2">
            {columns.map((column) => {
              if (column.key === 'actions') return null
              
              const value = record[column.dataIndex]
              if (!value && value !== 0) return null
              
              return (
                <div key={column.key} className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm font-medium">
                    {column.title}:
                  </span>
                  <span className="text-gray-900 text-sm">
                    {renderValue(value, column, record)}
                  </span>
                </div>
              )
            })}
            
            {/* Actions */}
            <div className="flex justify-end space-x-2 pt-2 border-t border-gray-100">
              {onView && (
                <Tooltip title="View Details">
                  <Button
                    type="text"
                    size="small"
                    icon={<EyeOutlined />}
                    onClick={() => onView(record)}
                  />
                </Tooltip>
              )}
              
              {onEdit && (
                <Tooltip title="Edit">
                  <Button
                    type="text"
                    size="small"
                    icon={<EditOutlined />}
                    onClick={() => onEdit(record)}
                  />
                </Tooltip>
              )}
              
              {onDelete && (
                <Popconfirm
                  title="Are you sure you want to delete this item?"
                  onConfirm={() => onDelete(record)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip title="Delete">
                    <Button
                      type="text"
                      size="small"
                      icon={<DeleteOutlined />}
                      danger
                    />
                  </Tooltip>
                </Popconfirm>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}

export default MobileTable
