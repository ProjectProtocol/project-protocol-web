import { Await, useLoaderData } from 'react-router-dom'
import { ResourcesLoaderReturn } from 'src/loaders/resourcesLoader'
import { Suspense } from 'react'

import { EntryCollection } from 'contentful'
import { ResourceLinkSkeleton } from 'src/types/contentful-types'
import ResourceCard from 'src/components/Resources/ResourceCard'
import ResourcePlaceholder from 'src/components/Resources/ResourcePlaceholder'

export default function Resources() {
  const data = useLoaderData() as ResourcesLoaderReturn

  return (
    <div className="vertical-rhythm">
      <h2>Resources</h2>
      <Suspense fallback={<>{Array(10).fill(<ResourcePlaceholder />)}</>}>
        <Await resolve={data.resourceCollection}>
          {(data: EntryCollection<ResourceLinkSkeleton>) => {
            return data.items.map((r, i) => (
              <ResourceCard resource={r} index={i} />
            ))
          }}
        </Await>
      </Suspense>
    </div>
  )
}
