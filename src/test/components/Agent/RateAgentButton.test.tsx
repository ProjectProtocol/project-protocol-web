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

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it("shows 'Rate agent' when user is signed in", () => {
    const { getByText } = render(
      <RateAgentButton
        user={mockUser}
        showRatingModal={mockShowRatingModal}
        showConfirmationModal={mockShowConfirmationModal}
        openLogin={mockOpenLogin}
      />,
    )

    expect(getByText('Rate agent')).toBeTruthy()
  })

  it("shows 'Sign up to rate' when user is not signed in", () => {
    const { getByText } = render(
      <RateAgentButton
        showRatingModal={mockShowRatingModal}
        showConfirmationModal={mockShowConfirmationModal}
        openLogin={mockOpenLogin}
      />,
    )

    expect(getByText('Sign up to rate')).toBeTruthy()
  })

  it("shows 'Sign up to rate' and 'log in' link when user is not signed in", () => {
    const { getByText } = render(
      <RateAgentButton
        showRatingModal={mockShowRatingModal}
        showConfirmationModal={mockShowConfirmationModal}
        openLogin={mockOpenLogin}
      />,
    )

    expect(getByText('Sign up to rate')).toBeTruthy()
    expect(getByText('or log in')).toBeTruthy()
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

    await fireEvent.click(getByText('Rate agent'))
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

    fireEvent.click(getByText('Rate agent'))
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

    fireEvent.click(getByText('Sign up to rate'))
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

    fireEvent.click(getByText('or log in'))
    expect(mockShowRatingModal).not.toHaveBeenCalled()
    expect(mockShowConfirmationModal).not.toHaveBeenCalled()
    expect(mockOpenLogin).toHaveBeenCalledWith(LOGIN_PAGES.SIGN_IN)
  })
})
