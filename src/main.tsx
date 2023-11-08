import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { RouterProvider } from 'react-router-dom'
import { Spinner } from 'react-bootstrap'
import AuthProvider from './contexts/auth/AuthProvider.tsx'
import NotificationArea from './components/NotificationArea.tsx'
import router from './router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <React.Suspense fallback={<Spinner />}>
      <AuthProvider>
        <NotificationArea />
        <RouterProvider router={router} />
      </AuthProvider>
    </React.Suspense>
  </React.StrictMode>,
)
