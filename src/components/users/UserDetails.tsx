import { 
  X, 
  User, 
  Mail, 
  Shield, 
  Calendar, 
  Clock,
  Activity,
  MapPin,
  Phone,
  Globe
} from 'lucide-react'
import { User as UserType } from '../../types'

interface UserDetailsProps {
  user: UserType | null
  isOpen: boolean
  onClose: () => void
}

const UserDetails = ({ user, isOpen, onClose }: UserDetailsProps) => {
  if (!isOpen || !user) return null

  // Mock activity data - replace with real API calls
  const userActivity = [
    {
      id: '1',
      action: 'Logged in',
      timestamp: new Date(Date.now() - 3600000),
      ip: '192.168.1.100',
      location: 'New York, NY',
    },
    {
      id: '2',
      action: 'Updated profile',
      timestamp: new Date(Date.now() - 7200000),
      ip: '192.168.1.100',
      location: 'New York, NY',
    },
    {
      id: '3',
      action: 'Viewed plans',
      timestamp: new Date(Date.now() - 86400000),
      ip: '192.168.1.100',
      location: 'New York, NY',
    },
  ]

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'admin':
        return 'bg-purple-100 text-purple-800'
      case 'moderator':
        return 'bg-blue-100 text-blue-800'
      case 'user':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-800'
      case 'inactive':
        return 'bg-gray-100 text-gray-800'
      case 'suspended':
        return 'bg-danger-100 text-danger-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">User Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* User Profile */}
          <div className="flex items-start space-x-6">
            <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center">
              <User className="w-10 h-10 text-primary-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">{user.name}</h3>
              <p className="text-gray-600">{user.email}</p>
              <div className="flex items-center space-x-4 mt-2">
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
                <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                  {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* User Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">Basic Information</h4>
              
              <div className="space-y-3">
                <div className="flex items-center">
                  <Mail className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Email</p>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Shield className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Role</p>
                    <p className="text-sm text-gray-600 capitalize">{user.role}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Member Since</p>
                    <p className="text-sm text-gray-600">{user.createdAt.toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <Clock className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm font-medium text-gray-700">Last Login</p>
                    <p className="text-sm text-gray-600">
                      {user.lastLogin ? user.lastLogin.toLocaleDateString() : 'Never'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-lg font-medium text-gray-900">Account Statistics</h4>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">12</p>
                  <p className="text-sm text-gray-600">Plans Viewed</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">3</p>
                  <p className="text-sm text-gray-600">Plans Downloaded</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">5</p>
                  <p className="text-sm text-gray-600">Orders Placed</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-2xl font-bold text-gray-900">$450</p>
                  <p className="text-sm text-gray-600">Total Spent</p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900">Recent Activity</h4>
            
            <div className="space-y-3">
              {userActivity.map((activity) => (
                <div key={activity.id} className="flex items-center p-3 bg-gray-50 rounded-lg">
                  <Activity className="w-5 h-5 text-primary-600 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{activity.timestamp.toLocaleString()}</span>
                      <span>•</span>
                      <span>{activity.ip}</span>
                      <span>•</span>
                      <span>{activity.location}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Permissions */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900">Permissions</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {user.role === 'admin' && (
                <>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <Shield className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Full Access</p>
                      <p className="text-xs text-gray-600">All system features</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <User className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">User Management</p>
                      <p className="text-xs text-gray-600">Create, edit, delete users</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-green-50 rounded-lg">
                    <Activity className="w-5 h-5 text-green-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Analytics</p>
                      <p className="text-xs text-gray-600">View all reports</p>
                    </div>
                  </div>
                </>
              )}
              
              {user.role === 'moderator' && (
                <>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Limited Access</p>
                      <p className="text-xs text-gray-600">Most system features</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <User className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">User Review</p>
                      <p className="text-xs text-gray-600">Review user content</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                    <Activity className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Basic Reports</p>
                      <p className="text-xs text-gray-600">View basic analytics</p>
                    </div>
                  </div>
                </>
              )}
              
              {user.role === 'user' && (
                <>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Shield className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Basic Access</p>
                      <p className="text-xs text-gray-600">View and download plans</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <User className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Profile Management</p>
                      <p className="text-xs text-gray-600">Edit own profile</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-gray-50 rounded-lg">
                    <Activity className="w-5 h-5 text-gray-600 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Order History</p>
                      <p className="text-xs text-gray-600">View own orders</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              onClick={onClose}
              className="btn btn-secondary"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserDetails 