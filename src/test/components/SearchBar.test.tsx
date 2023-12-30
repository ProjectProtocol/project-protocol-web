import { render, fireEvent } from '@testing-library/react'
import SearchBar from 'src/components/SearchBar'

const mockProps = {
  name: 'searchInput',
  id: 'test-input',
  placeholder: 'Search me',
  onChange: vitest.fn(),
  onClear: vitest.fn(),
}

describe('SearchBar', () => {
  it('renders correctly with default props', () => {
    const { getByRole } = render(<SearchBar {...mockProps} />)

    // Check if the input element is rendered
    const inputElement = getByRole('searchbox')
    expect(inputElement).toBeInTheDocument()
  })

  it('handles input and clear functionality', () => {
    const { getByRole, queryByRole } = render(<SearchBar {...mockProps} />)

    // No clear icon is shown when input is empty
    expect(queryByRole('button')).not.toBeInTheDocument()

    // Simulate user typing in the search bar
    const inputElement = getByRole('searchbox')
    fireEvent.change(inputElement, { target: { value: 'Test' } })

    // Check if onChange callback is called
    expect(mockProps.onChange).toHaveBeenCalledTimes(1)

    // Check if the clear icon is rendered and clickable
    const clearIcon = queryByRole('button')
    expect(clearIcon).toBeInTheDocument()
    clearIcon && fireEvent.click(clearIcon)

    // Check if onClear callback is called
    expect(mockProps.onClear).toHaveBeenCalledTimes(1)

    // Check if the search bar is cleared
    expect(inputElement).toHaveValue('')
  })

  it('handles focus and blur events', () => {
    const { getByRole } = render(<SearchBar {...mockProps} />)

    // Simulate focusing on the search bar
    const inputElement = getByRole('searchbox')
    fireEvent.focus(inputElement)

    // Check if the input has the primary border color
    expect(inputElement).toHaveClass('border-primary')

    // Simulate blurring from the search bar
    fireEvent.blur(inputElement)

    // Check if the input has the loquat border color
    expect(inputElement).toHaveClass('border-loquat')
  })
})
