import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ConfigProvider } from 'antd'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App.tsx'
import { store } from './store'
import { useAuthInit } from './hooks/useAuthInit'
import GlobalErrorBoundary from './components/ui/GlobalErrorBoundary'
import './index.css'

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
})

// Wrapper component to handle authentication initialization
const AppWrapper = () => {
  useAuthInit()
  return <App />
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalErrorBoundary>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ConfigProvider
            theme={{
              token: {
                colorPrimary: '#f97316', // SAK brand orange
                colorText: '#2d3748', // SAK brand charcoal
                fontFamily: 'Inter, sans-serif',
              },
            }}
          >
            <BrowserRouter
              future={{
                v7_startTransition: true,
                v7_relativeSplatPath: true
              }}
            >
              <AppWrapper />
            </BrowserRouter>
          </ConfigProvider>
        </QueryClientProvider>
      </Provider>
    </GlobalErrorBoundary>
  </React.StrictMode>,
)
