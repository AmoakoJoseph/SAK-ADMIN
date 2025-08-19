import { useState, useEffect } from 'react'
import { 
  Save, 
  Shield, 
  Lock, 
  Key, 
  Eye, 
  EyeOff,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Settings as SettingsIcon,
  User,
  Smartphone,
  Mail,
  Clock,
  Database,
  Activity,
  Zap,
  Globe,
  FileText
} from 'lucide-react'
import { adminSettingsService } from '../../services/admin/adminSettings'

interface SecuritySettings {
  authentication: {
    requireEmailVerification: boolean
    requirePhoneVerification: boolean
    requireMFA: boolean
    mfaMethods: string[]
    sessionTimeout: number
    maxLoginAttempts: number
    lockoutDuration: number
    passwordPolicy: {
      minLength: number
      requireUppercase: boolean
      requireLowercase: boolean
      requireNumbers: boolean
      requireSpecialChars: boolean
      preventCommonPasswords: boolean
      passwordHistory: number
    }
  }
  api: {
    enabled: boolean
    rateLimit: number
    rateLimitWindow: number
    requireApiKey: boolean
    apiKeyExpiry: number
    allowedOrigins: string[]
    corsEnabled: boolean
  }
  monitoring: {
    loginAttempts: boolean
    suspiciousActivity: boolean
    failedTransactions: boolean
    adminActions: boolean
    dataExports: boolean
    retentionPeriod: number
  }
  compliance: {
    gdprEnabled: boolean
    dataRetention: number
    rightToBeForgotten: boolean
    dataPortability: boolean
    auditLogging: boolean
    privacyPolicyUrl: string
    termsOfServiceUrl: string
  }
}

const mockSecuritySettings: SecuritySettings = {
  authentication: {
    requireEmailVerification: true,
    requirePhoneVerification: false,
    requireMFA: false,
    mfaMethods: ['totp'],
    sessionTimeout: 3600,
    maxLoginAttempts: 5,
    lockoutDuration: 900,
    passwordPolicy: {
      minLength: 8,
      requireUppercase: true,
      requireLowercase: true,
      requireNumbers: true,
      requireSpecialChars: true,
      preventCommonPasswords: true,
      passwordHistory: 5
    }
  },
  api: {
    enabled: true,
    rateLimit: 100,
    rateLimitWindow: 3600,
    requireApiKey: true,
    apiKeyExpiry: 365,
    allowedOrigins: ['https://sakconstructions.com', 'https://admin.sakconstructions.com'],
    corsEnabled: true
  },
  monitoring: {
    loginAttempts: true,
    suspiciousActivity: true,
    failedTransactions: true,
    adminActions: true,
    dataExports: true,
    retentionPeriod: 2555
  },
  compliance: {
    gdprEnabled: true,
    dataRetention: 2555,
    rightToBeForgotten: true,
    dataPortability: true,
    auditLogging: true,
    privacyPolicyUrl: 'https://sakconstructions.com/privacy',
    termsOfServiceUrl: 'https://sakconstructions.com/terms'
  }
}

