import { useState, useEffect } from 'react'
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  UserPlus, 
  Edit, 
  Trash2, 
  Eye,
  Shield,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Users as UsersIcon
} from 'lucide-react'
import { adminUsersService, AdminUser } from '../services/admin/adminUsers'

const Users = () => {
  const [users, setUsers] = useState<AdminUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      setLoading(true)
      // For now, using mock data until API is ready
      const mockUsers: AdminUser[] = [
        {
          id: '1',
          name: 'John Doe',
          email: 'john.doe@example.com',
          role: 'user',
          status: 'active',
          emailVerified: true,
          createdAt: '2024-01-15',
          lastLogin: '2024-01-20',
          loginHistory: [],
          permissions: [],
          profile: {
            avatar: 'https://via.placeholder.com/40',
            phone: '+233 20 123 4567',
            address: 'Accra, Ghana',
            company: 'ABC Construction',
            position: 'Architect'
          },
          subscription: {
            plan: 'Premium',
            status: 'active',
            startDate: '2024-01-15',
            endDate: '2025-01-15',
            autoRenew: true
          },
          supportTickets: []
        },
        {
          id: '2',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          role: 'admin',
          status: 'active',
          emailVerified: true,
          createdAt: '2024-01-10',
          lastLogin: '2024-01-21',
          loginHistory: [],
          permissions: [],
          profile: {
            avatar: 'https://via.placeholder.com/40',
            phone: '+233 24 987 6543',
            address: 'Kumasi, Ghana',
            company: 'XYZ Architects',
            position: 'Senior Designer'
          },
          subscription: {
            plan: 'Enterprise',
            status: 'active',
            startDate: '2024-01-10',
            endDate: '2025-01-10',
            autoRenew: true
          },
          supportTickets: []
        },
        {
          id: '3',
          name: 'Bob Wilson',
          email: 'bob.wilson@example.com',
          role: 'user',
          status: 'suspended',
          emailVerified: false,
          createdAt: '2024-01-05',
          lastLogin: '2024-01-18',
          loginHistory: [],
          permissions: [],
          profile: {
            avatar: 'https://via.placeholder.com/40',
            phone: '+233 26 555 1234',
            address: 'Tema, Ghana',
            company: 'DEF Engineering',
            position: 'Engineer'
          },
          subscription: {
            plan: 'Basic',
            status: 'expired',
            startDate: '2024-01-05',
            endDate: '2024-02-05',
            autoRenew: false
          },
          supportTickets: []
        }
      ]
      setUsers(mockUsers)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-800'
      case 'suspended':
        return 'bg-danger-100 text-danger-800'
      case 'pending':
        return 'bg-warning-100 text-warning-800'
      case 'banned':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'super_admin':
        return 'bg-purple-100 text-purple-800'
      case 'admin':
        return 'bg-blue-100 text-blue-800'
      case 'moderator':
        return 'bg-green-100 text-green-800'
      case 'support':
        return 'bg-orange-100 text-orange-800'
      case 'user':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getSubscriptionStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-800'
      case 'expired':
        return 'bg-danger-100 text-danger-800'
      case 'cancelled':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    
    return matchesSearch && matchesRole && matchesStatus
  })

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
          <h1 className="text-2xl font-bold text-brand-charcoal">Users Management</h1>
          <p className="text-brand-lightGray">Manage user accounts, roles, and permissions</p>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn btn-secondary flex items-center space-x-2">
            <Download size={16} />
            <span>Export Users</span>
          </button>
          <button className="btn btn-primary flex items-center space-x-2">
            <UserPlus size={16} />
            <span>Add User</span>
          </button>
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
                placeholder="Search users by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="all">All Roles</option>
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="support">Support</option>
              <option value="user">User</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
              <option value="banned">Banned</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-brand-lightGray">
            <thead className="bg-primary-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Subscription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-brand-lightGray">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-primary-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img 
                          className="h-10 w-10 rounded-full" 
                          src={user.profile.avatar} 
                          alt={user.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-brand-charcoal">{user.name}</div>
                        <div className="text-sm text-brand-lightGray">{user.email}</div>
                        <div className="flex items-center space-x-2 text-xs text-brand-lightGray">
                          {user.profile.phone && (
                            <span className="flex items-center">
                              <Phone size={12} className="mr-1" />
                              {user.profile.phone}
                            </span>
                          )}
                          {user.profile.company && (
                            <span className="flex items-center">
                              <UsersIcon size={12} className="mr-1" />
                              {user.profile.company}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      <Shield size={12} className="mr-1" />
                      {user.role.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {user.status === 'active' && <CheckCircle size={12} className="mr-1" />}
                      {user.status === 'suspended' && <XCircle size={12} className="mr-1" />}
                      {user.status === 'pending' && <Clock size={12} className="mr-1" />}
                      <span className="capitalize">{user.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-brand-charcoal">
                      <div className="font-medium">{user.subscription?.plan || 'No Plan'}</div>
                      {user.subscription && (
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getSubscriptionStatusColor(user.subscription.status)}`}>
                          {user.subscription.status}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-lightGray">
                    {user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-lightGray">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-brand-orange hover:text-primary-600" title="View user">
                        <Eye size={16} />
                      </button>
                      <button className="text-brand-charcoal hover:text-primary-600" title="Edit user">
                        <Edit size={16} />
                      </button>
                      <button className="text-danger-600 hover:text-danger-800" title="Delete user">
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
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <UsersIcon size={48} className="text-brand-lightGray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-brand-charcoal mb-2">No users found</h3>
          <p className="text-brand-lightGray mb-4">
            {searchTerm || roleFilter !== 'all' || statusFilter !== 'all' 
              ? 'Try adjusting your search or filters'
              : 'Get started by adding your first user'
            }
          </p>
          <button className="btn btn-primary">
            <UserPlus size={16} className="mr-2" />
            Add User
          </button>
        </div>
      )}
    </div>
  )
}

export default Users 