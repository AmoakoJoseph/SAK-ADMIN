# SAK Constructions - Admin Frontend Technical Specifications

## 🔧 Component Architecture

### 1. Layout Components

```typescript
// src/components/layout/AdminLayout.tsx
interface AdminLayoutProps {
  children: ReactNode;
}

// src/components/layout/Sidebar.tsx
interface SidebarProps {
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

// src/components/layout/Header.tsx
interface HeaderProps {
  breadcrumbs: Breadcrumb[];
  notifications: Notification[];
}
```

### 2. Dashboard Components

```typescript
// src/components/dashboard/StatCard.tsx
interface StatCardProps {
  title: string;
  value: number | string;
  change?: number;
  icon: LucideIcon;
  trend: 'up' | 'down' | 'neutral';
}

// src/components/dashboard/RevenueChart.tsx
interface RevenueChartProps {
  data: {
    date: string;
    revenue: number;
    orders: number;
  }[];
  period: 'daily' | 'weekly' | 'monthly';
}

// src/components/dashboard/ActivityFeed.tsx
interface ActivityFeedProps {
  activities: Activity[];
  onLoadMore: () => void;
  loading: boolean;
}
```

### 3. Plan Management Components

```typescript
// src/components/plans/PlanForm.tsx
interface PlanFormProps {
  initialData?: Plan;
  onSubmit: (data: PlanFormData) => Promise<void>;
  isSubmitting: boolean;
}

// src/components/plans/PlanList.tsx
interface PlanListProps {
  plans: Plan[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: PlanStatus) => void;
}

// src/components/plans/FileUpload.tsx
interface FileUploadProps {
  accept: string[];
  maxSize: number;
  multiple: boolean;
  onUpload: (files: File[]) => void;
  onError: (error: string) => void;
}
```

### 4. Analytics Components

```typescript
// src/components/analytics/AnalyticsChart.tsx
interface AnalyticsChartProps {
  data: any[];
  type: 'line' | 'bar' | 'pie';
  config: ChartConfig;
}

// src/components/analytics/MetricsGrid.tsx
interface MetricsGridProps {
  metrics: {
    id: string;
    label: string;
    value: number;
    change: number;
    format: string;
  }[];
}
```

## 🔌 API Integration

### API Service Structure

```typescript
// src/services/api.ts
interface ApiService {
  plans: {
    list: () => Promise<Plan[]>;
    create: (data: PlanFormData) => Promise<Plan>;
    update: (id: string, data: Partial<PlanFormData>) => Promise<Plan>;
    delete: (id: string) => Promise<void>;
  };
  orders: {
    list: (params: OrderQueryParams) => Promise<Order[]>;
    get: (id: string) => Promise<OrderDetails>;
    updateStatus: (id: string, status: OrderStatus) => Promise<Order>;
  };
  analytics: {
    getDashboard: () => Promise<DashboardData>;
    getRevenue: (period: string) => Promise<RevenueData>;
    getPlanMetrics: (planId: string) => Promise<PlanMetrics>;
  };
}
```

### State Management

```typescript
// src/stores/adminStore.ts
interface AdminStore {
  user: AdminUser | null;
  settings: AdminSettings;
  notifications: Notification[];
  
  setUser: (user: AdminUser | null) => void;
  updateSettings: (settings: Partial<AdminSettings>) => void;
  addNotification: (notification: Notification) => void;
  clearNotifications: () => void;
}

// src/stores/planStore.ts
interface PlanStore {
  plans: Plan[];
  filters: PlanFilters;
  loading: boolean;
  
  setPlans: (plans: Plan[]) => void;
  updateFilters: (filters: Partial<PlanFilters>) => void;
  addPlan: (plan: Plan) => void;
  updatePlan: (id: string, updates: Partial<Plan>) => void;
  deletePlan: (id: string) => void;
}
```

## 📊 Data Models

### Core Types

```typescript
// src/types/plan.ts
interface Plan {
  id: string;
  title: string;
  description: string;
  type: PlanType;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  tiers: PlanTiers;
  media: PlanMedia;
  metadata: PlanMetadata;
  status: PlanStatus;
  createdAt: string;
  updatedAt: string;
}

// src/types/order.ts
interface Order {
  id: string;
  customerId: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
}

// src/types/analytics.ts
interface DashboardData {
  totalRevenue: number;
  totalOrders: number;
  totalPlans: number;
  recentOrders: Order[];
  recentPlans: Plan[];
  metrics: {
    daily: MetricData;
    weekly: MetricData;
    monthly: MetricData;
  };
}
```

