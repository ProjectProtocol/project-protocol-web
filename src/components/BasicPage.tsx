import { Card } from 'react-bootstrap'
import PageHeader from './PageHeader'

interface IBasicPage {
  title: string
  icon: string
  children: React.ReactNode
  fullScreen?: boolean
}

/** Multi-purpose page layout with a page title and icon */
export default function BasicPage({ title, children, fullScreen }: IBasicPage) {
  const inner = (
    <div className="pb-4 vertical-rhythm">
      <PageHeader title={title} showBack />
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
