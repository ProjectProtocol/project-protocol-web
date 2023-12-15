import { render } from '@testing-library/react'
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
    resend: vi.fn(() => Promise.resolve(true)),
  },
}))

describe('ConfirmationModal', () => {
  it('renders correctly with a user', async () => {
    const user = {
      email: 'test@example.com',
    } as User

    const { getByText } = render(
      <ConfirmationModal user={user} title="What up" show={true} />,
    )
    expect(getByText('What up')).toBeTruthy()

    // // Click on the "Resend" link
    // fireEvent.click(
    //   getByRole('button', { name: 'confirmationModal.resendLink' }),
    // )

    // // Wait for the async function to complete
    // await waitFor(() => {
    //   // Check if the success message is displayed
    //   expect(getByText('confirmationModal.confirmationSent')).toBeTruthy()
    // })

    // // Check if the ApiConfirmations.resend function was called
    // expect(ApiConfirmations.resend).toHaveBeenCalled()
  })
})

// it('handles error during code resend', async () => {
//   const user = {
//     email: 'test@example.com',
//   }

//   const { getByRole } = render(
//     <ConfirmationModal user={user} isOpen={true} onClose={() => {}} />,
//   )

//   // Simulate an unsuccessful code resend
//   ApiConfirmations.resend.mockResolvedValueOnce(false)

//   // Click on the "Resend" link
//   fireEvent.click(
//     getByRole('button', { name: 'confirmationModal.resendLink' }),
//   )

//   // Wait for the async function to complete
//   await waitFor(() => {
//     // Check if the error message is displayed
//     expect('confirmationModal.body', {
//       email: user.email,
//     }).toBeInTheDocument()
//   })

//   // Check if the error toast message was called
//   expect(require('react-hot-toast').error).toHaveBeenCalled()
// })
