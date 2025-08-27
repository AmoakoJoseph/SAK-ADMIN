# 🏢 SAK Admin Frontend - API Integration Guide

## 📋 Overview

This guide provides all the API endpoints and implementation details needed for the SAK Admin Frontend.

**Backend URL**: `https://sak-backend.vercel.app/api/v1`

## 🔐 Authentication

### Admin Login
```javascript
// POST /auth/admin/login
const adminLogin = async (email, password) => {
  try {
    const response = await fetch('https://sak-backend.vercel.app/api/v1/auth/admin/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@sakconstruction.com',
        password: 'AdminPassword123!'
      })
    });
    
    const data = await response.json();
    
    if (data.success) {
      localStorage.setItem('adminToken', data.token);
      return data;
    }
  } catch (error) {
    console.error('Admin login failed:', error);
  }
};
```

### Get Admin Profile
```javascript
// GET /auth/admin/profile
const getAdminProfile = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/auth/admin/profile', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get admin profile:', error);
  }
};
```

## 👥 User Management

### Get All Users
```javascript
// GET /users
const getAllUsers = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/users', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get users:', error);
  }
};
```

### Get User by ID
```javascript
// GET /users/:id
const getUserById = async (userId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/users/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get user:', error);
  }
};
```

## 🏗️ Plans Management

### Get All Plans (with filtering and pagination)
```javascript
// GET /plans
const getAllPlans = async (filters = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/plans?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get plans:', error);
  }
};

// Example filters:
const filters = {
  page: 1,
  limit: 10,
  plan_type: 'villa',
  status: 'published',
  min_price: 100,
  max_price: 500,
  bedrooms: 3,
  bathrooms: 2,
  sort: 'price_desc',
  featured: true
};
```

### Get Plan by ID
```javascript
// GET /plans/:id
const getPlanById = async (planId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/plans/${planId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get plan:', error);
  }
};
```

### Create New Plan
```javascript
// POST /plans
const createPlan = async (planData) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/plans', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create plan:', error);
  }
};

// Example plan data:
const planData = {
  title: 'Modern 3-Bedroom Villa',
  description: 'A stunning modern villa featuring 3 spacious bedrooms...',
  plan_type: 'villa',
  price: 299.99,
  original_price: 399.99,
  discount_percentage: 25,
  status: 'draft', // draft, published, archived, rejected
  is_featured: false,
  bedrooms: 3,
  bathrooms: 2.5,
  square_feet: 2500,
  floors: 2,
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
  floor_plans: ['https://example.com/floorplan1.jpg'],
  specifications: {
    foundation: 'Concrete slab with reinforced steel',
    walls: 'Brick and concrete with insulation',
    roof: 'Metal roofing with proper drainage',
    windows: 'Aluminum double-glazed with UV protection',
    doors: 'Solid wood with security features',
    electrical: 'Modern wiring with smart home compatibility',
    plumbing: 'Copper piping with modern fixtures'
  },
  tags: ['modern', 'villa', '3-bedroom', 'family', 'contemporary', 'luxury']
};
```

### Update Plan
```javascript
// PUT /plans/:id
const updatePlan = async (planId, planData) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/plans/${planId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to update plan:', error);
  }
};
```

### Delete Plan
```javascript
// DELETE /plans/:id
const deletePlan = async (planId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/plans/${planId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to delete plan:', error);
  }
};
```

### Get Featured Plans
```javascript
// GET /plans/featured
const getFeaturedPlans = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/plans/featured', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get featured plans:', error);
  }
};
```

### Search Plans
```javascript
// GET /plans/search
const searchPlans = async (searchParams) => {
  try {
    const token = localStorage.getItem('adminToken');
    const queryParams = new URLSearchParams(searchParams).toString();
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/plans/search?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to search plans:', error);
  }
};

// Example search parameters:
const searchParams = {
  q: 'modern villa',
  plan_type: 'villa',
  min_price: 200,
  max_price: 400,
  bedrooms: 3,
  sort: 'price_asc'
};
```

