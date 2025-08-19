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

export interface SiteSettings {
  general: {
    siteName: string
    siteDescription: string
    siteUrl: string
    contactEmail: string
    contactPhone: string
    address: string
    timezone: string
    language: string
    currency: string
    dateFormat: string
  }
  appearance: {
    logo: string
    favicon: string
    primaryColor: string
    secondaryColor: string
    theme: 'light' | 'dark' | 'auto'
    customCSS: string
  }
  content: {
    aboutPage: string
    termsOfService: string
    privacyPolicy: string
    faq: Array<{ question: string; answer: string }>
    announcements: Array<{ title: string; content: string; active: boolean }>
  }
  seo: {
    metaTitle: string
    metaDescription: string
    metaKeywords: string
    googleAnalyticsId: string
    facebookPixelId: string
    structuredData: string
  }
}

export interface PaymentSettings {
  stripe: {
    enabled: boolean
    publishableKey: string
    secretKey: string
    webhookSecret: string
    currency: string
    supportedCurrencies: string[]
  }
  paypal: {
    enabled: boolean
    clientId: string
    clientSecret: string
    mode: 'sandbox' | 'live'
    currency: string
  }
  manual: {
    enabled: boolean
    instructions: string
    bankDetails: string
    paymentMethods: string[]
  }
  general: {
    defaultCurrency: string
    taxRate: number
    taxIncluded: boolean
    minimumOrderAmount: number
    maximumOrderAmount: number
    autoApproveOrders: boolean
  }
}

export interface EmailSettings {
  smtp: {
    host: string
    port: number
    username: string
    password: string
    encryption: 'tls' | 'ssl' | 'none'
    fromEmail: string
    fromName: string
  }
  templates: {
    welcome: EmailTemplate
    orderConfirmation: EmailTemplate
    passwordReset: EmailTemplate
    planApproval: EmailTemplate
    planRejection: EmailTemplate
    newsletter: EmailTemplate
  }
  automation: {
    welcomeEmail: boolean
    orderConfirmation: boolean
    abandonedCart: boolean
    planUpdates: boolean
    newsletter: boolean
  }
}

export interface EmailTemplate {
  subject: string
  body: string
  variables: string[]
  active: boolean
}

export interface SecuritySettings {
  authentication: {
    requireEmailVerification: boolean
    requirePhoneVerification: boolean
    requireMFA: boolean
    mfaMethods: ('totp' | 'sms' | 'email')[]
    sessionTimeout: number
    maxLoginAttempts: number
    lockoutDuration: number
    passwordPolicy: {
      minLength: number
      requireUppercase: boolean
      requireLowercase: boolean
      requireNumbers: boolean
      requireSymbols: boolean
      preventCommonPasswords: boolean
    }
  }
  access: {
    ipWhitelist: string[]
    allowedCountries: string[]
    vpnDetection: boolean
    concurrentSessions: number
    adminOnlyAccess: boolean
  }
  monitoring: {
    logAllActions: boolean
    logRetentionDays: number
    logSensitiveData: boolean
    alertOnSuspiciousActivity: boolean
    securityNotifications: boolean
  }
  backup: {
    autoBackup: boolean
    backupFrequency: 'daily' | 'weekly' | 'monthly'
    backupRetention: number
    backupLocation: string
    encryption: boolean
  }
}

export interface NotificationSettings {
  email: {
    orderNotifications: boolean
    userNotifications: boolean
    systemNotifications: boolean
    securityAlerts: boolean
    marketingEmails: boolean
  }
  sms: {
    orderNotifications: boolean
    securityAlerts: boolean
    marketingSMS: boolean
  }
  push: {
    orderUpdates: boolean
    systemMaintenance: boolean
    securityAlerts: boolean
  }
  webhook: {
    orderWebhooks: boolean
    userWebhooks: boolean
    systemWebhooks: boolean
    webhookUrls: string[]
  }
}

