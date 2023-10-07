import {
  Button,
  Card,
  FloatingLabel,
  FormControl,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
} from 'react-bootstrap'
import icon from '../images/icon.svg'
import BasicPage from 'src/components/BasicPage'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ApiPasswordResets } from 'src/api'
import toast from 'react-hot-toast'
import { ErrorMessage } from '@hookform/error-message'

interface IPasswordResetsFormState {
  newPassword: string
  newPasswordConfirm: string
}

export default function PasswordResets() {
  const { token } = useParams()
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    watch,
    getFieldState,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    mode: 'onTouched',
    defaultValues: {
      newPassword: '',
      newPasswordConfirm: '',
    },
  })

  useEffect(() => {
    async function validateToken() {
      const isValid = await ApiPasswordResets.get(token || '')
      if (!isValid) {
        toast.error('Password reset has expired, please try again', {
          id: 'invalid-pw-reset-token',
        })
        navigate('/', { replace: true })
      }
    }
    validateToken()
  }, [token, navigate])

  function validationProps(fieldName: 'newPassword' | 'newPasswordConfirm'): {
    isValid: boolean
    isInvalid: boolean
  } {
    const { isTouched, invalid, error } = getFieldState(fieldName)

    return {
      isValid: isTouched && !invalid,
      isInvalid: isTouched && !!error,
    }
  }

  const onSubmit = async ({
    newPassword,
    newPasswordConfirm,
  }: IPasswordResetsFormState) => {
    if (token === undefined) throw new Error('Invalid request')

    const result = await ApiPasswordResets.update({
      newPassword,
      newPasswordConfirm,
      token,
    })
    if (result) {
      setSuccess(true)
    } else {
      toast.error('Password change failed, please try again.')
      navigate('/', { replace: true })
    }
  }

  return (
    <div className="w-100 d-flex flex-column py-5 align-items-center vh-100 bg-light justify-content-center">
      <Card body>
        <BasicPage icon={icon} title="New password">
          <form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup className="mb-3">
              <FloatingLabel label="New Password">
                <FormControl
                  type="password"
                  placeholder="SecurePassword123"
                  {...validationProps('newPassword')}
                  autoComplete="false"
                  {...register('newPassword', {
                    required: 'Password is required',
                    minLength: {
                      value: 8,
                      message: 'Password must be at least 8 characters long',
                    },
                  })}
                />
                <FormControl.Feedback type="invalid">
                  <ErrorMessage errors={errors} name="newPassword" />
                </FormControl.Feedback>
              </FloatingLabel>
            </FormGroup>
            <FloatingLabel label="Confirm New Password" className="mb-3">
              <FormControl
                type="password"
                placeholder="SecurePassword12334"
                autoComplete="false"
                {...validationProps('newPasswordConfirm')}
                {...register('newPasswordConfirm', {
                  required: 'Password confirmation is required',
                  validate: (value) =>
                    value === watch('newPassword') || 'Passwords do not match',
                })}
              />
              <FormControl.Feedback type="invalid">
                <ErrorMessage errors={errors} name="newPasswordConfirm" />
              </FormControl.Feedback>
            </FloatingLabel>
            <div className="d-flex flex-row justify-content-between">
              <Link className="col btn btn-tertiary btn-lg me-3" to="/">
                Cancel
              </Link>
              <Button type="submit" size="lg" disabled={isDirty && !isValid}>
                Update password
              </Button>
            </div>
          </form>
        </BasicPage>
      </Card>
      <Modal show={success} centered>
        <ModalBody className="py-5 text-center">
          <i className="bi bi-check-circle text-success fs-1" />
          <h3 className="text-center">Password change successful</h3>
        </ModalBody>
        <ModalFooter className="border-0">
          <Link
            className="col btn btn-primary btn-lg me-3"
            to="/"
            replace={true}
          >
            Please sign in
          </Link>
        </ModalFooter>
      </Modal>
    </div>
  )
}
