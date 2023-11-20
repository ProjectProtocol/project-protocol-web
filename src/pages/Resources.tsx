import { Await, useLoaderData } from 'react-router-dom'
import { ResourcesLoaderReturn } from 'src/loaders/resourcesLoader'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'

import { EntryCollection } from 'contentful'
import { ResourceLinkSkeleton } from 'src/types/contentful-types'
import ResourcePlaceholder from 'src/components/Resources/ResourcePlaceholder'
import ResourceCard from 'src/components/Resources/ResourceCard'
import ResourceFilters from 'src/components/Resources/ResourceFilters'

export default function Resources() {
  const { t } = useTranslation()
  const data = useLoaderData() as ResourcesLoaderReturn

  return (
    <div className="vertical-rhythm">
      <h2 className="mb-2">{t('resources.title')}</h2>
      <a
        className="btn btn-outline-secondary mb-4"
        href="https://airtable.com/shrPJ7SKahULdzcMj"
        target="_blank"
      >
        {t('resources.suggestResource')}
      </a>
      <ResourceFilters categories={data.categoryParam} />
      <div className="vertical-rhythm">
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
                <ResourceCard
                  resource={r}
                  index={i}
                  key={`resource-card-${i}`}
                />
              ))
            }}
          </Await>
        </Suspense>
      </div>
    </div>
  )
}
