import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  authAPI, 
  usersAPI, 
  plansAPI, 
  ordersAPI, 
  paymentsAPI, 
  analyticsAPI, 
  settingsAPI,
  reviewsAPI,
  notificationsAPI,
  supportAPI,
  downloadsAPI,
  communicationsAPI
} from '../services/api';

// Query Keys
export const queryKeys = {
  auth: {
    profile: ['auth', 'profile'] as const,
  },
  users: {
    all: ['users'] as const,
    detail: (id: string) => ['users', id] as const,
  },
  plans: {
    all: ['plans'] as const,
    detail: (id: string) => ['plans', id] as const,
  },
  orders: {
    all: ['orders'] as const,
    detail: (id: string) => ['orders', id] as const,
  },
  payments: {
    all: ['payments'] as const,
    detail: (id: string) => ['payments', id] as const,
  },
  analytics: {
    dashboard: ['analytics', 'dashboard'] as const,
    salesReport: (startDate: string, endDate: string) => 
      ['analytics', 'salesReport', startDate, endDate] as const,
  },
  settings: {
    all: ['settings'] as const,
  },
  reviews: {
    all: ['reviews'] as const,
    detail: (id: string) => ['reviews', id] as const,
  },
  notifications: {
    admin: ['notifications', 'admin'] as const,
    count: ['notifications', 'admin', 'count'] as const,
    system: ['notifications', 'system'] as const,
  },
  support: {
    tickets: ['support', 'tickets'] as const,
    ticket: (id: string) => ['support', 'tickets', id] as const,
    messages: (ticketId: string) => ['support', 'tickets', ticketId, 'messages'] as const,
  },
  downloads: {
    all: ['downloads'] as const,
    detail: (id: string) => ['downloads', id] as const,
    byUser: (userId: string) => ['downloads', 'user', userId] as const,
    byPlan: (planId: string) => ['downloads', 'plan', planId] as const,
  },
  communications: {
    all: ['communications'] as const,
    detail: (id: string) => ['communications', id] as const,
    templates: ['communications', 'templates'] as const,
    logs: ['communications', 'logs'] as const,
  },
};

// Authentication Hooks
export const useAuthProfile = () => {
  return useQuery({
    queryKey: queryKeys.auth.profile,
    queryFn: () => authAPI.getProfile(),
    enabled: !!localStorage.getItem('adminToken'),
  });
};

export const useAuthLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      authAPI.login(email, password),
    onSuccess: (data) => {
      if (data.success) {
        // Handle both backend response structure and mock data structure
        const token = 'data' in data ? data.data.session.token : data.token
        if (token) {
          localStorage.setItem('adminToken', token);
          queryClient.invalidateQueries({ queryKey: queryKeys.auth.profile });
        }
      }
    },
  });
};

// Users Hooks
export const useUsers = () => {
  return useQuery({
    queryKey: queryKeys.users.all,
    queryFn: () => usersAPI.getAll(),
  });
};

export const useUser = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.users.detail(userId),
    queryFn: () => usersAPI.getById(userId),
    enabled: !!userId,
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ userId, userData }: { userId: string; userData: any }) =>
      usersAPI.update(userId, userData),
    onSuccess: (_, { userId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.users.detail(userId) });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (userId: string) => usersAPI.delete(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.users.all });
    },
  });
};

// Plans Hooks
export const usePlans = () => {
  return useQuery({
    queryKey: queryKeys.plans.all,
    queryFn: () => plansAPI.getAll(),
  });
};

export const usePlan = (planId: string) => {
  return useQuery({
    queryKey: queryKeys.plans.detail(planId),
    queryFn: () => plansAPI.getById(planId),
    enabled: !!planId,
  });
};

export const useCreatePlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (planData: any) => plansAPI.create(planData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plans.all });
    },
  });
};

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ planId, planData }: { planId: string; planData: any }) =>
      plansAPI.update(planId, planData),
    onSuccess: (_, { planId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plans.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.plans.detail(planId) });
    },
  });
};

export const useDeletePlan = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (planId: string) => plansAPI.delete(planId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.plans.all });
    },
  });
};

// Orders Hooks
export const useOrders = () => {
  return useQuery({
    queryKey: queryKeys.orders.all,
    queryFn: () => ordersAPI.getAll(),
  });
};