### Get Plan Reviews
```javascript
// GET /plans/:id/reviews
const getPlanReviews = async (planId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/plans/${planId}/reviews`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get plan reviews:', error);
  }
};
```

### Get Plan Downloads (Admin View)
```javascript
// GET /plans/:id/downloads
const getPlanDownloads = async (planId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/plans/${planId}/downloads`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get plan downloads:', error);
  }
};
```

## 📦 Orders Management

### Get All Orders (with filtering and pagination)
```javascript
// GET /orders
const getAllOrders = async (filters = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/orders?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get orders:', error);
  }
};

// Example filters:
const filters = {
  page: 1,
  limit: 10,
  status: 'pending',
  user_id: 'user-uuid',
  start_date: '2024-01-01',
  end_date: '2024-12-31',
  sort: 'created_at_desc'
};
```

### Get Order by ID
```javascript
// GET /orders/:id
const getOrderById = async (orderId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get order:', error);
  }
};
```

### Update Order Status
```javascript
// PUT /orders/:id
const updateOrder = async (orderId, updateData) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to update order:', error);
  }
};

// Example update data:
const updateData = {
  status: 'confirmed', // pending, confirmed, processing, shipped, delivered, cancelled, refunded
  tracking_number: 'TRK123456789',
  estimated_delivery_date: '2024-12-25',
  actual_delivery_date: '2024-12-24',
  notes: 'Order confirmed and ready for processing'
};
```

### Get Order Items
```javascript
// GET /orders/:id/items
const getOrderItems = async (orderId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/orders/${orderId}/items`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get order items:', error);
  }
};
```

### Get Order Payments
```javascript
// GET /orders/:id/payments
const getOrderPayments = async (orderId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/orders/${orderId}/payments`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get order payments:', error);
  }
};
```

### Update User
```javascript
// PUT /users/:id
const updateUser = async (userId, userData) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to update user:', error);
  }
};
```

### Delete User
```javascript
// DELETE /users/:id
const deleteUser = async (userId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/users/${userId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to delete user:', error);
  }
};
```

## 📋 Plans Management

### Get All Plans
```javascript
// GET /plans
const getAllPlans = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/plans', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get plans:', error);
  }
};
```

### Create New Plan
```javascript
// POST /plans
const createPlan = async (planData) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/plans', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create plan:', error);
  }
};
```

### Get Plan by ID
```javascript
// GET /plans/:id
const getPlanById = async (planId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/plans/${planId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get plan:', error);
  }
};
```

### Update Plan
```javascript
// PUT /plans/:id
const updatePlan = async (planId, planData) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/plans/${planId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(planData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to update plan:', error);
  }
};
```

### Delete Plan
```javascript
// DELETE /plans/:id
const deletePlan = async (planId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/plans/${planId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to delete plan:', error);
  }
};
```

## 📦 Orders Management

### Get All Orders
```javascript
// GET /orders
const getAllOrders = async (filters = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/orders?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get orders:', error);
  }
};

// Example filters:
const filters = {
  page: 1,
  limit: 10,
  status: 'pending',
  payment_status: 'completed',
  start_date: '2024-01-01',
  end_date: '2024-12-31',
  sort: 'created_at_desc'
};
```

### Get Order by ID
```javascript
// GET /orders/:id
const getOrderById = async (orderId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/orders/${orderId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get order:', error);
  }
};
```

### Update Order
```javascript
// PUT /orders/:id
const updateOrder = async (orderId, updateData) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to update order:', error);
  }
};

// Example update data:
const updateData = {
  status: 'processing',
  tracking_number: 'TRK123456789',
  estimated_delivery_date: '2024-02-15',
  notes: 'Order is being processed'
};
```

### Get Order Items
```javascript
// GET /orders/:id/items
const getOrderItems = async (orderId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/orders/${orderId}/items`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get order items:', error);
  }
};
```

### Get Order Payments
```javascript
// GET /orders/:id/payments
const getOrderPayments = async (orderId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/orders/${orderId}/payments`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get order payments:', error);
  }
};
```

### Order Status Options
```javascript
const ORDER_STATUSES = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  PROCESSING: 'processing',
  SHIPPED: 'shipped',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
  REFUNDED: 'refunded'
};

const PAYMENT_STATUSES = {
  PENDING: 'pending',
  PROCESSING: 'processing',
  COMPLETED: 'completed',
  FAILED: 'failed',
  REFUNDED: 'refunded',
  CANCELLED: 'cancelled'
};
```

## 💰 Payments Management

### Get All Payments
```javascript
// GET /payments
const getAllPayments = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/payments', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get payments:', error);
  }
};
```

### Get Payment by ID
```javascript
// GET /payments/:id
const getPaymentById = async (paymentId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/payments/${paymentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get payment:', error);
  }
};
```

## 📊 Analytics & Reports

### Get Dashboard Stats
```javascript
// GET /admin/dashboard
const getDashboardStats = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/admin/dashboard', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get dashboard stats:', error);
  }
};
```

### Get Sales Report
```javascript
// GET /admin/reports/sales
const getSalesReport = async (startDate, endDate) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/admin/reports/sales?start=${startDate}&end=${endDate}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get sales report:', error);
  }
};
```

## 🔧 System Settings

### Get System Settings
```javascript
// GET /admin/settings
const getSystemSettings = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/admin/settings', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get system settings:', error);
  }
};
```

### Update System Settings
```javascript
// PUT /admin/settings
const updateSystemSettings = async (settings) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/admin/settings', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(settings)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to update system settings:', error);
  }
};
```

## 🛠️ Utility Functions

### Add Authorization Header
```javascript
const addAuthHeader = (headers = {}) => {
  const token = localStorage.getItem('adminToken');
  return {
    ...headers,
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json'
  };
};
```

### Handle API Errors
```javascript
const handleApiError = (error, response) => {
  if (response?.status === 401) {
    // Token expired or invalid
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  } else if (response?.status === 403) {
    // Access denied
    console.error('Access denied');
  } else {
    console.error('API Error:', error);
  }
};
```

### Logout Function
```javascript
const logout = () => {
  localStorage.removeItem('adminToken');
  window.location.href = '/login';
};
```

## 📋 Complete Endpoint List

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/auth/admin/login` | POST | Admin login | No |
| `/auth/admin/profile` | GET | Get admin profile | Yes |
| `/users` | GET | Get all users | Yes |
| `/users/:id` | GET | Get user by ID | Yes |
| `/users/:id` | PUT | Update user | Yes |
| `/users/:id` | DELETE | Delete user | Yes |
| `/plans` | GET | Get all plans | Yes |
| `/plans` | POST | Create plan | Yes |
| `/plans/:id` | GET | Get plan by ID | Yes |
| `/plans/:id` | PUT | Update plan | Yes |
| `/plans/:id` | DELETE | Delete plan | Yes |
| `/orders` | GET | Get all orders | Yes |
| `/orders/:id` | GET | Get order by ID | Yes |
| `/orders/:id` | PUT | Update order | Yes |
| `/orders/:id/items` | GET | Get order items | Yes |
| `/orders/:id/payments` | GET | Get order payments | Yes |
| `/reviews` | GET | Get all reviews | Yes |
| `/reviews/:id/status` | PUT | Update review status | Yes |
| `/admin/dashboard` | GET | Get dashboard stats | Yes |
| `/admin/reports/sales` | GET | Get sales report | Yes |
| `/admin/settings` | GET | Get system settings | Yes |
| `/admin/settings` | PUT | Update system settings | Yes |

## 🚀 Implementation Notes

1. **Environment Variables**: Set `REACT_APP_API_BASE_URL=https://sak-backend.vercel.app/api/v1`
2. **Token Storage**: Use `localStorage` for admin token
3. **Error Handling**: Implement proper error handling for 401/403 responses
4. **Loading States**: Add loading indicators for all API calls
5. **Form Validation**: Validate all forms before submission

## 🔐 Security Considerations

- Always include the Authorization header with the admin token
- Handle token expiration gracefully
- Validate all user inputs
- Implement proper error handling
- Use HTTPS for all API calls

---

**🎯 Ready to implement!** Use these endpoints to build your admin dashboard with full user, plan, order, payment, review, and notification management capabilities.

## 📬 Notifications Management

### Get Admin Notifications
```javascript
// GET /notifications/admin
const getAdminNotifications = async (filters = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/notifications/admin?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get admin notifications:', error);
  }
};

// Example filters:
const filters = {
  page: 1,
  limit: 20,
  status: 'pending',
  type: 'admin_alert',
  unreadOnly: true
};
```

### Get Admin Notification Count
```javascript
// GET /notifications/admin/count
const getAdminNotificationCount = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/notifications/admin/count', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get notification count:', error);
  }
};
```

### Mark Admin Notification as Read
```javascript
// PUT /notifications/admin/:id/read
const markAdminNotificationAsRead = async (notificationId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/notifications/admin/${notificationId}/read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to mark notification as read:', error);
  }
};
```

### Mark All Admin Notifications as Read
```javascript
// PUT /notifications/admin/read-all
const markAllAdminNotificationsAsRead = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/notifications/admin/read-all', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to mark all notifications as read:', error);
  }
};
```

### Delete Admin Notification
```javascript
// DELETE /notifications/admin/:id
const deleteAdminNotification = async (notificationId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/notifications/admin/${notificationId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to delete notification:', error);
  }
};
```

### Get All Notifications (System Management)
```javascript
// GET /notifications/admin/system
const getAllNotifications = async (filters = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/notifications/admin/system?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get all notifications:', error);
  }
};

// Example filters:
const filters = {
  page: 1,
  limit: 50,
  status: 'pending',
  type: 'system_announcement',
  userId: 'user-uuid',
  adminId: 'admin-uuid'
};
```

### Create Notification (System Management)
```javascript
// POST /notifications/admin/system
const createNotification = async (notificationData) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/notifications/admin/system', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(notificationData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create notification:', error);
  }
};

// Example notification data:
const notificationData = {
  userId: 'user-uuid', // or adminId: 'admin-uuid'
  type: 'system_announcement',
  title: 'System Maintenance',
  message: 'Scheduled maintenance will occur tonight.',
  channels: ['in_app', 'email'],
  data: { maintenance_duration: '2 hours' },
  scheduledAt: '2024-01-15T02:00:00Z' // optional
};
```

### Update Notification Status (System Management)
```javascript
// PUT /notifications/admin/system/:id/status
const updateNotificationStatus = async (notificationId, status) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/notifications/admin/system/${notificationId}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to update notification status:', error);
  }
};

// Example status values:
const NOTIFICATION_STATUSES = {
  PENDING: 'pending',
  SENT: 'sent',
  FAILED: 'failed',
  DELIVERED: 'delivered',
  READ: 'read'
};

const NOTIFICATION_TYPES = {
  ORDER_STATUS: 'order_status',
  PAYMENT_RECEIVED: 'payment_received',
  PAYMENT_FAILED: 'payment_failed',
  REVIEW_POSTED: 'review_posted',
  REVIEW_APPROVED: 'review_approved',
  REVIEW_REJECTED: 'review_rejected',
  SYSTEM_ANNOUNCEMENT: 'system_announcement',
  PRICE_CHANGE: 'price_change',
  NEW_PLAN: 'new_plan',
  ADMIN_ALERT: 'admin_alert'
};

const NOTIFICATION_CHANNELS = {
  EMAIL: 'email',
  SMS: 'sms',
  PUSH: 'push',
  IN_APP: 'in_app'
};
```

## ⭐ Reviews & Ratings Management

### Get All Reviews
```javascript
// GET /reviews
const getAllReviews = async (filters = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/reviews?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get reviews:', error);
  }
};

// Example filters:
const filters = {
  page: 1,
  limit: 10,
  status: 'active',
  rating: 5,
  plan_id: 'plan-uuid',
  user_id: 'user-uuid',
  sort: 'created_at_desc'
};
```

### Update Review Status
```javascript
// PUT /reviews/:id/status
const updateReviewStatus = async (reviewId, status) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/reviews/${reviewId}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to update review status:', error);
  }
};

// Example status values:
const REVIEW_STATUSES = {
  ACTIVE: 'active',
  PENDING: 'pending',
  MODERATED: 'moderated',
  HIDDEN: 'hidden',
  DELETED: 'deleted'
};

## 🎫 Support System Management

### Get All Support Tickets
```javascript
// GET /support/admin/tickets
const getAllSupportTickets = async (filters = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/support/admin/tickets?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get support tickets:', error);
  }
};

