import { ReactNode } from 'react'
import { Button, ButtonProps, Spinner } from 'react-bootstrap'

export interface IAsyncButton extends ButtonProps {
  loading: boolean
  children: ReactNode
}

export default function AsyncButton({
  loading,
  children,
  ...props
}: IAsyncButton) {
  return (
    <Button {...props}>
      {loading ? (
        <>
          <Spinner
            size="sm"
            role="status"
            animation="border"
            variant="black"
            className="mt-2"
          />
        </>
      ) : (
        children
      )}
    </Button>
  )
}
