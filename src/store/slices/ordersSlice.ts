import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface Order {
  id: string
  customerName: string
  customerEmail: string
  planTitle: string
  amount: number
  status: 'Pending' | 'Completed' | 'Cancelled' | 'Refunded'
  paymentMethod: string
  createdAt: string
  updatedAt: string
}

interface OrdersState {
  orders: Order[]
  isLoading: boolean
  error: string | null
  selectedOrder: Order | null
}

const initialState: OrdersState = {
  orders: [],
  isLoading: false,
  error: null,
  selectedOrder: null,
}

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    fetchOrdersStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    fetchOrdersSuccess: (state, action: PayloadAction<Order[]>) => {
      state.isLoading = false
      state.orders = action.payload
    },
    fetchOrdersFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    setSelectedOrder: (state, action: PayloadAction<Order | null>) => {
      state.selectedOrder = action.payload
    },
    addOrder: (state, action: PayloadAction<Order>) => {
      state.orders.push(action.payload)
    },
    updateOrder: (state, action: PayloadAction<Order>) => {
      const index = state.orders.findIndex(order => order.id === action.payload.id)
      if (index !== -1) {
        state.orders[index] = action.payload
      }
    },
    deleteOrder: (state, action: PayloadAction<string>) => {
      state.orders = state.orders.filter(order => order.id !== action.payload)
    },
  },
})

export const {
  fetchOrdersStart,
  fetchOrdersSuccess,
  fetchOrdersFailure,
  setSelectedOrder,
  addOrder,
  updateOrder,
  deleteOrder,
} = ordersSlice.actions

export default ordersSlice.reducer
