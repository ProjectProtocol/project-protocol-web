import { render, screen } from '@testing-library/react'
import { it, expect } from 'vitest'

import Input from 'src/components/Input'

it('matches the snapshot', async () => {
  const r = render(<Input label="My Input" />)
  expect(r.baseElement).toMatchSnapshot()
})

it('renders when given a label', async () => {
  render(<Input label="My Input" />)
  expect(screen.queryByLabelText('My Input')).toBeTruthy()
})

it('renders a text input by default', async () => {
  const r = render(<Input label="My Input" />)
  const el = (await r.baseElement.querySelector('input')) as HTMLInputElement
  expect(el.type).toEqual('text')
})

it('renders error message if present', async () => {
  render(<Input label="My Input" error="Hi I am an error" />)
  expect(screen.getByText('Hi I am an error')).toBeTruthy()
})

it('uses kebabCased label for id by default', async () => {
  const { baseElement } = render(
    <Input label="My Input" error="Hi I am an error" />,
  )
  expect(baseElement.querySelector('#my-input')).toBeTruthy()
})

it('accepts an explicit controlId and overrides default id', async () => {
  const { baseElement } = render(
    <Input
      label="My Input"
      error="Hi I am an error"
      controlId={'hamster-dance1'}
    />,
  )
  expect(baseElement.querySelector('#hamster-dance1')).toBeTruthy()
})
