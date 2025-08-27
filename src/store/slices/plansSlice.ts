import { createSlice, PayloadAction } from '@reduxjs/toolkit'

interface PlanTier {
  id: string
  name: string
  price: number
  features: string[]
}

interface Plan {
  id: string
  title: string
  description: string
  type: 'Villa' | 'Bungalow' | 'Townhouse' | 'Cottage' | 'Farmhouse'
  status: 'Draft' | 'Published' | 'Archived' | 'Pending Review'
  tiers: PlanTier[]
  featured: boolean
  createdAt: string
  updatedAt: string
  downloads?: number
  views?: number
}

interface PlansState {
  plans: Plan[]
  isLoading: boolean
  error: string | null
  selectedPlan: Plan | null
}

const initialState: PlansState = {
  plans: [],
  isLoading: false,
  error: null,
  selectedPlan: null,
}

const plansSlice = createSlice({
  name: 'plans',
  initialState,
  reducers: {
    fetchPlansStart: (state) => {
      state.isLoading = true
      state.error = null
    },
    fetchPlansSuccess: (state, action: PayloadAction<Plan[]>) => {
      state.isLoading = false
      state.plans = action.payload
    },
    fetchPlansFailure: (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    },
    setSelectedPlan: (state, action: PayloadAction<Plan | null>) => {
      state.selectedPlan = action.payload
    },
    addPlan: (state, action: PayloadAction<Plan>) => {
      state.plans.push(action.payload)
    },
    updatePlan: (state, action: PayloadAction<Plan>) => {
      const index = state.plans.findIndex(plan => plan.id === action.payload.id)
      if (index !== -1) {
        state.plans[index] = action.payload
      }
    },
    deletePlan: (state, action: PayloadAction<string>) => {
      state.plans = state.plans.filter(plan => plan.id !== action.payload)
    },
  },
})

export const {
  fetchPlansStart,
  fetchPlansSuccess,
  fetchPlansFailure,
  setSelectedPlan,
  addPlan,
  updatePlan,
  deletePlan,
} = plansSlice.actions

export default plansSlice.reducer
