import { Link, useRouteError } from 'react-router-dom'
type RoutingError = {
  statusText?: string
  message?: string
}

export default function ErrorPage() {
  const error = useRouteError() as RoutingError

  return (
    <div
      id="error-page"
      className="p-5 vh-100 justify-content-center align-items-center d-flex flex-column"
    >
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error?.statusText || error?.message}</i>
      </p>
      <Link to="/">Project protocol home</Link>
    </div>
  )
}
