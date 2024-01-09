import { render, fireEvent } from '@testing-library/react'
import RateAgentButton, {
  IRateAgentButton,
} from 'src/components/Agent/RateAgentButton'
import { LOGIN_PAGES } from 'src/components/LoginModal/constants'
import User from 'src/types/User'

describe('RateAgentButton button behavior', () => {
  const mockShowRatingModal = vi.fn()
  const mockShowConfirmationModal = vi.fn()
  const mockOpenLogin = vi.fn()

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
    isRateable: true,
  }

  const renderButton = (props: IRateAgentButton = defaultProps) =>
    render(<RateAgentButton {...props} />)

  it("shows 'Rate agent' when user is signed in", () => {
    const { getByText } = renderButton()

    expect(getByText('agent.rateAgent')).toBeTruthy()
  })

  it("shows 'Sign up to rate' when user is not signed in", () => {
    const { getByText } = renderButton({ ...defaultProps, user: undefined })

    expect(getByText('agent.signUp')).toBeTruthy()
  })

  it("shows 'Sign up to rate' and 'log in' link when user is not signed in", () => {
    const { getByText } = renderButton({ ...defaultProps, user: undefined })

    expect(getByText('agent.signUp')).toBeTruthy()
    expect(getByText('agent.logIn')).toBeTruthy()
  })

  it('calls showRatingModal when user is confirmed', async () => {
    const { getByText } = renderButton()

    await fireEvent.click(getByText('agent.rateAgent'))
    expect(mockShowRatingModal).toHaveBeenCalled()
    expect(mockShowConfirmationModal).not.toHaveBeenCalled()
    expect(mockOpenLogin).not.toHaveBeenCalled()
  })

  it('calls showConfirmationModal when user is not confirmed', async () => {
    const { getByText } = renderButton({
      ...defaultProps,
      user: mockUnconfirmedUser,
    })

    fireEvent.click(getByText('agent.rateAgent'))
    expect(mockShowRatingModal).not.toHaveBeenCalled()
    expect(mockShowConfirmationModal).toHaveBeenCalled()
    expect(mockOpenLogin).not.toHaveBeenCalled()
  })

  it('calls openLogin with SIGN_UP when not signed in', async () => {
    const { getByText } = renderButton({ ...defaultProps, user: undefined })

    fireEvent.click(getByText('agent.signUp'))
    expect(mockShowRatingModal).not.toHaveBeenCalled()
    expect(mockShowConfirmationModal).not.toHaveBeenCalled()
    expect(mockOpenLogin).toHaveBeenCalledWith(LOGIN_PAGES.SIGN_UP)
  })

  it('calls openLogin with SIGN_IN when "or log in" link is clicked', async () => {
    const { getByText } = renderButton({ ...defaultProps, user: undefined })

    fireEvent.click(getByText('agent.logIn'))
    expect(mockShowRatingModal).not.toHaveBeenCalled()
    expect(mockShowConfirmationModal).not.toHaveBeenCalled()
    expect(mockOpenLogin).toHaveBeenCalledWith(LOGIN_PAGES.SIGN_IN)
  })

  it('disables rate button if agent is not rateable for current user', () => {
    const { getByText } = renderButton({ ...defaultProps, isRateable: false })
    const button = getByText('agent.rateAgent')
    expect(button).toBeDisabled()
  })

  it('shows help text if agent is not rateable for current user', () => {
    const { queryByText } = renderButton({ ...defaultProps, isRateable: false })
    expect(queryByText('agent.unrateable')).toBeInTheDocument()
  })
})
