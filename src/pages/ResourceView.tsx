import { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import PageHeader from 'src/components/PageHeader'
import ResourceCard from 'src/components/Resources/ResourceCard'
import { ResourceLoaderReturn } from 'src/loaders/resourceLoader'
import Resource from 'src/types/Resource'

export default function ResourceView() {
  const data = useLoaderData() as ResourceLoaderReturn
  const [resource, setResource] = useState(data.resource)
  const onUpdateResource = (updatedResourceData: { resource: Resource }) => {
    setResource({ ...resource, ...updatedResourceData.resource })
  }

  return (
    <div className="vertical-rhythm">
      <PageHeader title={resource.name} showBack />
      <ResourceCard resource={resource} onUpdate={onUpdateResource} />
    </div>
  )
}
