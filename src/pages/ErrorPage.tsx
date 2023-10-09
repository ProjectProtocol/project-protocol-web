import { Link, useRouteError } from 'react-router-dom'
import BasicPage from 'src/components/BasicPage'
import icon from '../images/icon.svg'

type RoutingError = {
  statusText?: string
  message?: string
}

export default function ErrorPage() {
  const error = useRouteError() as RoutingError

  const text = error?.statusText || error?.message || 'Something went wrong.'

  return (
    <div className="vh-100 d-flex flex-column align-items-center">
      <div className="text-center" style={{ marginTop: '33%' }}>
        <BasicPage title="Oops!" icon={icon}>
          <p>{text}</p>
          <p>
            <Link to="/" replace={true}>
              Main page
            </Link>
          </p>
        </BasicPage>
      </div>
    </div>
  )
}
