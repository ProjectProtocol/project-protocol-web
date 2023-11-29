import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { Translation } from 'react-i18next'
import ErrorPage from './pages/ErrorPage.tsx'
import Search from './pages/Search.tsx'
import searchLoader from './loaders/searchLoader.ts'
import agentLoader from './loaders/agentLoader.ts'
import Agent from './pages/AgentView.tsx'
import OfficeView from './pages/OfficeView.tsx'
import officeLoader from './loaders/officeLoader.ts'
import AgentNew from './pages/AgentNew.tsx'
import ContactUs from './pages/ContactUs.tsx'
import Resources from './pages/Resources.tsx'
import TermsOfService from './pages/TermsOfService.tsx'
import Home from './pages/Home.tsx'
import Confirmation from './pages/Confirmation.tsx'
import createStaticPageLoader from './loaders/staticPageLoader.ts'
import Account from './pages/Account.tsx'
import PasswordResets from './pages/PasswordResets.tsx'
import ContentfulPage from './components/ContentfulPage.tsx'
import icon from './images/icon.svg'
import help from './images/help.svg'
import resourcesLoader from './loaders/resourcesLoader.ts'
import Vote from './pages/Vote.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="confirmations/:token" element={<Confirmation />} />
      <Route path="password_resets/:token" element={<PasswordResets />} />
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
          <Route path="account" element={<Account />} />
          <Route
            path="about"
            element={
              <Translation>
                {(t) => <ContentfulPage title={t('pages.about')} icon={icon} />}
              </Translation>
            }
            loader={createStaticPageLoader('ABOUT_US')}
          />
          <Route
            path="how-does-it-work"
            element={
              <Translation>
                {(t) => (
                  <ContentfulPage
                    title={t('pages.howDoesItWork')}
                    icon={help}
                  />
                )}
              </Translation>
            }
            loader={createStaticPageLoader('HOW_DOES_IT_WORK')}
          />
          <Route
            path="ethical-principles"
            element={
              <Translation>
                {(t) => (
                  <ContentfulPage
                    title={t('pages.ethicalPrinciples')}
                    icon={icon}
                  />
                )}
              </Translation>
            }
            loader={createStaticPageLoader('ETHICAL_PRINCIPLES')}
          />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="contact-us" element={<ContactUs />} />
          <Route
            path="vote"
            element={<Vote />}
            loader={createStaticPageLoader('VOTING_RIGHTS')}
          />
          <Route
            path="resources"
            element={<Resources />}
            loader={resourcesLoader}
          />
        </Route>
      </Route>
    </>,
  ),
)

export default router
