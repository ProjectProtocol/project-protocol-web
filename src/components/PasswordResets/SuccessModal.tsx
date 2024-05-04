import { Link } from 'react-router-dom'
import PopUp from '../PopUp'
import { useTranslate } from '@tolgee/react'

export default function SuccessModal({ show }: { show: boolean }) {
  const { t } = useTranslate('account')

  return (
    <PopUp show={show}>
      <div className="text-center">
        <h3 className="text-center">{t('resetPassword.success.heading')}</h3>
        <div className="py-4">
          <i className="bi bi-check-circle text-success fs-1" />
          <p>{t('resetPassword.success.message')}</p>
        </div>

        <div className="d-flex">
          <Link className="col btn btn-primary btn-lg" to="/" replace={true}>
            {t('ok', { ns: 'shared' })}
          </Link>
        </div>
      </div>
    </PopUp>
  )
}
