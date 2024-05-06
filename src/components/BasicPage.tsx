import PageHeader from './PageHeader'

interface IBasicPage {
  title: string
  icon: string
  children: React.ReactNode
}

/** Multi-purpose page layout with a page title and icon */
export default function BasicPage({ title, children }: IBasicPage) {
  return (
    <div className="pb-4 vertical-rhythm">
      <PageHeader title={title} showBack />
      {children}
    </div>
  )
}
