import { useLoaderData } from 'react-router-dom'

export default function ResourceView() {
  const { resource } = useLoaderData()
  return (
    <div className="vertical-rhythm">
      <h1>Resource</h1>
    </div>
  )
}
