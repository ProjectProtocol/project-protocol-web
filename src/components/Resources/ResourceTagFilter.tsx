import { useTranslation } from 'react-i18next'
import { Link, SetURLSearchParams } from 'react-router-dom'
import { ResourceTag, resourceTags } from 'src/types/Resource'
import CategoryPill from './CategoryPill'

interface IResourceTagFilters {
  currentFilters: ResourceTag[] // current filters
  setParams: SetURLSearchParams
}

const tags = Object.values(resourceTags)

export default function ResourceTagFilter({
  currentFilters,
  setParams,
}: IResourceTagFilters) {
  const { t } = useTranslation()
  return (
    <>
      <h4>{t('resources.tags.title')}</h4>
      <div className="d-flex flex-row flex-wrap gap-2">
        {tags.map((key: ResourceTag, i: number) => {
          const active = currentFilters.includes(key)
          return (
            <div className="" key={`rfcp-${i}`}>
              <CategoryPill
                active={active}
                label={`${active ? '-' : '+'} ${t(`resources.tags.${key}`)}`}
                onClick={() => {
                  if (active) {
                    const newFilters = currentFilters.filter((f) => f !== key)
                    setParams({ tags: newFilters })
                  } else {
                    setParams({ tags: [...currentFilters, key] })
                  }
                }}
              />
            </div>
          )
        })}
        {currentFilters.length > 0 && (
          <a
            className="link-dark"
            role="button"
            onClick={() => setParams({ tags: [] })}
          >
            {t('resources.filters.clear', { count: currentFilters.length })}
          </a>
        )}
      </div>
    </>
  )
}
