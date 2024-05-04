import { Link } from 'react-router-dom'
import PopUp from '../PopUp'
import { useTranslate } from '@tolgee/react'

export default function SuccessModal({ show }: { show: boolean }) {
  const { t } = useTranslate(['account', 'shared'])

  return (
    <PopUp show={show}>
      <div className="text-center">
        <h3 className="text-center">{t('changePassword.success.heading')}</h3>
        <div className="py-4">
          <i className="bi bi-check-circle text-success fs-1" />
          <p>{t('changePassword.success.message')}</p>
        </div>

        <div className="d-flex">
          <Link className="col btn btn-primary btn-lg" to="/" replace={true}>
            {t('OK', { ns: 'shared' })}
          </Link>
        </div>
      </div>
    </PopUp>
  )
}
