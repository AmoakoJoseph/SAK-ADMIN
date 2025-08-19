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

export interface DashboardStats {
  totalRevenue: number
  totalOrders: number
  totalUsers: number
  totalPlans: number
  revenueChange: number
  ordersChange: number
  usersChange: number
  plansChange: number
}

export interface SalesAnalytics {
  revenue: {
    total: number
    change: number
    byPeriod: Array<{ period: string; revenue: number; change: number }>
  }
  orders: {
    total: number
    change: number
    byStatus: Record<string, number>
    byPaymentMethod: Record<string, number>
  }
  topProducts: Array<{
    id: string
    name: string
    revenue: number
    orders: number
    conversionRate: number
  }>
  revenueByCategory: Array<{
    category: string
    revenue: number
    percentage: number
  }>
}

export interface UserAnalytics {
  growth: {
    total: number
    change: number
    byPeriod: Array<{ period: string; users: number; change: number }>
  }
  engagement: {
    activeUsers: number
    retentionRate: number
    averageSessionDuration: number
    pageViews: number
  }
  demographics: {
    byLocation: Array<{ location: string; users: number; percentage: number }>
    byDevice: Array<{ device: string; users: number; percentage: number }>
    byAge: Array<{ ageRange: string; users: number; percentage: number }>
  }
  behavior: {
    topPages: Array<{ page: string; views: number; uniqueViews: number }>
    userJourney: Array<{ step: string; users: number; dropoff: number }>
    searchTerms: Array<{ term: string; searches: number; conversions: number }>
  }
}

export interface PlanAnalytics {
  performance: {
    totalViews: number
    totalDownloads: number
    conversionRate: number
    averageRating: number
  }
  popularity: {
    byCategory: Array<{ category: string; views: number; downloads: number; revenue: number }>
    byPrice: Array<{ priceRange: string; plans: number; revenue: number }>
    byFeatures: Array<{ feature: string; plans: number; popularity: number }>
  }
  trends: {
    byPeriod: Array<{ period: string; views: number; downloads: number; revenue: number }>
    seasonalPatterns: Array<{ month: string; views: number; downloads: number }>
  }
}

export interface FinancialAnalytics {
  revenue: {
    total: number
    change: number
    byPeriod: Array<{ period: string; revenue: number; change: number }>
    bySource: Array<{ source: string; revenue: number; percentage: number }>
  }
  expenses: {
    total: number
    change: number
    byCategory: Array<{ category: string; amount: number; percentage: number }>
  }
  profit: {
    total: number
    margin: number
    change: number
    byPeriod: Array<{ period: string; profit: number; margin: number }>
  }
  cashFlow: {
    inflow: number
    outflow: number
    net: number
    byPeriod: Array<{ period: string; inflow: number; outflow: number; net: number }>
  }
}

export interface AnalyticsParams {
  startDate?: string
  endDate?: string
  groupBy?: 'day' | 'week' | 'month' | 'quarter' | 'year'
  category?: string
  planId?: string
  userId?: string
  compareWith?: 'previous_period' | 'previous_year' | 'custom'
  customStartDate?: string
  customEndDate?: string
}

export const adminAnalyticsService = {
  // Dashboard overview statistics
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await adminApi.get('/analytics/dashboard')
    return response.data
  },

  // Sales analytics
  async getSalesAnalytics(params: AnalyticsParams = {}): Promise<SalesAnalytics> {
    const response = await adminApi.get('/analytics/sales', { params })
    return response.data
  },

  // User analytics
  async getUserAnalytics(params: AnalyticsParams = {}): Promise<UserAnalytics> {
    const response = await adminApi.get('/analytics/users', { params })
    return response.data
  },

  // Plan analytics
  async getPlanAnalytics(params: AnalyticsParams = {}): Promise<PlanAnalytics> {
    const response = await adminApi.get('/analytics/plans', { params })
    return response.data
  },

  // Financial analytics
  async getFinancialAnalytics(params: AnalyticsParams = {}): Promise<FinancialAnalytics> {
    const response = await adminApi.get('/analytics/financial', { params })
    return response.data
  },

  // Custom analytics query
  async getCustomAnalytics(query: {
    metrics: string[]
    dimensions: string[]
    filters?: Record<string, any>
    sort?: Array<{ field: string; direction: 'asc' | 'desc' }>
    limit?: number
  }) {
    const response = await adminApi.post('/analytics/custom', query)
    return response.data
  },

  // Export analytics data
  async exportAnalytics(
    type: 'sales' | 'users' | 'plans' | 'financial',
    params: AnalyticsParams = {},
    format: 'csv' | 'excel' | 'pdf' = 'csv'
  ) {
    const response = await adminApi.get(`/analytics/${type}/export`, {
      params: { ...params, format },
      responseType: 'blob',
    })
    return response.data
  },

  // Get real-time analytics
  async getRealTimeAnalytics() {
    const response = await adminApi.get('/analytics/realtime')
    return response.data
  },

  // Get analytics insights and recommendations
  async getAnalyticsInsights(params: AnalyticsParams = {}) {
    const response = await adminApi.get('/analytics/insights', { params })
    return response.data
  },

  // Get comparative analytics
  async getComparativeAnalytics(params: {
    metric: string
    dimension: string
    period1: { start: string; end: string }
    period2: { start: string; end: string }
  }) {
    const response = await adminApi.post('/analytics/compare', params)
    return response.data
  },

  // Get funnel analysis
  async getFunnelAnalysis(params: {
    funnel: string
    startDate: string
    endDate: string
  }) {
    const response = await adminApi.get('/analytics/funnel', { params })
    return response.data
  },

  // Get cohort analysis
  async getCohortAnalysis(params: {
    metric: string
    cohortType: 'signup' | 'purchase' | 'first_visit'
    startDate: string
    endDate: string
    periods: number
  }) {
    const response = await adminApi.get('/analytics/cohort', { params })
    return response.data
  },

  // Get A/B test results
  async getABTestResults(testId: string) {
    const response = await adminApi.get(`/analytics/ab-test/${testId}`)
    return response.data
  },

  // Schedule analytics reports
  async scheduleReport(schedule: {
    type: string
    frequency: 'daily' | 'weekly' | 'monthly'
    recipients: string[]
    format: 'csv' | 'excel' | 'pdf'
    params: AnalyticsParams
  }) {
    const response = await adminApi.post('/analytics/schedule-report', schedule)
    return response.data
  },

  // Get scheduled reports
  async getScheduledReports() {
    const response = await adminApi.get('/analytics/scheduled-reports')
    return response.data
  },

  // Delete scheduled report
  async deleteScheduledReport(reportId: string) {
    const response = await adminApi.delete(`/analytics/scheduled-reports/${reportId}`)
    return response.data
  },
}
