import { useTranslation } from 'react-i18next'
import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../Input'
import emailRegex from 'src/util/emailRegex'
import { useEffect } from 'react'
import { kebabCase, uniqueId } from 'lodash-es'
import AsyncButton from '../AsyncButton'
import { LOGIN_PAGES } from './constants'

export interface ILoginFormState {
  email: string
  password: string
}

interface ILoginForm {
  title: string
  submitLabel: string
  onSubmit: SubmitHandler<ILoginFormState>
  isActive: boolean
  setPage: (n: number) => void
}

export default function LoginForm({
  title,
  isActive,
  submitLabel = 'Submit',
  onSubmit,
  setPage,
}: ILoginForm) {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    unregister,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ILoginFormState>({
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
      <div className="text-center mb-3">
        {t('account.loginModal.loginTitleHelper')}
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
        <div>
          <Input
            size="lg"
            controlId={`${kebabCase(title)}-password`}
            error={passwordErrors}
            isInvalid={!!passwordErrors}
            label={t('account.create.password')}
            className="mb-2"
            type="password"
            {...register('password', {
              required: true,
              minLength: {
                value: 8,
                message: t('account.create.passwordMessage'),
              },
            })}
          />
          <a
            key={uniqueId()}
            className="link"
            role="button"
            onClick={() => setPage(LOGIN_PAGES.FORGOT_PASSWORD)}
          >
            {t('account.forgotPassword')}
          </a>
        </div>
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
        <div className="text-center">
          {t('account.loginModal.loginHelper')}
          <a
            key={uniqueId()}
            className="link ms-1"
            role="button"
            onClick={() => setPage(LOGIN_PAGES.SIGN_UP)}
          >
            {t('account.signUp')}
          </a>
        </div>
      </form>
    </div>
  )
}
