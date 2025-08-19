// Admin-specific types and interfaces

export interface AdminUser {
  id: string
  name: string
  email: string
  role: 'admin' | 'super_admin' | 'moderator' | 'support'
  permissions: AdminPermission[]
  lastLogin: string
  loginHistory: LoginAttempt[]
  status: 'active' | 'suspended' | 'inactive'
  createdAt: string
  updatedAt: string
}

export interface AdminPermission {
  resource: 'plans' | 'users' | 'orders' | 'analytics' | 'settings' | 'reports'
  actions: ('create' | 'read' | 'update' | 'delete' | 'approve' | 'export')[]
}

export interface LoginAttempt {
  timestamp: string
  ip: string
  userAgent: string
  success: boolean
  location?: string
  failureReason?: string
}

export interface AdminSession {
  id: string
  userId: string
  token: string
  expiresAt: string
  ip: string
  userAgent: string
  lastActivity: string
  isActive: boolean
}

export interface AdminAuditLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  resourceId?: string
  details: Record<string, any>
  ip: string
  userAgent: string
  timestamp: string
}

export interface AdminNotification {
  id: string
  type: 'info' | 'success' | 'warning' | 'error'
  title: string
  message: string
  read: boolean
  createdAt: string
  actionUrl?: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
}

export interface AdminDashboardWidget {
  id: string
  type: 'chart' | 'stats' | 'table' | 'list'
  title: string
  position: { x: number; y: number; w: number; h: number }
  config: Record<string, any>
  enabled: boolean
}

export interface AdminReport {
  id: string
  name: string
  description: string
  type: 'sales' | 'users' | 'plans' | 'financial' | 'custom'
  schedule?: {
    frequency: 'daily' | 'weekly' | 'monthly'
    recipients: string[]
    format: 'csv' | 'excel' | 'pdf'
    lastRun?: string
    nextRun?: string
  }
  config: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface AdminBulkOperation {
  id: string
  type: 'update' | 'delete' | 'export' | 'approve' | 'reject'
  resource: 'plans' | 'users' | 'orders'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  totalItems: number
  processedItems: number
  failedItems: number
  errors: string[]
  createdAt: string
  completedAt?: string
  initiatedBy: string
}

export interface AdminSystemHealth {
  status: 'healthy' | 'warning' | 'critical'
  checks: {
    database: HealthCheck
    redis: HealthCheck
    storage: HealthCheck
    email: HealthCheck
    payment: HealthCheck
    api: HealthCheck
  }
  metrics: {
    cpuUsage: number
    memoryUsage: number
    diskUsage: number
    activeConnections: number
    responseTime: number
  }
  lastUpdated: string
}

export interface HealthCheck {
  status: 'healthy' | 'warning' | 'critical'
  message: string
  lastChecked: string
  responseTime: number
}

export interface AdminMaintenanceMode {
  enabled: boolean
  reason: string
  startTime: string
  endTime?: string
  allowedIPs: string[]
  allowedUsers: string[]
  message: string
  initiatedBy: string
}

export interface AdminCacheStats {
  totalKeys: number
  memoryUsage: number
  hitRate: number
  missRate: number
  evictions: number
  expiredKeys: number
  lastCleared: string
}

export interface AdminAPIKey {
  id: string
  name: string
  key: string
  permissions: AdminPermission[]
  lastUsed?: string
  createdAt: string
  expiresAt?: string
  isActive: boolean
}

export interface AdminWebhook {
  id: string
  name: string
  url: string
  events: string[]
  headers: Record<string, string>
  isActive: boolean
  lastTriggered?: string
  successCount: number
  failureCount: number
  createdAt: string
}

export interface AdminBackup {
  id: string
  name: string
  type: 'full' | 'database' | 'files' | 'config'
  size: number
  status: 'pending' | 'in_progress' | 'completed' | 'failed'
  createdAt: string
  completedAt?: string
  downloadUrl?: string
  checksum: string
  encryption: boolean
}

export interface AdminIntegration {
  id: string
  name: string
  type: 'payment' | 'email' | 'analytics' | 'crm' | 'other'
  provider: string
  config: Record<string, any>
  isActive: boolean
  lastSync?: string
  syncStatus: 'success' | 'failed' | 'pending'
  createdAt: string
  updatedAt: string
}

export interface AdminWorkflow {
  id: string
  name: string
  description: string
  trigger: string
  conditions: WorkflowCondition[]
  actions: WorkflowAction[]
  isActive: boolean
  priority: number
  createdAt: string
  updatedAt: string
}

export interface WorkflowCondition {
  field: string
  operator: 'equals' | 'not_equals' | 'contains' | 'greater_than' | 'less_than'
  value: any
}

export interface WorkflowAction {
  type: 'send_email' | 'send_sms' | 'webhook' | 'update_status' | 'create_task'
  config: Record<string, any>
}

export interface AdminTask {
  id: string
  title: string
  description: string
  type: 'manual' | 'automated' | 'scheduled'
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignedTo?: string
  dueDate?: string
  completedAt?: string
  tags: string[]
  createdAt: string
  updatedAt: string
}

export interface AdminComment {
  id: string
  content: string
  author: string
  authorId: string
  resource: string
  resourceId: string
  parentId?: string
  isInternal: boolean
  createdAt: string
  updatedAt: string
}

export interface AdminFile {
  id: string
  name: string
  originalName: string
  mimeType: string
  size: number
  path: string
  url: string
  uploadedBy: string
  uploadedAt: string
  tags: string[]
  metadata: Record<string, any>
}

export interface AdminSearchResult {
  type: 'plan' | 'user' | 'order' | 'analytics' | 'settings'
  id: string
  title: string
  description: string
  url: string
  relevance: number
  highlights: string[]
}

export interface AdminSearchQuery {
  query: string
  filters: Record<string, any>
  sort: string
  page: number
  limit: number
}

export interface AdminSearchResponse {
  results: AdminSearchResult[]
  total: number
  page: number
  limit: number
  suggestions: string[]
  facets: Record<string, any>
}

// Enums
export enum AdminRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  MODERATOR = 'moderator',
  SUPPORT = 'support',
}