export const adminSettingsService = {
  // Site Settings
  async getSiteSettings(): Promise<SiteSettings> {
    const response = await adminApi.get('/settings/site')
    return response.data
  },

  async updateSiteSettings(settings: Partial<SiteSettings>) {
    const response = await adminApi.put('/settings/site', settings)
    return response.data
  },

  // Payment Settings
  async getPaymentSettings(): Promise<PaymentSettings> {
    const response = await adminApi.get('/settings/payment')
    return response.data
  },

  async updatePaymentSettings(settings: Partial<PaymentSettings>) {
    const response = await adminApi.put('/settings/payment', settings)
    return response.data
  },

  async testPaymentConnection(provider: 'stripe' | 'paypal') {
    const response = await adminApi.post(`/settings/payment/test/${provider}`)
    return response.data
  },

  // Email Settings
  async getEmailSettings(): Promise<EmailSettings> {
    const response = await adminApi.get('/settings/email')
    return response.data
  },

  async updateEmailSettings(settings: Partial<EmailSettings>) {
    const response = await adminApi.put('/settings/email', settings)
    return response.data
  },

  async testEmailConnection() {
    const response = await adminApi.post('/settings/email/test')
    return response.data
  },

  async updateEmailTemplate(templateName: string, template: EmailTemplate) {
    const response = await adminApi.put(`/settings/email/templates/${templateName}`, template)
    return response.data
  },

  // Security Settings
  async getSecuritySettings(): Promise<SecuritySettings> {
    const response = await adminApi.get('/settings/security')
    return response.data
  },

  async updateSecuritySettings(settings: Partial<SecuritySettings>) {
    const response = await adminApi.put('/settings/security', settings)
    return response.data
  },

  async generateBackup() {
    const response = await adminApi.post('/settings/security/backup')
    return response.data
  },

  async restoreBackup(backupId: string) {
    const response = await adminApi.post(`/settings/security/backup/${backupId}/restore`)
    return response.data
  },

  // Notification Settings
  async getNotificationSettings(): Promise<NotificationSettings> {
    const response = await adminApi.get('/settings/notifications')
    return response.data
  },

  async updateNotificationSettings(settings: Partial<NotificationSettings>) {
    const response = await adminApi.put('/settings/notifications', settings)
    return response.data
  },

  // System Information
  async getSystemInfo() {
    const response = await adminApi.get('/settings/system-info')
    return response.data
  },

  async getSystemHealth() {
    const response = await adminApi.get('/settings/system-health')
    return response.data
  },

  // Maintenance Mode
  async enableMaintenanceMode(reason: string) {
    const response = await adminApi.post('/settings/maintenance/enable', { reason })
    return response.data
  },

  async disableMaintenanceMode() {
    const response = await adminApi.post('/settings/maintenance/disable')
    return response.data
  },

  async getMaintenanceStatus() {
    const response = await adminApi.get('/settings/maintenance/status')
    return response.data
  },

  // Cache Management
  async clearCache(type?: 'all' | 'pages' | 'database' | 'sessions') {
    const response = await adminApi.post('/settings/cache/clear', { type })
    return response.data
  },

  async getCacheStats() {
    const response = await adminApi.get('/settings/cache/stats')
    return response.data
  },

  // Logs
  async getSystemLogs(params: {
    level?: 'error' | 'warning' | 'info' | 'debug'
    startDate?: string
    endDate?: string
    page?: number
    limit?: number
  } = {}) {
    const response = await adminApi.get('/settings/logs', { params })
    return response.data
  },

  async downloadLogs(params: {
    level?: string
    startDate?: string
    endDate?: string
    format?: 'json' | 'csv'
  } = {}) {
    const response = await adminApi.get('/settings/logs/download', {
      params,
      responseType: 'blob',
    })
    return response.data
  },

  // API Keys
  async getAPIKeys() {
    const response = await adminApi.get('/settings/api-keys')
    return response.data
  },

  async createAPIKey(data: { name: string; permissions: string[] }) {
    const response = await adminApi.post('/settings/api-keys', data)
    return response.data
  },

  async revokeAPIKey(keyId: string) {
    const response = await adminApi.delete(`/settings/api-keys/${keyId}`)
    return response.data
  },
}
