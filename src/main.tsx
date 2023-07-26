import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/App.tsx"
import "./styles/index.scss"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AuthProvider from "./contexts/auth/AuthProvider.tsx"
import Login from "./components/Login.tsx"
import ErrorPage from "./components/ErrorPage.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
)
