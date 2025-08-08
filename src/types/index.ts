// Common interfaces for the SAK Admin application

export interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'moderator' | 'user'
  status: 'active' | 'inactive' | 'suspended'
  createdAt: Date
  lastLogin?: Date
}

export interface Plan {
  id: string
  title: string
  description: string
  category: string
  price: number
  status: 'draft' | 'published' | 'archived'
  images: string[]
  files: string[]
  downloads: number
  views: number
  createdAt: Date
  updatedAt: Date
}

export interface Order {
  id: string
  userId: string
  planId: string
  amount: number
  status: 'pending' | 'paid' | 'completed' | 'cancelled' | 'refunded'
  paymentMethod: string
  createdAt: Date
  updatedAt: Date
}

export interface Activity {
  id: string
  type: 'order' | 'plan' | 'user' | 'system'
  message: string
  timestamp: Date
  user: string
  metadata?: Record<string, any>
}

export interface Notification {
  id: string
  title: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
  timestamp: Date
  read: boolean
}

export interface Breadcrumb {
  name: string
  href?: string
}

export interface ChartData {
  date: string
  value: number
  label?: string
}

export interface StatCardData {
  title: string
  value: number | string
  change?: number
  trend: 'up' | 'down' | 'neutral'
  icon: any // LucideIcon type
}

export interface ApiResponse<T> {
  data: T
  message: string
  success: boolean
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  totalPages: number
} 