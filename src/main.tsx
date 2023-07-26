import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/App.tsx"
import "./styles/index.scss"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AuthProvider from "./contexts/auth/AuthProvider.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
