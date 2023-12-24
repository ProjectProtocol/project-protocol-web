import { SubmitHandler, useForm } from 'react-hook-form'
import { Button, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'
import emailRegex from 'src/util/emailRegex'
import Input from '../Input'
import { uniqueId } from 'lodash'
import { LOGIN_PAGES } from './constants'

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
  const { t } = useTranslation()

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
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm p-4">
        <Input
          type="email"
          label={t('account.resetPassword.emailLabel')}
          isInvalid={!!fieldError}
          isValid={isDirty && isValid}
          error={fieldError}
          {...register('email', {
            required: true,
            pattern: emailRegex,
          })}
          placeholder={t('account.resetPassword.emailPlaceholder')}
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
            t('account.resetPassword.submit')
          )}
        </Button>
      </form>
      <div className="text-center mb-5">
        Don't have an account?
        <a
          key={uniqueId()}
          className="link text-black m-1"
          role="button"
          onClick={() => setPage(LOGIN_PAGES.SIGN_UP)}
        >
          {t('account.signUp')}
        </a>
      </div>
      <div className="d-flex justify-content-center">
        <a href="/terms-of-service" className="link text-black">
          Read our terms of service
        </a>
      </div>
    </div>
  )
}
