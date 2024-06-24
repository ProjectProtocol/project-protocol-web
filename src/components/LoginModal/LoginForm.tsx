import { SubmitHandler, useForm } from 'react-hook-form'
import Input from '../Input'
import emailRegex from 'src/util/emailRegex'
import { useEffect } from 'react'
import { kebabCase, uniqueId } from 'lodash-es'
import AsyncButton from '../AsyncButton'
import { LOGIN_PAGES } from './constants'
import { useTranslate } from '@tolgee/react'

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
  const { t } = useTranslate(['login', 'shared'])

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
      <div className="text-center mb-3">{t('loginTitleHelper')}</div>
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
        <Input
          size="lg"
          controlId={`${kebabCase(title)}-email`}
          error={emailErrors}
          isInvalid={!!emailErrors}
          label={t('email')}
          type="email"
          {...register('email', {
            required: t('emailRequired'),
            pattern: {
              value: emailRegex,
              message: t('emailMessage'),
            },
          })}
          placeholder={t('emailPlaceholder')}
        />
        <div>
          <Input
            size="lg"
            controlId={`${kebabCase(title)}-password`}
            error={passwordErrors}
            isInvalid={!!passwordErrors}
            label={t('password')}
            className="mb-2"
            type="password"
            {...register('password', {
              required: t('passwordRequired'),
              minLength: {
                value: 8,
                message: t('passwordLengthError', { ns: 'shared' }),
              },
            })}
          />
          <a
            key={uniqueId()}
            className="link"
            role="button"
            onClick={() => setPage(LOGIN_PAGES.FORGOT_PASSWORD)}
          >
            {t('forgotPassword')}
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
          {t('loginHelper')}
          <a
            key={uniqueId()}
            className="link ms-1"
            role="button"
            onClick={() => setPage(LOGIN_PAGES.SIGN_UP)}
          >
            {t('signup')}
          </a>
        </div>
      </form>
    </div>
  )
}
