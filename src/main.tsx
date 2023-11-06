import React from 'react'
import ReactDOM from 'react-dom/client'
import './styles/index.scss'
import { RouterProvider } from 'react-router-dom'
import AuthProvider from './contexts/auth/AuthProvider.tsx'
import LocaleSwitcher from './i18n/LocaleSwitcher.tsx'
import NotificationArea from './components/NotificationArea.tsx'
import router from './router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <LocaleSwitcher />
      <NotificationArea />
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
)
