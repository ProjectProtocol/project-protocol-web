import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import PopUp from '../PopUp'

export default function SuccessModal({ show }: { show: boolean }) {
  const { t } = useTranslation()

  return (
    <PopUp show={show}>
      <div className="text-center">
        <h3 className="text-center">
          {t('account.resetPassword.modal.heading')}
        </h3>
        <div className="py-4">
          <i className="bi bi-check-circle text-success fs-1" />
          <p>{t('account.resetPassword.modal.message')}</p>
        </div>

        <div className="d-flex">
          <Link className="col btn btn-primary btn-lg" to="/" replace={true}>
            {t('account.resetPassword.modal.accept')}
          </Link>
        </div>
      </div>
    </PopUp>
  )
}
