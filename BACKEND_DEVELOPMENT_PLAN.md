# 🏗️ SAK CONSTRUCTIONS GH - Backend Development Plan

## 📋 Executive Summary

Based on deep analysis of the frontend codebase, this document outlines a comprehensive backend development plan for SAK CONSTRUCTIONS GH. The backend will support a modern building plans marketplace with user authentication, plan management, e-commerce functionality, and admin capabilities.

## 🎯 Project Overview

### **Business Model**
- **Digital Product Marketplace**: Selling building plans and architectural designs
- **Tiered Pricing**: Basic, Standard, and Premium packages
- **Quick Buy System**: Frictionless purchase without account creation
- **Subscription/One-time Purchase**: Flexible payment models

### **Target Users**
- **End Users**: Homeowners, developers, architects
- **Administrators**: Content managers, order processors, analytics
- **Partners**: Architects, designers uploading plans

## 🏗️ Technical Architecture

### **Technology Stack**
```
Backend Framework: Node.js + Express.js / NestJS
Database: PostgreSQL (Primary) + Redis (Caching)
Authentication: JWT + Refresh Tokens
File Storage: AWS S3 / DigitalOcean Spaces
Payment Processing: Stripe / Paystack
Email Service: SendGrid / AWS SES
Search Engine: Elasticsearch / PostgreSQL Full-text Search
Real-time: Socket.io (for notifications)
```

### **Architecture Pattern**
- **RESTful API** with GraphQL consideration for complex queries
- **Microservices Architecture** for scalability
- **Event-Driven Architecture** for async operations
- **CQRS Pattern** for complex business logic

## 📊 Database Design

### **Core Entities**

#### **1. Users Table**
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  avatar_url VARCHAR(500),
  role user_role DEFAULT 'user',
  email_verified BOOLEAN DEFAULT FALSE,
  email_verification_token VARCHAR(255),
  password_reset_token VARCHAR(255),
  password_reset_expires TIMESTAMP,
  last_login TIMESTAMP,
  login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP,
  preferences JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE user_role AS ENUM ('user', 'admin', 'super_admin');
```

#### **2. Plans Table**
```sql
CREATE TABLE plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  type plan_type NOT NULL,
  bedrooms INTEGER NOT NULL,
  bathrooms INTEGER NOT NULL,
  sqft INTEGER NOT NULL,
  floors INTEGER DEFAULT 1,
  main_image_url VARCHAR(500),
  images JSONB,
  status plan_status DEFAULT 'draft',
  featured BOOLEAN DEFAULT FALSE,
  views_count INTEGER DEFAULT 0,
  downloads_count INTEGER DEFAULT 0,
  created_by UUID REFERENCES users(id),
  approved_by UUID REFERENCES users(id),
  approved_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE plan_type AS ENUM (
  'villa', 'bungalow', 'townhouse', 'cottage', 'farmhouse',
  'apartment', 'penthouse', 'duplex', 'tinyhouse', 'mansion'
);

CREATE TYPE plan_status AS ENUM ('draft', 'published', 'archived');
```

#### **3. Plan Tiers Table**
```sql
CREATE TABLE plan_tiers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID REFERENCES plans(id) ON DELETE CASCADE,
  tier_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  features JSONB NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(plan_id, tier_name)
);
```

#### **4. Orders Table**
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  order_number VARCHAR(50) UNIQUE NOT NULL,
  status order_status DEFAULT 'pending',
  payment_status payment_status DEFAULT 'pending',
  subtotal DECIMAL(10,2) NOT NULL,
  tax DECIMAL(10,2) DEFAULT 0,
  discount DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'GHS',
  shipping_address JSONB,
  billing_address JSONB,
  payment_method_id VARCHAR(255),
  coupon_code VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE order_status AS ENUM ('pending', 'processing', 'completed', 'cancelled', 'refunded');
CREATE TYPE payment_status AS ENUM ('pending', 'paid', 'failed', 'refunded');
```

