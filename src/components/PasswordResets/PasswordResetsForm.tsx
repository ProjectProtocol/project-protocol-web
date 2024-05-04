import { Button } from 'react-bootstrap'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Input from '../Input'
import { useTranslate } from '@tolgee/react'

interface IPasswordResetsFormState {
  newPassword: string
  newPasswordConfirm: string
}

interface IPasswordResetsForm {
  onSubmit: SubmitHandler<IPasswordResetsFormState>
}
export default function PasswordResetsForm({ onSubmit }: IPasswordResetsForm) {
  const { t } = useTranslate(['password_reset', 'shared'])
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
        label={t('newPassword')}
        type="password"
        {...validationProps('newPassword')}
        {...register('newPassword', {
          required: t('required', {
            ns: 'shared',
            field: t('newPassword'),
          }),
          minLength: {
            value: 8,
            message: t('passwordLengthError', { ns: 'shared' }),
          },
        })}
      />
      <Input
        label={t('newPasswordConfirm')}
        type="password"
        {...validationProps('newPasswordConfirm')}
        {...register('newPasswordConfirm', {
          required: t('required', {
            ns: 'shared',
            field: t('newPasswordConfirm'),
          }),
          validate: (value) =>
            value === watch('newPassword') || t('newPasswordConfirmMismatch'),
        })}
      />
      <div className="text-end">
        <Link className="btn btn-dark me-3" to="/">
          {t('cancel', { ns: 'shared' })}
        </Link>
        <Button type="submit" disabled={false}>
          {t('submit', { ns: 'shared' })}
        </Button>
      </div>
    </form>
  )
}
