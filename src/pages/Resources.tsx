import { Await, useLoaderData } from 'react-router-dom'
import { ResourcesLoaderReturn } from 'src/loaders/resourcesLoader'
import { Suspense } from 'react'

import { EntryCollection } from 'contentful'
import { ResourceLinkSkeleton } from 'src/types/contentful-types'
import ResourcePlaceholder from 'src/components/Resources/ResourcePlaceholder'
import ResourceCard from 'src/components/Resources/ResourceCard'
import ResourceFilters from 'src/components/Resources/ResourceFilters'

export default function Resources() {
  const data = useLoaderData() as ResourcesLoaderReturn

  return (
    <div className="vertical-rhythm-lg">
      <ResourceFilters categories={data.categoryParam} />
      <Suspense
        key={data.categoryParam.join('-')}
        fallback={Array(10)
          .fill(0)
          .map((_, i) => (
            <ResourcePlaceholder key={`rph-${i}`} />
          ))}
      >
        <Await resolve={data.resourceCollection}>
          {(data: EntryCollection<ResourceLinkSkeleton>) => {
            return data.items.map((r, i) => (
              <ResourceCard resource={r} index={i} key={`resource-card-${i}`} />
            ))
          }}
        </Await>
      </Suspense>
    </div>
  )
}
