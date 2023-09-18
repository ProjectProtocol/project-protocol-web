interface IStaticPage {
  title: string,
  icon: string,
  children: React.ReactNode
}

export default function StaticPage({title, icon, children}: IStaticPage) {
  return (
  <div>
    <div className="d-flex justify-content-center mb-3">
      <div
        className="d-flex justify-content-center align-items-center bg-white rounded-circle"
        style={{ width: 80, height: 80 }}
        >
        <img src={icon} alt="icon" width="50%" />
      </div>
    </div>
    <div className="p-4 text-start">
      <h2 className="mb-2">{title}</h2>
    </div>
    <body>{children}</body>
  </div>
  )
}
