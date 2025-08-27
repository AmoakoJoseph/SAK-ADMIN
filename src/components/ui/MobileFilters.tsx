import React, { useState } from 'react'
import { Input, Select, Button, Collapse, Space, Row, Col } from 'antd'
import { SearchOutlined, FilterOutlined, ReloadOutlined } from '@ant-design/icons'

const { Option } = Select
const { Panel } = Collapse

interface FilterOption {
  key: string
  label: string
  options: { value: string; label: string }[]
}

interface MobileFiltersProps {
  searchPlaceholder?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  filters?: FilterOption[]
  filterValues?: { [key: string]: string }
  onFilterChange?: (key: string, value: string) => void
  onReset?: () => void
  showSearch?: boolean
  showFilters?: boolean
}

const MobileFilters: React.FC<MobileFiltersProps> = ({
  searchPlaceholder = 'Search...',
  searchValue = '',
  onSearchChange,
  filters = [],
  filterValues = {},
  onFilterChange,
  onReset,
  showSearch = true,
  showFilters = true,
}) => {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)

  return (
    <div className="mobile-filters">
      <Row gutter={[16, 16]}>
        {/* Search */}
        {showSearch && (
          <Col xs={24}>
            <Input
              placeholder={searchPlaceholder}
              prefix={<SearchOutlined />}
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              size="large"
            />
          </Col>
        )}

        {/* Filters Toggle */}
        {showFilters && filters.length > 0 && (
          <Col xs={24}>
            <Button
              type="default"
              icon={<FilterOutlined />}
              onClick={() => setIsFiltersOpen(!isFiltersOpen)}
              block
            >
              {isFiltersOpen ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </Col>
        )}

        {/* Collapsible Filters */}
        {showFilters && filters.length > 0 && isFiltersOpen && (
          <Col xs={24}>
            <Collapse defaultActiveKey={['1']} ghost>
              <Panel header="Filters" key="1">
                <div className="space-y-3">
                  {filters.map((filter) => (
                    <div key={filter.key}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {filter.label}
                      </label>
                      <Select
                        placeholder={`Select ${filter.label}`}
                        value={filterValues[filter.key]}
                        onChange={(value) => onFilterChange?.(filter.key, value)}
                        style={{ width: '100%' }}
                        allowClear
                      >
                        {filter.options.map((option) => (
                          <Option key={option.value} value={option.value}>
                            {option.label}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  ))}
                  
                  {onReset && (
                    <Button
                      type="default"
                      icon={<ReloadOutlined />}
                      onClick={onReset}
                      block
                    >
                      Reset Filters
                    </Button>
                  )}
                </div>
              </Panel>
            </Collapse>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default MobileFilters
