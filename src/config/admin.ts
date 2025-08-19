// Admin configuration and environment variables

export const adminConfig = {
  // API Configuration
  api: {
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/admin/v1',
    timeout: 15000,
    retryAttempts: 3,
  },

  // Authentication
  auth: {
    sessionTimeout: parseInt(import.meta.env.VITE_ADMIN_SESSION_TIMEOUT || '3600'),
    maxLoginAttempts: parseInt(import.meta.env.VITE_ADMIN_MAX_LOGIN_ATTEMPTS || '5'),
    sessionInactivity: parseInt(import.meta.env.VITE_ADMIN_SESSION_INACTIVITY || '1800'),
    requireMFA: import.meta.env.VITE_REQUIRE_MFA === 'true',
  },

  // File Upload
  upload: {
    maxFileSize: import.meta.env.VITE_FILE_UPLOAD_LIMIT || '50MB',
    maxFiles: parseInt(import.meta.env.VITE_MAX_FILES_PER_UPLOAD || '10'),
    allowedTypes: [
      'image/jpeg',
      'image/png',
      'image/gif',
      'application/pdf',
      'application/zip',
      'application/x-zip-compressed',
    ],
  },

  // Security
  security: {
    ipWhitelist: import.meta.env.VITE_ADMIN_IP_WHITELIST?.split(',') || [],
    requireHTTPS: import.meta.env.NODE_ENV === 'production',
    enableAuditLogging: true,
    logRetentionDays: 365,
  },

  // External Services
  services: {
    stripe: {
      publishableKey: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '',
      adminKey: import.meta.env.VITE_STRIPE_ADMIN_KEY || '',
    },
    paypal: {
      clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || '',
      clientSecret: import.meta.env.VITE_PAYPAL_CLIENT_SECRET || '',
    },
  },

  // Analytics
  analytics: {
    googleAnalyticsId: import.meta.env.VITE_GOOGLE_ANALYTICS_ID || '',
    facebookPixelId: import.meta.env.VITE_FACEBOOK_PIXEL_ID || '',
    enableRealTime: import.meta.env.VITE_ENABLE_REAL_TIME_NOTIFICATIONS === 'true',
  },

  // Feature Flags
  features: {
    darkMode: import.meta.env.VITE_ENABLE_DARK_MODE === 'true',
    realTimeNotifications: import.meta.env.VITE_ENABLE_REAL_TIME_NOTIFICATIONS === 'true',
    advancedAnalytics: import.meta.env.VITE_ENABLE_ADVANCED_ANALYTICS === 'true',
    workflowAutomation: import.meta.env.VITE_ENABLE_WORKFLOW_AUTOMATION === 'true',
  },

  // Development
  development: {
    debugMode: import.meta.env.VITE_ENABLE_DEBUG_MODE === 'true',
    mockData: import.meta.env.VITE_ENABLE_MOCK_DATA === 'true',
    logLevel: import.meta.env.VITE_LOG_LEVEL || 'info',
  },

  // UI Configuration
  ui: {
    theme: {
      primaryColor: '#f97316', // brand-orange
      secondaryColor: '#2d3748', // brand-charcoal
      accentColor: '#a0aec0', // brand-lightGray
    },
    layout: {
      sidebarWidth: 256,
      sidebarCollapsedWidth: 64,
      headerHeight: 64,
      maxContentWidth: 1200,
    },
    pagination: {
      defaultPageSize: 20,
      pageSizeOptions: [10, 20, 50, 100],
    },
  },

  // Notifications
  notifications: {
    position: 'top-right',
    duration: 5000,
    maxVisible: 5,
    enableSound: true,
  },

  // Cache
  cache: {
    enabled: true,
    ttl: 300000, // 5 minutes
    maxSize: 100,
  },
}

// Helper functions
export const isProduction = () => import.meta.env.NODE_ENV === 'production'
export const isDevelopment = () => import.meta.env.NODE_ENV === 'development'
export const isTest = () => import.meta.env.NODE_ENV === 'test'

export const getApiUrl = (endpoint: string) => {
  return `${adminConfig.api.baseUrl}${endpoint}`
}

export const getFileSizeInBytes = (sizeString: string): number => {
  const units: Record<string, number> = {
    B: 1,
    KB: 1024,
    MB: 1024 * 1024,
    GB: 1024 * 1024 * 1024,
  }
  
  const match = sizeString.match(/^(\d+(?:\.\d+)?)\s*([KMGT]?B)$/i)
  if (!match) return 0
  
  const [, size, unit] = match
  const unitKey = unit.toUpperCase()
  return Math.floor(parseFloat(size) * (units[unitKey] || 1))
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export const validatePhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''))
}

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9)
}

export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout
  
  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
