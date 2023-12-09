import { useTranslation } from 'react-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../Input'
import emailRegex from 'src/util/emailRegex'
import { useEffect } from 'react'
import { kebabCase } from 'lodash'
import AsyncButton from '../AsyncButton'

export interface IUserFormState {
  email: string
  password: string
}

interface IUserForm {
  title: string
  submitLabel: string
  onSubmit: SubmitHandler<IUserFormState>
  isActive: boolean
}

export default function UserForm({
  title,
  isActive,
  submitLabel = 'Submit',
  onSubmit,
}: IUserForm) {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<IUserFormState>({
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  })

  useEffect(() => {
    if (!isActive) {
      unregister(['email', 'password'])
      reset({
        email: '',
        password: '',
      })
    }
  }, [isActive, unregister, reset])

  const passwordErrors = errors?.password?.message
  const emailErrors = errors?.email?.message

  return (
    <div className="d-block p-1">
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
        <Input
          controlId={`${kebabCase(title)}-email`}
          error={emailErrors}
          isInvalid={!!emailErrors}
          label={t('account.create.email')}
          type="email"
          {...register('email', {
            required: true,
            pattern: {
              value: emailRegex,
              message: t('account.create.emailMessage'),
            },
          })}
          placeholder={t('account.create.emailPlaceholder')}
        />
        <Input
          controlId={`${kebabCase(title)}-password`}
          error={passwordErrors}
          isInvalid={!!passwordErrors}
          label={t('account.create.password')}
          type="password"
          {...register('password', {
            required: true,
            minLength: {
              value: 8,
              message: t('account.create.passwordMessage'),
            },
          })}
        />
        {
          <AsyncButton
            loading={isSubmitting}
            size="lg"
            className="w-100"
            variant="primary"
            disabled={!errors}
            type="submit"
          >
            {submitLabel}
          </AsyncButton>
        }
      </form>
    </div>
  )
}