// Example filters:
const filters = {
  page: 1,
  limit: 20,
  status: 'open',
  priority: 'high',
  assigned_to: 'admin-uuid'
};
```

### Get Support Ticket by ID
```javascript
// GET /support/admin/tickets/:id
const getSupportTicketById = async (ticketId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/support/admin/tickets/${ticketId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get support ticket:', error);
  }
};
```

### Assign Ticket to Admin
```javascript
// PUT /support/admin/tickets/:id/assign
const assignTicket = async (ticketId, assignedTo) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/support/admin/tickets/${ticketId}/assign`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ assigned_to: assignedTo })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to assign ticket:', error);
  }
};
```

### Update Ticket Status
```javascript
// PUT /support/admin/tickets/:id/status
const updateTicketStatus = async (ticketId, status) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/support/admin/tickets/${ticketId}/status`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to update ticket status:', error);
  }
};
```

### Get Ticket Messages
```javascript
// GET /support/admin/tickets/:id/messages
const getTicketMessages = async (ticketId, filters = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/support/admin/tickets/${ticketId}/messages?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get ticket messages:', error);
  }
};

// Example filters:
const messageFilters = {
  page: 1,
  limit: 50
};
```

### Add Admin Message
```javascript
// POST /support/admin/tickets/:id/messages
const addAdminMessage = async (ticketId, message, options = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/support/admin/tickets/${ticketId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        attachments: options.attachments || [],
        is_internal: options.isInternal || false
      })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to add admin message:', error);
  }
};

