import { render, screen, fireEvent } from '@testing-library/react'
import LocaleSwitcher from '../../components/LocaleSwitcher'
import i18n from 'src/i18n'

vi.mock('src/i18n', () => ({
  default: {
    changeLanguage: vi.fn(),
    resolvedLanguage: 'en',
  },
}))

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

  test('changes language when an option is clicked', async () => {
    render(<LocaleSwitcher />)
    const englishOption = screen.getByText('English')
    const spanishOption = screen.getByText('Español')

    await fireEvent.click(spanishOption)
    expect(i18n.changeLanguage).toHaveBeenCalledWith('es', expect.any(Function))

    await fireEvent.click(englishOption)
    expect(i18n.changeLanguage).toHaveBeenCalledWith('es', expect.any(Function))
  })
})