export enum AdminPermissionResource {
  PLANS = 'plans',
  USERS = 'users',
  ORDERS = 'orders',
  ANALYTICS = 'analytics',
  SETTINGS = 'settings',
  REPORTS = 'reports',
}

export enum AdminPermissionAction {
  CREATE = 'create',
  READ = 'read',
  UPDATE = 'update',
  DELETE = 'delete',
  APPROVE = 'approve',
  EXPORT = 'export',
}

export enum AdminNotificationType {
  INFO = 'info',
  SUCCESS = 'success',
  WARNING = 'warning',
  ERROR = 'error',
}

export enum AdminNotificationPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum AdminTaskStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  CANCELLED = 'cancelled',
}

export enum AdminTaskPriority {
  LOW = 'low',
  MEDIUM = 'medium',
  HIGH = 'high',
  URGENT = 'urgent',
}

export enum AdminBackupType {
  FULL = 'full',
  DATABASE = 'database',
  FILES = 'files',
  CONFIG = 'config',
}

export enum AdminBackupStatus {
  PENDING = 'pending',
  IN_PROGRESS = 'in_progress',
  COMPLETED = 'completed',
  FAILED = 'failed',
}

export enum AdminIntegrationType {
  PAYMENT = 'payment',
  EMAIL = 'email',
  ANALYTICS = 'analytics',
  CRM = 'crm',
  OTHER = 'other',
}

export enum AdminWorkflowTrigger {
  PLAN_CREATED = 'plan_created',
  PLAN_UPDATED = 'plan_updated',
  PLAN_APPROVED = 'plan_approved',
  PLAN_REJECTED = 'plan_rejected',
  USER_REGISTERED = 'user_registered',
  USER_SUSPENDED = 'user_suspended',
  ORDER_CREATED = 'order_created',
  ORDER_COMPLETED = 'order_completed',
  ORDER_CANCELLED = 'order_cancelled',
  PAYMENT_RECEIVED = 'payment_received',
  PAYMENT_FAILED = 'payment_failed',
}

export enum AdminWorkflowActionType {
  SEND_EMAIL = 'send_email',
  SEND_SMS = 'send_sms',
  WEBHOOK = 'webhook',
  UPDATE_STATUS = 'update_status',
  CREATE_TASK = 'create_task',
  ASSIGN_USER = 'assign_user',
  NOTIFY_ADMIN = 'notify_admin',
}