// Example usage:
const messageData = {
  message: 'Thank you for contacting support. We are working on your issue.',
  attachments: [
    { name: 'screenshot.png', url: 'https://example.com/screenshot.png' }
  ],
  isInternal: false
};
```

### Support System Constants
```javascript
const TICKET_STATUSES = {
  OPEN: 'open',
  IN_PROGRESS: 'in_progress',
  WAITING_FOR_CUSTOMER: 'waiting_for_customer',
  WAITING_FOR_ADMIN: 'waiting_for_admin',
  RESOLVED: 'resolved',
  CLOSED: 'closed'
};

const TICKET_PRIORITIES = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent'
};

const SENDER_TYPES = {
  USER: 'user',
  ADMIN: 'admin'
};
```

## 📊 Analytics & Reporting

### Get Dashboard Overview
```javascript
// GET /analytics/dashboard/overview
const getDashboardOverview = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/analytics/dashboard/overview', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get dashboard overview:', error);
  }
};
```

### Get Analytics Metrics
```javascript
// GET /analytics/metrics
const getAnalyticsMetrics = async (filters = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/analytics/metrics?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get analytics metrics:', error);
  }
};

// Example filters:
const metricFilters = {
  metric_name: 'total_revenue',
  start_date: '2024-01-01',
  end_date: '2024-12-31',
  dimension_data: JSON.stringify({ plan_type: 'residential' })
};
```

### Get Analytics Events
```javascript
// GET /analytics/events
const getAnalyticsEvents = async (filters = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/analytics/events?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get analytics events:', error);
  }
};

