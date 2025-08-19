import { useState, useEffect } from 'react'
import { 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock, 
  User, 
  Mail,
  Calendar,
  AlertCircle,
  Download,
  Shield,
  Phone
} from 'lucide-react'

interface PendingUser {
  id: string
  name: string
  email: string
  phone?: string
  company?: string
  position?: string
  status: 'pending' | 'reviewing' | 'approved' | 'rejected'
  submittedAt: string
  documents: string[]
  subscriptionPlan: string
  adminNotes?: string
}

const PendingApproval = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])
  const [filterStatus, setFilterStatus] = useState('all')
  const [filterPlan, setFilterPlan] = useState('all')

  useEffect(() => {
    fetchPendingUsers()
  }, [])

  const fetchPendingUsers = async () => {
    try {
      setLoading(true)
      // Mock data - replace with real API calls
      const mockUsers: PendingUser[] = [
        {
          id: '1',
          name: 'Alice Johnson',
          email: 'alice.johnson@example.com',
          phone: '+233 20 123 4567',
          company: 'ABC Architects',
          position: 'Senior Architect',
          status: 'pending',
          submittedAt: '2024-01-15T10:30:00Z',
          documents: ['id_card.pdf', 'business_license.pdf', 'portfolio.pdf'],
          subscriptionPlan: 'Premium'
        },
        {
          id: '2',
          name: 'David Wilson',
          email: 'david.wilson@example.com',
          phone: '+233 24 987 6543',
          company: 'XYZ Construction',
          position: 'Project Manager',
          status: 'reviewing',
          submittedAt: '2024-01-14T14:20:00Z',
          documents: ['passport.pdf', 'certification.pdf'],
          subscriptionPlan: 'Enterprise'
        },
        {
          id: '3',
          name: 'Sarah Brown',
          email: 'sarah.brown@example.com',
          phone: '+233 26 555 1234',
          company: 'DEF Engineering',
          position: 'Civil Engineer',
          status: 'pending',
          submittedAt: '2024-01-13T09:15:00Z',
          documents: ['license.pdf', 'degree.pdf', 'experience.pdf'],
          subscriptionPlan: 'Basic'
        },
        {
          id: '4',
          name: 'Michael Chen',
          email: 'michael.chen@example.com',
          phone: '+233 27 777 8888',
          company: 'GHI Design Studio',
          position: 'Interior Designer',
          status: 'reviewing',
          submittedAt: '2024-01-12T16:45:00Z',
          documents: ['portfolio.pdf', 'certification.pdf'],
          subscriptionPlan: 'Premium'
        }
      ]
      setPendingUsers(mockUsers)
    } catch (error) {
      console.error('Error fetching pending users:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-warning-100 text-warning-800'
      case 'reviewing':
        return 'bg-blue-100 text-blue-800'
      case 'approved':
        return 'bg-success-100 text-success-800'
      case 'rejected':
        return 'bg-danger-100 text-danger-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} />
      case 'reviewing':
        return <AlertCircle size={16} />
      case 'approved':
        return <CheckCircle size={16} />
      case 'rejected':
        return <XCircle size={16} />
      default:
        return <Clock size={16} />
    }
  }

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'Basic':
        return 'bg-gray-100 text-gray-800'
      case 'Premium':
        return 'bg-primary-100 text-primary-800'
      case 'Enterprise':
        return 'bg-purple-100 text-purple-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const handleBulkAction = (action: 'approve' | 'reject') => {
    if (selectedUsers.length === 0) return
    
    const actionText = action === 'approve' ? 'approve' : 'reject'
    if (confirm(`Are you sure you want to ${actionText} ${selectedUsers.length} selected user(s)?`)) {
      // In real app, call API to update status
      console.log(`Bulk ${action} for users:`, selectedUsers)
      setSelectedUsers([])
    }
  }

  const handleStatusChange = (userId: string, newStatus: 'approved' | 'rejected') => {
    setPendingUsers(prev => 
      prev.map(user => 
        user.id === userId 
          ? { ...user, status: newStatus }
          : user
      )
    )
  }

  const filteredUsers = pendingUsers.filter(user => {
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus
    const matchesPlan = filterPlan === 'all' || user.subscriptionPlan === filterPlan
    return matchesStatus && matchesPlan
  })

  const pendingCount = pendingUsers.filter(u => u.status === 'pending').length
  const reviewingCount = pendingUsers.filter(u => u.status === 'reviewing').length
  const totalPending = pendingUsers.length

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
          <h1 className="text-2xl font-bold text-brand-charcoal">User Approval</h1>
          <p className="text-brand-lightGray">Review and approve new user registrations</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center">
            <div className="p-3 bg-warning-50 rounded-lg">
              <Clock size={24} className="text-warning-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Pending Review</p>
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
              <p className="text-sm font-medium text-brand-lightGray">Under Review</p>
              <p className="text-2xl font-bold text-brand-charcoal">{reviewingCount}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
          <div className="flex items-center">
            <div className="p-3 bg-primary-50 rounded-lg">
              <User size={24} className="text-brand-orange" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-brand-lightGray">Total Pending</p>
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
              <option value="reviewing">Reviewing</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
            <select
              value={filterPlan}
              onChange={(e) => setFilterPlan(e.target.value)}
              className="px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="all">All Plans</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Enterprise">Enterprise</option>
            </select>
          </div>
          
          {selectedUsers.length > 0 && (
            <div className="flex gap-2">
              <button
                onClick={() => handleBulkAction('approve')}
                className="btn btn-success flex items-center space-x-2"
              >
                <CheckCircle size={16} />
                <span>Approve Selected ({selectedUsers.length})</span>
              </button>
              <button
                onClick={() => handleBulkAction('reject')}
                className="btn btn-danger flex items-center space-x-2"
              >
                <XCircle size={16} />
                <span>Reject Selected ({selectedUsers.length})</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Users Table */}
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
                        setSelectedUsers(filteredUsers.map(u => u.id))
                      } else {
                        setSelectedUsers([])
                      }
                    }}
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-brand-charcoal uppercase tracking-wider">
                  Submitted
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
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedUsers(prev => [...prev, user.id])
                        } else {
                          setSelectedUsers(prev => prev.filter(id => id !== user.id))
                        }
                      }}
                      className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <User size={20} className="text-brand-orange" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-brand-charcoal">{user.name}</div>
                        <div className="text-sm text-brand-lightGray">{user.position}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-brand-charcoal">
                      <div className="flex items-center">
                        <Mail size={14} className="mr-2 text-brand-lightGray" />
                        {user.email}
                      </div>
                      {user.phone && (
                        <div className="flex items-center mt-1">
                          <Phone size={14} className="mr-2 text-brand-lightGray" />
                          {user.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-charcoal">
                    {user.company || 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPlanColor(user.subscriptionPlan)}`}>
                      <Shield size={12} className="mr-1" />
                      {user.subscriptionPlan}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                      {getStatusIcon(user.status)}
                      <span className="ml-1 capitalize">{user.status}</span>
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-brand-lightGray">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2" />
                      {new Date(user.submittedAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-brand-orange hover:text-primary-600" title="View user">
                        <Eye size={16} />
                      </button>
                      <button className="text-success-600 hover:text-success-800" title="Approve user">
                        <CheckCircle size={16} />
                      </button>
                      <button className="text-danger-600 hover:text-danger-800" title="Reject user">
                        <XCircle size={16} />
                      </button>
                      <button className="text-brand-charcoal hover:text-primary-600" title="Download documents">
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
      {filteredUsers.length === 0 && (
        <div className="text-center py-12">
          <User size={48} className="text-brand-lightGray mx-auto mb-4" />
          <h3 className="text-lg font-medium text-brand-charcoal mb-2">No users found</h3>
          <p className="text-brand-lightGray mb-4">
            {filterStatus !== 'all' || filterPlan !== 'all' 
              ? 'Try adjusting your filters'
              : 'No users are currently pending approval'
            }
          </p>
        </div>
      )}
    </div>
  )
}

export default PendingApproval
