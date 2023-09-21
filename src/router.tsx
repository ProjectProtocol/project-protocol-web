import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.tsx'
import Search from './pages/Search.tsx'
import Account from './pages/Account.tsx'
import StaticPage from './pages/StaticPage.tsx'
import searchLoader from './loaders/searchLoader.ts'
import agentLoader from './loaders/agentLoader.ts'
import Agent from './pages/AgentView.tsx'
import OfficeView from './pages/OfficeView.tsx'
import officeLoader from './loaders/officeLoader.ts'
import AgentNew from './pages/AgentNew.tsx'
import Home from './pages/Home.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />} errorElement={<ErrorPage />}>
      <Route index element={<Search />} loader={searchLoader} />
      <Route path="agents/:agentId" element={<Agent />} loader={agentLoader} />
      <Route path="agents/new" element={<AgentNew />} />
      <Route
        path="offices/:officeId"
        element={<OfficeView />}
        loader={officeLoader}
      />
      <Route path="account" element={<Account />} />
      <Route
        path="ethical-principles"
        element={<StaticPage title="Ethical Principles" />}
      />
      <Route path="about" element={<StaticPage title="About" />} />
      <Route path="faq" element={<StaticPage title="faq" />} />
      <Route path="contact-us" element={<StaticPage title="Contact Us" />} />
      <Route path="resources" element={<StaticPage title="Resources" />} />
    </Route>,
  ),
)

export default router
