import React, { useState } from 'react'
import { Button, Tooltip } from 'antd'
import { PlusOutlined, CloseOutlined } from '@ant-design/icons'

interface FABAction {
  key: string
  label: string
  icon: React.ReactNode
  onClick: () => void
  color?: string
}

interface MobileFABProps {
  actions: FABAction[]
  mainIcon?: React.ReactNode
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
}

const MobileFAB: React.FC<MobileFABProps> = ({
  actions,
  mainIcon = <PlusOutlined />,
  position = 'bottom-right'
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const positionClasses = {
    'bottom-right': 'bottom-20 right-4',
    'bottom-left': 'bottom-20 left-4',
    'top-right': 'top-20 right-4',
    'top-left': 'top-20 left-4',
  }

  return (
    <div className={`mobile-actions ${positionClasses[position]}`}>
      {/* Action Buttons */}
      {isOpen && (
        <div className="space-y-2 mb-2">
          {actions.map((action) => (
            <Tooltip key={action.key} title={action.label} placement="left">
              <Button
                type="primary"
                shape="circle"
                size="large"
                icon={action.icon}
                onClick={action.onClick}
                style={{ 
                  backgroundColor: action.color || '#f97316',
                  borderColor: action.color || '#f97316',
                  width: 48,
                  height: 48,
                }}
                className="mobile-fab-action"
              />
            </Tooltip>
          ))}
        </div>
      )}

      {/* Main FAB Button */}
      <Tooltip title={isOpen ? 'Close' : 'Actions'} placement="left">
        <Button
          type="primary"
          shape="circle"
          size="large"
          icon={isOpen ? <CloseOutlined /> : mainIcon}
          onClick={() => setIsOpen(!isOpen)}
          className="mobile-fab"
          style={{ width: 56, height: 56 }}
        />
      </Tooltip>
    </div>
  )
}

export default MobileFAB
