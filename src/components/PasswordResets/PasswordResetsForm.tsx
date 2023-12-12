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
    <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm px-2">
      <Input
        label={t('resetPassword.newPassword.label')}
        type="password"
        {...validationProps('newPassword')}
        {...register('newPassword', {
          required: t('resetPassword.newPassword.required'),
          minLength: {
            value: 8,
            message: t('resetPassword.newPassword.message'),
          },
        })}
      />
      <Input
        label={t('resetPassword.newPasswordConfirm.label')}
        type="password"
        {...validationProps('newPasswordConfirm')}
        {...register('newPasswordConfirm', {
          required: t('resetPassword.newPasswordConfirm.required'),
          validate: (value) =>
            value === watch('newPassword') ||
            t('resetPassword.newPasswordConfirm.validate'),
        })}
      />
      <div className="d-flex flex-row justify-content-between">
        <Link className="col btn btn-dark btn-lg me-3" to="/">
          {t('resetPassword.cancel')}
        </Link>
        <Button type="submit" size="lg" disabled={false}>
          t('resetPassword.update')
        </Button>
      </div>
    </form>
  )
}