// Example filters:
const eventFilters = {
  event_type: 'plan_view',
  user_id: 'user-uuid',
  start_date: '2024-01-01',
  end_date: '2024-12-31',
  page: 1,
  limit: 50
};
```

### Get Analytics Sessions
```javascript
// GET /analytics/sessions
const getAnalyticsSessions = async (filters = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/analytics/sessions?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get analytics sessions:', error);
  }
};

// Example filters:
const sessionFilters = {
  user_id: 'user-uuid',
  is_active: true,
  start_date: '2024-01-01',
  end_date: '2024-12-31',
  page: 1,
  limit: 50
};
```

### Get Analytics Page Views
```javascript
// GET /analytics/page-views
const getAnalyticsPageViews = async (filters = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/analytics/page-views?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get analytics page views:', error);
  }
};

// Example filters:
const pageViewFilters = {
  page_url: '/plans',
  user_id: 'user-uuid',
  start_date: '2024-01-01',
  end_date: '2024-12-31',
  page: 1,
  limit: 50
};
```

### Create Analytics Report
```javascript
// POST /analytics/reports
const createAnalyticsReport = async (reportData) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/analytics/reports', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reportData)
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to create analytics report:', error);
  }
};

// Example report data:
const reportData = {
  report_name: 'Monthly Revenue Report',
  report_type: 'revenue_analysis',
  report_data: {
    total_revenue: 50000,
    order_count: 25,
    average_order_value: 2000,
    top_plans: ['plan-1', 'plan-2', 'plan-3']
  },
  date_range_start: '2024-01-01',
  date_range_end: '2024-01-31'
};
```

### Get All Analytics Reports
```javascript
// GET /analytics/reports
const getAllAnalyticsReports = async (filters = {}) => {
  try {
    const token = localStorage.getItem('adminToken');
    const queryParams = new URLSearchParams(filters).toString();
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/analytics/reports?${queryParams}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get analytics reports:', error);
  }
};

