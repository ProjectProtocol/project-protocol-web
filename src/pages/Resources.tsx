import { Await, useLoaderData } from 'react-router-dom'
import { ResourcesLoaderReturn } from 'src/loaders/resourcesLoader'
import { useTranslation } from 'react-i18next'

import { EntryCollection } from 'contentful'
import { ResourceLinkSkeleton } from 'src/types/contentful-types'
import ResourceCard from 'src/components/Resources/ResourceCard'
import ResourceFilters from 'src/components/Resources/ResourceFilters'

export default function Resources() {
  const { t } = useTranslation()
  const data = useLoaderData() as ResourcesLoaderReturn

  return (
    <div className="vertical-rhythm">
      <h2 className="mb-2">{t('resources.title')}</h2>
      <a
        className="btn btn-primary mb-4"
        href="https://airtable.com/shrPJ7SKahULdzcMj"
        target="_blank"
      >
        {t('resources.suggestResource')}
      </a>
      <ResourceFilters
        tags={data.allTags}
        currentFilters={data.categoryParam}
      />
      <div className="vertical-rhythm">
        <Await resolve={data.resourceCollection}>
          {(data: EntryCollection<ResourceLinkSkeleton>) => {
            return data.items.map((r, i) => (
              <ResourceCard resource={r} index={i} key={`resource-card-${i}`} />
            ))
          }}
        </Await>
      </div>
    </div>
  )
}