export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: queryKeys.orders.detail(orderId),
    queryFn: () => ordersAPI.getById(orderId),
    enabled: !!orderId,
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ orderId, status }: { orderId: string; status: string }) =>
      ordersAPI.updateStatus(orderId, status),
    onSuccess: (_, { orderId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.detail(orderId) });
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (orderId: string) => ordersAPI.delete(orderId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders.all });
    },
  });
};

// Payments Hooks
export const usePayments = () => {
  return useQuery({
    queryKey: queryKeys.payments.all,
    queryFn: () => paymentsAPI.getAll(),
  });
};

export const usePayment = (paymentId: string) => {
  return useQuery({
    queryKey: queryKeys.payments.detail(paymentId),
    queryFn: () => paymentsAPI.getById(paymentId),
    enabled: !!paymentId,
  });
};

// Analytics Hooks
export const useDashboardStats = () => {
  return useQuery({
    queryKey: queryKeys.analytics.dashboard,
    queryFn: () => analyticsAPI.getDashboardStats(),
    retry: false,
  });
};

export const useSalesReport = (startDate: string, endDate: string) => {
  return useQuery({
    queryKey: queryKeys.analytics.salesReport(startDate, endDate),
    queryFn: () => analyticsAPI.getSalesReport(startDate, endDate),
    enabled: !!startDate && !!endDate,
  });
};

// Settings Hooks
export const useSettings = () => {
  return useQuery({
    queryKey: queryKeys.settings.all,
    queryFn: () => settingsAPI.get(),
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (settings: any) => settingsAPI.update(settings),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.settings.all });
    },
  });
};

// Reviews Hooks
export const useReviews = (filters: any = {}) => {
  return useQuery({
    queryKey: [...queryKeys.reviews.all, filters],
    queryFn: () => reviewsAPI.getAll(filters),
  });
};

export const useUpdateReviewStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ reviewId, status }: { reviewId: string; status: string }) =>
      reviewsAPI.updateStatus(reviewId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.reviews.all });
    },
  });
};

// Notifications Hooks
export const useAdminNotifications = (filters: any = {}) => {
  return useQuery({
    queryKey: [...queryKeys.notifications.admin, filters],
    queryFn: () => notificationsAPI.getAdminNotifications(filters),
  });
};

export const useNotificationCount = () => {
  return useQuery({
    queryKey: queryKeys.notifications.count,
    queryFn: () => notificationsAPI.getNotificationCount(),
  });
};

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: string) => notificationsAPI.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.admin });
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.count });
    },
  });
};

export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => notificationsAPI.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.admin });
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.count });
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationId: string) => notificationsAPI.deleteNotification(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.admin });
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.count });
    },
  });
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (notificationData: any) => notificationsAPI.createNotification(notificationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.notifications.system });
    },
  });
};

// Support Hooks
export const useSupportTickets = (filters: any = {}) => {
  return useQuery({
    queryKey: [...queryKeys.support.tickets, filters],
    queryFn: () => supportAPI.getAllTickets(filters),
  });
};

export const useSupportTicket = (ticketId: string) => {
  return useQuery({
    queryKey: queryKeys.support.ticket(ticketId),
    queryFn: () => supportAPI.getTicketById(ticketId),
    enabled: !!ticketId,
  });
};

export const useAssignTicket = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ ticketId, assignedTo }: { ticketId: string; assignedTo: string }) =>
      supportAPI.assignTicket(ticketId, assignedTo),
    onSuccess: (_, { ticketId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.support.tickets });
      queryClient.invalidateQueries({ queryKey: queryKeys.support.ticket(ticketId) });
    },
  });
};

export const useUpdateTicketStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ ticketId, status }: { ticketId: string; status: string }) =>
      supportAPI.updateTicketStatus(ticketId, status),
    onSuccess: (_, { ticketId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.support.tickets });
      queryClient.invalidateQueries({ queryKey: queryKeys.support.ticket(ticketId) });
    },
  });
};

export const useTicketMessages = (ticketId: string, filters: any = {}) => {
  return useQuery({
    queryKey: [...queryKeys.support.messages(ticketId), filters],
    queryFn: () => supportAPI.getTicketMessages(ticketId, filters),
    enabled: !!ticketId,
  });
};

