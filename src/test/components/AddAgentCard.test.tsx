import { render, fireEvent } from '@testing-library/react'
import AddAgentCard from 'src/components/AddAgentCard'
import User from 'src/types/User'

// Utility function to render the AddAgentCard
const renderAddAgentCard = (user?: User) => {
  const openLoginMock = vitest.fn()
  const navigateMock = vitest.fn()
  const showConfirmModalMock = vitest.fn()

  return {
    openLoginMock,
    navigateMock,
    showConfirmModalMock,
    ...render(
      <AddAgentCard
        openLogin={openLoginMock}
        user={user}
        navigate={navigateMock}
        showConfirmModal={showConfirmModalMock}
      />,
    ),
  }
}

describe('AddAgentCard', () => {
  it('renders correctly with user logged in and confirmed', () => {
    const user = { isConfirmed: true } as User
    const { getByText } = renderAddAgentCard(user)

    // Check if the "Add an Agent" button is rendered
    const addButton = getByText('search.addAnAgent')
    expect(addButton).toBeInTheDocument()
  })

  it('opens confirmation modal when user logged in but not confirmed', () => {
    const user = { isConfirmed: false } as User

    const { getByText, showConfirmModalMock } = renderAddAgentCard(user)

    // Click the "Add an Agent" button to trigger the modal
    const addButton = getByText('search.addAnAgent')
    fireEvent.click(addButton)

    // Check if the confirmation modal is rendered after clicking the button
    expect(showConfirmModalMock).toHaveBeenCalled()
  })

  it('renders correctly with user not logged in', () => {
    const { getByText } = renderAddAgentCard()

    // Check if the "Sign Up to Add Agent" button is rendered
    const signUpButton = getByText('search.signUpToAddAgent')
    expect(signUpButton).toBeInTheDocument()

    // Check if the "or Log In" link is rendered
    const logInLink = getByText('search.orLogIn')
    expect(logInLink).toBeInTheDocument()
  })

  it('navigates to /agents/new when "Add an Agent" button is clicked and user is confirmed', () => {
    const user = { isConfirmed: true } as User

    const { getByText, navigateMock } = renderAddAgentCard(user)

    // Click the "Add an Agent" button to trigger navigation
    const addButton = getByText('search.addAnAgent')
    fireEvent.click(addButton)

    // Check if the navigate function is called with the correct path
    expect(navigateMock).toHaveBeenCalledWith('/agents/new')
  })
})
