import React from "react"
import ReactDOM from "react-dom/client"
import Root from "./pages/Root.tsx"
import "./styles/index.scss"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import AuthProvider from "./contexts/auth/AuthProvider.tsx"
import ErrorPage from "./pages/ErrorPage.tsx"
import Search from "./pages/Search.tsx"
import Account from "./pages/Account.tsx"
import StaticPage from "./pages/StaticPage.tsx"
import searchLoader from "./loaders/searchLoader.ts"
import agentLoader from "./loaders/agentLoader.ts"
import Agent from "./pages/AgentView.tsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <Search />,
        index: true,
        loader: searchLoader,
      },
      {
        element: <Agent />,
        path: "agents/:agentId",
        loader: agentLoader,
      },
      {
        element: <Account />,
        path: "account",
      },
      {
        element: <StaticPage title="Ethical Principles" />,
        path: "ethical-principles",
      },
      {
        element: <StaticPage title="About Us" />,
        path: "about",
      },
      {
        element: <StaticPage title="How does it work?" />,
        path: "faq",
      },
      {
        element: <StaticPage title="Contact Us" />,
        path: "contact-us",
      },
      {
        element: <StaticPage title="Resources" />,
        path: "resources",
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
