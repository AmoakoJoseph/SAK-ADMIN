import { mockData, createMockResponse } from './mockData';

// API Base URL
const API_BASE_URL = 'https://sak-backend.vercel.app/api/v1';

// Types
export interface AdminUser {
  id: string;
  email: string;
  name?: string;
  fullName?: string;
  role: 'superAdmin' | 'admin' | 'contentManager' | 'orderProcessor' | 'support';
  createdAt?: string;
  updatedAt?: string;
}

// Backend response structure
export interface BackendLoginResponse {
  success: boolean;
  message: string;
  data: {
    admin: AdminUser;
    session: {
      token: string;
    };
  };
}

// Frontend expected structure (for mock data)
export interface FrontendLoginResponse {
  success: boolean;
  token: string;
  user: AdminUser;
  message?: string;
}

// Union type to handle both structures
export type LoginResponse = BackendLoginResponse | FrontendLoginResponse;

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Utility functions
const getAuthHeaders = () => {
  // Try to get token from localStorage first (for persistence)
  let token = localStorage.getItem('adminToken');
  
  // If not in localStorage, try to get from Redux store
  if (!token) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        const user = JSON.parse(userStr);
        token = user.token;
      } catch (e) {
        console.warn('Failed to parse user from localStorage');
      }
    }
  }
  
  return {
    'Authorization': token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json'
  };
};

const handleApiError = (error: any, response?: Response) => {
  if (response?.status === 401) {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
    throw new Error('Authentication failed - Please login again');
  } else if (response?.status === 403) {
    throw new Error('Access denied - Insufficient permissions');
  } else if (response?.status === 404) {
    throw new Error('Resource not found');
  } else if (response?.status === 500) {
    console.warn('Backend server error (500). Using mock data.');
    throw new Error('Server error - using mock data');
  } else if (response?.status === 0 || error.message?.includes('CORS') || error.message?.includes('Failed to fetch')) {
    // Handle CORS errors gracefully
    console.warn('CORS error or network issue. Using mock data.');
    throw new Error('Network error - using mock data');
  } else {
    throw new Error(error.message || 'API request failed');
  }
};

const apiRequest = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        ...getAuthHeaders(),
        ...options.headers,
      },
    });

    if (!response.ok) {
      await handleApiError(new Error(`HTTP ${response.status}`), response);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    handleApiError(error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    try {
      return await apiRequest<LoginResponse>('/auth/admin/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
    } catch (error: any) {
      if (error.message.includes('Network error')) {
        console.log('Using mock login data due to network error');
        return mockData.authLogin;
      }
      throw error;
    }
  },

  getProfile: async (): Promise<ApiResponse<AdminUser>> => {
    return apiRequest<ApiResponse<AdminUser>>('/auth/admin/profile');
  },

  logout: () => {
    localStorage.removeItem('adminToken');
    window.location.href = '/login';
  },
};

// Users API
export const usersAPI = {
  getAll: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest<ApiResponse<any[]>>('/users');
  },

  getById: async (userId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/users/${userId}`);
  },

  update: async (userId: string, userData: any): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  },

  delete: async (userId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/users/${userId}`, {
      method: 'DELETE',
    });
  },
};

// Payments API
export const paymentsAPI = {
  getAll: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest<ApiResponse<any[]>>('/payments');
  },

  getById: async (paymentId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/payments/${paymentId}`);
  },
};

// Settings API
export const settingsAPI = {
  get: async (): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>('/admin/settings');
  },

  update: async (settings: any): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(settings),
    });
  },
};

// Enhanced Plans API with filtering and search
export const plansAPI = {
  getAll: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<ApiResponse<any[]>>(`/plans?${queryParams}`);
  },

  getById: async (planId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/plans/${planId}`);
  },

  create: async (planData: any): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>('/plans', {
      method: 'POST',
      body: JSON.stringify(planData),
    });
  },

  update: async (planId: string, planData: any): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/plans/${planId}`, {
      method: 'PUT',
      body: JSON.stringify(planData),
    });
  },

  delete: async (planId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/plans/${planId}`, {
      method: 'DELETE',
    });
  },

  getFeatured: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest<ApiResponse<any[]>>('/plans/featured');
  },

  search: async (searchParams: any): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams(searchParams).toString();
    return apiRequest<ApiResponse<any[]>>(`/plans/search?${queryParams}`);
  },

  getReviews: async (planId: string): Promise<ApiResponse<any[]>> => {
    return apiRequest<ApiResponse<any[]>>(`/plans/${planId}/reviews`);
  },

  getDownloads: async (planId: string): Promise<ApiResponse<any[]>> => {
    return apiRequest<ApiResponse<any[]>>(`/plans/${planId}/downloads`);
  },
};

// Enhanced Orders API with filtering
export const ordersAPI = {
  getAll: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<ApiResponse<any[]>>(`/orders?${queryParams}`);
  },

  getById: async (orderId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/orders/${orderId}`);
  },

  update: async (orderId: string, updateData: any): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  },

  updateStatus: async (orderId: string, status: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  getItems: async (orderId: string): Promise<ApiResponse<any[]>> => {
    return apiRequest<ApiResponse<any[]>>(`/orders/${orderId}/items`);
  },

  getPayments: async (orderId: string): Promise<ApiResponse<any[]>> => {
    return apiRequest<ApiResponse<any[]>>(`/orders/${orderId}/payments`);
  },

  delete: async (orderId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/orders/${orderId}`, {
      method: 'DELETE',
    });
  },
};

