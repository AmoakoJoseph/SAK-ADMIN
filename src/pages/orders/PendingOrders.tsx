import { useState, useEffect } from 'react'
import { 
  Clock, 
  AlertCircle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Edit, 
  Trash2,
  Download,
  DollarSign,
  ShoppingCart,
  CreditCard,
  Calendar,
  User,
  Package,
  Filter
} from 'lucide-react'

interface PendingOrder {
  id: string
  orderNumber: string
  customerName: string
  customerEmail: string
  customerPhone?: string
  planTitle: string
  planCategory: string
  planPrice: number
  orderStatus: 'pending' | 'processing' | 'ready' | 'shipped' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded'
  paymentMethod: 'card' | 'mobile_money' | 'bank_transfer'
  orderDate: string
  estimatedDelivery?: string
  adminNotes?: string
  totalAmount: number
  taxAmount: number
  discountAmount: number
}

const PendingOrders = () => {
  const [pendingOrders, setPendingOrders] = useState<PendingOrder[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPayment, setFilterPayment] = useState('all')
  const [filterCategory, setFilterCategory] = useState('all')

  useEffect(() => {
    fetchPendingOrders()
  }, [])

  const fetchPendingOrders = async () => {
    try {
      setLoading(true)
      // Mock data - replace with real API calls
      const mockOrders: PendingOrder[] = [
        {
          id: '1',
          orderNumber: 'ORD-2024-001',
          customerName: 'Alice Johnson',
          customerEmail: 'alice.johnson@example.com',
          customerPhone: '+233 20 123 4567',
          planTitle: 'Modern 3-Bedroom House',
          planCategory: 'Residential',
          planPrice: 150.00,
          orderStatus: 'pending',
          paymentStatus: 'paid',
          paymentMethod: 'card',
          orderDate: '2024-01-15T10:30:00Z',
          estimatedDelivery: '2024-01-22T10:30:00Z',
          totalAmount: 150.00,
          taxAmount: 15.00,
          discountAmount: 0.00
        },
        {
          id: '2',
          orderNumber: 'ORD-2024-002',
          customerName: 'David Wilson',
          customerEmail: 'david.wilson@example.com',
          customerPhone: '+233 24 987 6543',
          planTitle: 'Commercial Office Complex',
          planCategory: 'Commercial',
          planPrice: 300.00,
          orderStatus: 'processing',
          paymentStatus: 'paid',
          paymentMethod: 'mobile_money',
          orderDate: '2024-01-14T14:20:00Z',
          estimatedDelivery: '2024-01-21T14:20:00Z',
          totalAmount: 300.00,
          taxAmount: 30.00,
          discountAmount: 0.00
        },
        {
          id: '3',
          orderNumber: 'ORD-2024-003',
          customerName: 'Sarah Brown',
          customerEmail: 'sarah.brown@example.com',
          customerPhone: '+233 26 555 1234',
          planTitle: 'Luxury Villa Design',
          planCategory: 'Luxury',
          planPrice: 500.00,
          orderStatus: 'ready',
          paymentStatus: 'paid',
          paymentMethod: 'bank_transfer',
          orderDate: '2024-01-13T09:15:00Z',
          estimatedDelivery: '2024-01-20T09:15:00Z',
          totalAmount: 500.00,
          taxAmount: 50.00,
          discountAmount: 25.00
        },
        {
          id: '4',
          orderNumber: 'ORD-2024-004',
          customerName: 'Michael Chen',
          customerEmail: 'michael.chen@example.com',
          customerPhone: '+233 27 777 8888',
          planTitle: 'Apartment Building Plans',
          planCategory: 'Residential',
          planPrice: 200.00,
          orderStatus: 'pending',
          paymentStatus: 'pending',
          paymentMethod: 'card',
          orderDate: '2024-01-12T16:45:00Z',
          estimatedDelivery: '2024-01-19T16:45:00Z',
          totalAmount: 200.00,
          taxAmount: 20.00,
          discountAmount: 0.00
        },
        {
          id: '5',
          orderNumber: 'ORD-2024-005',
          customerName: 'Emily Davis',
          customerEmail: 'emily.davis@example.com',
          customerPhone: '+233 28 999 1111',
          planTitle: 'Industrial Warehouse',
          planCategory: 'Industrial',
          planPrice: 400.00,
          orderStatus: 'processing',
          paymentStatus: 'paid',
          paymentMethod: 'mobile_money',
          orderDate: '2024-01-11T11:30:00Z',
          estimatedDelivery: '2024-01-18T11:30:00Z',
          totalAmount: 400.00,
          taxAmount: 40.00,
          discountAmount: 0.00
        }
      ]
      setPendingOrders(mockOrders)
    } catch (error) {
      console.error('Error fetching pending orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-100 text-warning-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'ready':
        return 'bg-success-100 text-success-800'
      case 'shipped':
        return 'bg-primary-100 text-primary-800'
      case 'delivered':
        return 'bg-green-100 text-green-800'
      case 'cancelled':
        return 'bg-danger-100 text-danger-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />
      case 'processing':
        return <AlertCircle size={16} />
      case 'ready':
        return <CheckCircle size={16} />
      case 'shipped':
        return <Package size={16} />
      case 'delivered':
        return <CheckCircle size={16} />
      case 'cancelled':
        return <XCircle size={16} />
      default:
        return <Clock size={16} />
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-100 text-warning-800'
      case 'paid':
        return 'bg-success-100 text-success-800'
      case 'failed':
        return 'bg-danger-100 text-danger-800'
      case 'refunded':
        return 'bg-gray-100 text-gray-800'
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

  const handleBulkAction = (action: 'process' | 'ship' | 'cancel') => {
    if (selectedOrders.length === 0) return
    
    const actionText = action === 'process' ? 'process' : action === 'ship' ? 'ship' : 'cancel'
    if (confirm(`Are you sure you want to ${actionText} ${selectedOrders.length} selected order(s)?`)) {
      // In real app, call API to update status
      console.log(`Bulk ${action} for orders:`, selectedOrders)
      setSelectedOrders([])
    }
  }

  const handleStatusChange = (orderId: string, newStatus: string) => {
    setPendingOrders(prev => 
      prev.map(order => 
        order.id === orderId 
          ? { ...order, orderStatus: newStatus as any }
          : order
      )
    )
  }

  const filteredOrders = pendingOrders.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.orderStatus === filterStatus
    const matchesPayment = filterPayment === 'all' || order.paymentStatus === filterPayment
    const matchesCategory = filterCategory === 'all' || order.planCategory === filterCategory
    return matchesStatus && matchesPayment && matchesCategory
  })

  const pendingCount = pendingOrders.filter(o => o.orderStatus === 'pending').length
  const processingCount = pendingOrders.filter(o => o.orderStatus === 'processing').length
  const readyCount = pendingOrders.filter(o => o.orderStatus === 'ready').length
  const totalPending = pendingOrders.length

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
          <h1 className="text-2xl font-bold text-brand-charcoal">Pending Orders</h1>
          <p className="text-brand-lightGray">Manage and process customer orders</p>
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
              <AlertCircle size={24} className="text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Processing</p>
              <p className="text-2xl font-bold text-brand-charcoal">{processingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center">
            <div className="p-3 bg-success-50 rounded-lg">
              <CheckCircle size={24} className="text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Ready</p>
              <p className="text-2xl font-bold text-brand-charcoal">{readyCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center">
            <div className="p-3 bg-primary-50 rounded-lg">
              <ShoppingCart size={24} className="text-brand-orange" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Total</p>
              <p className="text-2xl font-bold text-brand-charcoal">{totalPending}</p>
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
              <option value="processing">Processing</option>
              <option value="ready">Ready</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={filterPayment}
              onChange={(e) => setFilterPayment(e.target.value)}
              className="px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="all">All Payment</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
            </select>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="all">All Categories</option>
              <option value="Residential">Residential</option>
              <option value="Commercial">Commercial</option>
              <option value="Luxury">Luxury</option>
              <option value="Industrial">Industrial</option>
            </select>
          </div>
          
          {selectedOrders.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('process')}
                className="btn btn-primary flex items-center space-x-2"
              >
                <AlertCircle size={16} />
                <span>Process Selected ({selectedOrders.length})</span>
              </button>
              <button
                onClick={() => handleBulkAction('ship')}
                className="btn btn-success flex items-center space-x-2"
              >
                <Package size={16} />
                <span>Ship Selected ({selectedOrders.length})</span>
              </button>
              <button
                onClick={() => handleBulkAction('cancel')}
                className="btn btn-danger flex items-center space-x-2"
              >
                <XCircle size={16} />
                <span>Cancel Selected ({selectedOrders.length})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Orders Table */}
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
                        setSelectedOrders(filteredOrders.map(o => o.id))
                      } else {
                        setSelectedOrders([])
                      }
                    }}
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Plan Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-brand-lightGray">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-primary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrders(prev => [...prev, order.id])
                        } else {
                          setSelectedOrders(prev => prev.filter(id => id !== order.id))
                        }
                      }}
                      className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-brand-charcoal">{order.orderNumber}</div>
                    <div className="text-sm text-brand-lightGray">{order.planCategory}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <User size={20} className="text-brand-orange" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-brand-charcoal">{order.customerName}</div>
                        <div className="text-sm text-brand-lightGray">{order.customerEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-brand-charcoal">
                      <div className="font-medium">{order.planTitle}</div>
                      <div className="text-brand-lightGray">GHS {order.planPrice.toFixed(2)}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {getPaymentMethodIcon(order.paymentMethod)}
                        <span className="ml-1 capitalize">{order.paymentStatus}</span>
                      </span>
                      <div className="text-xs text-brand-lightGray">
                        {getPaymentMethodText(order.paymentMethod)}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                      {getStatusIcon(order.orderStatus)}
                      <span className="ml-1 capitalize">{order.orderStatus}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-charcoal">
                    <div className="font-medium">GHS {order.totalAmount.toFixed(2)}</div>
                    {order.discountAmount > 0 && (
                      <div className="text-xs text-success-600">-GHS {order.discountAmount.toFixed(2)}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-lightGray">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {new Date(order.orderDate).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-brand-orange hover:text-primary-600" title="View order">
                        <Eye size={16} />
                      </button>
                      <button className="text-primary-600 hover:text-primary-800" title="Edit order">
                        <Edit size={16} />
                      </button>
                      <button className="text-success-600 hover:text-success-800" title="Process order">
                        <CheckCircle size={16} />
                      </button>
                      <button className="text-danger-600 hover:text-danger-800" title="Cancel order">
                        <XCircle size={16} />
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
      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <ShoppingCart size={48} className="text-brand-lightGray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-brand-charcoal mb-2">No orders found</h3>
          <p className="text-brand-lightGray mb-4">
            {filterStatus !== 'all' || filterPayment !== 'all' || filterCategory !== 'all'
              ? 'Try adjusting your filters'
              : 'No orders are currently pending'
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default PendingOrders