export const useAddAdminMessage = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ ticketId, message, options }: { ticketId: string; message: string; options?: any }) =>
      supportAPI.addAdminMessage(ticketId, message, options),
    onSuccess: (_, { ticketId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.support.messages(ticketId) });
    },
  });
};

// Downloads Hooks
export const useDownloads = (filters: any = {}) => {
  return useQuery({
    queryKey: [...queryKeys.downloads.all, filters],
    queryFn: () => downloadsAPI.getAll(filters),
  });
};

export const useDownload = (downloadId: string) => {
  return useQuery({
    queryKey: queryKeys.downloads.detail(downloadId),
    queryFn: () => downloadsAPI.getById(downloadId),
    enabled: !!downloadId,
  });
};

export const useDownloadsByUser = (userId: string) => {
  return useQuery({
    queryKey: queryKeys.downloads.byUser(userId),
    queryFn: () => downloadsAPI.getByUser(userId),
    enabled: !!userId,
  });
};

export const useDownloadsByPlan = (planId: string) => {
  return useQuery({
    queryKey: queryKeys.downloads.byPlan(planId),
    queryFn: () => downloadsAPI.getByPlan(planId),
    enabled: !!planId,
  });
};

// Communications Hooks
export const useCommunications = (filters: any = {}) => {
  return useQuery({
    queryKey: [...queryKeys.communications.all, filters],
    queryFn: () => communicationsAPI.getAll(filters),
  });
};

export const useCommunication = (communicationId: string) => {
  return useQuery({
    queryKey: queryKeys.communications.detail(communicationId),
    queryFn: () => communicationsAPI.getById(communicationId),
    enabled: !!communicationId,
  });
};

export const useCreateCommunication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (communicationData: any) => communicationsAPI.create(communicationData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.communications.all });
    },
  });
};

export const useUpdateCommunication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: ({ communicationId, communicationData }: { communicationId: string; communicationData: any }) =>
      communicationsAPI.update(communicationId, communicationData),
    onSuccess: (_, { communicationId }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.communications.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.communications.detail(communicationId) });
    },
  });
};

export const useDeleteCommunication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (communicationId: string) => communicationsAPI.delete(communicationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.communications.all });
    },
  });
};

export const useCommunicationTemplates = () => {
  return useQuery({
    queryKey: queryKeys.communications.templates,
    queryFn: () => communicationsAPI.getTemplates(),
  });
};

export const useCommunicationLogs = (filters: any = {}) => {
  return useQuery({
    queryKey: [...queryKeys.communications.logs, filters],
    queryFn: () => communicationsAPI.getLogs(filters),
  });
};

// Enhanced Analytics Hooks
export const useDashboardOverview = () => {
  return useQuery({
    queryKey: ['analytics', 'dashboard', 'overview'],
    queryFn: () => analyticsAPI.getDashboardOverview(),
  });
};

export const useAnalyticsMetrics = (filters: any = {}) => {
  return useQuery({
    queryKey: ['analytics', 'metrics', filters],
    queryFn: () => analyticsAPI.getMetrics(filters),
  });
};

export const useAnalyticsEvents = (filters: any = {}) => {
  return useQuery({
    queryKey: ['analytics', 'events', filters],
    queryFn: () => analyticsAPI.getEvents(filters),
  });
};

export const useAnalyticsSessions = (filters: any = {}) => {
  return useQuery({
    queryKey: ['analytics', 'sessions', filters],
    queryFn: () => analyticsAPI.getSessions(filters),
  });
};

export const useAnalyticsPageViews = (filters: any = {}) => {
  return useQuery({
    queryKey: ['analytics', 'pageViews', filters],
    queryFn: () => analyticsAPI.getPageViews(filters),
  });
};

export const useCreateAnalyticsReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (reportData: any) => analyticsAPI.createReport(reportData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['analytics', 'reports'] });
    },
  });
};

export const useAnalyticsReports = (filters: any = {}) => {
  return useQuery({
    queryKey: ['analytics', 'reports', filters],
    queryFn: () => analyticsAPI.getAllReports(filters),
  });
};

export const useAnalyticsReport = (reportId: string) => {
  return useQuery({
    queryKey: ['analytics', 'reports', reportId],
    queryFn: () => analyticsAPI.getReportById(reportId),
    enabled: !!reportId,
  });
};
