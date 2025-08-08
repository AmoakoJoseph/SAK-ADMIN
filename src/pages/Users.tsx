import { useState } from 'react'
import { 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Trash2, 
  User,
  Mail,
  Shield,
  Calendar,
  MoreVertical,
  CheckCircle,
  XCircle,
  Clock
} from 'lucide-react'
import { User as UserType } from '../types'
import UserForm from '../components/users/UserForm'
import UserDetails from '../components/users/UserDetails'
import ConfirmDialog from '../components/ui/ConfirmDialog'
import toast from 'react-hot-toast'

const Users = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive' | 'suspended'>('all')
  const [roleFilter, setRoleFilter] = useState<'all' | 'admin' | 'moderator' | 'user'>('all')
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingUser, setEditingUser] = useState<UserType | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deleteUser, setDeleteUser] = useState<UserType | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)
  const [viewingUser, setViewingUser] = useState<UserType | null>(null)
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)

  // Mock data - replace with real API calls
  const users: UserType[] = [
    {
      id: 'user-1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'user',
      status: 'active',
      createdAt: new Date('2024-01-15'),
      lastLogin: new Date('2024-06-20'),
    },
    {
      id: 'user-2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'moderator',
      status: 'active',
      createdAt: new Date('2024-02-10'),
      lastLogin: new Date('2024-06-19'),
    },
    {
      id: 'user-3',
      name: 'Admin User',
      email: 'admin@sakconstructions.com',
      role: 'admin',
      status: 'active',
      createdAt: new Date('2024-01-01'),
      lastLogin: new Date('2024-06-21'),
    },
    {
      id: 'user-4',
      name: 'Bob Wilson',
      email: 'bob.wilson@example.com',
      role: 'user',
      status: 'inactive',
      createdAt: new Date('2024-03-20'),
      lastLogin: new Date('2024-05-15'),
    },
    {
      id: 'user-5',
      name: 'Alice Brown',
      email: 'alice.brown@example.com',
      role: 'user',
      status: 'suspended',
      createdAt: new Date('2024-04-05'),
      lastLogin: new Date('2024-06-10'),
    },
  ]

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter
    const matchesRole = roleFilter === 'all' || user.role === roleFilter
    return matchesSearch && matchesStatus && matchesRole
  })

  const getStatusBadge = (status: UserType['status']) => {
    const styles = {
      active: 'bg-success-100 text-success-800',
      inactive: 'bg-gray-100 text-gray-800',
      suspended: 'bg-danger-100 text-danger-800',
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    )
  }

  const getRoleBadge = (role: UserType['role']) => {
    const styles = {
      admin: 'bg-purple-100 text-purple-800',
      moderator: 'bg-blue-100 text-blue-800',
      user: 'bg-gray-100 text-gray-800',
    }
    return (
      <span className={`px-2 py-1 text-xs font-medium rounded-full ${styles[role]}`}>
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </span>
    )
  }

  const getStatusIcon = (status: UserType['status']) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-success-500" />
      case 'inactive':
        return <Clock className="w-4 h-4 text-gray-500" />
      case 'suspended':
        return <XCircle className="w-4 h-4 text-danger-500" />
      default:
        return null
    }
  }

  const handleBulkAction = (action: 'activate' | 'deactivate' | 'suspend' | 'delete') => {
    console.log(`Bulk ${action} for users:`, selectedUsers)
    // Implement bulk actions
  }

  const handleAddUser = () => {
    setEditingUser(null)
    setIsFormOpen(true)
  }

  const handleEditUser = (user: UserType) => {
    setEditingUser(user)
    setIsFormOpen(true)
  }

  const handleViewUser = (user: UserType) => {
    setViewingUser(user)
    setIsDetailsOpen(true)
  }

  const handleDeleteUser = (user: UserType) => {
    setDeleteUser(user)
  }

  const handleConfirmDelete = async () => {
    if (!deleteUser) return

    setIsDeleting(true)
    try {
      // Mock API call - replace with real delete
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Remove from users array
      const updatedUsers = users.filter(u => u.id !== deleteUser.id)
      // In real app, you'd update the state from API response
      
      toast.success('User deleted successfully')
      setDeleteUser(null)
    } catch (error) {
      toast.error('Failed to delete user')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleSubmitUser = async (data: any) => {
    setIsSubmitting(true)
    try {
      // Mock API call - replace with real save
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      if (editingUser) {
        // Update existing user
        toast.success('User updated successfully')
      } else {
        // Create new user
        toast.success('User created successfully')
      }
      
      setIsFormOpen(false)
      setEditingUser(null)
    } catch (error) {
      toast.error('Failed to save user')
    } finally {
      setIsSubmitting(false)
    }
  }

  const totalUsers = users.length
  const activeUsers = users.filter(user => user.status === 'active').length
  const newUsersThisMonth = users.filter(user => 
    user.createdAt.getMonth() === new Date().getMonth()
  ).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-600">Manage users and permissions</p>
        </div>
        <button 
          onClick={handleAddUser}
          className="btn btn-primary btn-md"
        >
          <User className="w-4 h-4 mr-2" />
          Add New User
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-primary-50 rounded-lg">
              <User className="w-6 h-6 text-primary-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Users</p>
              <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-success-50 rounded-lg">
              <CheckCircle className="w-6 h-6 text-success-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Active Users</p>
              <p className="text-2xl font-bold text-gray-900">{activeUsers}</p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="flex items-center">
            <div className="p-3 bg-warning-50 rounded-lg">
              <Calendar className="w-6 h-6 text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-gray-900">{newUsersThisMonth}</p>
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
                placeholder="Search users..."
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
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>

          {/* Role Filter */}
          <div className="sm:w-48">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="input"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="moderator">Moderator</option>
              <option value="user">User</option>
            </select>
          </div>

          {/* Bulk Actions */}
          {selectedUsers.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('activate')}
                className="btn btn-secondary btn-sm"
              >
                Activate Selected
              </button>
              <button
                onClick={() => handleBulkAction('deactivate')}
                className="btn btn-secondary btn-sm"
              >
                Deactivate Selected
              </button>
              <button
                onClick={() => handleBulkAction('suspend')}
                className="btn btn-danger btn-sm"
              >
                Suspend Selected
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Users Table */}
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
                        setSelectedUsers(filteredUsers.map(u => u.id))
                      } else {
                        setSelectedUsers([])
                      }
                    }}
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    className="rounded border-gray-300"
                  />
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Last Login</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Joined</th>
                <th className="text-right py-3 px-4 font-medium text-gray-900">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers([...selectedUsers, user.id])
                        } else {
                          setSelectedUsers(selectedUsers.filter(id => id !== user.id))
                        }
                      }}
                      className="rounded border-gray-300"
                    />
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                      <div className="ml-3">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-sm text-gray-500">ID: {user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{user.email}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{getRoleBadge(user.role)}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      {getStatusIcon(user.status)}
                      <span className="ml-2">{getStatusBadge(user.status)}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {user.lastLogin ? user.lastLogin.toLocaleDateString() : 'Never'}
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {user.createdAt.toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <button 
                        onClick={() => handleViewUser(user)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="View user details"
                      >
                        <Eye size={16} />
                      </button>
                      <button 
                        onClick={() => handleEditUser(user)}
                        className="p-1 text-gray-400 hover:text-gray-600"
                        title="Edit user"
                      >
                        <Edit size={16} />
                      </button>
                      <button 
                        onClick={() => handleDeleteUser(user)}
                        className="p-1 text-gray-400 hover:text-danger-600"
                        title="Delete user"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            <User className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No users found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== 'all' || roleFilter !== 'all'
                ? 'Try adjusting your search or filter criteria.'
                : 'No users have been registered yet.'
              }
            </p>
            {!searchTerm && statusFilter === 'all' && roleFilter === 'all' && (
              <div className="mt-6">
                <button className="btn btn-primary btn-md">
                  <User className="w-4 h-4 mr-2" />
                  Add User
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* User Form Modal */}
      <UserForm
        user={editingUser}
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingUser(null)
        }}
        onSubmit={handleSubmitUser}
        isSubmitting={isSubmitting}
      />

      {/* User Details Modal */}
      <UserDetails
        user={viewingUser}
        isOpen={isDetailsOpen}
        onClose={() => {
          setIsDetailsOpen(false)
          setViewingUser(null)
        }}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deleteUser}
        onClose={() => setDeleteUser(null)}
        onConfirm={handleConfirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete "${deleteUser?.name}"? This action cannot be undone.`}
        confirmText="Delete User"
        cancelText="Cancel"
        type="danger"
        isLoading={isDeleting}
      />
    </div>
  )
}

export default Users 