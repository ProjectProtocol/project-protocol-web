import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../Input'
import emailRegex from 'src/util/emailRegex'
import { useEffect } from 'react'
import { kebabCase, uniqueId } from 'lodash-es'
import AsyncButton from '../AsyncButton'
import { LOGIN_PAGES } from './constants'
import { useTranslate } from '@tolgee/react'

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
  const { t } = useTranslate(['login', 'shared'])

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
      <div className="text-center text-wrap mb-3">{t('signupTitleHelper')}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
        <Input
          size="lg"
          controlId={`${kebabCase(title)}-email`}
          error={emailErrors}
          isInvalid={!!emailErrors}
          label={t('email')}
          type="email"
          {...register('email', {
            required: true,
            pattern: {
              value: emailRegex,
              message: t('emailMessage'),
            },
          })}
          placeholder={t('emailPlaceholder')}
        />
        <Input
          size="lg"
          controlId={`${kebabCase(title)}-password`}
          error={passwordErrors}
          isInvalid={!!passwordErrors}
          label={t('password')}
          type="password"
          {...register('password', {
            required: true,
            minLength: {
              value: 8,
              message: t('passwordLengthError', { ns: 'shared' }),
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
            {t('signupHelper')}
            <a
              key={uniqueId()}
              className="link ms-1"
              role="button"
              onClick={() => setPage(LOGIN_PAGES.SIGN_IN)}
            >
              {t('login')}
            </a>
          </div>
        </div>
      </form>
    </div>
  )
}
