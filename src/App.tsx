import React from 'react'
import './styles/index.scss'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './contexts/auth/AuthProvider.tsx'
import NotificationArea from './components/NotificationArea.tsx'
import router from './router.tsx'
import RollbarProvider from './components/RollbarProvider.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './util/queryClient.ts'
import TranslationsProvider from './contexts/TranslationsProvider/index.tsx'

const App = () => (
  <React.StrictMode>
    <RollbarProvider>
      <QueryClientProvider client={queryClient}>
        <TranslationsProvider>
          <AuthProvider>
            <NotificationArea />
            <RouterProvider router={router} />
          </AuthProvider>
        </TranslationsProvider>
      </QueryClientProvider>
    </RollbarProvider>
  </React.StrictMode>
)
export default App
