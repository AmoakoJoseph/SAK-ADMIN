import axios from 'axios'

const adminApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}/admin`,
  timeout: 15000,
})

// Add admin token to requests
adminApi.interceptors.request.use((config) => {
  const adminToken = localStorage.getItem('admin_token')
  if (adminToken) {
    config.headers['X-Admin-Token'] = adminToken
  }
  return config
})

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'user' | 'admin' | 'super_admin' | 'moderator' | 'support'
  status: 'active' | 'suspended' | 'pending' | 'banned'
  emailVerified: boolean
  createdAt: string
  lastLogin: string
  loginHistory: LoginAttempt[]
  permissions: AdminPermission[]
  profile: UserProfile
  subscription?: UserSubscription
  supportTickets: SupportTicket[]
}

export interface UserProfile {
  avatar?: string
  phone?: string
  address?: string
  company?: string
  position?: string
  bio?: string
}

export interface UserSubscription {
  plan: string
  status: 'active' | 'expired' | 'cancelled'
  startDate: string
  endDate: string
  autoRenew: boolean
}

export interface AdminPermission {
  resource: 'plans' | 'users' | 'orders' | 'analytics' | 'settings'
  actions: ('create' | 'read' | 'update' | 'delete' | 'approve')[]
}

export interface LoginAttempt {
  timestamp: string
  ip: string
  userAgent: string
  success: boolean
  location?: string
}

export interface SupportTicket {
  id: string
  subject: string
  status: 'open' | 'in_progress' | 'resolved' | 'closed'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category: string
  createdAt: string
  updatedAt: string
  assignedTo?: string
}

export interface UserUpdateData {
  name?: string
  email?: string
  role?: string
  status?: string
  permissions?: AdminPermission[]
}

export interface UserSuspensionData {
  reason: string
  duration: number // in days, 0 for permanent
  adminNotes?: string
}

export const adminUsersService = {
  // Get all users with filtering and pagination
  async getUsers(params: {
    page?: number
    limit?: number
    role?: string
    status?: string
    search?: string
    dateRange?: { start: string; end: string }
  } = {}) {
    const response = await adminApi.get('/users', { params })
    return response.data
  },

  // Get user by ID
  async getUser(id: string) {
    const response = await adminApi.get(`/users/${id}`)
    return response.data
  },

  // Update user
  async updateUser(id: string, data: UserUpdateData) {
    const response = await adminApi.put(`/users/${id}`, data)
    return response.data
  },

  // Suspend user
  async suspendUser(id: string, data: UserSuspensionData) {
    const response = await adminApi.post(`/users/${id}/suspend`, data)
    return response.data
  },

  // Unsuspend user
  async unsuspendUser(id: string) {
    const response = await adminApi.post(`/users/${id}/unsuspend`)
    return response.data
  },

  // Delete user
  async deleteUser(id: string) {
    const response = await adminApi.delete(`/users/${id}`)
    return response.data
  },

  // Get user roles and permissions
  async getUserRoles(id: string) {
    const response = await adminApi.get(`/users/${id}/roles`)
    return response.data
  },

  // Update user roles and permissions
  async updateUserRoles(id: string, permissions: AdminPermission[]) {
    const response = await adminApi.put(`/users/${id}/roles`, { permissions })
    return response.data
  },

  // Get pending user approvals
  async getPendingUsers() {
    const response = await adminApi.get('/users/pending')
    return response.data
  },

  // Approve user registration
  async approveUser(id: string) {
    const response = await adminApi.post(`/users/${id}/approve`)
    return response.data
  },

  // Reject user registration
  async rejectUser(id: string, reason: string) {
    const response = await adminApi.post(`/users/${id}/reject`, { reason })
    return response.data
  },

  // Get user analytics
  async getUserAnalytics(params: {
    startDate?: string
    endDate?: string
    role?: string
    status?: string
  } = {}) {
    const response = await adminApi.get('/users/analytics', { params })
    return response.data
  },

  // Get user activity
  async getUserActivity(id: string, params: {
    page?: number
    limit?: number
    activityType?: string
  } = {}) {
    const response = await adminApi.get(`/users/${id}/activity`, { params })
    return response.data
  },

  // Bulk operations
  async bulkUpdateUsers(userIds: string[], updates: Partial<UserUpdateData>) {
    const response = await adminApi.put('/users/bulk', {
      userIds,
      updates,
    })
    return response.data
  },

  async bulkSuspendUsers(userIds: string[], suspensionData: UserSuspensionData) {
    const response = await adminApi.post('/users/bulk/suspend', {
      userIds,
      ...suspensionData,
    })
    return response.data
  },

  // Get user support tickets
  async getUserSupportTickets(id: string) {
    const response = await adminApi.get(`/users/${id}/support-tickets`)
    return response.data
  },

  // Get all support tickets
  async getAllSupportTickets(params: {
    page?: number
    limit?: number
    status?: string
    priority?: string
    assignedTo?: string
  } = {}) {
    const response = await adminApi.get('/support-tickets', { params })
    return response.data
  },

  // Update support ticket
  async updateSupportTicket(id: string, data: Partial<SupportTicket>) {
    const response = await adminApi.put(`/support-tickets/${id}`, data)
    return response.data
  },
}
