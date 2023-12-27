import { render, fireEvent } from '@testing-library/react'
import RateAgentButton from 'src/components/Agent/RateAgentButton'
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

  it("shows 'Rate agent' when user is signed in", () => {
    const { getByText } = render(
      <RateAgentButton
        user={mockUser}
        showRatingModal={mockShowRatingModal}
        showConfirmationModal={mockShowConfirmationModal}
        openLogin={mockOpenLogin}
      />,
    )

    expect(getByText('agent.rateAgent')).toBeTruthy()
  })

  it("shows 'Sign up to rate' when user is not signed in", () => {
    const { getByText } = render(
      <RateAgentButton
        showRatingModal={mockShowRatingModal}
        showConfirmationModal={mockShowConfirmationModal}
        openLogin={mockOpenLogin}
      />,
    )

    expect(getByText('agent.signUp')).toBeTruthy()
  })

  it("shows 'Sign up to rate' and 'log in' link when user is not signed in", () => {
    const { getByText } = render(
      <RateAgentButton
        showRatingModal={mockShowRatingModal}
        showConfirmationModal={mockShowConfirmationModal}
        openLogin={mockOpenLogin}
      />,
    )

    expect(getByText('agent.signUp')).toBeTruthy()
    expect(getByText('agent.logIn')).toBeTruthy()
  })

  it('calls showRatingModal when user is confirmed', async () => {
    const { getByText } = render(
      <RateAgentButton
        user={mockUser}
        showRatingModal={mockShowRatingModal}
        showConfirmationModal={mockShowConfirmationModal}
        openLogin={mockOpenLogin}
      />,
    )

    await fireEvent.click(getByText('agent.rateAgent'))
    expect(mockShowRatingModal).toHaveBeenCalled()
    expect(mockShowConfirmationModal).not.toHaveBeenCalled()
    expect(mockOpenLogin).not.toHaveBeenCalled()
  })

  it('calls showConfirmationModal when user is not confirmed', async () => {
    const { getByText } = render(
      <RateAgentButton
        user={mockUnconfirmedUser}
        showRatingModal={mockShowRatingModal}
        showConfirmationModal={mockShowConfirmationModal}
        openLogin={mockOpenLogin}
      />,
    )

    fireEvent.click(getByText('agent.rateAgent'))
    expect(mockShowRatingModal).not.toHaveBeenCalled()
    expect(mockShowConfirmationModal).toHaveBeenCalled()
    expect(mockOpenLogin).not.toHaveBeenCalled()
  })

  it('calls openLogin with SIGN_UP when not signed in', async () => {
    const { getByText } = render(
      <RateAgentButton
        showRatingModal={mockShowRatingModal}
        showConfirmationModal={mockShowConfirmationModal}
        openLogin={mockOpenLogin}
      />,
    )

    fireEvent.click(getByText('agent.signUp'))
    expect(mockShowRatingModal).not.toHaveBeenCalled()
    expect(mockShowConfirmationModal).not.toHaveBeenCalled()
    expect(mockOpenLogin).toHaveBeenCalledWith(LOGIN_PAGES.SIGN_UP)
  })

  it('calls openLogin with SIGN_IN when "or log in" link is clicked', async () => {
    const { getByText } = render(
      <RateAgentButton
        showRatingModal={mockShowRatingModal}
        showConfirmationModal={mockShowConfirmationModal}
        openLogin={mockOpenLogin}
      />,
    )

    fireEvent.click(getByText('agent.logIn'))
    expect(mockShowRatingModal).not.toHaveBeenCalled()
    expect(mockShowConfirmationModal).not.toHaveBeenCalled()
    expect(mockOpenLogin).toHaveBeenCalledWith(LOGIN_PAGES.SIGN_IN)
  })
})
