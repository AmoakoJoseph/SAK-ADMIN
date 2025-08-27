import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  authAPI, 
  usersAPI, 
  plansAPI, 
  ordersAPI, 
  paymentsAPI, 
  analyticsAPI, 
  settingsAPI 
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