## 🎨 Styling System

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        admin: {
          primary: {...},
          secondary: {...},
          accent: {...}
        }
      },
      spacing: {
        sidebar: '280px',
        'sidebar-collapsed': '64px'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography')
  ]
}
```

### Component Base Styles

```typescript
// src/styles/components.ts
export const componentStyles = {
  card: 'bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6',
  button: {
    primary: 'bg-admin-primary-600 hover:bg-admin-primary-700 text-white',
    secondary: 'bg-admin-secondary-100 hover:bg-admin-secondary-200 text-admin-secondary-900'
  },
  input: 'form-input rounded-lg border-gray-300 dark:border-gray-600',
  select: 'form-select rounded-lg border-gray-300 dark:border-gray-600'
}
```

## 🔒 Authentication & Authorization

### Auth Service

```typescript
// src/services/auth.ts
interface AuthService {
  login: (credentials: LoginCredentials) => Promise<AuthResponse>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<string>;
  getUser: () => Promise<AdminUser>;
}

// src/hooks/useAuth.ts
interface UseAuth {
  user: AdminUser | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  loading: boolean;
}
```

## 📱 Responsive Layout System

### Breakpoint Utilities

```typescript
// src/utils/responsive.ts
export const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536
};

export const mediaQueries = {
  sm: `@media (min-width: ${breakpoints.sm}px)`,
  md: `@media (min-width: ${breakpoints.md}px)`,
  lg: `@media (min-width: ${breakpoints.lg}px)`,
  xl: `@media (min-width: ${breakpoints.xl}px)`,
  '2xl': `@media (min-width: ${breakpoints['2xl']}px)`
};
```

## 🧪 Testing Setup

### Test Configuration

```typescript
// src/test/setup.ts
import '@testing-library/jest-dom';
import { server } from './mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

// src/test/utils.tsx
export const renderWithProviders = (
  ui: React.ReactElement,
  options = {}
) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {ui}
      </ThemeProvider>
    </QueryClientProvider>,
    options
  );
};
```

## 📈 Performance Optimization

### Code Splitting

```typescript
// src/pages/index.ts
export const Dashboard = lazy(() => import('./Dashboard'));
export const Plans = lazy(() => import('./Plans'));
export const Orders = lazy(() => import('./Orders'));
export const Analytics = lazy(() => import('./Analytics'));
export const Settings = lazy(() => import('./Settings'));

// src/components/Suspense.tsx
interface SuspenseWrapperProps {
  children: ReactNode;
  fallback?: ReactNode;
}
```

## 🚀 Build & Deployment

### Build Configuration

```javascript
// vite.config.ts
export default defineConfig({
  build: {
    target: 'esnext',
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          charts: ['recharts'],
          ui: ['@headlessui/react', '@heroicons/react']
        }
      }
    }
  },
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin()
  ]
});
```

## 🔍 Error Handling

### Error Boundary

```typescript
// src/components/ErrorBoundary.tsx
interface ErrorBoundaryProps {
  children: ReactNode;
  fallback: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}
```

## 📝 Implementation Guidelines

1. **Component Development**
   - Use TypeScript for all components
   - Implement proper prop validation
   - Include unit tests for each component
   - Document component usage with JSDoc

2. **State Management**
   - Use Zustand for global state
   - Implement proper state persistence
   - Handle optimistic updates
   - Include proper error handling

3. **API Integration**
   - Use React Query for data fetching
   - Implement proper caching strategies
   - Handle loading and error states
   - Include retry mechanisms

4. **Testing**
   - Write unit tests for utilities
   - Write integration tests for features
   - Include E2E tests for critical flows
   - Test responsive behavior

5. **Performance**
   - Implement code splitting
   - Optimize bundle size
   - Use proper caching strategies
   - Monitor performance metrics

## 🎯 Next Steps

1. Set up project with TypeScript and Vite
2. Implement core layout components
3. Set up authentication system
4. Develop dashboard components
5. Implement plan management
6. Add analytics features
7. Set up testing infrastructure
8. Deploy staging environment 