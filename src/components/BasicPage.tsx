import { Card } from 'react-bootstrap'

interface IBasicPage {
  title: string
  icon: string
  children: React.ReactNode
  fullScreen?: boolean
}

/** Multi-purpose page layout with a page title and icon */
export default function BasicPage({
  title,
  icon,
  children,
  fullScreen,
}: IBasicPage) {
  const inner = (
    <div className="px-4 pb-4 pt-5">
      <div className="d-flex justify-content-center mb-4">
        <div
          className="d-flex justify-content-center align-items-center bg-white rounded-circle"
          style={{ width: 80, height: 80 }}
        >
          <img src={icon} width="50%" />
        </div>
      </div>
      <h2 className="mb-4 text-center">{title}</h2>
      {children}
    </div>
  )

  return fullScreen ? (
    <div className="w-100 d-flex flex-column p-5 align-items-center vh-100 bg-light">
      <Card style={{ top: '30%' }}>
        <Card.Body className="p-0">{inner}</Card.Body>
      </Card>
    </div>
  ) : (
    inner
  )
}
