import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './contexts/auth/AuthProvider.tsx'
import NotificationArea from './components/NotificationArea.tsx'
import router from './router.tsx'
import './i18n/i18n.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <NotificationArea />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
