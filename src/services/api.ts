import { mockData, createMockResponse } from './mockData';

// API Base URL
const API_BASE_URL = 'https://sak-backend.vercel.app/api/v1';

// Types
export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'superAdmin' | 'admin' | 'contentManager' | 'orderProcessor' | 'support';
  createdAt: string;
  updatedAt: string;
}

export interface LoginResponse {
  success: boolean;
  token: string;
  user: AdminUser;
  message?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

// Utility functions
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
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
    throw new Error('Server error - Please try again later');
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

// Plans API
export const plansAPI = {
  getAll: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest<ApiResponse<any[]>>('/plans');
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
};

// Orders API
export const ordersAPI = {
  getAll: async (): Promise<ApiResponse<any[]>> => {
    return apiRequest<ApiResponse<any[]>>('/orders');
  },

  getById: async (orderId: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/orders/${orderId}`);
  },

  updateStatus: async (orderId: string, status: string): Promise<ApiResponse<any>> => {
    return apiRequest<ApiResponse<any>>(`/orders/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify({ status }),
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

// Analytics API
export const analyticsAPI = {
  getDashboardStats: async (): Promise<ApiResponse<any>> => {
    try {
      return await apiRequest<ApiResponse<any>>('/admin/dashboard');
    } catch (error: any) {
      if (error.message.includes('Network error')) {
        console.log('Using mock dashboard data due to network error');
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
