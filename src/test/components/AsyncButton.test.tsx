import { it } from 'vitest'
import AsyncButton from 'src/components/AsyncButton'
import { render, screen } from '@testing-library/react'

it('renders a spinner when loading', async () => {
  render(<AsyncButton loading={true} />)
  expect(screen.getByRole('status')).toBeTruthy()
})

it('disables button when loading', async () => {
  const { baseElement } = render(<AsyncButton loading={true} />)
  expect(baseElement.querySelector('button:disabled')).toBeTruthy()
})