const Security = () => {
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings>({
    authentication: {
      requireEmailVerification: true,
      requirePhoneVerification: false,
      requireMFA: false,
      mfaMethods: ['totp'],
      sessionTimeout: 3600,
      maxLoginAttempts: 5,
      lockoutDuration: 900,
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSpecialChars: true,
        preventCommonPasswords: true,
        passwordHistory: 5
      }
    },
    api: {
      enabled: true,
      rateLimit: 100,
      rateLimitWindow: 3600,
      requireApiKey: true,
      apiKeyExpiry: 365,
      allowedOrigins: ['https://sakconstructions.com', 'https://admin.sakconstructions.com'],
      corsEnabled: true
    },
    monitoring: {
      loginAttempts: true,
      suspiciousActivity: true,
      failedTransactions: true,
      adminActions: true,
      dataExports: true,
      retentionPeriod: 2555
    },
    compliance: {
      gdprEnabled: true,
      dataRetention: 2555,
      rightToBeForgotten: true,
      dataPortability: true,
      auditLogging: true,
      privacyPolicyUrl: 'https://sakconstructions.com/privacy',
      termsOfServiceUrl: 'https://sakconstructions.com/terms'
    }
  })

  const [showSecrets, setShowSecrets] = useState(false)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'authentication' | 'api' | 'monitoring' | 'compliance'>('authentication')

  useEffect(() => {
    const fetchSettings = async () => {
      console.log('Fetching security settings...')
      try {
        // Try to fetch from API first
        if (import.meta.env.VITE_API_BASE_URL) {
          const data = await adminSettingsService.getSecuritySettings()
          setSecuritySettings(data)
        } else {
          // Use mock data if no API URL configured
          setSecuritySettings(mockSecuritySettings)
        }
      } catch (error) {
        console.warn('API call failed, using mock data:', error)
        // Use mock data as fallback
        setSecuritySettings(mockSecuritySettings)
      }
    }

    fetchSettings()
  }, [])

  const handleSave = async () => {
    setSaving(true)
    try {
      // In real app, save to API
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Security settings saved successfully')
    } catch (error) {
      console.error('Error saving security settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleTestConnection = async (type: string) => {
    setTesting(type)
    try {
      // In real app, test connection
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log(`Testing ${type} connection...`)
    } catch (error) {
      console.error('Error testing connection:', error)
    } finally {
      setTesting(null)
    }
  }

  const addMfaMethod = (method: string) => {
    if (!securitySettings.authentication.mfaMethods.includes(method)) {
      setSecuritySettings(prev => ({
        ...prev,
        authentication: {
          ...prev.authentication,
          mfaMethods: [...prev.authentication.mfaMethods, method]
        }
      }))
    }
  }

  const removeMfaMethod = (method: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      authentication: {
        ...prev.authentication,
        mfaMethods: prev.authentication.mfaMethods.filter(m => m !== method)
      }
    }))
  }

  const addAllowedOrigin = (origin: string) => {
    if (origin && !securitySettings.api.allowedOrigins.includes(origin)) {
      setSecuritySettings(prev => ({
        ...prev,
        api: {
          ...prev.api,
          allowedOrigins: [...prev.api.allowedOrigins, origin]
        }
      }))
    }
  }

  const removeAllowedOrigin = (origin: string) => {
    setSecuritySettings(prev => ({
      ...prev,
      api: {
        ...prev.api,
        allowedOrigins: prev.api.allowedOrigins.filter(o => o !== origin)
      }
    }))
  }

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'authentication':
        return <Lock size={20} />
      case 'api':
        return <Key size={20} />
      case 'monitoring':
        return <Activity size={20} />
      case 'compliance':
        return <Shield size={20} />
      default:
        return <SettingsIcon size={20} />
    }
  }

  const getTabColor = (tab: string) => {
    switch (tab) {
      case 'authentication':
        return 'text-brand-orange'
      case 'api':
        return 'text-blue-600'
      case 'monitoring':
        return 'text-green-600'
      case 'compliance':
        return 'text-purple-600'
      default:
        return 'text-brand-charcoal'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal">Security Settings</h1>
          <p className="text-brand-lightGray">Manage authentication, API security, monitoring, and compliance</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowSecrets(!showSecrets)}
            className="btn btn-secondary flex items-center space-x-2"
          >
            {showSecrets ? <EyeOff size={16} /> : <Eye size={16} />}
            <span>{showSecrets ? 'Hide' : 'Show'} Secrets</span>
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Save size={16} />
            <span>{saving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-brand-lightGray">
        <nav className="-mb-px flex space-x-8">
          {(['authentication', 'api', 'monitoring', 'compliance'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab
                  ? `border-brand-orange text-brand-orange`
                  : 'border-transparent text-brand-lightGray hover:text-brand-charcoal hover:border-brand-lightGray'
              }`}
            >
              {getTabIcon(tab)}
              <span className="capitalize">{tab}</span>
            </button>
          ))}
        </nav>
      </div>

      {activeTab === 'authentication' && (
        /* Authentication Settings */
        <div className="space-y-6">
          {/* Email & Phone Verification */}
          <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
            <h3 className="text-lg font-semibold text-brand-charcoal mb-4 flex items-center">
              <Mail size={20} className="mr-2 text-brand-orange" />
              Verification Requirements
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.authentication.requireEmailVerification}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    authentication: { ...prev.authentication, requireEmailVerification: e.target.checked }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Require email verification for new accounts</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.authentication.requirePhoneVerification}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    authentication: { ...prev.authentication, requirePhoneVerification: e.target.checked }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Require phone verification for new accounts</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.authentication.requireMFA}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    authentication: { ...prev.authentication, requireMFA: e.target.checked }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Require multi-factor authentication</span>
              </label>
            </div>
          </div>

          {/* MFA Methods */}
          <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
            <h3 className="text-lg font-semibold text-brand-charcoal mb-4 flex items-center">
              <Smartphone size={20} className="mr-2 text-brand-orange" />
              Multi-Factor Authentication Methods
            </h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={securitySettings.authentication.mfaMethods.includes('totp')}
                    onChange={(e) => e.target.checked ? addMfaMethod('totp') : removeMfaMethod('totp')}
                    className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                  />
                  <span className="ml-2 text-sm text-brand-charcoal">TOTP (Google Authenticator, Authy)</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={securitySettings.authentication.mfaMethods.includes('sms')}
                    onChange={(e) => e.target.checked ? addMfaMethod('sms') : removeMfaMethod('sms')}
                    className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                  />
                  <span className="ml-2 text-sm text-brand-charcoal">SMS Verification</span>
                </label>
                
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={securitySettings.authentication.mfaMethods.includes('email')}
                    onChange={(e) => e.target.checked ? addMfaMethod('email') : removeMfaMethod('email')}
                    className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                  />
                  <span className="ml-2 text-sm text-brand-charcoal">Email Verification</span>
                </label>
              </div>
              
              <div className="text-sm text-brand-lightGray">
                Selected methods: {securitySettings.authentication.mfaMethods.join(', ')}
              </div>
            </div>
          </div>

          {/* Session & Login Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
            <h3 className="text-lg font-semibold text-brand-charcoal mb-4 flex items-center">
              <Clock size={20} className="mr-2 text-brand-orange" />
              Session & Login Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Session Timeout (seconds)
                </label>
                <input
                  type="number"
                  value={securitySettings.authentication.sessionTimeout}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    authentication: { ...prev.authentication, sessionTimeout: parseInt(e.target.value) }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Max Login Attempts
                </label>
                <input
                  type="number"
                  value={securitySettings.authentication.maxLoginAttempts}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    authentication: { ...prev.authentication, maxLoginAttempts: parseInt(e.target.value) }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Lockout Duration (seconds)
                </label>
                <input
                  type="number"
                  value={securitySettings.authentication.lockoutDuration}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    authentication: { ...prev.authentication, lockoutDuration: parseInt(e.target.value) }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Password Policy */}
          <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
            <h3 className="text-lg font-semibold text-brand-charcoal mb-4 flex items-center">
              <Lock size={20} className="mr-2 text-brand-orange" />
              Password Policy
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Minimum Length
                </label>
                <input
                  type="number"
                  value={securitySettings.authentication.passwordPolicy.minLength}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    authentication: {
                      ...prev.authentication,
                      passwordPolicy: {
                        ...prev.authentication.passwordPolicy,
                        minLength: parseInt(e.target.value)
                      }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Password History
                </label>
                <input
                  type="number"
                  value={securitySettings.authentication.passwordPolicy.passwordHistory}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    authentication: {
                      ...prev.authentication,
                      passwordPolicy: {
                        ...prev.authentication.passwordPolicy,
                        passwordHistory: parseInt(e.target.value)
                      }
                    }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.authentication.passwordPolicy.requireUppercase}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    authentication: {
                      ...prev.authentication,
                      passwordPolicy: {
                        ...prev.authentication.passwordPolicy,
                        requireUppercase: e.target.checked
                      }
                    }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Require uppercase letters</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.authentication.passwordPolicy.requireLowercase}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    authentication: {
                      ...prev.authentication,
                      passwordPolicy: {
                        ...prev.authentication.passwordPolicy,
                        requireLowercase: e.target.checked
                      }
                    }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Require lowercase letters</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.authentication.passwordPolicy.requireNumbers}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    authentication: {
                      ...prev.authentication,
                      passwordPolicy: {
                        ...prev.authentication.passwordPolicy,
                        requireNumbers: e.target.checked
                      }
                    }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Require numbers</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.authentication.passwordPolicy.requireSpecialChars}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    authentication: {
                      ...prev.authentication,
                      passwordPolicy: {
                        ...prev.authentication.passwordPolicy,
                        requireSpecialChars: e.target.checked
                      }
                    }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Require special characters</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.authentication.passwordPolicy.preventCommonPasswords}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    authentication: {
                      ...prev.authentication,
                      passwordPolicy: {
                        ...prev.authentication.passwordPolicy,
                        preventCommonPasswords: e.target.checked
                      }
                    }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Prevent common passwords</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'api' && (
        /* API Security Settings */
        <div className="space-y-6">
          {/* API Configuration */}
          <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-brand-charcoal flex items-center">
                <Key size={20} className="mr-2 text-brand-orange" />
                API Configuration
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={securitySettings.api.enabled}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    api: { ...prev.api, enabled: e.target.checked }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-orange rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-orange"></div>
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Rate Limit (requests per hour)
                </label>
                <input
                  type="number"
                  value={securitySettings.api.rateLimit}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    api: { ...prev.api, rateLimit: parseInt(e.target.value) }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Rate Limit Window (seconds)
                </label>
                <input
                  type="number"
                  value={securitySettings.api.rateLimitWindow}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    api: { ...prev.api, rateLimitWindow: parseInt(e.target.value) }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  API Key Expiry (days)
                </label>
                <input
                  type="number"
                  value={securitySettings.api.apiKeyExpiry}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    api: { ...prev.api, apiKeyExpiry: parseInt(e.target.value) }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-4 space-y-3">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.api.requireApiKey}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    api: { ...prev.api, requireApiKey: e.target.checked }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Require API key for all requests</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.api.corsEnabled}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    api: { ...prev.api, corsEnabled: e.target.checked }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Enable CORS</span>
              </label>
            </div>
          </div>

          {/* Allowed Origins */}
          <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
            <h3 className="text-lg font-semibold text-brand-charcoal mb-4 flex items-center">
              <Globe size={20} className="mr-2 text-brand-orange" />
              Allowed Origins (CORS)
            </h3>
            
            <div className="space-y-4">
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="https://example.com"
                  className="flex-1 px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      const target = e.target as HTMLInputElement
                      addAllowedOrigin(target.value)
                      target.value = ''
                    }
                  }}
                />
                <button
                  onClick={(e) => {
                    const input = e.currentTarget.previousElementSibling as HTMLInputElement
                    addAllowedOrigin(input.value)
                    input.value = ''
                  }}
                  className="btn btn-primary"
                >
                  Add
                </button>
              </div>
              
              <div className="space-y-2">
                {securitySettings.api.allowedOrigins.map((origin) => (
                  <div key={origin} className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded">
                    <span className="text-sm text-brand-charcoal">{origin}</span>
                    <button
                      onClick={() => removeAllowedOrigin(origin)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <XCircle size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'monitoring' && (
        /* Monitoring Settings */
        <div className="space-y-6">
          {/* Security Monitoring */}
          <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
            <h3 className="text-lg font-semibold text-brand-charcoal mb-4 flex items-center">
              <Activity size={20} className="mr-2 text-brand-orange" />
              Security Monitoring
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.monitoring.loginAttempts}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    monitoring: { ...prev.monitoring, loginAttempts: e.target.checked }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Monitor login attempts</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.monitoring.suspiciousActivity}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    monitoring: { ...prev.monitoring, suspiciousActivity: e.target.checked }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Monitor suspicious activity</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.monitoring.failedTransactions}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    monitoring: { ...prev.monitoring, failedTransactions: e.target.checked }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Monitor failed transactions</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.monitoring.adminActions}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    monitoring: { ...prev.monitoring, adminActions: e.target.checked }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Monitor admin actions</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.monitoring.dataExports}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    monitoring: { ...prev.monitoring, dataExports: e.target.checked }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Monitor data exports</span>
              </label>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-brand-charcoal mb-2">
                Log Retention Period (days)
              </label>
              <input
                type="number"
                value={securitySettings.monitoring.retentionPeriod}
                onChange={(e) => setSecuritySettings(prev => ({
                  ...prev,
                  monitoring: { ...prev.monitoring, retentionPeriod: parseInt(e.target.value) }
                }))}
                className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              />
            </div>
          </div>
        </div>
      )}

      {activeTab === 'compliance' && (
        /* Compliance Settings */
        <div className="space-y-6">
          {/* GDPR Compliance */}
          <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
            <h3 className="text-lg font-semibold text-brand-charcoal mb-4 flex items-center">
              <Shield size={20} className="mr-2 text-brand-orange" />
              GDPR Compliance
            </h3>
            
            <div className="space-y-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.compliance.gdprEnabled}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    compliance: { ...prev.compliance, gdprEnabled: e.target.checked }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Enable GDPR compliance features</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.compliance.rightToBeForgotten}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    compliance: { ...prev.compliance, rightToBeForgotten: e.target.checked }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Enable right to be forgotten</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.compliance.dataPortability}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    compliance: { ...prev.compliance, dataPortability: e.target.checked }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Enable data portability</span>
              </label>
              
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={securitySettings.compliance.auditLogging}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    compliance: { ...prev.compliance, auditLogging: e.target.checked }
                  }))}
                  className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                />
                <span className="ml-2 text-sm text-brand-charcoal">Enable audit logging</span>
              </label>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-brand-charcoal mb-2">
                Data Retention Period (days)
              </label>
              <input
                type="number"
                value={securitySettings.compliance.dataRetention}
                onChange={(e) => setSecuritySettings(prev => ({
                  ...prev,
                  compliance: { ...prev.compliance, dataRetention: parseInt(e.target.value) }
                }))}
                className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              />
            </div>
          </div>

          {/* Legal URLs */}
          <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
            <h3 className="text-lg font-semibold text-brand-charcoal mb-4 flex items-center">
              <FileText size={20} className="mr-2 text-brand-orange" />
              Legal Documents
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Privacy Policy URL
                </label>
                <input
                  type="url"
                  value={securitySettings.compliance.privacyPolicyUrl}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    compliance: { ...prev.compliance, privacyPolicyUrl: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Terms of Service URL
                </label>
                <input
                  type="url"
                  value={securitySettings.compliance.termsOfServiceUrl}
                  onChange={(e) => setSecuritySettings(prev => ({
                    ...prev,
                    compliance: { ...prev.compliance, termsOfServiceUrl: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="https://..."
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Security