// Enhanced Analytics API
export const analyticsAPI = {
  getDashboardStats: async (): Promise<ApiResponse<any>> => {
    try {
      return await apiRequest<ApiResponse<any>>('/admin/dashboard');
    } catch (error: any) {
      if (error.message.includes('Network error') || error.message.includes('Server error')) {
        console.log('Using mock dashboard data due to network/server error');
        return createMockResponse(mockData.dashboardStats);
      }
      throw error;
    }
  },

  getSalesReport: async (startDate: string, endDate: string): Promise<ApiResponse<any>> => {
    try {
      return await apiRequest<ApiResponse<any>>(`/admin/reports/sales?start=${startDate}&end=${endDate}`);
    } catch (error: any) {
      if (error.message.includes('Network error')) {
        console.log('Using mock sales report data due to network error');
        return createMockResponse(mockData.analytics);
      }
      throw error;
    }
  },

  getDashboardOverview: async (): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>('/analytics/dashboard/overview');
  },

  getMetrics: async (filters: any = {}): Promise<ApiResponse<any>> => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<ApiResponse<any>>(`/analytics/metrics?${queryParams}`);
  },

  getEvents: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<ApiResponse<any[]>>(`/analytics/events?${queryParams}`);
  },

  getSessions: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<ApiResponse<any[]>>(`/analytics/sessions?${queryParams}`);
  },

  getPageViews: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<ApiResponse<any[]>>(`/analytics/page-views?${queryParams}`);
  },

  createReport: async (reportData: any): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>('/analytics/reports', {
      method: 'POST',
      body: JSON.stringify(reportData),
    });
  },

  getAllReports: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<ApiResponse<any[]>>(`/analytics/reports?${queryParams}`);
  },

  getReportById: async (reportId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/analytics/reports/${reportId}`);
  },
};

// Reviews API
export const reviewsAPI = {
  getAll: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<ApiResponse<any[]>>(`/reviews?${queryParams}`);
  },

  updateStatus: async (reviewId: string, status: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/reviews/${reviewId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

// Notifications API
export const notificationsAPI = {
  getAdminNotifications: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<ApiResponse<any[]>>(`/notifications/admin?${queryParams}`);
  },

  getNotificationCount: async (): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>('/notifications/admin/count');
  },

  markAsRead: async (notificationId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/notifications/admin/${notificationId}/read`, {
      method: 'PUT',
    });
  },

  markAllAsRead: async (): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>('/notifications/admin/read-all', {
      method: 'PUT',
    });
  },

  deleteNotification: async (notificationId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/notifications/admin/${notificationId}`, {
      method: 'DELETE',
    });
  },

  getAllNotifications: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<ApiResponse<any[]>>(`/notifications/admin/system?${queryParams}`);
  },

  createNotification: async (notificationData: any): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>('/notifications/admin/system', {
      method: 'POST',
      body: JSON.stringify(notificationData),
    });
  },

  updateNotificationStatus: async (notificationId: string, status: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/notifications/admin/system/${notificationId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },
};

// Support API
export const supportAPI = {
  getAllTickets: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<ApiResponse<any[]>>(`/support/admin/tickets?${queryParams}`);
  },

  getTicketById: async (ticketId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/support/admin/tickets/${ticketId}`);
  },

  assignTicket: async (ticketId: string, assignedTo: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/support/admin/tickets/${ticketId}/assign`, {
      method: 'PUT',
      body: JSON.stringify({ assigned_to: assignedTo }),
    });
  },

  updateTicketStatus: async (ticketId: string, status: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/support/admin/tickets/${ticketId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
    });
  },

  getTicketMessages: async (ticketId: string, filters: any = {}): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<ApiResponse<any[]>>(`/support/admin/tickets/${ticketId}/messages?${queryParams}`);
  },

  addAdminMessage: async (ticketId: string, message: string, options: any = {}): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/support/admin/tickets/${ticketId}/messages`, {
      method: 'POST',
      body: JSON.stringify({
        message,
        attachments: options.attachments || [],
        is_internal: options.isInternal || false,
      }),
    });
  },
};

// Downloads & Files API
export const downloadsAPI = {
  getAll: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<ApiResponse<any[]>>(`/downloads?${queryParams}`);
  },

  getById: async (downloadId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/downloads/${downloadId}`);
  },

  getByUser: async (userId: string): Promise<ApiResponse<any[]>> => {
    return apiRequest<ApiResponse<any[]>>(`/downloads/user/${userId}`);
  },

  getByPlan: async (planId: string): Promise<ApiResponse<any[]>> => {
    return apiRequest<ApiResponse<any[]>>(`/downloads/plan/${planId}`);
  },
};

// Communications API
export const communicationsAPI = {
  getAll: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<ApiResponse<any[]>>(`/communications?${queryParams}`);
  },

  getById: async (communicationId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/communications/${communicationId}`);
  },

  create: async (communicationData: any): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>('/communications', {
      method: 'POST',
      body: JSON.stringify(communicationData),
    });
  },

  update: async (communicationId: string, communicationData: any): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/communications/${communicationId}`, {
      method: 'PUT',
      body: JSON.stringify(communicationData),
    });
  },

  delete: async (communicationId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/communications/${communicationId}`, {
      method: 'DELETE',
    });
  },

  getTemplates: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest<ApiResponse<any[]>>('/communications/templates');
  },

  getLogs: async (filters: any = {}): Promise<ApiResponse<any[]>> => {
    const queryParams = new URLSearchParams(filters).toString();
    return apiRequest<ApiResponse<any[]>>(`/communications/logs?${queryParams}`);
  },
};
