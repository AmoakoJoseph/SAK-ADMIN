import { useState, useEffect } from 'react'
import { 
  Save, 
  Mail, 
  Plus, 
  Edit, 
  Trash2, 
  Eye,
  Copy,
  Send,
  Settings as SettingsIcon,
  CheckCircle,
  XCircle,
  AlertCircle,
  FileText,
  User,
  ShoppingCart,
  Bell,
  Zap,
  Shield
} from 'lucide-react'

interface EmailTemplate {
  id: string
  name: string
  subject: string
  content: string
  type: 'welcome' | 'order_confirmation' | 'password_reset' | 'plan_approval' | 'refund_notification' | 'custom'
  variables: string[]
  isActive: boolean
  lastModified: string
  createdBy: string
}

interface EmailSettings {
  smtp: {
    host: string
    port: number
    username: string
    password: string
    encryption: 'tls' | 'ssl' | 'none'
    fromEmail: string
    fromName: string
  }
  sendgrid: {
    enabled: boolean
    apiKey: string
    fromEmail: string
    fromName: string
  }
  general: {
    defaultFromEmail: string
    defaultFromName: string
    replyToEmail: string
    bounceEmail: string
    maxRetries: number
    retryDelay: number
  }
}

const EmailTemplates = () => {
  const [emailTemplates, setEmailTemplates] = useState<EmailTemplate[]>([
    {
      id: '1',
      name: 'Welcome Email',
      subject: 'Welcome to SAK CONSTRUCTIONS GH!',
      content: `Dear {{user_name}},

Welcome to SAK CONSTRUCTIONS GH! We're excited to have you on board.

Your account has been successfully created and you can now:
- Browse our extensive collection of building plans
- Download plans after purchase
- Access your account dashboard
- Get support from our team

If you have any questions, please don't hesitate to contact us.

Best regards,
The SAK CONSTRUCTIONS GH Team`,
      type: 'welcome',
      variables: ['user_name', 'user_email'],
      isActive: true,
      lastModified: '2024-01-15T10:30:00Z',
      createdBy: 'Admin'
    },
    {
      id: '2',
      name: 'Order Confirmation',
      subject: 'Order Confirmed - {{order_number}}',
      content: `Dear {{customer_name}},

Thank you for your order! Your order has been confirmed and is being processed.

Order Details:
- Order Number: {{order_number}}
- Plan: {{plan_title}}
- Amount: {{order_amount}}
- Date: {{order_date}}

You will receive your plan files within 24 hours. If you have any questions, please contact our support team.

Best regards,
The SAK CONSTRUCTIONS GH Team`,
      type: 'order_confirmation',
      variables: ['customer_name', 'order_number', 'plan_title', 'order_amount', 'order_date'],
      isActive: true,
      lastModified: '2024-01-15T10:30:00Z',
      createdBy: 'Admin'
    },
    {
      id: '3',
      name: 'Password Reset',
      subject: 'Password Reset Request',
      content: `Dear {{user_name}},

We received a request to reset your password. Click the link below to create a new password:

{{reset_link}}

This link will expire in 1 hour for security reasons.

If you didn't request this password reset, please ignore this email.

Best regards,
The SAK CONSTRUCTIONS GH Team`,
      type: 'password_reset',
      variables: ['user_name', 'reset_link'],
      isActive: true,
      lastModified: '2024-01-15T10:30:00Z',
      createdBy: 'Admin'
    },
    {
      id: '4',
      name: 'Plan Approval',
      subject: 'Your Plan Has Been Approved!',
      content: `Dear {{user_name}},

Great news! Your plan "{{plan_title}}" has been approved and is now available for purchase.

Plan Details:
- Title: {{plan_title}}
- Category: {{plan_category}}
- Price: {{plan_price}}

Your plan is now live and customers can purchase it. You'll receive notifications for each sale.

Best regards,
The SAK CONSTRUCTIONS GH Team`,
      type: 'plan_approval',
      variables: ['user_name', 'plan_title', 'plan_category', 'plan_price'],
      isActive: true,
      lastModified: '2024-01-15T10:30:00Z',
      createdBy: 'Admin'
    }
  ])

  const [emailSettings, setEmailSettings] = useState<EmailSettings>({
    smtp: {
      host: 'smtp.gmail.com',
      port: 587,
      username: 'noreply@sakconstructions.com',
      password: '********',
      encryption: 'tls',
      fromEmail: 'noreply@sakconstructions.com',
      fromName: 'SAK CONSTRUCTIONS GH'
    },
    sendgrid: {
      enabled: false,
      apiKey: '',
      fromEmail: 'noreply@sakconstructions.com',
      fromName: 'SAK CONSTRUCTIONS GH'
    },
    general: {
      defaultFromEmail: 'noreply@sakconstructions.com',
      defaultFromName: 'SAK CONSTRUCTIONS GH',
      replyToEmail: 'support@sakconstructions.com',
      bounceEmail: 'bounces@sakconstructions.com',
      maxRetries: 3,
      retryDelay: 300
    }
  })

  const [selectedTemplate, setSelectedTemplate] = useState<EmailTemplate | null>(null)
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null)
  const [showSecrets, setShowSecrets] = useState(false)
  const [saving, setSaving] = useState(false)
  const [testing, setTesting] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'templates' | 'settings'>('templates')

  useEffect(() => {
    fetchEmailData()
  }, [])

  const fetchEmailData = async () => {
    try {
      // In real app, fetch from API
      console.log('Fetching email data...')
    } catch (error) {
      console.error('Error fetching email data:', error)
    }
  }

  const handleSaveTemplate = async () => {
    if (!editingTemplate) return
    
    setSaving(true)
    try {
      // In real app, save to API
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setEmailTemplates(prev => 
        prev.map(template => 
          template.id === editingTemplate.id ? editingTemplate : template
        )
      )
      
      setEditingTemplate(null)
      console.log('Template saved successfully')
    } catch (error) {
      console.error('Error saving template:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleSaveSettings = async () => {
    setSaving(true)
    try {
      // In real app, save to API
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Email settings saved successfully')
    } catch (error) {
      console.error('Error saving email settings:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleTestConnection = async (type: 'smtp' | 'sendgrid') => {
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

  const handleSendTestEmail = async (templateId: string) => {
    try {
      // In real app, send test email
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log(`Sending test email for template ${templateId}`)
    } catch (error) {
      console.error('Error sending test email:', error)
    }
  }

  const duplicateTemplate = (template: EmailTemplate) => {
    const newTemplate: EmailTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      isActive: false,
      lastModified: new Date().toISOString(),
      createdBy: 'Admin'
    }
    setEmailTemplates(prev => [...prev, newTemplate])
  }

  const deleteTemplate = (templateId: string) => {
    if (confirm('Are you sure you want to delete this template?')) {
      setEmailTemplates(prev => prev.filter(t => t.id !== templateId))
    }
  }

  const getTemplateIcon = (type: string) => {
    switch (type) {
      case 'welcome':
        return <User size={16} />
      case 'order_confirmation':
        return <ShoppingCart size={16} />
      case 'password_reset':
        return <Shield size={16} />
      case 'plan_approval':
        return <FileText size={16} />
      case 'refund_notification':
        return <CheckCircle size={16} />
      default:
        return <Mail size={16} />
    }
  }

  const getTemplateTypeColor = (type: string) => {
    switch (type) {
      case 'welcome':
        return 'bg-blue-100 text-blue-800'
      case 'order_confirmation':
        return 'bg-green-100 text-green-800'
      case 'password_reset':
        return 'bg-yellow-100 text-yellow-800'
      case 'plan_approval':
        return 'bg-purple-100 text-purple-800'
      case 'refund_notification':
        return 'bg-red-100 text-red-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-brand-charcoal">Email Templates</h1>
          <p className="text-brand-lightGray">Manage email notifications and communication templates</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowSecrets(!showSecrets)}
            className="btn btn-secondary flex items-center space-x-2"
          >
            {showSecrets ? <Eye size={16} /> : <Eye size={16} />}
            <span>{showSecrets ? 'Hide' : 'Show'} Secrets</span>
          </button>
          <button
            onClick={() => setActiveTab(activeTab === 'templates' ? 'settings' : 'templates')}
            className="btn btn-primary flex items-center space-x-2"
          >
            <SettingsIcon size={16} />
            <span>{activeTab === 'templates' ? 'Settings' : 'Templates'}</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-brand-lightGray">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('templates')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'templates'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-brand-lightGray hover:text-brand-charcoal hover:border-brand-lightGray'
            }`}
          >
            Email Templates
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'settings'
                ? 'border-brand-orange text-brand-orange'
                : 'border-transparent text-brand-lightGray hover:text-brand-charcoal hover:border-brand-lightGray'
            }`}
          >
            Email Settings
          </button>
        </nav>
      </div>

      {activeTab === 'templates' ? (
        /* Email Templates Section */
        <div className="space-y-6">
          {/* Templates List */}
          <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-brand-charcoal">Email Templates</h3>
              <button className="btn btn-primary flex items-center space-x-2">
                <Plus size={16} />
                <span>New Template</span>
              </button>
            </div>
            
            <div className="space-y-4">
              {emailTemplates.map((template) => (
                <div key={template.id} className="border border-brand-lightGray rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      {getTemplateIcon(template.type)}
                      <div>
                        <h4 className="font-medium text-brand-charcoal">{template.name}</h4>
                        <p className="text-sm text-brand-lightGray">{template.subject}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getTemplateTypeColor(template.type)}`}>
                        {template.type.replace('_', ' ')}
                      </span>
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        template.isActive ? 'bg-success-100 text-success-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {template.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-brand-lightGray">
                      <span>Variables: {template.variables.join(', ')}</span>
                      <span className="mx-2">•</span>
                      <span>Modified: {new Date(template.lastModified).toLocaleDateString()}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setSelectedTemplate(template)}
                        className="btn btn-secondary btn-sm flex items-center space-x-2"
                      >
                        <Eye size={14} />
                        <span>View</span>
                      </button>
                      <button
                        onClick={() => setEditingTemplate(template)}
                        className="btn btn-primary btn-sm flex items-center space-x-2"
                      >
                        <Edit size={14} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => duplicateTemplate(template)}
                        className="btn btn-secondary btn-sm flex items-center space-x-2"
                      >
                        <Copy size={14} />
                        <span>Duplicate</span>
                      </button>
                      <button
                        onClick={() => handleSendTestEmail(template.id)}
                        className="btn btn-secondary btn-sm flex items-center space-x-2"
                      >
                        <Send size={14} />
                        <span>Test</span>
                      </button>
                      <button
                        onClick={() => deleteTemplate(template.id)}
                        className="btn btn-danger btn-sm flex items-center space-x-2"
                      >
                        <Trash2 size={14} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Template Editor Modal */}
          {editingTemplate && (
            <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-brand-charcoal">Edit Template: {editingTemplate.name}</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setEditingTemplate(null)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveTemplate}
                    disabled={saving}
                    className="btn btn-primary flex items-center space-x-2"
                  >
                    <Save size={16} />
                    <span>{saving ? 'Saving...' : 'Save Template'}</span>
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={editingTemplate.name}
                    onChange={(e) => setEditingTemplate(prev => prev ? {...prev, name: e.target.value} : null)}
                    className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">
                    Email Subject
                  </label>
                  <input
                    type="text"
                    value={editingTemplate.subject}
                    onChange={(e) => setEditingTemplate(prev => prev ? {...prev, subject: e.target.value} : null)}
                    className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Email Content
                </label>
                <textarea
                  value={editingTemplate.content}
                  onChange={(e) => setEditingTemplate(prev => prev ? {...prev, content: e.target.value} : null)}
                  rows={12}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent font-mono text-sm"
                  placeholder="Enter email content with variables like {{user_name}}..."
                />
                <p className="text-xs text-brand-lightGray mt-1">
                  Available variables: {editingTemplate.variables.join(', ')}
                </p>
              </div>
              
              <div className="mt-4 flex items-center space-x-4">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={editingTemplate.isActive}
                    onChange={(e) => setEditingTemplate(prev => prev ? {...prev, isActive: e.target.checked} : null)}
                    className="rounded border-brand-lightGray text-brand-orange focus:ring-brand-orange"
                  />
                  <span className="ml-2 text-sm text-brand-charcoal">Active Template</span>
                </label>
              </div>
            </div>
          )}

          {/* Template Preview Modal */}
          {selectedTemplate && (
            <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-brand-charcoal">Template Preview: {selectedTemplate.name}</h3>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Subject</label>
                  <p className="text-brand-charcoal">{selectedTemplate.subject}</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Content</label>
                  <div className="bg-gray-50 p-4 rounded-lg border">
                    <pre className="whitespace-pre-wrap text-sm text-brand-charcoal font-mono">{selectedTemplate.content}</pre>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-brand-charcoal mb-2">Variables</label>
                  <div className="flex flex-wrap gap-2">
                    {selectedTemplate.variables.map((variable) => (
                      <span key={variable} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                        {`{{${variable}}}`}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        /* Email Settings Section */
        <div className="space-y-6">
          {/* SMTP Configuration */}
          <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
            <h3 className="text-lg font-semibold text-brand-charcoal mb-4 flex items-center">
              <Mail size={20} className="mr-2 text-brand-orange" />
              SMTP Configuration
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  SMTP Host
                </label>
                <input
                  type="text"
                  value={emailSettings.smtp.host}
                  onChange={(e) => setEmailSettings(prev => ({
                    ...prev,
                    smtp: { ...prev.smtp, host: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="smtp.gmail.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  SMTP Port
                </label>
                <input
                  type="number"
                  value={emailSettings.smtp.port}
                  onChange={(e) => setEmailSettings(prev => ({
                    ...prev,
                    smtp: { ...prev.smtp, port: parseInt(e.target.value) }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={emailSettings.smtp.username}
                  onChange={(e) => setEmailSettings(prev => ({
                    ...prev,
                    smtp: { ...prev.smtp, username: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Password
                </label>
                <input
                  type={showSecrets ? "text" : "password"}
                  value={emailSettings.smtp.password}
                  onChange={(e) => setEmailSettings(prev => ({
                    ...prev,
                    smtp: { ...prev.smtp, password: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Encryption
                </label>
                <select
                  value={emailSettings.smtp.encryption}
                  onChange={(e) => setEmailSettings(prev => ({
                    ...prev,
                    smtp: { ...prev.smtp, encryption: e.target.value as 'tls' | 'ssl' | 'none' }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                >
                  <option value="tls">TLS</option>
                  <option value="ssl">SSL</option>
                  <option value="none">None</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  From Email
                </label>
                <input
                  type="email"
                  value={emailSettings.smtp.fromEmail}
                  onChange={(e) => setEmailSettings(prev => ({
                    ...prev,
                    smtp: { ...prev.smtp, fromEmail: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <button
                onClick={() => handleTestConnection('smtp')}
                disabled={testing === 'smtp'}
                className="btn btn-secondary flex items-center space-x-2"
              >
                <Zap size={16} />
                <span>{testing === 'smtp' ? 'Testing...' : 'Test SMTP Connection'}</span>
              </button>
            </div>
          </div>

          {/* SendGrid Configuration */}
          <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-brand-charcoal flex items-center">
                <Mail size={20} className="mr-2 text-blue-600" />
                SendGrid Configuration
              </h3>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={emailSettings.sendgrid.enabled}
                  onChange={(e) => setEmailSettings(prev => ({
                    ...prev,
                    sendgrid: { ...prev.sendgrid, enabled: e.target.checked }
                  }))}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-600 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  API Key
                </label>
                <input
                  type={showSecrets ? "text" : "password"}
                  value={emailSettings.sendgrid.apiKey}
                  onChange={(e) => setEmailSettings(prev => ({
                    ...prev,
                    sendgrid: { ...prev.sendgrid, apiKey: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                  placeholder="SG..."
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  From Email
                </label>
                <input
                  type="email"
                  value={emailSettings.sendgrid.fromEmail}
                  onChange={(e) => setEmailSettings(prev => ({
                    ...prev,
                    sendgrid: { ...prev.sendgrid, fromEmail: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-4">
              <button
                onClick={() => handleTestConnection('sendgrid')}
                disabled={testing === 'sendgrid'}
                className="btn btn-secondary flex items-center space-x-2"
              >
                <Zap size={16} />
                <span>{testing === 'sendgrid' ? 'Testing...' : 'Test SendGrid Connection'}</span>
              </button>
            </div>
          </div>

          {/* General Email Settings */}
          <div className="bg-white rounded-lg shadow-sm border border-brand-lightGray p-6">
            <h3 className="text-lg font-semibold text-brand-charcoal mb-4 flex items-center">
              <SettingsIcon size={20} className="mr-2 text-brand-orange" />
              General Email Settings
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Default From Email
                </label>
                <input
                  type="email"
                  value={emailSettings.general.defaultFromEmail}
                  onChange={(e) => setEmailSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, defaultFromEmail: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Default From Name
                </label>
                <input
                  type="text"
                  value={emailSettings.general.defaultFromName}
                  onChange={(e) => setEmailSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, defaultFromName: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Reply-To Email
                </label>
                <input
                  type="email"
                  value={emailSettings.general.replyToEmail}
                  onChange={(e) => setEmailSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, replyToEmail: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Bounce Email
                </label>
                <input
                  type="email"
                  value={emailSettings.general.bounceEmail}
                  onChange={(e) => setEmailSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, bounceEmail: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Max Retries
                </label>
                <input
                  type="number"
                  value={emailSettings.general.maxRetries}
                  onChange={(e) => setEmailSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, maxRetries: parseInt(e.target.value) }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-brand-charcoal mb-2">
                  Retry Delay (seconds)
                </label>
                <input
                  type="number"
                  value={emailSettings.general.retryDelay}
                  onChange={(e) => setEmailSettings(prev => ({
                    ...prev,
                    general: { ...prev.general, retryDelay: parseInt(e.target.value) }
                  }))}
                  className="w-full px-3 py-2 border border-brand-lightGray rounded-md focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="mt-6">
              <button
                onClick={handleSaveSettings}
                disabled={saving}
                className="btn btn-primary flex items-center space-x-2"
              >
                <Save size={16} />
                <span>{saving ? 'Saving...' : 'Save Email Settings'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default EmailTemplates
