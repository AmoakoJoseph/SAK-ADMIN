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

export interface Order {
  id: string
  orderNumber: string
  userId: string
  userName: string
  userEmail: string
  planId: string
  planTitle: string
  planPrice: number
  status: 'pending' | 'processing' | 'completed' | 'cancelled' | 'refunded' | 'failed'
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded' | 'partially_refunded'
  paymentMethod: 'stripe' | 'paypal' | 'manual' | 'other'
  paymentId?: string
  amount: number
  currency: string
  createdAt: string
  updatedAt: string
  completedAt?: string
  adminNotes?: string
  refundReason?: string
  refundAmount?: number
  refundDate?: string
  processedBy?: string
}

export interface OrderUpdateData {
  status?: string
  paymentStatus?: string
  adminNotes?: string
}

export interface RefundData {
  amount: number
  reason: string
  adminNotes?: string
  partialRefund?: boolean
}

export interface OrderFilterParams {
  page?: number
  limit?: number
  status?: string
  paymentStatus?: string
  paymentMethod?: string
  dateRange?: { start: string; end: string }
  search?: string
  userId?: string
}

export interface OrderAnalytics {
  totalOrders: number
  totalRevenue: number
  averageOrderValue: number
  ordersByStatus: Record<string, number>
  ordersByPaymentMethod: Record<string, number>
  revenueByDate: Array<{ date: string; revenue: number; orders: number }>
  topPlans: Array<{ planId: string; title: string; orders: number; revenue: number }>
}

export const adminOrdersService = {
  // Get all orders with filtering and pagination
  async getOrders(params: OrderFilterParams = {}) {
    const response = await adminApi.get('/orders', { params })
    return response.data
  },

  // Get order by ID
  async getOrder(id: string) {
    const response = await adminApi.get(`/orders/${id}`)
    return response.data
  },

  // Update order status
  async updateOrderStatus(id: string, data: OrderUpdateData) {
    const response = await adminApi.put(`/orders/${id}/status`, data)
    return response.data
  },

  // Process payment manually
  async processManualPayment(id: string, paymentData: {
    amount: number
    paymentMethod: string
    reference: string
    adminNotes?: string
  }) {
    const response = await adminApi.post(`/orders/${id}/manual-payment`, paymentData)
    return response.data
  },

  // Verify payment
  async verifyPayment(id: string) {
    const response = await adminApi.post(`/orders/${id}/verify-payment`)
    return response.data
  },

  // Process refund
  async processRefund(id: string, data: RefundData) {
    const response = await adminApi.post(`/orders/${id}/refund`, data)
    return response.data
  },

  // Cancel order
  async cancelOrder(id: string, reason: string) {
    const response = await adminApi.post(`/orders/${id}/cancel`, { reason })
    return response.data
  },

  // Get pending orders
  async getPendingOrders() {
    const response = await adminApi.get('/orders/pending')
    return response.data
  },

  // Get failed orders
  async getFailedOrders() {
    const response = await adminApi.get('/orders/failed')
    return response.data
  },

  // Get refund requests
  async getRefundRequests() {
    const response = await adminApi.get('/orders/refunds')
    return response.data
  },

  // Bulk operations
  async bulkUpdateOrders(orderIds: string[], updates: OrderUpdateData) {
    const response = await adminApi.put('/orders/bulk', {
      orderIds,
      updates,
    })
    return response.data
  },

  async bulkProcessOrders(orderIds: string[], action: 'process' | 'complete' | 'cancel') {
    const response = await adminApi.post(`/orders/bulk/${action}`, {
      orderIds,
    })
    return response.data
  },

  // Get order analytics
  async getOrderAnalytics(params: {
    startDate?: string
    endDate?: string
    groupBy?: 'day' | 'week' | 'month'
  } = {}): Promise<OrderAnalytics> {
    const response = await adminApi.get('/orders/analytics', { params })
    return response.data
  },

  // Export orders
  async exportOrders(params: OrderFilterParams = {}, format: 'csv' | 'excel' = 'csv') {
    const response = await adminApi.get('/orders/export', {
      params: { ...params, format },
      responseType: 'blob',
    })
    return response.data
  },

  // Get order statistics
  async getOrderStats() {
    const response = await adminApi.get('/orders/stats')
    return response.data
  },

  // Resend order confirmation
  async resendOrderConfirmation(id: string) {
    const response = await adminApi.post(`/orders/${id}/resend-confirmation`)
    return response.data
  },

  // Get order timeline
  async getOrderTimeline(id: string) {
    const response = await adminApi.get(`/orders/${id}/timeline`)
    return response.data
  },

  // Add admin note to order
  async addOrderNote(id: string, note: string) {
    const response = await adminApi.post(`/orders/${id}/notes`, { note })
    return response.data
  },

  // Get order notes
  async getOrderNotes(id: string) {
    const response = await adminApi.get(`/orders/${id}/notes`)
    return response.data
  },
}
