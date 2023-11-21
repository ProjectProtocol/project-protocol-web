import { useTranslation } from 'react-i18next'
import { Button, ModalProps, Spinner } from 'react-bootstrap'
import PopUp from './PopUp'
import { useForm } from 'react-hook-form'
import Input from './Input'

interface IAccountDeleteModal extends ModalProps {}

export default function AccountDeleteModal({
  onSubmit,
  ...modalProps
}: IAccountDeleteModal) {
  const { t } = useTranslation()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onSubmit', defaultValues: { password: '' } })

  const passwordErrors = errors?.password?.message

  return (
    <PopUp closeButton title={t('account.delete.title')} {...modalProps}>
      <div>
        <p>{t('account.delete.confirmMessage')}</p>
      </div>
      <div>
        <p>{t('ccount.delete.enterPassword')}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              type="password"
              label={t('account.delete.form.password')}
              autoFocus
              error={passwordErrors}
              isInvalid={!!passwordErrors}
              {...register('password', {
                required: true,
                minLength: {
                  value: 8,
                  message: t('account.delete.form.passwordMessage'),
                },
              })}
            />
          </div>
          <div>
            {isSubmitting ? (
              <div className="d-flex justify-content-center align-items-center">
                <Spinner
                  role="status"
                  animation="border"
                  variant="black"
                  className="mt-2"
                />
              </div>
            ) : (
              <div className="d-flex flex-row justify-content-between mt-4">
                <Button variant="tertiary" onClick={modalProps.onHide}>
                  {t('account.delete.form.cancel')}
                </Button>
                <Button
                  variant="danger"
                  type="submit"
                  disabled={!errors || isSubmitting}
                >
                  {t('account.delete.form.submit')}
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
    </PopUp>
  )
}
