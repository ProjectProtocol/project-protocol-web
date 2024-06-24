import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Spinner } from 'react-bootstrap'
import emailRegex from 'src/util/emailRegex'
import Input from '../Input'
import { uniqueId } from 'lodash-es'
import { LOGIN_PAGES } from './constants'
import { useTranslate } from '@tolgee/react'

export interface IForgotPasswordFormState {
  buttonText: string
  email: string
}

interface IForgotPasswordForm {
  onSubmit: SubmitHandler<IForgotPasswordFormState>
  setPage: (n: number) => void
}

export default function ForgotPasswordForm({
  onSubmit,
  setPage,
}: IForgotPasswordForm) {
  const { t } = useTranslate('login')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = useForm<IForgotPasswordFormState>({
    defaultValues: {
      email: '',
    },
  })

  const fieldError = errors?.email?.message

  return (
    <div className="d-block">
      <div className="text-center text-wrap mb-3">
        {t('forgotPasswordTitleHelper')}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
        <Input
          type="email"
          label={t('email')}
          isInvalid={!!fieldError}
          isValid={isDirty && isValid}
          error={fieldError}
          {...register('email', {
            required: t('emailRequired'),
            pattern: emailRegex,
          })}
          placeholder={t('emailPlaceholder')}
        />
        <Button
          size="lg"
          className="w-100"
          variant="primary"
          disabled={isSubmitting}
          type="submit"
        >
          {isSubmitting ? (
            <>
              <Spinner
                size="sm"
                role="status"
                animation="border"
                variant="black"
                className="me-2"
              />
            </>
          ) : (
            t('resetPassword.submit')
          )}
        </Button>
        {t('loginHelper')}
        <a
          key={uniqueId()}
          className="link m-1"
          role="button"
          onClick={() => setPage(LOGIN_PAGES.SIGN_UP)}
        >
          {t('signup')}
        </a>
      </form>
    </div>
  )
}
