import { useState, useEffect } from 'react'
import { 
  Save,
  Zap, 
  Eye,
  EyeOff,
  Upload, 
  Download,
  Shield,
  Mail,
  CreditCard,
  Globe,
  Bell,
  Database,
  Key,
  Settings as SettingsIcon
} from 'lucide-react'
import { adminSettingsService } from '../services/admin/adminSettings'

const Settings = () => {
  const [activeTab, setActiveTab] = useState('site')
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  // Site Settings
  const [siteSettings, setSiteSettings] = useState({
    general: {
      siteName: 'SAK CONSTRUCTIONS GH',
      siteDescription: 'Premium Building Plans and Construction Services',
      siteUrl: 'https://sakconstructions.com',
      contactEmail: 'admin@sakconstructions.com',
      contactPhone: '+233 20 123 4567',
      address: 'Accra, Ghana',
      timezone: 'Africa/Accra',
      language: 'en',
      currency: 'USD',
      dateFormat: 'MM/DD/YYYY'
    },
    appearance: {
      logo: '/logo.png',
      favicon: '/favicon.ico',
      primaryColor: '#f97316',
      secondaryColor: '#2d3748',
      theme: 'light' as const,
      customCSS: ''
    },
    content: {
      aboutPage: 'About SAK CONSTRUCTIONS GH...',
      termsOfService: 'Terms of Service...',
      privacyPolicy: 'Privacy Policy...',
      faq: [
        { question: 'How do I download a plan?', answer: 'After payment, you can download your plan from your account dashboard.' },
        { question: 'What file formats are supported?', answer: 'We support PDF, DWG, and ZIP files for all our building plans.' }
      ],
      announcements: [
        { title: 'New Plans Available', content: 'Check out our latest residential designs', active: true },
        { title: 'System Maintenance', content: 'Scheduled maintenance on Sunday', active: false }
      ]
    },
    seo: {
      metaTitle: 'SAK CONSTRUCTIONS GH - Premium Building Plans',
      metaDescription: 'Get professional building plans and construction services in Ghana',
      metaKeywords: 'building plans, construction, architecture, Ghana',
      googleAnalyticsId: 'GA-123456789',
      facebookPixelId: 'FB-123456789',
      structuredData: ''
    }
  })

  // Payment Settings
  const [paymentSettings, setPaymentSettings] = useState({
    stripe: {
      enabled: true,
      publishableKey: 'pk_test_...',
      secretKey: 'sk_test_...',
      webhookSecret: 'whsec_...',
      currency: 'USD',
      supportedCurrencies: ['USD', 'GHS', 'EUR']
    },
    paypal: {
      enabled: false,
      clientId: '',
      clientSecret: '',
      mode: 'sandbox' as const,
      currency: 'USD'
    },
    manual: {
      enabled: true,
      instructions: 'Bank transfer to Ghana Commercial Bank\nAccount: 1234567890\nReference: Your Order Number',
      bankDetails: 'Ghana Commercial Bank\nAccra Main Branch',
      paymentMethods: ['Bank Transfer', 'Mobile Money', 'Cash']
    },
    general: {
      defaultCurrency: 'USD',
      taxRate: 12.5,
      taxIncluded: true,
      minimumOrderAmount: 10,
      maximumOrderAmount: 10000,
      autoApproveOrders: false
    }
  })

  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtp: {
      host: 'smtp.gmail.com',
      port: 587,
      username: 'noreply@sakconstructions.com',
      password: '',
      encryption: 'tls' as const,
      fromEmail: 'noreply@sakconstructions.com',
      fromName: 'SAK CONSTRUCTIONS GH'
    },
    templates: {
      welcome: {
        subject: 'Welcome to SAK CONSTRUCTIONS GH',
        body: 'Welcome {{name}}! Thank you for joining our platform.',
        variables: ['name', 'email'],
        active: true
      },
      orderConfirmation: {
        subject: 'Order Confirmation - {{orderNumber}}',
        body: 'Your order {{orderNumber}} has been confirmed.',
        variables: ['orderNumber', 'amount', 'planName'],
        active: true
      }
    },
    automation: {
      welcomeEmail: true,
      orderConfirmation: true,
      abandonedCart: false,
      planUpdates: true,
      newsletter: false
    }
  })

  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    authentication: {
      requireEmailVerification: true,
      requirePhoneVerification: false,
      requireMFA: false,
      mfaMethods: ['totp'] as const,
      sessionTimeout: 3600,
      maxLoginAttempts: 5,
      lockoutDuration: 900,
      passwordPolicy: {
        minLength: 8,
        requireUppercase: true,
        requireLowercase: true,
        requireNumbers: true,
        requireSymbols: true,
        preventCommonPasswords: true
      }
    },
    access: {
      ipWhitelist: [],
      allowedCountries: ['GH', 'US', 'UK', 'CA'],
      vpnDetection: false,
      concurrentSessions: 3,
      adminOnlyAccess: false
    },
    monitoring: {
      logAllActions: true,
      logRetentionDays: 365,
      logSensitiveData: false,
      alertOnSuspiciousActivity: true,
      securityNotifications: true
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily' as const,
      backupRetention: 30,
      backupLocation: 'local',
      encryption: true
    }
  })

  const [showSecrets, setShowSecrets] = useState(false)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      setLoading(true)
      // In real app, fetch from API
      // const site = await adminSettingsService.getSiteSettings()
      // const payment = await adminSettingsService.getPaymentSettings()
      // const email = await adminSettingsService.getEmailSettings()
      // const security = await adminSettingsService.getSecuritySettings()
    } catch (error) {
      console.error('Error fetching settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async (type: string) => {
    setSaving(true)
    try {
      // In real app, save to API
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(`Saving ${type} settings...`)
    } catch (error) {
      console.error('Error saving settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleTestConnection = async (type: 'email' | 'payment') => {
    try {
      // In real app, test connection
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log(`Testing ${type} connection...`)
    } catch (error) {
      console.error('Error testing connection:', error)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-orange"></div>
      </div>
    )
  }

  const tabs = [
    { id: 'site', name: 'Site Settings', icon: Globe },
    { id: 'payment', name: 'Payment', icon: CreditCard },
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'system', name: 'System', icon: Database }
  ]

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
          <div>
          <h1 className="text-2xl font-bold text-brand-charcoal">Settings</h1>
          <p className="text-brand-lightGray">Configure your application settings and preferences</p>
        </div>
      </div>

      {/* Settings Tabs */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray">
        <div className="border-b border-brand-lightGray">
          <nav className="flex space-x-8 px-6" aria-label="Tabs">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-brand-orange text-brand-orange'
                      : 'border-transparent text-brand-lightGray hover:text-brand-charcoal hover:border-brand-lightGray'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.name}</span>
                </button>
              )
            })}
          </nav>
        </div>

        <div className="p-6">
          {/* Site Settings Tab */}
          {activeTab === 'site' && (
    <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-brand-charcoal mb-4">General Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Site Name</label>
                    <input
                      type="text"
                      value={siteSettings.general.siteName}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings,
                        general: { ...siteSettings.general, siteName: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
            </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Site URL</label>
                    <input
                      type="url"
                      value={siteSettings.general.siteUrl}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings,
                        general: { ...siteSettings.general, siteUrl: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
          </div>
            <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Contact Email</label>
                    <input
                      type="email"
                      value={siteSettings.general.contactEmail}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings,
                        general: { ...siteSettings.general, contactEmail: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
          </div>
            <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Contact Phone</label>
                    <input
                      type="tel"
                      value={siteSettings.general.contactPhone}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings,
                        general: { ...siteSettings.general, contactPhone: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
          </div>
        </div>
      </div>

              <div>
                <h3 className="text-lg font-medium text-brand-charcoal mb-4">Appearance</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Primary Color</label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={siteSettings.appearance.primaryColor}
                        onChange={(e) => setSiteSettings({
                          ...siteSettings,
                          appearance: { ...siteSettings.appearance, primaryColor: e.target.value }
                        })}
                        className="w-12 h-10 border border-brand-lightGray rounded-md"
                      />
                      <input
                        type="text"
                        value={siteSettings.appearance.primaryColor}
                        onChange={(e) => setSiteSettings({
                          ...siteSettings,
                          appearance: { ...siteSettings.appearance, primaryColor: e.target.value }
                        })}
                        className="flex-1 px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                      />
              </div>
            </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Theme</label>
                    <select
                      value={siteSettings.appearance.theme}
                      onChange={(e) => setSiteSettings({
                        ...siteSettings,
                        appearance: { ...siteSettings.appearance, theme: e.target.value as any }
                      })}
                      className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    >
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                      <option value="auto">Auto</option>
                    </select>
        </div>
      </div>
    </div>

              <div className="flex justify-end">
              <button
                  onClick={() => handleSave('site')}
                  disabled={saving}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save Site Settings'}</span>
              </button>
            </div>
          </div>
          )}

          {/* Payment Settings Tab */}
          {activeTab === 'payment' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-brand-charcoal mb-4">Stripe Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Publishable Key</label>
              <input 
                      type="text"
                      value={paymentSettings.stripe.publishableKey}
                      onChange={(e) => setPaymentSettings({
                        ...paymentSettings,
                        stripe: { ...paymentSettings.stripe, publishableKey: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
          </div>
          <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Secret Key</label>
            <div className="relative">
              <input 
                        type={showSecrets ? 'text' : 'password'}
                        value={paymentSettings.stripe.secretKey}
                        onChange={(e) => setPaymentSettings({
                          ...paymentSettings,
                          stripe: { ...paymentSettings.stripe, secretKey: e.target.value }
                        })}
                        className="w-full px-3 py-2 pr-10 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              />
              <button
                type="button"
                        onClick={() => setShowSecrets(!showSecrets)}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-brand-lightGray hover:text-brand-charcoal"
              >
                        {showSecrets ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>
                <div className="mt-4">
                  <button
                    onClick={() => handleTestConnection('payment')}
                    className="btn btn-secondary flex items-center space-x-2"
                  >
                                    <Zap size={16} />
                <span>Test Stripe Connection</span>
                  </button>
        </div>
      </div>

              <div>
                <h3 className="text-lg font-medium text-brand-charcoal mb-4">General Payment Settings</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Default Currency</label>
                    <select
                      value={paymentSettings.general.defaultCurrency}
                      onChange={(e) => setPaymentSettings({
                        ...paymentSettings,
                        general: { ...paymentSettings.general, defaultCurrency: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    >
                      <option value="USD">USD</option>
                      <option value="GHS">GHS</option>
                      <option value="EUR">EUR</option>
                    </select>
          </div>
            <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Tax Rate (%)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={paymentSettings.general.taxRate}
                      onChange={(e) => setPaymentSettings({
                        ...paymentSettings,
                        general: { ...paymentSettings.general, taxRate: parseFloat(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
          </div>
        </div>
      </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleSave('payment')}
                  disabled={saving}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save Payment Settings'}</span>
                </button>
              </div>
            </div>
          )}

          {/* Email Settings Tab */}
          {activeTab === 'email' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-brand-charcoal mb-4">SMTP Configuration</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">SMTP Host</label>
                    <input
                      type="text"
                      value={emailSettings.smtp.host}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        smtp: { ...emailSettings.smtp, host: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">SMTP Port</label>
                    <input
                      type="number"
                      value={emailSettings.smtp.port}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        smtp: { ...emailSettings.smtp, port: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Username</label>
                    <input
                      type="text"
                      value={emailSettings.smtp.username}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        smtp: { ...emailSettings.smtp, username: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
          </div>
            <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Password</label>
                    <input
                      type="password"
                      value={emailSettings.smtp.password}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        smtp: { ...emailSettings.smtp, password: e.target.value }
                      })}
                      className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
                  </div>
            </div>
                <div className="mt-4">
                  <button
                    onClick={() => handleTestConnection('email')}
                    className="btn btn-secondary flex items-center space-x-2"
                  >
                                    <Zap size={16} />
                <span>Test Email Connection</span>
                  </button>
          </div>
        </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleSave('email')}
                  disabled={saving}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save Email Settings'}</span>
                </button>
      </div>
    </div>
          )}

          {/* Security Settings Tab */}
          {activeTab === 'security' && (
    <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-brand-charcoal mb-4">Authentication</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={securitySettings.authentication.requireEmailVerification}
                        onChange={(e) => setSecuritySettings({
                          ...securitySettings,
                          authentication: { ...securitySettings.authentication, requireEmailVerification: e.target.checked }
                        })}
                        className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                      />
                      <span className="ml-2 text-sm text-brand-charcoal">Require Email Verification</span>
                    </label>
                  </div>
          <div>
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={securitySettings.authentication.requireMFA}
                        onChange={(e) => setSecuritySettings({
                          ...securitySettings,
                          authentication: { ...securitySettings.authentication, requireMFA: e.target.checked }
                        })}
                        className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                      />
                      <span className="ml-2 text-sm text-brand-charcoal">Require Multi-Factor Authentication</span>
                    </label>
          </div>
          <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Session Timeout (seconds)</label>
                    <input
                      type="number"
                      value={securitySettings.authentication.sessionTimeout}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        authentication: { ...securitySettings.authentication, sessionTimeout: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
          </div>
          <div>
                    <label className="block text-sm font-medium text-brand-charcoal mb-2">Max Login Attempts</label>
                    <input
                      type="number"
                      value={securitySettings.authentication.maxLoginAttempts}
                      onChange={(e) => setSecuritySettings({
                        ...securitySettings,
                        authentication: { ...securitySettings.authentication, maxLoginAttempts: parseInt(e.target.value) }
                      })}
                      className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    />
          </div>
        </div>
      </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleSave('security')}
                  disabled={saving}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save Security Settings'}</span>
            </button>
          </div>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-brand-charcoal mb-4">Email Notifications</h3>
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={emailSettings.automation.welcomeEmail}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        automation: { ...emailSettings.automation, welcomeEmail: e.target.checked }
                      })}
                      className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                    />
                    <span className="ml-2 text-sm text-brand-charcoal">Welcome Email</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={emailSettings.automation.orderConfirmation}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        automation: { ...emailSettings.automation, orderConfirmation: e.target.checked }
                      })}
                      className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                    />
                    <span className="ml-2 text-sm text-brand-charcoal">Order Confirmation</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={emailSettings.automation.planUpdates}
                      onChange={(e) => setEmailSettings({
                        ...emailSettings,
                        automation: { ...emailSettings.automation, planUpdates: e.target.checked }
                      })}
                      className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                    />
                    <span className="ml-2 text-sm text-brand-charcoal">Plan Updates</span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => handleSave('notifications')}
                  disabled={saving}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <Save size={16} />
                  <span>{saving ? 'Saving...' : 'Save Notification Settings'}</span>
            </button>
          </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-brand-charcoal mb-4">System Information</h3>
                <div className="bg-primary-50 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-brand-lightGray">Node.js Version:</span>
                      <span className="ml-2 text-brand-charcoal">18.17.0</span>
          </div>
                    <div>
                      <span className="text-brand-lightGray">Database:</span>
                      <span className="ml-2 text-brand-charcoal">PostgreSQL 15.3</span>
        </div>
                    <div>
                      <span className="text-brand-lightGray">Uptime:</span>
                      <span className="ml-2 text-brand-charcoal">15 days, 8 hours</span>
      </div>
            <div>
                      <span className="text-brand-lightGray">Memory Usage:</span>
                      <span className="ml-2 text-brand-charcoal">45%</span>
          </div>
        </div>
      </div>
    </div>

      <div>
                <h3 className="text-lg font-medium text-brand-charcoal mb-4">Maintenance</h3>
                <div className="flex space-x-4">
                  <button className="btn btn-secondary flex items-center space-x-2">
                    <Download size={16} />
                    <span>Generate Backup</span>
                  </button>
                  <button className="btn btn-secondary flex items-center space-x-2">
                    <Database size={16} />
                    <span>Clear Cache</span>
                  </button>
                  <button className="btn btn-secondary flex items-center space-x-2">
                    <Key size={16} />
                    <span>Manage API Keys</span>
                  </button>
      </div>
        </div>
        </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Settings 