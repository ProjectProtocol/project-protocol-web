export interface IBasicPage {
  title: string
  icon: string
  children: React.ReactNode
}

/** Multi-purpose page layout with a page title and icon */
export default function BasicPage({ title, icon, children }: IBasicPage) {
  return (
    <div className="px-4 pb-4 pt-5">
      <div className="d-flex justify-content-center mb-4">
        <div
          className="d-flex justify-content-center align-items-center bg-white rounded-circle"
          style={{ width: 80, height: 80 }}
        >
          <img src={icon} alt="icon" width="50%" />
        </div>
      </div>
      <h2 className="mb-4 text-center">{title}</h2>
      {children}
    </div>
  )
}
