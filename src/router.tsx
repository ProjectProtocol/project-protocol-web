import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.tsx'
import Search from './pages/Search.tsx'
import searchLoader from './loaders/searchLoader.ts'
import agentLoader from './loaders/agentLoader.ts'
import Agent from './pages/AgentView.tsx'
import OfficeView from './pages/OfficeView.tsx'
import officeLoader from './loaders/officeLoader.ts'
import AgentNew from './pages/AgentNew.tsx'
import About from './pages/About.tsx'
import EthicalPrinciples from './pages/EthicalPrinciples.tsx'
import ContactUs from './pages/ContactUs.tsx'
import Resources from './pages/Resources.tsx'
import HowDoesItWork from './pages/HowDoesItWork.tsx'
import TermsOfService from './pages/TermsOfService.tsx'
import Home from './pages/Home.tsx'
import Confirmation from './pages/Confirmation.tsx'
import AccountLayout from './pages/Account/AccountLayout.tsx'
import AccountView from './pages/Account/AccountView.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="confirmations/:token" element={<Confirmation />} />
      <Route path="/" element={<Home />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<Search />} loader={searchLoader} />
          <Route
            path="agents/:agentId"
            element={<Agent />}
            loader={agentLoader}
          />
          <Route path="agents/new" element={<AgentNew />} />
          <Route
            path="offices/:officeId"
            element={<OfficeView />}
            loader={officeLoader}
          />
          <Route path="account" element={<AccountLayout />}>
            <Route index element={<AccountView />} />
          </Route>
          <Route path="about" element={<About />} />
          <Route path="how-does-it-work" element={<HowDoesItWork />} />
          <Route path="ethical-principles" element={<EthicalPrinciples />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route path="resources" element={<Resources />} />
        </Route>
      </Route>
      ,
    </>,
  ),
)

export default router
