import { useState, useEffect } from 'react'
import { 
  RotateCcw, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Edit, 
  Clock,
  DollarSign,
  ShoppingCart,
  CreditCard,
  Calendar,
  User,
  FileText,
  Filter,
  Download,
  MessageSquare
} from 'lucide-react'

interface Refund {
  id: string
  refundNumber: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  planTitle: string
  planCategory: string
  originalAmount: number
  refundAmount: number
  refundReason: string
  refundStatus: 'pending' | 'approved' | 'rejected' | 'processed' | 'cancelled'
  refundType: 'full' | 'partial'
  paymentMethod: 'card' | 'mobile_money' | 'bank_transfer'
  orderDate: string
  refundRequestDate: string
  processedDate?: string
  adminNotes?: string
  customerNotes?: string
  attachments?: string[]
}

const Refunds = () => {
  const [refunds, setRefunds] = useState<Refund[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedRefunds, setSelectedRefunds] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterType, setFilterType] = useState('all')
  const [filterReason, setFilterReason] = useState('all')

  useEffect(() => {
    fetchRefunds()
  }, [])

  const fetchRefunds = async () => {
    try {
      setLoading(true)
      // Mock data - replace with real API calls
      const mockRefunds: Refund[] = [
        {
          id: '1',
          refundNumber: 'REF-2024-001',
          orderNumber: 'ORD-2024-001',
          customerName: 'Alice Johnson',
          customerEmail: 'alice.johnson@example.com',
          customerPhone: '+233 20 123 4567',
          planTitle: 'Modern 3-Bedroom House',
          planCategory: 'Residential',
          originalAmount: 150.00,
          refundAmount: 150.00,
          refundReason: 'Customer changed mind',
          refundStatus: 'pending',
          refundType: 'full',
          paymentMethod: 'card',
          orderDate: '2024-01-15T10:30:00Z',
          refundRequestDate: '2024-01-16T14:20:00Z',
          customerNotes: 'I found a better plan elsewhere'
        },
        {
          id: '2',
          refundNumber: 'REF-2024-002',
          orderNumber: 'ORD-2024-002',
          customerName: 'David Wilson',
          customerEmail: 'david.wilson@example.com',
          customerPhone: '+233 24 987 6543',
          planTitle: 'Commercial Office Complex',
          planCategory: 'Commercial',
          originalAmount: 300.00,
          refundAmount: 150.00,
          refundReason: 'Plan quality issues',
          refundStatus: 'approved',
          refundType: 'partial',
          paymentMethod: 'mobile_money',
          orderDate: '2024-01-14T14:20:00Z',
          refundRequestDate: '2024-01-17T09:15:00Z',
          processedDate: '2024-01-18T11:30:00Z',
          adminNotes: 'Customer provided valid evidence of quality issues',
          customerNotes: 'The plans were not up to the expected standard'
        },
        {
          id: '3',
          refundNumber: 'REF-2024-003',
          orderNumber: 'ORD-2024-003',
          customerName: 'Sarah Brown',
          customerEmail: 'sarah.brown@example.com',
          customerPhone: '+233 26 555 1234',
          planTitle: 'Luxury Villa Design',
          planCategory: 'Luxury',
          originalAmount: 500.00,
          refundAmount: 500.00,
          refundReason: 'Duplicate purchase',
          refundStatus: 'processed',
          refundType: 'full',
          paymentMethod: 'bank_transfer',
          orderDate: '2024-01-13T09:15:00Z',
          refundRequestDate: '2024-01-16T16:45:00Z',
          processedDate: '2024-01-17T10:20:00Z',
          adminNotes: 'Confirmed duplicate order, full refund processed',
          customerNotes: 'I accidentally ordered this twice'
        },
        {
          id: '4',
          refundNumber: 'REF-2024-004',
          orderNumber: 'ORD-2024-004',
          customerName: 'Michael Chen',
          customerEmail: 'michael.chen@example.com',
          customerPhone: '+233 27 777 8888',
          planTitle: 'Apartment Building Plans',
          planCategory: 'Residential',
          originalAmount: 200.00,
          refundAmount: 200.00,
          refundReason: 'Technical issues',
          refundStatus: 'rejected',
          refundType: 'full',
          paymentMethod: 'card',
          orderDate: '2024-01-12T16:45:00Z',
          refundRequestDate: '2024-01-15T11:30:00Z',
          adminNotes: 'Customer was able to download and use the plans successfully',
          customerNotes: 'I had trouble downloading the files'
        },
        {
          id: '5',
          refundNumber: 'REF-2024-005',
          orderNumber: 'ORD-2024-005',
          customerName: 'Emily Davis',
          customerEmail: 'emily.davis@example.com',
          customerPhone: '+233 28 999 1111',
          planTitle: 'Industrial Warehouse',
          planCategory: 'Industrial',
          originalAmount: 400.00,
          refundAmount: 200.00,
          refundReason: 'Plan not suitable',
          refundStatus: 'pending',
          refundType: 'partial',
          paymentMethod: 'mobile_money',
          orderDate: '2024-01-11T11:30:00Z',
          refundRequestDate: '2024-01-18T13:45:00Z',
          customerNotes: 'The plans don\'t meet my specific requirements'
        }
      ]
      setRefunds(mockRefunds)
    } catch (error) {
      console.error('Error fetching refunds:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-100 text-warning-800'
      case 'approved':
        return 'bg-blue-100 text-blue-800'
      case 'rejected':
        return 'bg-danger-100 text-danger-800'
      case 'processed':
        return 'bg-success-100 text-success-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />
      case 'approved':
        return <CheckCircle size={16} />
      case 'rejected':
        return <XCircle size={16} />
      case 'processed':
        return <CheckCircle size={16} />
      case 'cancelled':
        return <XCircle size={16} />
      default:
        return <Clock size={16} />
    }
  }

  const getRefundTypeColor = (type: string) => {
    switch (type) {
      case 'full':
        return 'bg-red-100 text-red-800'
      case 'partial':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'card':
        return <CreditCard size={16} />
      case 'mobile_money':
        return <ShoppingCart size={16} />
      case 'bank_transfer':
        return <DollarSign size={16} />
      default:
        return <CreditCard size={16} />
    }
  }

  const getPaymentMethodText = (method: string) => {
    switch (method) {
      case 'card':
        return 'Credit Card'
      case 'mobile_money':
        return 'Mobile Money'
      case 'bank_transfer':
        return 'Bank Transfer'
      default:
        return method
    }
  }

  const handleBulkAction = (action: 'approve' | 'reject' | 'process') => {
    if (selectedRefunds.length === 0) return
    
    const actionText = action === 'approve' ? 'approve' : action === 'reject' ? 'reject' : 'process'
    if (confirm(`Are you sure you want to ${actionText} ${selectedRefunds.length} selected refund(s)?`)) {
      // In real app, call API to update status
      console.log(`Bulk ${action} for refunds:`, selectedRefunds)
      setSelectedRefunds([])
    }
  }

  const handleStatusChange = (refundId: string, newStatus: string) => {
    setRefunds(prev => 
      prev.map(refund => 
        refund.id === refundId 
          ? { ...refund, refundStatus: newStatus as any }
          : refund
      )
    )
  }

  const filteredRefunds = refunds.filter(refund => {
    const matchesStatus = filterStatus === 'all' || refund.refundStatus === filterStatus
    const matchesType = filterType === 'all' || refund.refundType === filterType
    const matchesReason = filterReason === 'all' || refund.refundReason === filterReason
    return matchesStatus && matchesType && matchesReason
  })

  const pendingCount = refunds.filter(r => r.refundStatus === 'pending').length
  const approvedCount = refunds.filter(r => r.refundStatus === 'approved').length
  const processedCount = refunds.filter(r => r.refundStatus === 'processed').length
  const totalRefunds = refunds.length

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal">Refunds & Disputes</h1>
          <p className="text-brand-lightGray">Manage customer refund requests and resolve disputes</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center">
            <div className="p-3 bg-warning-50 rounded-lg">
              <Clock size={24} className="text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Pending</p>
              <p className="text-2xl font-bold text-brand-charcoal">{pendingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center">
            <div className="p-3 bg-blue-50 rounded-lg">
              <CheckCircle size={24} className="text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Approved</p>
              <p className="text-2xl font-bold text-brand-charcoal">{approvedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center">
            <div className="p-3 bg-success-50 rounded-lg">
              <RotateCcw size={24} className="text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Processed</p>
              <p className="text-2xl font-bold text-brand-charcoal">{processedCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center">
            <div className="p-3 bg-primary-50 rounded-lg">
              <DollarSign size={24} className="text-brand-orange" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Total</p>
              <p className="text-2xl font-bold text-brand-charcoal">{totalRefunds}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Bulk Actions */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
              <option value="processed">Processed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="full">Full Refund</option>
              <option value="partial">Partial Refund</option>
            </select>
            <select
              value={filterReason}
              onChange={(e) => setFilterReason(e.target.value)}
              className="px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="all">All Reasons</option>
              <option value="Customer changed mind">Customer changed mind</option>
              <option value="Plan quality issues">Plan quality issues</option>
              <option value="Duplicate purchase">Duplicate purchase</option>
              <option value="Technical issues">Technical issues</option>
              <option value="Plan not suitable">Plan not suitable</option>
            </select>
          </div>
          
          {selectedRefunds.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('approve')}
                className="btn btn-success flex items-center space-x-2"
              >
                <CheckCircle size={16} />
                <span>Approve Selected ({selectedRefunds.length})</span>
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="btn btn-danger flex items-center space-x-2"
              >
                <XCircle size={16} />
                <span>Reject Selected ({selectedRefunds.length})</span>
              </button>
              <button
                onClick={() => handleBulkAction('process')}
                className="btn btn-primary flex items-center space-x-2"
              >
                <RotateCcw size={16} />
                <span>Process Selected ({selectedRefunds.length})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Refunds Table */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-lightGray">
            <thead className="bg-primary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  <input
                    type="checkbox"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedRefunds(filteredRefunds.map(r => r.id))
                      } else {
                        setSelectedRefunds([])
                      }
                    }}
                    checked={selectedRefunds.length === filteredRefunds.length && filteredRefunds.length > 0}
                    className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Refund
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Plan Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Refund Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Request Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-brand-lightGray">
              {filteredRefunds.map((refund) => (
                <tr key={refund.id} className="hover:bg-primary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedRefunds.includes(refund.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedRefunds(prev => [...prev, refund.id])
                        } else {
                          setSelectedRefunds(prev => prev.filter(id => id !== refund.id))
                        }
                      }}
                      className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-brand-charcoal">{refund.refundNumber}</div>
                    <div className="text-sm text-brand-lightGray">Order: {refund.orderNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <User size={20} className="text-brand-orange" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-brand-charcoal">{refund.customerName}</div>
                        <div className="text-sm text-brand-lightGray">{refund.customerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-brand-charcoal">
                      <div className="font-medium">{refund.planTitle}</div>
                      <div className="text-brand-lightGray">{refund.planCategory}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRefundTypeColor(refund.refundType)}`}>
                        <RotateCcw size={12} className="mr-1" />
                        {refund.refundType.charAt(0).toUpperCase() + refund.refundType.slice(1)}
                      </span>
                      <div className="text-sm text-brand-charcoal">
                        <div>Original: GHS {refund.originalAmount.toFixed(2)}</div>
                        <div>Refund: GHS {refund.refundAmount.toFixed(2)}</div>
                      </div>
                      <div className="text-xs text-brand-lightGray max-w-xs truncate" title={refund.refundReason}>
                        {refund.refundReason}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(refund.refundStatus)}`}>
                      {getStatusIcon(refund.refundStatus)}
                      <span className="ml-1 capitalize">{refund.refundStatus}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <div className="flex items-center">
                        {getPaymentMethodIcon(refund.paymentMethod)}
                        <span className="ml-1 text-xs text-brand-lightGray">
                          {getPaymentMethodText(refund.paymentMethod)}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-lightGray">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {new Date(refund.refundRequestDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-brand-orange hover:text-primary-600" title="View refund details">
                        <Eye size={16} />
                      </button>
                      <button className="text-primary-600 hover:text-primary-800" title="Edit refund">
                        <Edit size={16} />
                      </button>
                      <button className="text-success-600 hover:text-success-800" title="Approve refund">
                        <CheckCircle size={16} />
                      </button>
                      <button className="text-danger-600 hover:text-danger-800" title="Reject refund">
                        <XCircle size={16} />
                      </button>
                      <button className="text-blue-600 hover:text-blue-800" title="View notes">
                        <MessageSquare size={16} />
                      </button>
                      <button className="text-brand-charcoal hover:text-primary-600" title="Download">
                        <Download size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Empty State */}
      {filteredRefunds.length === 0 && (
        <div className="text-center py-12">
          <RotateCcw size={48} className="text-brand-lightGray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-brand-charcoal mb-2">No refunds found</h3>
          <p className="text-brand-lightGray mb-4">
            {filterStatus !== 'all' || filterType !== 'all' || filterReason !== 'all'
              ? 'Try adjusting your filters'
              : 'No refund requests are currently pending'
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default Refunds
