import { render, fireEvent } from '@testing-library/react'
import RateAgentButton, {
  IRateAgentButton,
} from 'src/components/Agent/RateAgentButton'
import { LOGIN_PAGES } from 'src/components/LoginModal/constants'
import User from 'src/types/User'
import toast from 'react-hot-toast'

// Mocking the react-hot-toast module
vi.mock('react-hot-toast', () => ({ default: vi.fn() }))

describe('RateAgentButton button behavior', () => {
  const mockShowRatingModal = vi.fn()
  const mockShowConfirmationModal = vi.fn()
  const mockOpenLogin = vi.fn()
  const mockRevalidate = vi.fn()

  const mockUser = {
    isConfirmed: true,
  } as User

  const mockUnconfirmedUser = {
    isConfirmed: false,
  } as User

  const defaultProps = {
    user: mockUser,
    showRatingModal: mockShowRatingModal,
    showConfirmationModal: mockShowConfirmationModal,
    openLogin: mockOpenLogin,
    isLoading: false,
    revalidate: mockRevalidate,
    isRateable: true,
  }

  const renderButton = (props: IRateAgentButton = defaultProps) =>
    render(<RateAgentButton {...props} />)

  it("shows 'Rate agent' when user is signed in", () => {
    const { getByText } = renderButton()

    expect(getByText('rateAgent')).toBeTruthy()
  })

  it("shows 'Sign up to rate' when user is not signed in", () => {
    const { getByText } = renderButton({ ...defaultProps, user: undefined })

    expect(getByText('signUp')).toBeTruthy()
  })

  it("shows 'Sign up to rate' and 'log in' link when user is not signed in", () => {
    const { getByText } = renderButton({ ...defaultProps, user: undefined })

    expect(getByText('signUp')).toBeTruthy()
    expect(getByText('logIn')).toBeTruthy()
  })

  it('calls showRatingModal when user is confirmed', async () => {
    const { getByText } = renderButton()

    await fireEvent.click(getByText('rateAgent'))
    expect(mockShowRatingModal).toHaveBeenCalled()
    expect(mockShowConfirmationModal).not.toHaveBeenCalled()
    expect(mockOpenLogin).not.toHaveBeenCalled()
  })

  it('calls showConfirmationModal when user is not confirmed', async () => {
    const { getByText } = renderButton({
      ...defaultProps,
      user: mockUnconfirmedUser,
    })

    fireEvent.click(getByText('rateAgent'))
    expect(mockShowRatingModal).not.toHaveBeenCalled()
    expect(mockShowConfirmationModal).toHaveBeenCalled()
    expect(mockOpenLogin).not.toHaveBeenCalled()
  })

  it('calls openLogin with SIGN_UP when not signed in', async () => {
    const { getByText } = renderButton({ ...defaultProps, user: undefined })

    fireEvent.click(getByText('signUp'))
    expect(mockShowRatingModal).not.toHaveBeenCalled()
    expect(mockShowConfirmationModal).not.toHaveBeenCalled()
    expect(mockOpenLogin).toHaveBeenCalledWith(LOGIN_PAGES.SIGN_UP)
  })

  it('calls openLogin with SIGN_IN with callback when "or log in" link is clicked', async () => {
    const { getByText } = renderButton({ ...defaultProps, user: undefined })

    await fireEvent.click(getByText('logIn'))
    expect(mockShowRatingModal).not.toHaveBeenCalled()
    expect(mockShowConfirmationModal).not.toHaveBeenCalled()
    expect(mockOpenLogin).toHaveBeenCalledWith(LOGIN_PAGES.SIGN_IN, {
      callback: mockRevalidate,
    })
  })

  it('shows help text if agent is not rateable for current user', async () => {
    const { getByText } = renderButton({ ...defaultProps, isRateable: false })

    await fireEvent.click(getByText('rateAgent'))
    expect(toast).toHaveBeenCalledWith('unrateable', {
      icon: 'ℹ️',
      id: 'agent-unrateable-toast',
      duration: 3000,
    })
  })

  it('shows confirmation modal if agent is not rateable AND user is unconfirmed', async () => {
    const { getByText } = renderButton({
      ...defaultProps,
      isRateable: false,
      user: mockUnconfirmedUser,
    })

    await fireEvent.click(getByText('rateAgent'))

    expect(toast).not.toHaveBeenCalled()
    expect(mockShowConfirmationModal).toHaveBeenCalled()
  })
})
