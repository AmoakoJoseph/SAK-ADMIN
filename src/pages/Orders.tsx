import { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  DollarSign,
  ShoppingCart,
  CreditCard,
  Calendar,
  User
} from 'lucide-react'
import { adminOrdersService, Order } from '../services/admin/adminOrders'

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('all')

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      setLoading(true)
      // For now, using mock data until API is ready
      const mockOrders: Order[] = [
        {
          id: '1',
          orderNumber: 'ORD-2024-001',
          userId: 'user-1',
          userName: 'John Doe',
          userEmail: 'john.doe@example.com',
          planId: 'plan-1',
          planTitle: 'Modern Villa Design',
          planPrice: 2500,
          status: 'completed',
          paymentStatus: 'paid',
          paymentMethod: 'stripe',
          paymentId: 'pi_123456789',
          amount: 2500,
          currency: 'USD',
          createdAt: '2024-01-15T10:30:00Z',
          updatedAt: '2024-01-15T11:00:00Z',
          completedAt: '2024-01-15T11:00:00Z',
          adminNotes: 'Customer requested expedited processing'
        },
        {
          id: '2',
          orderNumber: 'ORD-2024-002',
          userId: 'user-2',
          userName: 'Jane Smith',
          userEmail: 'jane.smith@example.com',
          planId: 'plan-2',
          planTitle: 'Commercial Office Complex',
          planPrice: 5000,
          status: 'pending',
          paymentStatus: 'pending',
          paymentMethod: 'paypal',
          amount: 5000,
          currency: 'USD',
          createdAt: '2024-01-16T14:20:00Z',
          updatedAt: '2024-01-16T14:20:00Z'
        },
        {
          id: '3',
          orderNumber: 'ORD-2024-003',
          userId: 'user-3',
          userName: 'Bob Wilson',
          userEmail: 'bob.wilson@example.com',
          planId: 'plan-3',
          planTitle: 'Sustainable Home',
          planPrice: 3500,
          status: 'processing',
          paymentStatus: 'paid',
          paymentMethod: 'stripe',
          paymentId: 'pi_987654321',
          amount: 3500,
          currency: 'USD',
          createdAt: '2024-01-17T09:15:00Z',
          updatedAt: '2024-01-17T09:15:00Z'
        },
        {
          id: '4',
          orderNumber: 'ORD-2024-004',
          userId: 'user-4',
          userName: 'Alice Brown',
          userEmail: 'alice.brown@example.com',
          planId: 'plan-4',
          planTitle: 'Landscape Garden Design',
          planPrice: 1200,
          status: 'cancelled',
          paymentStatus: 'refunded',
          paymentMethod: 'stripe',
          paymentId: 'pi_456789123',
          amount: 1200,
          currency: 'USD',
          createdAt: '2024-01-18T16:45:00Z',
          updatedAt: '2024-01-19T10:30:00Z',
          refundReason: 'Customer changed requirements',
          refundAmount: 1200,
          refundDate: '2024-01-19T10:30:00Z'
        }
      ]
      setOrders(mockOrders)
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-100 text-success-800'
      case 'processing':
        return 'bg-blue-100 text-blue-800'
      case 'pending':
        return 'bg-warning-100 text-warning-800'
      case 'cancelled':
        return 'bg-danger-100 text-danger-800'
      case 'refunded':
        return 'bg-gray-100 text-gray-800'
      case 'failed':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-success-100 text-success-800'
      case 'pending':
        return 'bg-warning-100 text-warning-800'
      case 'failed':
        return 'bg-danger-100 text-danger-800'
      case 'refunded':
        return 'bg-gray-100 text-gray-800'
      case 'partially_refunded':
        return 'bg-orange-100 text-orange-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle size={16} />
      case 'processing':
        return <Clock size={16} />
      case 'pending':
        return <AlertCircle size={16} />
      case 'cancelled':
        return <XCircle size={16} />
      case 'refunded':
        return <DollarSign size={16} />
      case 'failed':
        return <XCircle size={16} />
      default:
        return <Clock size={16} />
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'stripe':
        return <CreditCard size={16} />
      case 'paypal':
        return <DollarSign size={16} />
      case 'manual':
        return <User size={16} />
      default:
        return <CreditCard size={16} />
    }
  }

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.planTitle.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    const matchesPaymentStatus = paymentStatusFilter === 'all' || order.paymentStatus === paymentStatusFilter
    
    return matchesSearch && matchesStatus && matchesPaymentStatus
  })

  const totalRevenue = filteredOrders
    .filter(order => order.paymentStatus === 'paid')
    .reduce((sum, order) => sum + order.amount, 0)

  const totalOrders = filteredOrders.length
  const pendingOrders = filteredOrders.filter(order => order.status === 'pending').length
  const completedOrders = filteredOrders.filter(order => order.status === 'completed').length

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
          <h1 className="text-2xl font-bold text-brand-charcoal">Orders Management</h1>
          <p className="text-brand-lightGray">Manage customer orders, payments, and fulfillment</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn btn-secondary flex items-center space-x-2">
            <Download size={16} />
            <span>Export Orders</span>
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center">
            <div className="p-3 bg-primary-50 rounded-lg">
              <ShoppingCart size={24} className="text-brand-orange" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Total Orders</p>
              <p className="text-2xl font-bold text-brand-charcoal">{totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center">
            <div className="p-3 bg-success-50 rounded-lg">
              <DollarSign size={24} className="text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Total Revenue</p>
              <p className="text-2xl font-bold text-brand-charcoal">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center">
            <div className="p-3 bg-warning-50 rounded-lg">
              <Clock size={24} className="text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Pending Orders</p>
              <p className="text-2xl font-bold text-brand-charcoal">{pendingOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center">
            <div className="p-3 bg-success-50 rounded-lg">
              <CheckCircle size={24} className="text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Completed</p>
              <p className="text-2xl font-bold text-brand-charcoal">{completedOrders}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brand-lightGray" size={20} />
              <input
                type="text"
                placeholder="Search orders by number, customer, or plan..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
              <option value="failed">Failed</option>
            </select>
            <select
              value={paymentStatusFilter}
              onChange={(e) => setPaymentStatusFilter(e.target.value)}
              className="px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="all">All Payment Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="failed">Failed</option>
              <option value="refunded">Refunded</option>
              <option value="partially_refunded">Partially Refunded</option>
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-lightGray">
            <thead className="bg-primary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Payment
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
                    <div className="text-sm font-medium text-brand-charcoal">{order.orderNumber}</div>
                    <div className="text-xs text-brand-lightGray">ID: {order.id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-brand-charcoal">{order.userName}</div>
                    <div className="text-xs text-brand-lightGray">{order.userEmail}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-brand-charcoal">{order.planTitle}</div>
                    <div className="text-xs text-brand-lightGray">${order.planPrice.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-bold text-brand-charcoal">${order.amount.toLocaleString()}</div>
                    <div className="text-xs text-brand-lightGray">{order.currency}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      <span className="ml-1 capitalize">{order.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {getPaymentMethodIcon(order.paymentMethod)}
                        <span className="ml-1 capitalize">{order.paymentStatus}</span>
                      </span>
                    </div>
                    <div className="text-xs text-brand-lightGray mt-1">
                      {order.paymentMethod.replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-lightGray">
                    <div>{new Date(order.createdAt).toLocaleDateString()}</div>
                    <div className="text-xs">{new Date(order.createdAt).toLocaleTimeString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-brand-orange hover:text-primary-600" title="View order">
                        <Eye size={16} />
                      </button>
                      <button className="text-brand-charcoal hover:text-primary-600" title="Edit order">
                        <Edit size={16} />
                      </button>
                      <button className="text-danger-600 hover:text-danger-800" title="Delete order">
                        <Trash2 size={16} />
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
            {searchTerm || statusFilter !== 'all' || paymentStatusFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'No orders have been placed yet'
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default Orders 