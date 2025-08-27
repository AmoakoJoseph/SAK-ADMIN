import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import plansReducer from './slices/plansSlice'
import usersReducer from './slices/usersSlice'
import ordersReducer from './slices/ordersSlice'
import analyticsReducer from './slices/analyticsSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    plans: plansReducer,
    users: usersReducer,
    orders: ordersReducer,
    analytics: analyticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
