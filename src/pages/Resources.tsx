import { useLoaderData } from 'react-router-dom'
import { EntryCollection } from 'contentful'
import ResourceCard from 'src/components/ResourceCard'
import { Card } from 'react-bootstrap'
import { ResourceLink, ResourceLinkEntrySkeleton } from 'src/types/ResourceLink'

export default function Resources() {
  const data = useLoaderData() as EntryCollection<ResourceLinkEntrySkeleton>
  const firstResource = data.items[0] as ResourceLink
  const resources = data.items.slice(1) as ResourceLink[]
  console.log(firstResource)
  return (
    <div className="vertical-rhythm">
      <h2>Resources</h2>
      <ResourceCard resource={firstResource} />
      <hr />
      {resources.map((r, i) => (
        <ResourceCard resource={r} key={`resource-card-${i}`} />
      ))}
    </div>
  )
}
