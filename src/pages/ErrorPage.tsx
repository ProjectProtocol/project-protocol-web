import { Link, useRouteError } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import BasicPage from 'src/components/BasicPage'
import icon from '../images/icon.svg'
import { useRollbar } from '@rollbar/react'
import { useEffect } from 'react'

type ErrorResponse = {
  statusText?: string
  message?: string
  data: string
  status: number
}

export default function ErrorPage() {
  const error = useRouteError() as ErrorResponse
  const { t } = useTranslation()
  const isErrorResponse = 'status' in error

  const rollbar = useRollbar()

  useEffect(() => {
    let ignore = false

    if (!ignore && !isErrorResponse) {
      rollbar.error('Uncaught error', error)
    }

    return () => {
      ignore = true
    }
  }, [isErrorResponse, error, rollbar])

  const text = isErrorResponse
    ? error?.data || error?.message
    : t('genericError')

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