#### **5. Order Items Table**
```sql
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
  plan_id UUID REFERENCES plans(id),
  tier_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### **6. Downloads Table**
```sql
CREATE TABLE downloads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  plan_id UUID REFERENCES plans(id),
  user_id UUID REFERENCES users(id),
  tier_name VARCHAR(50) NOT NULL,
  status download_status DEFAULT 'pending',
  expires_at TIMESTAMP NOT NULL,
  download_count INTEGER DEFAULT 0,
  last_downloaded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE download_status AS ENUM ('pending', 'ready', 'expired', 'failed');
```

#### **7. Download Files Table**
```sql
CREATE TABLE download_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  download_id UUID REFERENCES downloads(id) ON DELETE CASCADE,
  file_name VARCHAR(255) NOT NULL,
  file_type VARCHAR(50) NOT NULL,
  file_size BIGINT NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  storage_path VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### **8. Payments Table**
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID REFERENCES orders(id),
  payment_intent_id VARCHAR(255) UNIQUE,
  amount DECIMAL(10,2) NOT NULL,
  currency VARCHAR(3) DEFAULT 'GHS',
  status payment_status DEFAULT 'pending',
  payment_method JSONB,
  metadata JSONB,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### **9. Notifications Table**
```sql
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  type notification_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  data JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE notification_type AS ENUM ('order', 'download', 'payment', 'system');
```

#### **10. Reviews Table**
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id UUID REFERENCES plans(id),
  user_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  title VARCHAR(255),
  comment TEXT,
  approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(plan_id, user_id)
);
```

#### **11. Admin Users Table**
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  role admin_role NOT NULL,
  permissions JSONB,
  two_factor_enabled BOOLEAN DEFAULT FALSE,
  two_factor_secret VARCHAR(255),
  backup_codes JSONB,
  last_login TIMESTAMP,
  login_attempts INTEGER DEFAULT 0,
  locked_until TIMESTAMP,
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE admin_role AS ENUM (
  'super_admin', 'admin', 'content_manager', 
  'order_processor', 'support', 'analytics_manager'
);
```

#### **12. Admin Sessions Table**
```sql
CREATE TABLE admin_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES admin_users(id),
  session_token VARCHAR(255) UNIQUE NOT NULL,
  ip_address INET,
  user_agent TEXT,
  expires_at TIMESTAMP NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### **13. Admin Audit Logs Table**
```sql
CREATE TABLE admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES admin_users(id),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50),
  resource_id UUID,
  details JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### **14. Support Tickets Table**
```sql
CREATE TABLE support_tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id),
  assigned_to UUID REFERENCES admin_users(id),
  subject VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  status ticket_status DEFAULT 'open',
  priority ticket_priority DEFAULT 'medium',
  category VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE ticket_status AS ENUM ('open', 'in_progress', 'resolved', 'closed');
CREATE TYPE ticket_priority AS ENUM ('low', 'medium', 'high', 'urgent');
```

#### **15. Support Messages Table**
```sql
CREATE TABLE support_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES support_tickets(id) ON DELETE CASCADE,
  sender_id UUID,
  sender_type sender_type NOT NULL,
  message TEXT NOT NULL,
  attachments JSONB,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TYPE sender_type AS ENUM ('user', 'admin');
```

#### **16. System Settings Table**
```sql
CREATE TABLE system_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  setting_key VARCHAR(100) UNIQUE NOT NULL,
  setting_value JSONB NOT NULL,
  description TEXT,
  category VARCHAR(50),
  updated_by UUID REFERENCES admin_users(id),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### **17. Email Templates Table**
```sql
CREATE TABLE email_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(100) UNIQUE NOT NULL,
  subject VARCHAR(255) NOT NULL,
  body TEXT NOT NULL,
  variables JSONB,
  is_active BOOLEAN DEFAULT TRUE,
  created_by UUID REFERENCES admin_users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### **18. Admin Notifications Table**
