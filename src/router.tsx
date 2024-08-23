import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import ErrorPage from './pages/ErrorPage.tsx'
import Search from './pages/Search.tsx'
import agentLoader from './loaders/agentLoader.ts'
import Agent from './pages/AgentView.tsx'
import OfficeView from './pages/OfficeView.tsx'
import officeLoader from './loaders/officeLoader.ts'
import AgentNew from './pages/AgentNew.tsx'
import ContactUs from './pages/ContactUs.tsx'
import Resources from './pages/Resources.tsx'
import Home from './pages/Home.tsx'
import Confirmation from './pages/Confirmation.tsx'
import createStaticPageLoader from './loaders/staticPageLoader.ts'
import Account from './pages/Account.tsx'
import PasswordResets from './pages/PasswordResets.tsx'
import ContentfulPage from './components/ContentfulPage.tsx'
import icon from './images/icon.svg'
import help from './images/help.svg'
import Vote from './pages/Vote.tsx'
import LandingPage from './pages/LandingPage.tsx'
import ResourceView from './pages/ResourceView.tsx'
import resourceLoader from './loaders/resourceLoader.ts'
import { T } from '@tolgee/react'
import NotFound from './pages/NotFound.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="auth/confirmations/:token" element={<Confirmation />} />
      <Route path="auth/password_resets/:token" element={<PasswordResets />} />
      <Route path="/" element={<Home />} errorElement={<ErrorPage />}>
        <Route errorElement={<ErrorPage />}>
          <Route index element={<LandingPage />} />
          <Route path="rate-my-po" element={<Search />} />
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
          <Route
            path="resources/:resourceId"
            element={<ResourceView />}
            loader={resourceLoader}
          />

          <Route path="account" element={<Account />} />
          <Route
            path="about"
            element={
              <ContentfulPage
                title={<T keyName="about" ns="navigation" />}
                icon={icon}
              />
            }
            loader={createStaticPageLoader('ABOUT_US')}
          />
          <Route
            path="how-does-it-work"
            element={
              <ContentfulPage
                title={<T keyName="howDoesItWork" ns="navigation" />}
                icon={help}
              />
            }
            loader={createStaticPageLoader('HOW_DOES_IT_WORK')}
          />
          <Route
            path="ethical-principles"
            element={
              <ContentfulPage
                title={<T keyName="ethicalPrinciples" ns="navigation" />}
                icon={help}
              />
            }
            loader={createStaticPageLoader('ETHICAL_PRINCIPLES')}
          />
          <Route
            path="terms-of-service"
            element={
              <ContentfulPage
                title={<T keyName="termsOfService" ns="navigation" />}
                icon={help}
              />
            }
            loader={createStaticPageLoader('TERMS_OF_SERVICE')}
          />
          <Route path="contact-us" element={<ContactUs />} />
          <Route
            path="vote"
            element={<Vote />}
            loader={createStaticPageLoader('VOTING_RIGHTS')}
          />
          <Route path="resources" element={<Resources />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Route>
    </>,
  ),
)

export default router
