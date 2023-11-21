import { Link, useRouteError } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BasicPage from 'src/components/BasicPage'
import icon from '../images/icon.svg'

type RoutingError = {
  statusText?: string
  message?: string
}

export default function ErrorPage() {
  const error = useRouteError() as RoutingError
  const { t } = useTranslation()

  const text = error?.statusText || error?.message || t('error.generic')

  return (
    <div className="vh-100 d-flex flex-column align-items-center">
      <div className="text-center" style={{ marginTop: '33%' }}>
        <BasicPage title={t('error.pageTitle')} icon={icon}>
          <p>{text}</p>
          <p>
            <Link to="/" replace={true}>
              {t('error.homeLink')}
            </Link>
          </p>
        </BasicPage>
      </div>
    </div>
  )
}
