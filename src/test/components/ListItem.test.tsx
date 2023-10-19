import { render, screen, fireEvent } from '@testing-library/react'
import { it, expect } from 'vitest'

import ListItem from 'src/components/List/ListItem'

it('matches the snapshot', async () => {
  const r = render(
    <ListItem>
      <span>I am a child</span>
    </ListItem>,
  )

  expect(r.baseElement).toMatchSnapshot()
})

it('updates when clicked', async () => {
  const r = render(
    <ListItem data-testid="list-item">
      <span>I am a child</span>
    </ListItem>,
  )
  fireEvent.mouseDown(screen.getByTestId('list-item'))
  expect(r.baseElement).toMatchSnapshot()
})

it('updates when touched', async () => {
  const r = render(
    <ListItem data-testid="list-item">
      <span>I am a child</span>
    </ListItem>,
  )
  fireEvent.touchStart(screen.getByTestId('list-item'))
  expect(r.baseElement).toMatchSnapshot()
})

it('renders the children that are passed', async () => {
  render(
    <ListItem>
      <span>I am a child</span>
    </ListItem>,
  )
  expect(screen.getByText('I am a child')).toBeTruthy()
})
