export default function StaticPage({ title }: { title: string }) {

  return (
  <div>
    <div className="d-flex justify-content-center mb-3">
      <div
        className="d-flex justify-content-center align-items-center bg-white rounded-circle"
        style={{ width: 80, height: 80 }}
        >
        {/* set icon image and alt text depending on which static page rendered */}
        <img src={undefined} alt="icon" width="50%" />
      </div>
    </div>
    <div className="p-4 text-start">
      <h2 className="mb-2">{title}</h2>
    </div>
  </div>
  )
}
