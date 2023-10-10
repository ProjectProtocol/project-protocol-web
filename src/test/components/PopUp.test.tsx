import { render, screen } from '@testing-library/react'
import PopUp from 'src/components/PopUp'
import { it, expect } from 'vitest'

const defaultProps = {
  title: 'Test Popup',
  show: true,
}

const renderPopUp = (props = {}) => {
  const mergeProps = { ...defaultProps, ...props }
  return render(<PopUp {...mergeProps} />)
}

it('matches the snapshot', async () => {
  const { baseElement } = renderPopUp()
  expect(baseElement).toMatchSnapshot()
})

it('does not have a close button by default', async () => {
  const { baseElement } = renderPopUp()
  expect(baseElement.querySelector('.btn-close')).toBeFalsy()
})

it('renders a close button if specified', async () => {
  const { baseElement } = renderPopUp({ closeButton: true })
  expect(baseElement.querySelector('.btn-close')).toBeTruthy()
})

it('renders the title', async () => {
  render(<PopUp title="Test Popup" show={true} />)
  expect(screen.getByRole('heading').textContent).toBe('Test Popup')
})

it('does not render title helper if empty', () => {
  const { baseElement } = renderPopUp()
  expect(baseElement.querySelector('p')).toBeFalsy()
})

it('renders title helper text if given', async () => {
  const { baseElement } = renderPopUp({ titleHelper: 'I am additional text' })
  expect(baseElement.querySelector('p')?.textContent).toEqual(
    'I am additional text',
  )
})