```sql
CREATE TABLE admin_notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_user_id UUID REFERENCES admin_users(id),
  type notification_type NOT NULL,
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  data JSONB,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## 🔐 Authentication & Authorization

### **JWT Implementation**
```javascript
// JWT Configuration
const jwtConfig = {
  accessToken: {
    secret: process.env.JWT_ACCESS_SECRET,
    expiresIn: '15m',
    algorithm: 'HS256'
  },
  refreshToken: {
    secret: process.env.JWT_REFRESH_SECRET,
    expiresIn: '7d',
    algorithm: 'HS256'
  }
};
```

### **Role-Based Access Control (RBAC)**
```javascript
const permissions = {
  user: [
    'plans:read',
    'orders:create',
    'orders:read:own',
    'downloads:read:own',
    'profile:read',
    'profile:update'
  ],
  contentManager: [
    'plans:read',
    'plans:create',
    'plans:update',
    'plans:delete',
    'plans:approve',
    'files:upload',
    'files:manage',
    'analytics:read'
  ],
  orderProcessor: [
    'orders:read',
    'orders:update',
    'orders:process',
    'payments:read',
    'payments:process',
    'users:read',
    'downloads:manage'
  ],
  support: [
    'users:read',
    'users:update',
    'orders:read',
    'orders:update',
    'support:tickets:read',
    'support:tickets:update'
  ],
  admin: [
    'plans:read',
    'plans:create',
    'plans:update',
    'plans:delete',
    'plans:approve',
    'orders:read',
    'orders:update',
    'orders:process',
    'users:read',
    'users:update',
    'users:suspend',
    'analytics:read',
    'analytics:export',
    'system:settings:read'
  ],
  super_admin: [
    '*'
  ]
};
```

### **Admin Authentication Features**
```javascript
const adminAuthFeatures = {
  twoFactorAuth: {
    enabled: true,
    methods: ['totp', 'sms', 'email'],
    backupCodes: true
  },
  sessionManagement: {
    maxConcurrentSessions: 3,
    sessionTimeout: '8h',
    forceLogout: true
  },
  loginSecurity: {
    maxLoginAttempts: 5,
    lockoutDuration: '30m',
    ipWhitelist: ['office_ips'],
    geoRestriction: ['Ghana']
  },
  auditTrail: {
    loginAttempts: true,
    adminActions: true,
    dataAccess: true,
    retention: '2 years'
  }
};
```

### **API Endpoints**

#### **Authentication Routes**
```
POST   /api/v1/auth/register
POST   /api/v1/auth/login
POST   /api/v1/auth/logout
POST   /api/v1/auth/refresh
POST   /api/v1/auth/forgot-password
POST   /api/v1/auth/reset-password
GET    /api/v1/auth/verify-email
POST   /api/v1/auth/resend-verification
GET    /api/v1/auth/me
POST   /api/v1/auth/google
POST   /api/v1/auth/facebook
POST   /api/v1/auth/github
```

#### **Admin Authentication Routes**
```
POST   /api/v1/admin/auth/login
POST   /api/v1/admin/auth/logout
POST   /api/v1/admin/auth/refresh
POST   /api/v1/admin/auth/2fa/enable
POST   /api/v1/admin/auth/2fa/verify
POST   /api/v1/admin/auth/2fa/disable
GET    /api/v1/admin/auth/sessions
DELETE /api/v1/admin/auth/sessions/:id
POST   /api/v1/admin/auth/impersonate/:userId
POST   /api/v1/admin/auth/stop-impersonation
```

#### **Plans Routes**
```
GET    /api/v1/plans
GET    /api/v1/plans/:id
POST   /api/v1/plans
PUT    /api/v1/plans/:id
DELETE /api/v1/plans/:id
POST   /api/v1/plans/:id/approve
POST   /api/v1/plans/:id/feature
GET    /api/v1/plans/:id/reviews
POST   /api/v1/plans/:id/reviews
```

#### **Admin Plans Routes**
```
GET    /api/v1/admin/plans
GET    /api/v1/admin/plans/:id
POST   /api/v1/admin/plans
PUT    /api/v1/admin/plans/:id
DELETE /api/v1/admin/plans/:id
POST   /api/v1/admin/plans/:id/approve
POST   /api/v1/admin/plans/:id/reject
POST   /api/v1/admin/plans/:id/feature
POST   /api/v1/admin/plans/:id/unfeature
POST   /api/v1/admin/plans/:id/duplicate
POST   /api/v1/admin/plans/bulk-approve
POST   /api/v1/admin/plans/bulk-feature
POST   /api/v1/admin/plans/bulk-delete
GET    /api/v1/admin/plans/stats
GET    /api/v1/admin/plans/analytics
POST   /api/v1/admin/plans/:id/schedule
POST   /api/v1/admin/plans/:id/archive
POST   /api/v1/admin/plans/:id/restore
```

#### **Orders Routes**
```
GET    /api/v1/orders
GET    /api/v1/orders/:id
POST   /api/v1/orders
PUT    /api/v1/orders/:id/status
POST   /api/v1/orders/:id/cancel
POST   /api/v1/orders/:id/refund
GET    /api/v1/orders/:id/tracking
GET    /api/v1/orders/stats
```

#### **Admin Orders Routes**
```
GET    /api/v1/admin/orders
GET    /api/v1/admin/orders/:id
PUT    /api/v1/admin/orders/:id/status
POST   /api/v1/admin/orders/:id/process
POST   /api/v1/admin/orders/:id/ship
POST   /api/v1/admin/orders/:id/cancel
POST   /api/v1/admin/orders/:id/refund
POST   /api/v1/admin/orders/:id/resend-downloads
GET    /api/v1/admin/orders/analytics
GET    /api/v1/admin/orders/export
POST   /api/v1/admin/orders/bulk-process
POST   /api/v1/admin/orders/bulk-ship
GET    /api/v1/admin/orders/pending
GET    /api/v1/admin/orders/completed
GET    /api/v1/admin/orders/cancelled
```

#### **Downloads Routes**
```
GET    /api/v1/downloads
GET    /api/v1/downloads/:id
GET    /api/v1/downloads/files/:fileId
GET    /api/v1/downloads/files/:fileId/url
POST   /api/v1/downloads/:id/regenerate
POST   /api/v1/downloads/:id/extend
GET    /api/v1/downloads/:id/status
```

#### **Admin Downloads Routes**
```
GET    /api/v1/admin/downloads
GET    /api/v1/admin/downloads/:id
POST   /api/v1/admin/downloads/:id/regenerate
POST   /api/v1/admin/downloads/:id/extend
DELETE /api/v1/admin/downloads/:id
GET    /api/v1/admin/downloads/analytics
GET    /api/v1/admin/downloads/export
POST   /api/v1/admin/downloads/bulk-regenerate
POST   /api/v1/admin/downloads/bulk-extend
GET    /api/v1/admin/downloads/expired
GET    /api/v1/admin/downloads/failed
```

#### **Payments Routes**
```
POST   /api/v1/payments/create-intent
POST   /api/v1/payments/confirm
GET    /api/v1/payments/:id/status
POST   /api/v1/payments/refund
GET    /api/v1/payments/methods
POST   /api/v1/payments/methods
DELETE /api/v1/payments/methods/:id
```

#### **Admin Payments Routes**
```
GET    /api/v1/admin/payments
GET    /api/v1/admin/payments/:id
POST   /api/v1/admin/payments/:id/capture
POST   /api/v1/admin/payments/:id/refund
POST   /api/v1/admin/payments/:id/dispute
GET    /api/v1/admin/payments/analytics
GET    /api/v1/admin/payments/export
GET    /api/v1/admin/payments/failed
GET    /api/v1/admin/payments/pending
POST   /api/v1/admin/payments/bulk-capture
POST   /api/v1/admin/payments/bulk-refund
GET    /api/v1/admin/payments/settlements
GET    /api/v1/admin/payments/disputes
```

#### **Search Routes**
```
GET    /api/v1/search/plans
GET    /api/v1/search/suggestions
GET    /api/v1/search/filters
GET    /api/v1/search/popular
GET    /api/v1/search/recent
POST   /api/v1/search/save
DELETE /api/v1/search/recent
```

#### **Admin Search Routes**
```
GET    /api/v1/admin/search/plans
GET    /api/v1/admin/search/users
GET    /api/v1/admin/search/orders
GET    /api/v1/admin/search/analytics
POST   /api/v1/admin/search/rebuild-index
GET    /api/v1/admin/search/status
```

#### **Admin Users Management Routes**
```
GET    /api/v1/admin/users
GET    /api/v1/admin/users/:id
PUT    /api/v1/admin/users/:id
POST   /api/v1/admin/users/:id/suspend
POST   /api/v1/admin/users/:id/unsuspend
POST   /api/v1/admin/users/:id/ban
POST   /api/v1/admin/users/:id/unban
POST   /api/v1/admin/users/:id/reset-password
GET    /api/v1/admin/users/:id/activity
GET    /api/v1/admin/users/analytics
GET    /api/v1/admin/users/export
```

#### **Admin Dashboard Routes**
```
GET    /api/v1/admin/dashboard/overview
GET    /api/v1/admin/dashboard/revenue
GET    /api/v1/admin/dashboard/orders
GET    /api/v1/admin/dashboard/users
GET    /api/v1/admin/dashboard/plans
GET    /api/v1/admin/dashboard/analytics
GET    /api/v1/admin/dashboard/recent-activity
```

#### **Admin Analytics Routes**
```
GET    /api/v1/admin/analytics/revenue
GET    /api/v1/admin/analytics/orders
GET    /api/v1/admin/analytics/users
GET    /api/v1/admin/analytics/plans
GET    /api/v1/admin/analytics/search
GET    /api/v1/admin/analytics/performance
GET    /api/v1/admin/analytics/export
```

#### **Admin File Management Routes**
```
GET    /api/v1/admin/files
POST   /api/v1/admin/files/upload
DELETE /api/v1/admin/files/:id
GET    /api/v1/admin/files/storage-usage
POST   /api/v1/admin/files/optimize
POST   /api/v1/admin/files/watermark
GET    /api/v1/admin/files/analytics
```

#### **Admin Support Routes**
```
GET    /api/v1/admin/support/tickets
GET    /api/v1/admin/support/tickets/:id
PUT    /api/v1/admin/support/tickets/:id
POST   /api/v1/admin/support/tickets/:id/assign
POST   /api/v1/admin/support/tickets/:id/close
POST   /api/v1/admin/support/tickets/:id/reply
GET    /api/v1/admin/support/analytics
```

#### **Admin System Settings Routes**
```
GET    /api/v1/admin/settings
PUT    /api/v1/admin/settings
GET    /api/v1/admin/settings/:category
PUT    /api/v1/admin/settings/:category
POST   /api/v1/admin/settings/backup
POST   /api/v1/admin/settings/restore
GET    /api/v1/admin/settings/logs
```

#### **Admin Email Management Routes**
```
GET    /api/v1/admin/email/templates
POST   /api/v1/admin/email/templates
PUT    /api/v1/admin/email/templates/:id
DELETE /api/v1/admin/email/templates/:id
POST   /api/v1/admin/email/send
POST   /api/v1/admin/email/test
GET    /api/v1/admin/email/analytics
```

#### **Admin Notifications Routes**
```
GET    /api/v1/admin/notifications
PUT    /api/v1/admin/notifications/:id/read
DELETE /api/v1/admin/notifications/:id
POST   /api/v1/admin/notifications/send
GET    /api/v1/admin/notifications/settings
PUT    /api/v1/admin/notifications/settings
```

## 💳 Payment Integration

### **Stripe Integration**
```javascript
const stripeConfig = {
  publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  secretKey: process.env.STRIPE_SECRET_KEY,
  webhookSecret: process.env.STRIPE_WEBHOOK_SECRET,
  currency: 'ghs',
  paymentMethods: ['card', 'bank_transfer']
};
```

### **Payment Flow**
1. **Create Payment Intent**: Generate client secret
2. **Confirm Payment**: Process payment with Stripe
3. **Webhook Handling**: Update order status
4. **Download Generation**: Create download links

### **Quick Buy Flow**
1. **Anonymous Purchase**: No account required
2. **Direct Payment**: Skip cart process
3. **Instant Download**: Immediate access
4. **Email Receipt**: Send purchase confirmation

## 📁 File Management

### **File Storage Strategy**
```javascript
const fileStorageConfig = {
  provider: 'aws-s3', // or 'digitalocean-spaces'
  bucket: process.env.S3_BUCKET_NAME,
  region: process.env.S3_REGION,
  accessKey: process.env.S3_ACCESS_KEY,
  secretKey: process.env.S3_SECRET_KEY,
  cdnUrl: process.env.CDN_URL
};
```

### **File Types & Structure**
```
/uploads/
├── plans/
│   ├── {plan_id}/
│   │   ├── images/
│   │   │   ├── main.jpg
│   │   │   ├── gallery/
│   │   │   └── thumbnails/
│   │   └── files/
│   │       ├── basic/
│   │       ├── standard/
│   │       └── premium/
├── avatars/
└── temp/
```

### **File Processing Pipeline**
1. **Upload Validation**: File type, size, virus scan
2. **Image Processing**: Resize, optimize, generate thumbnails
3. **PDF Processing**: Watermark, security, compression
4. **CDN Distribution**: Global content delivery

## 🔍 Search Implementation

### **Elasticsearch Configuration**
```javascript
const elasticsearchConfig = {
  node: process.env.ELASTICSEARCH_URL,
  auth: {
    username: process.env.ELASTICSEARCH_USERNAME,
    password: process.env.ELASTICSEARCH_PASSWORD
  },
  index: 'sak-plans'
};
```

### **Search Features**
- **Full-text Search**: Plan titles, descriptions
- **Filtered Search**: Type, bedrooms, bathrooms, price
- **Faceted Search**: Dynamic filter options
- **Search Suggestions**: Autocomplete functionality
- **Search Analytics**: Popular searches, trends

## 📧 Email System

### **Email Templates**
```javascript
const emailTemplates = {
  welcome: 'welcome-email',
  orderConfirmation: 'order-confirmation',
  downloadReady: 'download-ready',
  passwordReset: 'password-reset',
  emailVerification: 'email-verification',
  orderStatusUpdate: 'order-status-update'
};
```

### **Email Service Integration**
```javascript
const emailConfig = {
  provider: 'sendgrid', // or 'aws-ses'
  apiKey: process.env.SENDGRID_API_KEY,
  fromEmail: 'noreply@sakconstruction.com',
  templates: {
    baseUrl: process.env.EMAIL_TEMPLATE_BASE_URL
  }
};
```

## 📊 Analytics & Monitoring

### **Analytics Events**
```javascript
const analyticsEvents = {
  planView: 'plan_viewed',
  planDownload: 'plan_downloaded',
  orderCreated: 'order_created',
  paymentCompleted: 'payment_completed',
  userRegistered: 'user_registered',
  searchPerformed: 'search_performed'
};
```

### **Admin Analytics Events**
```javascript
const adminAnalyticsEvents = {
  adminLogin: 'admin_login',
  adminAction: 'admin_action',
  planApproved: 'plan_approved',
  planRejected: 'plan_rejected',
  orderProcessed: 'order_processed',
  userSuspended: 'user_suspended',
  userBanned: 'user_banned',
  systemSettingChanged: 'system_setting_changed',
  fileUploaded: 'file_uploaded',
  supportTicketResolved: 'support_ticket_resolved'
};
```

### **Admin Dashboard Metrics**
```javascript
const adminDashboardMetrics = {
  overview: {
    totalRevenue: 'Total revenue with growth percentage',
    totalOrders: 'Total orders with status breakdown',
    activeUsers: 'Active users in last 30 days',
    planDownloads: 'Total plan downloads',
    pendingApprovals: 'Plans awaiting approval',
    supportTickets: 'Open support tickets'
  },
  realTime: {
    liveOrders: 'Orders being processed in real-time',
    activeSessions: 'Current admin and user sessions',
    systemHealth: 'API response times and uptime',
    paymentProcessing: 'Payment success/failure rates'
  }
};
```

### **Monitoring Tools**
- **Application Monitoring**: New Relic / DataDog
- **Error Tracking**: Sentry
- **Performance Monitoring**: Lighthouse
- **Uptime Monitoring**: Pingdom / UptimeRobot
- **Admin Activity Monitoring**: Custom admin audit logs
- **Security Monitoring**: Intrusion detection and alerts

## 🔒 Security Implementation

### **Security Measures**
```javascript
const securityConfig = {
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100 // limit each IP to 100 requests per windowMs
  },
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true
  },
  helmet: {
    contentSecurityPolicy: true,
    hsts: true,
    noSniff: true
  },
  inputValidation: {
    sanitize: true,
    validate: true
  }
};
```

### **Admin Security Measures**
```javascript
const adminSecurityConfig = {
  rateLimiting: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50 // stricter limits for admin endpoints
  },
  ipWhitelist: {
    enabled: true,
    allowedIPs: process.env.ADMIN_ALLOWED_IPS?.split(',') || [],
    geoRestriction: ['Ghana']
  },
  sessionSecurity: {
    maxConcurrentSessions: 3,
    sessionTimeout: '8h',
    forceLogoutOnPasswordChange: true
  },
  twoFactorAuth: {
    required: true,
    methods: ['totp', 'sms'],
    backupCodes: true
  },
  auditLogging: {
    enabled: true,
    logLevel: 'detailed',
    retention: '2 years'
  }
};
```

### **Admin Middleware**
```javascript
const adminMiddleware = {
  auth: 'Verify admin authentication',
  roleCheck: 'Verify admin role and permissions',
  ipWhitelist: 'Check IP address restrictions',
  rateLimit: 'Apply admin-specific rate limiting',
  auditLog: 'Log all admin actions',
  impersonation: 'Handle user impersonation',
  sessionValidation: 'Validate admin sessions'
};
```

### **Data Protection**
- **Encryption**: AES-256 for sensitive data
- **Hashing**: bcrypt for passwords
- **Token Security**: Secure JWT implementation
- **API Security**: Rate limiting, CORS, input validation
- **Admin Data**: Additional encryption for admin credentials
- **Audit Trails**: Complete logging of admin actions
- **Session Security**: Secure session management for admins

## 🚀 Deployment Strategy

### **Environment Configuration**
```javascript
const environments = {
  development: {
    database: 'sak_dev',
    redis: 'redis://localhost:6379',
    fileStorage: 'local',
    email: 'ethereal'
  },
  staging: {
    database: 'sak_staging',
    redis: process.env.REDIS_URL,
    fileStorage: 's3',
    email: 'sendgrid'
  },
  production: {
    database: 'sak_production',
    redis: process.env.REDIS_URL,
    fileStorage: 's3',
    email: 'sendgrid'
  }
};
```

### **CI/CD Pipeline**
```yaml
# GitHub Actions / GitLab CI
stages:
  - test
  - build
  - deploy

