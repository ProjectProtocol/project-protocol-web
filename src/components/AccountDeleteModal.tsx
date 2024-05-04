import { Button, ModalProps, Spinner } from 'react-bootstrap'
import PopUp from './PopUp'
import { useForm } from 'react-hook-form'
import Input from './Input'
import AsyncButton from './AsyncButton'
import { useTranslate } from '@tolgee/react'

interface IAccountDeleteModal extends ModalProps {}

export default function AccountDeleteModal({
  onSubmit,
  ...modalProps
}: IAccountDeleteModal) {
  const { t } = useTranslate(['account', 'shared'])
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: 'onSubmit', defaultValues: { password: '' } })

  const passwordErrors = errors?.password?.message

  return (
    <PopUp closeButton title={t('delete.title')} {...modalProps}>
      <div>
        <p>{t('delete.confirmMessage')}</p>
      </div>
      <div>
        <p>{t('delete.enterPassword')}</p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <Input
              type="password"
              label={t('delete.password')}
              autoFocus
              error={passwordErrors}
              isInvalid={!!passwordErrors}
              {...register('password', {
                required: true,
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
                <Button variant="dark" onClick={modalProps.onHide}>
                  {t('cancel', { ns: 'shared' })}
                </Button>
                <AsyncButton
                  loading={isSubmitting}
                  variant="danger"
                  type="submit"
                  disabled={!errors}
                >
                  {t('delete.submit')}
                </AsyncButton>
              </div>
            )}
          </div>
        </form>
      </div>
    </PopUp>
  )
}
