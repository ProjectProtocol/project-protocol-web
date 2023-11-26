import { useArgs } from '@storybook/preview-api'
import { Meta, StoryObj } from '@storybook/react'
import AsyncButton, { IAsyncButton } from 'src/components/AsyncButton'

/** Sample async button that shows spinner on loading */
const meta: Meta<typeof AsyncButton> = {
  tags: ['autodocs'],
  title: 'Components/AsyncButton',
  component: AsyncButton,
}

export default meta

type story = StoryObj<IAsyncButton>

export const Basic: story = (args: IAsyncButton) => {
  const [{ loading }, updateArgs] = useArgs()
  const disabled = args.loading

  const onClick = () => {
    updateArgs({ loading: !loading })
  }

  return (
    <AsyncButton {...args} onClick={onClick} disabled={disabled}>
      {args.children}
    </AsyncButton>
  )
}

Basic.args = {
  loading: false,
  children: 'Submit',
  size: 'lg',
  className: 'w-100',
  variant: 'primary',
  type: 'submit',
}
