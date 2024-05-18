import { fireEvent, render, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ApiConfirmations } from 'src/api'

import ConfirmationModal from 'src/components/ConfirmationModal'
import User from 'src/types/User'

vi.mock('react-hot-toast', () => ({
  __esModule: true,
  default: {
    error: vi.fn(),
  },
}))

vi.mock('src/api', () => ({
  ApiConfirmations: {
    resend: vi.fn(() => {
      Promise.resolve(true)
    }),
  },
}))

const userMock = {
  email: 'test@example.com',
} as User

function renderModal() {
  return render(
    <MemoryRouter>
      <ConfirmationModal user={userMock} title="What up" show={true} />,
    </MemoryRouter>,
  )
}

describe('ConfirmationModal', () => {
  it('renders correctly with a user', async () => {
    const { getByText } = renderModal()
    expect(getByText('confirmationModal.body')).toBeTruthy()
  })

  it('has a terms of service link', async () => {
    const { getByText } = renderModal()
    expect(getByText('termsOfService')).toBeTruthy()
  })

  it('resends confirmation code on "Resend" link click', async () => {
    const { getByRole, getByText } = renderModal()

    // Simulate a successful code resend
    vi.mocked(ApiConfirmations).resend.mockResolvedValueOnce(true)

    // Click on the "Resend" link
    await act(() => {
      fireEvent.click(
        getByRole('button', { name: 'confirmationModal.resendLink' }),
      )
    })

    // Wait for the async function to complete
    await vi.waitFor(() => {
      // Check if the success message is displayed
      expect(getByText('confirmationModal.confirmationSent')).toBeTruthy()
    })

    // Check if the ApiConfirmations.resend function was called
    expect(ApiConfirmations.resend).toHaveBeenCalled()
  })
})
