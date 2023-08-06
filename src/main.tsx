import React from "react"
import ReactDOM from "react-dom/client"
import Root from "./components/Root.tsx"
import "./styles/index.scss"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AuthProvider from "./contexts/auth/AuthProvider.tsx"
import ErrorPage from "./components/ErrorPage.tsx"
import Welcome from "./components/Welcome.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    // loader: rootLoader,
    children: [
      {
        path: "",
        element: <Welcome />,
        index: true,
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
