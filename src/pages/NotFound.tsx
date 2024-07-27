import { useTranslate } from '@tolgee/react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  const { t } = useTranslate(['home'])
  return (
    <div className="vh-100 d-flex flex-column align-items-center justify-content-center">
      <div style={{ marginBottom: '200px' }}>
        <h1>{t('error.notFound')}</h1>
        <p className="large">{t('error.notFoundMessage')}</p>
        <Link to="/" replace={true} className="btn btn-primary">
          {t('error.homeLink')}
        </Link>
      </div>
    </div>
  )
}
