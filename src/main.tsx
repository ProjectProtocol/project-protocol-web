import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { RouterProvider } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import AuthProvider from './contexts/auth/AuthProvider.tsx'
import NotificationArea from './components/NotificationArea.tsx'
import router from './router.tsx'
import RollbarProvider from './components/RollbarProvider.tsx'
import { QueryClientProvider } from '@tanstack/react-query'
import queryClient from './util/queryClient.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RollbarProvider>
      <React.Suspense fallback={<Spinner />}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <NotificationArea />
            <RouterProvider router={router} />
          </AuthProvider>
        </QueryClientProvider>
      </React.Suspense>
    </RollbarProvider>
  </React.StrictMode>,
)
