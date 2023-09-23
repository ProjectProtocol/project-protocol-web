interface IStaticPage {
  title: string,
  icon: string,
  children: React.ReactNode
}

export default function StaticPage({title, icon, children}: IStaticPage) {
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
