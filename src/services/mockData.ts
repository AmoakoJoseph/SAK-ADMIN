// Mock data for when API is unavailable
export const mockData = {
  // Dashboard Stats
  dashboardStats: {
    totalRevenue: 125000,
    totalOrders: 156,
    totalUsers: 89,
    totalPlans: 24,
    revenueGrowth: 12.5,
    orderGrowth: -2.3,
    userGrowth: 8.7,
    planGrowth: 15.2
  },

  // Auth Mock Response
  authLogin: {
    success: true,
    token: 'mock-jwt-token-12345',
    user: {
      id: '1',
      email: 'admin@sakconstruction.com',
      name: 'SAK Admin',
      role: 'superAdmin' as const,
      createdAt: '2024-01-01T00:00:00Z',
      updatedAt: '2024-01-01T00:00:00Z'
    },
    message: 'Login successful'
  },

  // Users Mock Data
  users: [
    {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'customer',
      status: 'active',
      createdAt: '2024-01-15T10:30:00Z',
      lastLogin: '2024-01-20T14:20:00Z'
    },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      role: 'customer',
      status: 'active',
      createdAt: '2024-01-10T09:15:00Z',
      lastLogin: '2024-01-19T16:45:00Z'
    }
  ],

  // Plans Mock Data
  plans: [
    {
      id: '1',
      name: 'Modern Villa',
      description: 'Contemporary 4-bedroom villa with modern amenities',
      status: 'active',
      tiers: [
        { id: '1', name: 'Basic', price: 1500, features: ['4 Bedrooms', '2 Bathrooms', 'Kitchen'] },
        { id: '2', name: 'Standard', price: 2500, features: ['4 Bedrooms', '3 Bathrooms', 'Kitchen', 'Living Room'] },
        { id: '3', name: 'Premium', price: 3500, features: ['4 Bedrooms', '4 Bathrooms', 'Kitchen', 'Living Room', 'Garden'] }
      ],
      downloads: 45,
      views: 120
    },
    {
      id: '2',
      name: 'Luxury Townhouse',
      description: 'Elegant 3-bedroom townhouse with premium finishes',
      status: 'active',
      tiers: [
        { id: '4', name: 'Basic', price: 1200, features: ['3 Bedrooms', '2 Bathrooms', 'Kitchen'] },
        { id: '5', name: 'Standard', price: 2000, features: ['3 Bedrooms', '2.5 Bathrooms', 'Kitchen', 'Living Room'] }
      ],
      downloads: 32,
      views: 89
    }
  ],

  // Orders Mock Data
  orders: [
    {
      id: '1',
      customerName: 'John Doe',
      customerEmail: 'john.doe@example.com',
      planName: 'Modern Villa',
      amount: 2500,
      status: 'Completed',
      paymentMethod: 'Mobile Money',
      createdAt: '2024-01-20T10:30:00Z'
    },
    {
      id: '2',
      customerName: 'Jane Smith',
      customerEmail: 'jane.smith@example.com',
      planName: 'Luxury Townhouse',
      amount: 2000,
      status: 'Pending',
      paymentMethod: 'Bank Transfer',
      createdAt: '2024-01-19T14:20:00Z'
    }
  ],

  // Analytics Mock Data
  analytics: {
    revenueData: [
      { name: 'Jan', value: 125000 },
      { name: 'Feb', value: 98000 },
      { name: 'Mar', value: 145000 },
      { name: 'Apr', value: 132000 },
      { name: 'May', value: 168000 },
      { name: 'Jun', value: 189000 }
    ],
    paymentMethods: [
      { name: 'Mobile Money', value: 65, color: '#4A90E2' },
      { name: 'Bank Transfer', value: 25, color: '#50C878' },
      { name: 'Credit Card', value: 10, color: '#FF6B6B' }
    ]
  },

  // Reviews Mock Data
  reviews: [
    {
      id: '1',
      user_id: '1',
      plan_id: '1',
      rating: 5,
      comment: 'Excellent design! Very modern and functional.',
      status: 'active',
      created_at: '2024-01-05T00:00:00Z'
    },
    {
      id: '2',
      user_id: '2',
      plan_id: '2',
      rating: 4,
      comment: 'Great apartment design, very practical.',
      status: 'active',
      created_at: '2024-01-08T00:00:00Z'
    }
  ],

  // Notifications Mock Data
  notifications: [
    {
      id: '1',
      type: 'order_status',
      title: 'New Order Received',
      message: 'Order #1234 has been placed by John Doe',
      status: 'unread',
      created_at: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      type: 'payment_received',
      title: 'Payment Completed',
      message: 'Payment for Order #1234 has been completed',
      status: 'read',
      created_at: '2024-01-15T10:30:00Z'
    }
  ],

  // Support Tickets Mock Data
  supportTickets: [
    {
      id: '1',
      user_id: '1',
      subject: 'Download Issue',
      description: 'I cannot download the plan files',
      status: 'open',
      priority: 'medium',
      assigned_to: null,
      created_at: '2024-01-14T09:00:00Z'
    },
    {
      id: '2',
      user_id: '2',
      subject: 'Payment Problem',
      description: 'Payment failed during checkout',
      status: 'in_progress',
      priority: 'high',
      assigned_to: 'admin-1',
      created_at: '2024-01-13T14:00:00Z'
    }
  ],

  // Downloads Mock Data
  downloads: [
    {
      id: '1',
      user_id: '1',
      plan_id: '1',
      file_name: 'modern-villa-3br.pdf',
      file_size: '2.5MB',
      download_count: 1,
      created_at: '2024-01-10T11:00:00Z'
    },
    {
      id: '2',
      user_id: '2',
      plan_id: '2',
      file_name: 'contemporary-apartment-2br.pdf',
      file_size: '1.8MB',
      download_count: 1,
      created_at: '2024-01-12T16:00:00Z'
    }
  ],

  // Communications Mock Data
  communications: [
    {
      id: '1',
      type: 'email',
      subject: 'Welcome to SAK Construction',
      content: 'Thank you for joining our platform...',
      status: 'sent',
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: '2',
      type: 'notification',
      subject: 'New Plan Available',
      content: 'Check out our latest villa design...',
      status: 'draft',
      created_at: '2024-01-15T00:00:00Z'
    }
  ],

  // Analytics Reports Mock Data
  analyticsReports: [
    {
      id: '1',
      report_name: 'Monthly Revenue Report',
      report_type: 'revenue_analysis',
      date_range_start: '2024-01-01',
      date_range_end: '2024-01-31',
      created_at: '2024-02-01T00:00:00Z'
    },
    {
      id: '2',
      report_name: 'User Activity Report',
      report_type: 'user_activity',
      date_range_start: '2024-01-01',
      date_range_end: '2024-01-31',
      created_at: '2024-02-01T00:00:00Z'
    }
  ]
};

// Mock API responses
export const createMockResponse = <T>(data: T) => ({
  success: true,
  data,
  message: 'Mock data loaded successfully'
});

export const createMockErrorResponse = (message: string) => ({
  success: false,
  data: null,
  message
});
