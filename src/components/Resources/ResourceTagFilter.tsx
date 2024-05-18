import { useSearchParams } from 'react-router-dom'
import { ResourceTag, resourceTags } from 'src/types/Resource'
import CategoryPill from './CategoryPill'
import { useTranslate } from '@tolgee/react'

const tags = Object.values(resourceTags)

export default function ResourceTagFilter() {
  const { t } = useTranslate('resources')
  const [searchParams, setSearchParams] = useSearchParams()
  const currentTags = searchParams.getAll('tags') as ResourceTag[]

  const updateTagFilter = (tags: ResourceTag[]) => {
    setSearchParams(
      (prev: URLSearchParams) => {
        prev.delete('tags')
        tags.forEach((tag) => prev.append('tags', tag))
        return prev
      },
      { replace: true },
    )
  }

  return (
    <div>
      <h4>{t('tags.title')}</h4>
      <div className="d-flex flex-row flex-wrap gap-2">
        {tags.map((key: ResourceTag, i: number) => {
          const active = currentTags.includes(key)
          return (
            <div className="" key={`rfcp-${i}`}>
              <CategoryPill
                active={active}
                label={`${active ? '-' : '+'} ${t(`tags.${key}`)}`}
                onClick={() => {
                  if (active) {
                    const newFilters = currentTags.filter((f) => f !== key)
                    updateTagFilter(newFilters)
                  } else {
                    updateTagFilter([...currentTags, key])
                  }
                }}
              />
            </div>
          )
        })}
        {currentTags.length > 0 && (
          <a
            className="link-dark"
            role="button"
            onClick={() => updateTagFilter([])}
          >
            {t('filters.clear', { count: currentTags.length })}
          </a>
        )}
      </div>
    </div>
  )
}
