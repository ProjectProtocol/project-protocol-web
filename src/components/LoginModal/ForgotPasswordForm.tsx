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
    <div className="d-block p-4">
      <div className="text-center text-wrap mb-3">
        {t('account.loginModal.forgotPasswordTitleHelper')}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="vertical-rhythm">
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
        {t('account.loginModal.loginHelper')}
        <a
          key={uniqueId()}
          className="link text-black m-1"
          role="button"
          onClick={() => setPage(LOGIN_PAGES.SIGN_UP)}
        >
          {t('account.signUp')}
        </a>
      </form>
    </div>
  )
}
