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

export interface Plan {
  id: string
  title: string
  description: string
  price: number
  category: string
  status: 'draft' | 'review' | 'approved' | 'published' | 'rejected'
  images: string[]
  features: string[]
  squareFootage: number
  bedrooms: number
  bathrooms: number
  createdAt: string
  updatedAt: string
  uploadedBy: string
  adminNotes?: string
  approvalDate?: string
  approvedBy?: string
}

export interface PlanUploadData {
  title: string
  description: string
  price: number
  category: string
  features: string[]
  squareFootage: number
  bedrooms: number
  bathrooms: number
  files: File[]
}

export interface PlanApprovalData {
  status: 'approved' | 'rejected'
  adminNotes?: string
}

export const adminPlansService = {
  // Get all plans with filtering and pagination
  async getPlans(params: {
    page?: number
    limit?: number
    status?: string
    category?: string
    search?: string
  } = {}) {
    const response = await adminApi.get('/plans', { params })
    return response.data
  },

  // Get plan by ID
  async getPlan(id: string) {
    const response = await adminApi.get(`/plans/${id}`)
    return response.data
  },

  // Create new plan
  async createPlan(data: PlanUploadData) {
    const formData = new FormData()
    
    // Add text fields
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'files') {
        if (Array.isArray(value)) {
          formData.append(key, JSON.stringify(value))
        } else {
          formData.append(key, value.toString())
        }
      }
    })
    
    // Add files
    data.files.forEach((file, index) => {
      formData.append(`files`, file)
    })
    
    const response = await adminApi.post('/plans', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    return response.data
  },

  // Update plan
  async updatePlan(id: string, data: Partial<Plan>) {
    const response = await adminApi.put(`/plans/${id}`, data)
    return response.data
  },

  // Delete plan
  async deletePlan(id: string) {
    const response = await adminApi.delete(`/plans/${id}`)
    return response.data
  },

  // Approve/reject plan
  async approvePlan(id: string, data: PlanApprovalData) {
    const response = await adminApi.post(`/plans/${id}/approve`, data)
    return response.data
  },

  // Bulk operations
  async bulkUpdatePlans(planIds: string[], updates: Partial<Plan>) {
    const response = await adminApi.put('/plans/bulk', {
      planIds,
      updates,
    })
    return response.data
  },

  async bulkDeletePlans(planIds: string[]) {
    const response = await adminApi.delete('/plans/bulk', {
      data: { planIds },
    })
    return response.data
  },

  // Get plan analytics
  async getPlanAnalytics(params: {
    startDate?: string
    endDate?: string
    category?: string
  } = {}) {
    const response = await adminApi.get('/plans/analytics', { params })
    return response.data
  },

  // Get pending plans for approval
  async getPendingPlans() {
    const response = await adminApi.get('/plans/pending')
    return response.data
  },
}
