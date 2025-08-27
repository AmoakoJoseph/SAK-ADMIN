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
const getAllOrders = async () => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('https://sak-backend.vercel.app/api/v1/orders', {
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
const updateOrderStatus = async (orderId, status) => {
  try {
    const token = localStorage.getItem('adminToken');
    const response = await fetch(`https://sak-backend.vercel.app/api/v1/orders/${orderId}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status })
    });
    
    return await response.json();
  } catch (error) {
    console.error('Failed to update order:', error);
  }
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
| `/payments` | GET | Get all payments | Yes |
| `/payments/:id` | GET | Get payment by ID | Yes |
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

**🎯 Ready to implement!** Use these endpoints to build your admin dashboard with full user, plan, order, and payment management capabilities.
