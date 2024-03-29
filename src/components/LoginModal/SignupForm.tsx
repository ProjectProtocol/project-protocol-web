import { useTranslation } from 'react-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../Input'
import emailRegex from 'src/util/emailRegex'
import { useEffect } from 'react'
import { kebabCase, uniqueId } from 'lodash-es'
import AsyncButton from '../AsyncButton'
import { LOGIN_PAGES } from './constants'

export interface ISignupFormState {
  email: string
  password: string
}

interface ISignupForm {
  title: string
  submitLabel: string
  onSubmit: SubmitHandler<ISignupFormState>
  isActive: boolean
  setPage: (n: number) => void
}

export default function SignupForm({
  title,
  isActive,
  submitLabel = 'Submit',
  onSubmit,
  setPage,
}: ISignupForm) {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ISignupFormState>({
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
    <div className="d-block p-4">
      <div className="text-center text-wrap mb-3">
        {t('account.loginModal.signupTitleHelper')}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
        <Input
          size="lg"
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
          size="lg"
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
        <div>
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
          <div className="mt-3 text-center">
            {t('account.loginModal.signupHelper')}
            <a
              key={uniqueId()}
              className="link ms-1"
              role="button"
              onClick={() => setPage(LOGIN_PAGES.SIGN_IN)}
            >
              {t('account.login.login')}
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}
