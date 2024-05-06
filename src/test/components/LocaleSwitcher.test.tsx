import { render, screen } from '@testing-library/react'
import LocaleSwitcher from '../../components/LocaleSwitcher'

vi.mock('react-router-dom', async () => {
  return {
    useRevalidator: () => ({
      revalidate: vi.fn(),
    }),
  }
})

describe('LocaleSwitcher', () => {
  test('renders language options correctly', () => {
    render(<LocaleSwitcher />)

    const englishOption = screen.getByText('English')
    const spanishOption = screen.getByText('Español')

    expect(englishOption).toBeInTheDocument()
    expect(spanishOption).toBeInTheDocument()
  })
})
