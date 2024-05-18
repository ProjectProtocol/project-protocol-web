import PopUp from './PopUp'
import { Button, ModalProps, Spinner } from 'react-bootstrap'
import { useForm } from 'react-hook-form'
import Input from './Input'
import { useTranslate } from '@tolgee/react'

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
  const { t } = useTranslate(['account', 'password_reset', 'shared'])

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
      title={t('changePassword.title')}
      {...modalProps}
      onHide={handleClose}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
        <p>{t('changePassword.intro')}</p>
        <Input
          label={t('changePassword.currentPassword')}
          type="password"
          {...validationProps('password')}
          {...register('password', {
            required: t('requiredField', {
              ns: 'shared',
              field: t('changePassword.currentPassword'),
            }),
          })}
        />
        <hr />
        <p>{t('modal.intro', { ns: 'password_reset' })}</p>
        <Input
          label={t('changePassword.newPassword')}
          type="password"
          {...validationProps('newPassword')}
          {...register('newPassword', {
            required: t('requiredField', {
              ns: 'shared',
              field: t('changePassword.newPassword'),
            }),
            minLength: {
              value: 8,
              message: t('passwordLengthError', { ns: 'shared' }),
            },
          })}
        />
        <Input
          label={t('changePassword.newPasswordConfirm')}
          type="password"
          {...validationProps('newPasswordConfirm')}
          {...register('newPasswordConfirm', {
            required: t('requiredField', {
              ns: 'shared',
              field: t('changePassword.newPasswordConfirm'),
            }),
            validate: (value) =>
              value === watch('newPassword') ||
              t('newPasswordConfirmMismatch', {
                ns: 'password_reset',
              }),
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
              t('changePassword.action')
            )}
          </Button>
        </div>
      </form>
    </PopUp>
  )
}
