import { Button, ButtonProps, Spinner } from 'react-bootstrap'

export interface IAsyncButton extends ButtonProps {
  loading: boolean
}

export default function AsyncButton({
  loading,
  children,
  disabled,
  ...props
}: IAsyncButton) {
  return (
    <Button disabled={loading || disabled} {...props}>
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
