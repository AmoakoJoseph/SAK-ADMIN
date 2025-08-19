import { useState, useEffect } from 'react'
import { 
  Save, 
  Zap, 
  Eye, 
  EyeOff, 
  CreditCard,
  Shield,
  DollarSign,
  Settings as SettingsIcon,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react'
import { adminSettingsService } from '../../services/admin/adminSettings'

interface PaymentConfigData {
  stripe: {
    enabled: boolean
    publishableKey: string
    secretKey: string
    webhookSecret: string
    currency: string
    supportedCurrencies: string[]
    testMode: boolean
  }
  paypal: {
    enabled: boolean
    clientId: string
    clientSecret: string
    mode: 'sandbox' | 'live'
    currency: string
    webhookUrl: string
  }
  mobileMoney: {
    enabled: boolean
    providers: string[]
    apiKeys: Record<string, string>
    webhookUrls: Record<string, string>
  }
  bankTransfer: {
    enabled: boolean
    bankDetails: {
      bankName: string
      accountNumber: string
      accountName: string
      swiftCode: string
      routingNumber: string
    }
    instructions: string
    processingTime: string
  }
  general: {
    defaultCurrency: string
    taxRate: number
    taxIncluded: boolean
    minimumOrderAmount: number
    maximumOrderAmount: number
    autoApproveOrders: boolean
    refundPolicy: string
  }
}

// Mock data for development
const mockPaymentConfig: PaymentConfigData = {
  stripe: {
    enabled: true,
    publishableKey: 'pk_test_your_stripe_key',
    secretKey: 'sk_test_your_stripe_key',
    webhookSecret: 'whsec_your_webhook_secret',
    currency: 'GHS',
    supportedCurrencies: ['GH', 'US', 'UK', 'CA']
  },
  paypal: {
    enabled: false,
    clientId: 'your_paypal_client_id',
    clientSecret: 'your_paypal_client_secret',
    mode: 'sandbox',
    currency: 'GHS'
  },
  mobileMoney: {
    enabled: true,
    providers: ['MTN', 'Vodafone', 'AirtelTigo'],
    apiKeys: {
      'MTN': 'your_mobile_money_api_key',
      'Vodafone': 'your_mobile_money_api_key',
      'AirtelTigo': 'your_mobile_money_api_key'
    },
    webhookUrls: {
      'MTN': 'https://api.sakconstructions.com/webhooks/mobile-money',
      'Vodafone': 'https://api.sakconstructions.com/webhooks/mobile-money',
      'AirtelTigo': 'https://api.sakconstructions.com/webhooks/mobile-money'
    }
  },
  bankTransfer: {
    enabled: true,
    bankDetails: {
      bankName: 'Ghana Commercial Bank',
      accountNumber: '1234567890',
      accountName: 'SAK Constructions Ltd',
      swiftCode: 'GCBLGHAC',
      routingNumber: '123456789'
    },
    instructions: 'Please include your order number as reference',
    processingTime: '2-3 business days'
  },
  general: {
    defaultCurrency: 'GHS',
    taxRate: 12.5,
    taxIncluded: true,
    minimumOrderAmount: 10,
    maximumOrderAmount: 10000,
    autoApproveOrders: false,
    refundPolicy: '30 days'
  }
}

const PaymentConfig: React.FC = () => {
  const [paymentConfig, setPaymentConfig] = useState<PaymentConfigData>({
    stripe: {
      enabled: true,
      publishableKey: 'pk_test_...',
      secretKey: 'sk_test_...',
      webhookSecret: 'whsec_...',
      currency: 'USD',
      supportedCurrencies: ['USD', 'GHS', 'EUR'],
      testMode: true
    },
    paypal: {
      enabled: false,
      clientId: '',
      clientSecret: '',
      mode: 'sandbox',
      currency: 'USD',
      webhookUrl: ''
    },
    mobileMoney: {
      enabled: true,
      providers: ['MTN Mobile Money', 'Vodafone Cash', 'Airtel Money'],
      apiKeys: {
        'MTN Mobile Money': 'mtn_api_key_...',
        'Vodafone Cash': 'vodafone_api_key_...',
        'Airtel Money': 'airtel_api_key_...'
      },
      webhookUrls: {
        'MTN Mobile Money': 'https://webhook.mtn.com/...',
        'Vodafone Cash': 'https://webhook.vodafone.com/...',
        'Airtel Money': 'https://webhook.airtel.com/...'
      }
    },
    bankTransfer: {
      enabled: true,
      bankDetails: {
        bankName: 'Ghana Commercial Bank',
        accountNumber: '1234567890',
        accountName: 'SAK CONSTRUCTIONS GH',
        swiftCode: 'GCBLGHAC',
        routingNumber: '123456789'
      },
      instructions: 'Bank transfer to Ghana Commercial Bank\nAccount: 1234567890\nReference: Your Order Number',
      processingTime: '2-3 business days'
    },
    general: {
      defaultCurrency: 'USD',
      taxRate: 12.5,
      taxIncluded: true,
      minimumOrderAmount: 10,
      maximumOrderAmount: 10000,
      autoApproveOrders: false,
      refundPolicy: 'Full refund within 30 days if plan quality issues are confirmed'
    }
  })

  const [showSecrets, setShowSecrets] = useState(false)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState<string | null>(null)

  useEffect(() => {
    const fetchConfig = async () => {
      console.log('Fetching payment configuration...')
      try {
        // Try to fetch from API first
        if (import.meta.env.VITE_API_BASE_URL) {
          const data = await adminSettingsService.getPaymentSettings()
          setPaymentConfig(data)
        } else {
          // Use mock data if no API URL configured
          setPaymentConfig(mockPaymentConfig)
        }
      } catch (error) {
        console.warn('API call failed, using mock data:', error)
        // Use mock data as fallback
        setPaymentConfig(mockPaymentConfig)
      }
    }

    fetchConfig()
  }, [])



  const handleSave = async () => {
    setSaving(true)
    try {
      // In real app, save to API
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Saving payment configuration...')
    } catch (error) {
      console.error('Error saving payment config:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleTestConnection = async (provider: string) => {
    setTesting(provider)
    try {
      // In real app, test connection
      await new Promise(resolve => setTimeout(resolve, 2000))
      console.log(`Testing ${provider} connection...`)
    } catch (error) {
      console.error('Error testing connection:', error)
    } finally {
      setTesting(null)
    }
  }

  const toggleProvider = (provider: keyof PaymentConfig) => {
    if (provider === 'stripe') {
      setPaymentConfig(prev => ({
        ...prev,
        stripe: { ...prev.stripe, enabled: !prev.stripe.enabled }
      }))
    } else if (provider === 'paypal') {
      setPaymentConfig(prev => ({
        ...prev,
        paypal: { ...prev.paypal, enabled: !prev.paypal.enabled }
      }))
    } else if (provider === 'mobileMoney') {
      setPaymentConfig(prev => ({
        ...prev,
        mobileMoney: { ...prev.mobileMoney, enabled: !prev.mobileMoney.enabled }
      }))
    } else if (provider === 'bankTransfer') {
      setPaymentConfig(prev => ({
        ...prev,
        bankTransfer: { ...prev.bankTransfer, enabled: !prev.bankTransfer.enabled }
      }))
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal">Payment Configuration</h1>
          <p className="text-brand-lightGray">Manage payment gateways and transaction settings</p>
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

      {/* Stripe Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-brand-charcoal flex items-center">
            <CreditCard size={20} className="mr-2 text-brand-orange" />
            Stripe Configuration
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={paymentConfig.stripe.enabled}
              onChange={() => toggleProvider('stripe')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-brand-orange rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-orange"></div>
          </label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Publishable Key
            </label>
            <input
              type="text"
              value={paymentConfig.stripe.publishableKey}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                stripe: { ...prev.stripe, publishableKey: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              placeholder="pk_test_..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Secret Key
            </label>
            <input
              type={showSecrets ? "text" : "password"}
              value={paymentConfig.stripe.secretKey}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                stripe: { ...prev.stripe, secretKey: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              placeholder="sk_test_..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Webhook Secret
            </label>
            <input
              type={showSecrets ? "text" : "password"}
              value={paymentConfig.stripe.webhookSecret}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                stripe: { ...prev.stripe, webhookSecret: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              placeholder="whsec_..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Default Currency
            </label>
            <select
              value={paymentConfig.stripe.currency}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                stripe: { ...prev.stripe, currency: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="USD">USD</option>
              <option value="GHS">GHS</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
        </div>
        
        <div className="mt-4 flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={paymentConfig.stripe.testMode}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                stripe: { ...prev.stripe, testMode: e.target.checked }
              }))}
              className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
            />
            <span className="ml-2 text-sm text-brand-charcoal">Test Mode</span>
          </label>
          
          <button
            onClick={() => handleTestConnection('Stripe')}
            disabled={testing === 'Stripe'}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <Zap size={16} />
            <span>{testing === 'Stripe' ? 'Testing...' : 'Test Connection'}</span>
          </button>
        </div>
      </div>

      {/* PayPal Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-brand-charcoal flex items-center">
            <CreditCard size={20} className="mr-2 text-blue-600" />
            PayPal Configuration
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={paymentConfig.paypal.enabled}
              onChange={() => toggleProvider('paypal')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Client ID
            </label>
            <input
              type="text"
              value={paymentConfig.paypal.clientId}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                paypal: { ...prev.paypal, clientId: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              placeholder="Client ID"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Client Secret
            </label>
            <input
              type={showSecrets ? "text" : "password"}
              value={paymentConfig.paypal.clientSecret}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                paypal: { ...prev.paypal, clientSecret: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              placeholder="Client Secret"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Mode
            </label>
            <select
              value={paymentConfig.paypal.mode}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                paypal: { ...prev.paypal, mode: e.target.value as 'sandbox' | 'live' }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="sandbox">Sandbox</option>
              <option value="live">Live</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Webhook URL
            </label>
            <input
              type="text"
              value={paymentConfig.paypal.webhookUrl}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                paypal: { ...prev.paypal, webhookUrl: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              placeholder="https://..."
            />
          </div>
        </div>
        
        <div className="mt-4">
          <button
            onClick={() => handleTestConnection('PayPal')}
            disabled={testing === 'PayPal'}
            className="btn btn-secondary flex items-center space-x-2"
          >
            <Zap size={16} />
            <span>{testing === 'PayPal' ? 'Testing...' : 'Test Connection'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Money Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-brand-charcoal flex items-center">
            <DollarSign size={20} className="mr-2 text-green-600" />
            Mobile Money Configuration
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={paymentConfig.mobileMoney.enabled}
              onChange={() => toggleProvider('mobileMoney')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>
        
        <div className="space-y-4">
          {paymentConfig.mobileMoney.providers.map((provider) => (
            <div key={provider} className="border border-brand-lightGray rounded-lg p-4">
              <h4 className="font-medium text-brand-charcoal mb-3">{provider}</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">
                    API Key
                  </label>
                  <input
                    type={showSecrets ? "text" : "password"}
                    value={paymentConfig.mobileMoney.apiKeys[provider] || ''}
                    onChange={(e) => setPaymentConfig(prev => ({
                      ...prev,
                      mobileMoney: {
                        ...prev.mobileMoney,
                        apiKeys: {
                          ...prev.mobileMoney.apiKeys,
                          [provider]: e.target.value
                        }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="API Key"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">
                    Webhook URL
                  </label>
                  <input
                    type="text"
                    value={paymentConfig.mobileMoney.webhookUrls[provider] || ''}
                    onChange={(e) => setPaymentConfig(prev => ({
                      ...prev,
                      mobileMoney: {
                        ...prev.mobileMoney,
                        webhookUrls: {
                          ...prev.mobileMoney.webhookUrls,
                          [provider]: e.target.value
                        }
                      }
                    }))}
                    className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bank Transfer Configuration */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-brand-charcoal flex items-center">
            <Shield size={20} className="mr-2 text-blue-600" />
            Bank Transfer Configuration
          </h3>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={paymentConfig.bankTransfer.enabled}
              onChange={() => toggleProvider('bankTransfer')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
          </label>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Bank Name
            </label>
            <input
              type="text"
              value={paymentConfig.bankTransfer.bankDetails.bankName}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                bankTransfer: {
                  ...prev.bankTransfer,
                  bankDetails: {
                    ...prev.bankTransfer.bankDetails,
                    bankName: e.target.value
                  }
                }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Account Number
            </label>
            <input
              type="text"
              value={paymentConfig.bankTransfer.bankDetails.accountNumber}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                bankTransfer: {
                  ...prev.bankTransfer,
                  bankDetails: {
                    ...prev.bankTransfer.bankDetails,
                    accountNumber: e.target.value
                  }
                }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Account Name
            </label>
            <input
              type="text"
              value={paymentConfig.bankTransfer.bankDetails.accountName}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                bankTransfer: {
                  ...prev.bankTransfer,
                  bankDetails: {
                    ...prev.bankTransfer.bankDetails,
                    accountName: e.target.value
                  }
                }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Processing Time
            </label>
            <input
              type="text"
              value={paymentConfig.bankTransfer.processingTime}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                bankTransfer: {
                  ...prev.bankTransfer,
                  processingTime: e.target.value
                }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
              placeholder="2-3 business days"
            />
          </div>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-brand-charcoal mb-2">
            Transfer Instructions
          </label>
          <textarea
            value={paymentConfig.bankTransfer.instructions}
            onChange={(e) => setPaymentConfig(prev => ({
              ...prev,
              bankTransfer: {
                ...prev.bankTransfer,
                instructions: e.target.value
              }
            }))}
            rows={4}
            className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            placeholder="Enter bank transfer instructions..."
          />
        </div>
      </div>

      {/* General Payment Settings */}
      <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
        <h3 className="text-lg font-semibold text-brand-charcoal mb-4 flex items-center">
          <SettingsIcon size={20} className="mr-2 text-brand-orange" />
          General Payment Settings
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Default Currency
            </label>
            <select
              value={paymentConfig.general.defaultCurrency}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                general: { ...prev.general, defaultCurrency: e.target.value }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            >
              <option value="USD">USD</option>
              <option value="GHS">GHS</option>
              <option value="EUR">EUR</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Tax Rate (%)
            </label>
            <input
              type="number"
              step="0.1"
              value={paymentConfig.general.taxRate}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                general: { ...prev.general, taxRate: parseFloat(e.target.value) }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Minimum Order Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={paymentConfig.general.minimumOrderAmount}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                general: { ...prev.general, minimumOrderAmount: parseFloat(e.target.value) }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-brand-charcoal mb-2">
              Maximum Order Amount
            </label>
            <input
              type="number"
              step="0.01"
              value={paymentConfig.general.maximumOrderAmount}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                general: { ...prev.general, maximumOrderAmount: parseFloat(e.target.value) }
              }))}
              className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            />
          </div>
        </div>
        
        <div className="mt-4 space-y-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={paymentConfig.general.taxIncluded}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                general: { ...prev.general, taxIncluded: e.target.checked }
              }))}
              className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
            />
            <span className="ml-2 text-sm text-brand-charcoal">Tax included in prices</span>
          </label>
          
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={paymentConfig.general.autoApproveOrders}
              onChange={(e) => setPaymentConfig(prev => ({
                ...prev,
                general: { ...prev.general, autoApproveOrders: e.target.checked }
              }))}
              className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
            />
            <span className="ml-2 text-sm text-brand-charcoal">Auto-approve orders after payment</span>
          </label>
        </div>
        
        <div className="mt-4">
          <label className="block text-sm font-medium text-brand-charcoal mb-2">
            Refund Policy
          </label>
          <textarea
            value={paymentConfig.general.refundPolicy}
            onChange={(e) => setPaymentConfig(prev => ({
              ...prev,
              general: { ...prev.general, refundPolicy: e.target.value }
            }))}
            rows={3}
            className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
            placeholder="Enter refund policy..."
          />
        </div>
      </div>
    </div>
  )
}

export default PaymentConfig
