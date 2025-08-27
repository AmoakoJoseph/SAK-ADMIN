import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Optimize React for ESM
      jsxRuntime: 'automatic',
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3001,
    open: true,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
    exclude: ['@tanstack/react-query'],
    esbuildOptions: {
      target: 'esnext',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: 'terser',
    target: 'esnext', // Target modern browsers for better ESM support
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info', 'console.debug'],
      },
      mangle: {
        safari10: true, // Better Safari compatibility
      },
    },
    rollupOptions: {
      output: {
        format: 'es', // Ensure ESM output
        manualChunks: (id) => {
          // Vendor chunks
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router')) {
              return 'react-vendor';
            }
            if (id.includes('antd')) {
              return 'antd-vendor';
            }
            if (id.includes('@tanstack')) {
              return 'query-vendor';
            }
            if (id.includes('redux') || id.includes('@reduxjs')) {
              return 'redux-vendor';
            }
            if (id.includes('recharts')) {
              return 'charts-vendor';
            }
            if (id.includes('dayjs') || id.includes('lodash')) {
              return 'utils-vendor';
            }
            // Other node_modules
            return 'vendor';
          }
          
          // Page chunks
          if (id.includes('/pages/')) {
            const pageName = id.split('/pages/')[1]?.split('.')[0];
            if (pageName) {
              return `page-${pageName.toLowerCase()}`;
            }
          }
          
          // Component chunks
          if (id.includes('/components/')) {
            if (id.includes('/layout/')) {
              return 'components-layout';
            }
            if (id.includes('/ui/')) {
              return 'components-ui';
            }
            if (id.includes('/plans/')) {
              return 'components-plans';
            }
            return 'components';
          }
          
          // Service chunks
          if (id.includes('/services/')) {
            return 'services';
          }
          
          // Hook chunks
          if (id.includes('/hooks/')) {
            return 'hooks';
          }
        },
        chunkFileNames: (chunkInfo) => {
          const facadeModuleId = chunkInfo.facadeModuleId ? chunkInfo.facadeModuleId.split('/').pop() : 'chunk';
          return `js/[name]-[hash].js`;
        },
        entryFileNames: 'js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`;
          }
          if (/css/i.test(ext)) {
            return `css/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Increase warning limit to 1MB
    assetsInlineLimit: 4096, // Inline assets smaller than 4KB
  },
})
