import { Button } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import Input from '../Input'

interface IPasswordResetsFormState {
  newPassword: string
  newPasswordConfirm: string
}

interface IPasswordResetsForm {
  onSubmit: SubmitHandler<IPasswordResetsFormState>
}
export default function PasswordResetsForm({ onSubmit }: IPasswordResetsForm) {
  const { t } = useTranslation()
  const { register, watch, getFieldState, handleSubmit } = useForm({
    mode: 'onSubmit',
    defaultValues: {
      newPassword: '',
      newPasswordConfirm: '',
    },
  })

  function validationProps(fieldName: keyof IPasswordResetsFormState) {
    const { error } = getFieldState(fieldName)
    return {
      isInvalid: !!error?.message,
      error: error?.message,
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
      <Input
        label={t('account.resetPassword.newPassword.label')}
        type="password"
        {...validationProps('newPassword')}
        {...register('newPassword', {
          required: t('account.resetPassword.newPassword.required'),
          minLength: {
            value: 8,
            message: t('account.resetPassword.newPassword.message'),
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
      <div className="text-end">
        <Link className="btn btn-dark me-3" to="/">
          {t('ui.cancel')}
        </Link>
        <Button type="submit" disabled={false}>
          {t('ui.submit')}
        </Button>
      </div>
    </form>
  )
}
