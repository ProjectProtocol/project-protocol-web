import { useTranslation } from 'react-i18next'
import PopUp from './PopUp'
import { Button, ModalProps, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Input from './Input'

interface IChangePasswordModal extends ModalProps {}

export interface IChangePasswordModalFormState {
  password: string
  newPassword: string
  newPasswordConfirm: string
}

export default function ChangePasswordModal({
  onSubmit,
  onHide,
  ...modalProps
}: IChangePasswordModal) {
  const { t } = useTranslation()

  const {
    register,
    watch,
    getFieldState,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      password: '',
      newPassword: '',
      newPasswordConfirm: '',
    },
  })

  const handleClose = () => {
    onHide && onHide()
    reset()
  }

  function validationProps(fieldName: keyof IChangePasswordModalFormState) {
    const { error } = getFieldState(fieldName)
    return {
      isInvalid: !!error?.message,
      error: error?.message,
    }
  }

  return (
    <PopUp
      closeButton
      title={t('account.resetPassword.modal.title')}
      {...modalProps}
      onHide={handleClose}
    >
      <div>
        <p>{t('account.resetPassword.modal.intro')}</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
        <Input
          label={t('account.resetPassword.modal.currentPassword')}
          type="password"
          {...validationProps('password')}
          {...register('password', {
            required: t('account.resetPassword.modal.currentPasswordRequired'),
            minLength: {
              value: 8,
              message: t(
                'account.resetPassword.modal.currentPasswordRequiredMessage',
              ),
            },
          })}
        />
        <hr />
        <Input
          label={t('account.resetPassword.modal.newPassword')}
          type="password"
          {...validationProps('newPassword')}
          {...register('newPassword', {
            required: t('account.resetPassword.modal.newPasswordRequired'),
            minLength: {
              value: 8,
              message: t(
                'account.resetPassword.modal.newPasswordRequiredMessage',
              ),
            },
          })}
        />
        <Input
          label={t('account.resetPassword.newPasswordConfirm.label')}
          type="password"
          {...validationProps('newPasswordConfirm')}
          {...register('newPasswordConfirm', {
            required: t('account.resetPassword.newPasswordConfirm.required'),
            validate: (value) =>
              value === watch('newPassword') ||
              t('account.resetPassword.newPasswordConfirm.validate'),
          })}
        />
        <div className="d-flex flex-row justify-content-between">
          <Button
            size="lg"
            variant="primary"
            type="submit"
            disabled={!errors || isSubmitting}
            className="w-100"
          >
            {isSubmitting ? (
              <>
                <Spinner
                  size="sm"
                  role="status"
                  animation="border"
                  variant="black"
                  className="mt-2"
                />
              </>
            ) : (
              t('account.resetPassword.modal.submit')
            )}
          </Button>
        </div>
      </form>
    </PopUp>
  )
}
