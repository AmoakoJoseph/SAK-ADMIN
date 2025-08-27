import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface AnalyticsData {
  revenue: {
    total: number
    monthly: number
    growth: number
  }
  orders: {
    total: number
    pending: number
    completed: number
    cancelled: number
  }
  users: {
    total: number
    active: number
    new: number
  }
  plans: {
    total: number
    published: number
    downloads: number
  }
}

interface AnalyticsState {
  data: AnalyticsData | null
  isLoading: boolean
  error: string | null
  dateRange: {
    start: string
    end: string
  }
}

const initialState: AnalyticsState = {
  data: null,
  isLoading: false,
  error: null,
  dateRange: {
    start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    end: new Date().toISOString(),
  },
}

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    fetchAnalyticsStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    fetchAnalyticsSuccess: (state, action: PayloadAction<AnalyticsData>) => {
      state.isLoading = false
      state.data = action.payload
    },
    fetchAnalyticsFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    setDateRange: (state, action: PayloadAction<{ start: string; end: string }>) => {
      state.dateRange = action.payload
    },
  },
})

export const {
  fetchAnalyticsStart,
  fetchAnalyticsSuccess,
  fetchAnalyticsFailure,
  setDateRange,
} = analyticsSlice.actions

export default analyticsSlice.reducer