services:
  - postgresql
  - redis
  - elasticsearch
```

## 📈 Performance Optimization

### **Caching Strategy**
```javascript
const cacheConfig = {
  redis: {
    url: process.env.REDIS_URL,
    ttl: {
      plans: 3600, // 1 hour
      search: 1800, // 30 minutes
      user: 900, // 15 minutes
      stats: 300 // 5 minutes
    }
  }
};
```

### **Database Optimization**
- **Indexing**: Strategic database indexes
- **Query Optimization**: Efficient SQL queries
- **Connection Pooling**: Database connection management
- **Read Replicas**: For read-heavy operations

## 🧪 Testing Strategy

### **Test Types**
```javascript
const testTypes = {
  unit: 'Jest + Supertest',
  integration: 'PostgreSQL + Redis',
  e2e: 'Playwright / Cypress',
  performance: 'Artillery / k6',
  security: 'OWASP ZAP'
};
```

### **Test Coverage**
- **API Endpoints**: 100% coverage
- **Business Logic**: 90% coverage
- **Database Operations**: 95% coverage
- **Authentication**: 100% coverage

## 📋 Development Phases

### **Phase 1: Core Infrastructure (Weeks 1-4)**
- [ ] Project setup and configuration
- [ ] Database design and implementation
- [ ] Authentication system (User + Admin)
- [ ] Basic CRUD operations
- [ ] File upload system
- [ ] Admin user management

### **Phase 2: E-commerce Features (Weeks 5-8)**
- [ ] Plan management system
- [ ] Order processing
- [ ] Payment integration
- [ ] Download system
- [ ] Cart functionality
- [ ] Admin order management

### **Phase 3: Advanced Features (Weeks 9-12)**
- [ ] Search and filtering
- [ ] User reviews and ratings
- [ ] Notification system
- [ ] Analytics and reporting
- [ ] Admin dashboard and analytics
- [ ] Admin file management

### **Phase 4: Admin Features (Weeks 13-16)**
- [ ] Admin authentication and security
- [ ] Admin user management
- [ ] Admin support system
- [ ] Admin email management
- [ ] Admin system settings
- [ ] Admin audit logging

### **Phase 5: Optimization & Launch (Weeks 17-20)**
- [ ] Performance optimization
- [ ] Security hardening
- [ ] Testing and bug fixes
- [ ] Documentation
- [ ] Production deployment
- [ ] Admin training materials

## 💰 Cost Estimation

### **Infrastructure Costs (Monthly)**
- **Database**: $50-100 (PostgreSQL)
- **File Storage**: $20-50 (S3/Spaces)
- **CDN**: $30-80 (CloudFront)
- **Search**: $20-40 (Elasticsearch)
- **Email**: $15-30 (SendGrid)
- **Monitoring**: $20-40 (New Relic/Sentry)
- **Admin Security**: $10-20 (Additional security tools)

### **Development Costs**
- **Backend Development**: $20,000-35,000 (including admin features)
- **Admin System Development**: $8,000-12,000
- **DevOps Setup**: $3,000-5,000
- **Testing & QA**: $3,000-4,000
- **Documentation**: $1,500-2,500
- **Security Audit**: $2,000-3,000

## 🎯 Success Metrics

### **Technical Metrics**
- **API Response Time**: < 200ms
- **Uptime**: > 99.9%
- **Error Rate**: < 0.1%
- **Test Coverage**: > 90%

### **Business Metrics**
- **User Registration**: Track conversion rates
- **Plan Downloads**: Monitor successful purchases
- **Payment Success Rate**: > 95%
- **Customer Satisfaction**: > 4.5/5 rating

## 🔄 Maintenance & Support

### **Ongoing Tasks**
- **Security Updates**: Monthly security patches
- **Performance Monitoring**: Continuous optimization
- **Backup Management**: Daily automated backups
- **User Support**: Technical support system

### **Scaling Strategy**
- **Horizontal Scaling**: Load balancers, multiple instances
- **Database Scaling**: Read replicas, sharding
- **CDN Optimization**: Global content delivery
- **Microservices**: Service decomposition

---

**Document Version**: 1.0  
**Last Updated**: December 2024  
**Next Review**: January 2025  
**Prepared By**: Backend Development Team
