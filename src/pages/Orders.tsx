import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Eye, 
  CheckCircle, 
  XCircle, 
  Clock,
  DollarSign,
  User,
  Calendar
} from 'lucide-react'
import { Order } from '../types'

const Orders = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'paid' | 'completed' | 'cancelled' | 'refunded'>('all')
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])

  // Mock data - replace with real API calls
  const orders: Order[] = [
    {
      id: 'ORD-001',
      userId: 'user-1',
      planId: 'plan-1',
      amount: 299.99,
      status: 'completed',
      paymentMethod: 'Credit Card',
      createdAt: new Date('2024-06-15'),
      updatedAt: new Date('2024-06-16'),
    },
    {
      id: 'ORD-002',
      userId: 'user-2',
      planId: 'plan-2',
      amount: 599.99,
      status: 'pending',
      paymentMethod: 'PayPal',
      createdAt: new Date('2024-06-20'),
      updatedAt: new Date('2024-06-20'),
    },
    {
      id: 'ORD-003',
      userId: 'user-3',
      planId: 'plan-3',
      amount: 399.99,
      status: 'paid',
      paymentMethod: 'Credit Card',
      createdAt: new Date('2024-06-18'),
      updatedAt: new Date('2024-06-19'),
    },
    {
      id: 'ORD-004',
      userId: 'user-4',
      planId: 'plan-1',
      amount: 299.99,
      status: 'cancelled',
      paymentMethod: 'Credit Card',
      createdAt: new Date('2024-06-10'),
      updatedAt: new Date('2024-06-11'),
    },
  ]

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: Order['status']) => {
    const styles = {
      pending: 'bg-warning-100 text-warning-800',
      paid: 'bg-primary-100 text-primary-800',
      completed: 'bg-success-100 text-success-800',
      cancelled: 'bg-danger-100 text-danger-800',
      refunded: 'bg-gray-100 text-gray-800',
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-4 h-4 text-warning-500" />
      case 'paid':
        return <DollarSign className="w-4 h-4 text-primary-500" />
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-success-500" />
      case 'cancelled':
        return <XCircle className="w-4 h-4 text-danger-500" />
      case 'refunded':
        return <XCircle className="w-4 h-4 text-gray-500" />
      default:
        return null
    }
  }

  const handleBulkAction = (action: 'approve' | 'reject' | 'refund') => {
    console.log(`Bulk ${action} for orders:`, selectedOrders)
    // Implement bulk actions
  }

  const totalRevenue = orders
    .filter(order => order.status === 'completed' || order.status === 'paid')
    .reduce((sum, order) => sum + order.amount, 0)

  const pendingOrders = orders.filter(order => order.status === 'pending').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Orders Management</h1>
          <p className="text-gray-600">Process orders and customer support</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-primary-50 rounded-lg">
              <DollarSign className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-warning-50 rounded-lg">
              <Clock className="w-6 h-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Pending Orders</p>
              <p className="text-2xl font-bold text-gray-900">{pendingOrders}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-success-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Completed Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter(o => o.status === 'completed').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="card">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input pl-10"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="sm:w-48">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="input"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="paid">Paid</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedOrders.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('approve')}
                className="btn btn-secondary btn-sm"
              >
                Approve Selected
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="btn btn-secondary btn-sm"
              >
                Reject Selected
              </button>
              <button
                onClick={() => handleBulkAction('refund')}
                className="btn btn-danger btn-sm"
              >
                Refund Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Orders Table */}
      <div className="card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4">
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
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Order ID</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Customer</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Plan</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Amount</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Payment</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedOrders.includes(order.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedOrders([...selectedOrders, order.id])
                        } else {
                          setSelectedOrders(selectedOrders.filter(id => id !== order.id))
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-gray-900">{order.id}</div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <User className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">User {order.userId}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">Plan {order.planId}</td>
                  <td className="py-3 px-4 text-sm font-medium">${order.amount}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {getStatusIcon(order.status)}
                      <span className="ml-2">{getStatusBadge(order.status)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">{order.paymentMethod}</td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {order.createdAt.toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="p-1 text-gray-400 hover:text-gray-600">
                        <Eye size={16} />
                      </button>
                      {order.status === 'pending' && (
                        <>
                          <button className="p-1 text-success-400 hover:text-success-600">
                            <CheckCircle size={16} />
                          </button>
                          <button className="p-1 text-danger-400 hover:text-danger-600">
                            <XCircle size={16} />
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'No orders have been placed yet.'
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Orders 