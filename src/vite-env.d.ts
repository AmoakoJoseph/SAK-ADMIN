/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_ADMIN_SESSION_TIMEOUT: string
  readonly VITE_ADMIN_MAX_LOGIN_ATTEMPTS: string
  readonly VITE_ADMIN_SESSION_INACTIVITY: string
  readonly VITE_REQUIRE_MFA: string
  readonly VITE_FILE_UPLOAD_LIMIT: string
  readonly VITE_MAX_FILES_PER_UPLOAD: string
  readonly VITE_ADMIN_IP_WHITELIST: string
  readonly VITE_STRIPE_PUBLISHABLE_KEY: string
  readonly VITE_STRIPE_ADMIN_KEY: string
  readonly VITE_PAYPAL_CLIENT_ID: string
  readonly VITE_PAYPAL_CLIENT_SECRET: string
  readonly VITE_GOOGLE_ANALYTICS_ID: string
  readonly VITE_FACEBOOK_PIXEL_ID: string
  readonly VITE_ENABLE_REAL_TIME_NOTIFICATIONS: string
  readonly VITE_ENABLE_DARK_MODE: string
  readonly VITE_ENABLE_ADVANCED_ANALYTICS: string
  readonly VITE_ENABLE_WORKFLOW_AUTOMATION: string
  readonly VITE_ENABLE_DEBUG_MODE: string
  readonly VITE_ENABLE_MOCK_DATA: string
  readonly VITE_LOG_LEVEL: string
  readonly NODE_ENV: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