// Example filters:
const reportFilters = {
  report_type: 'revenue_analysis',
  generated_by: 'admin-uuid',
  page: 1,
  limit: 20
};
```

### Get Analytics Report by ID
```javascript
// GET /analytics/reports/:id
const getAnalyticsReportById = async (reportId) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/analytics/reports/${reportId}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      }
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to get analytics report:', error);
  }
};
```

### Analytics Constants
```javascript
const ANALYTICS_EVENT_TYPES = {
  PLAN_VIEW: 'plan_view',
  PLAN_DOWNLOAD: 'plan_download',
  ORDER_CREATED: 'order_created',
  PAYMENT_COMPLETED: 'payment_completed',
  USER_REGISTERED: 'user_registered',
  SEARCH_PERFORMED: 'search_performed',
  REVIEW_POSTED: 'review_posted',
  SUPPORT_TICKET_CREATED: 'support_ticket_created',
  ADMIN_LOGIN: 'admin_login',
  ADMIN_ACTION: 'admin_action',
  PLAN_APPROVED: 'plan_approved',
  PLAN_REJECTED: 'plan_rejected',
  ORDER_PROCESSED: 'order_processed',
  USER_SUSPENDED: 'user_suspended',
  USER_BANNED: 'user_banned',
  SYSTEM_SETTING_CHANGED: 'system_setting_changed',
  FILE_UPLOADED: 'file_uploaded',
  SUPPORT_TICKET_RESOLVED: 'support_ticket_resolved'
};

const REPORT_TYPES = {
  REVENUE_ANALYSIS: 'revenue_analysis',
  USER_ACTIVITY: 'user_activity',
  PLAN_PERFORMANCE: 'plan_performance',
  ORDER_ANALYSIS: 'order_analysis',
  SUPPORT_ANALYSIS: 'support_analysis',
  CUSTOM: 'custom'
};
```
```
