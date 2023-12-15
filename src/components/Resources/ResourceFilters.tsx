import CategoryPill from './CategoryPill'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Collapse from 'react-bootstrap/Collapse'
import { TagCollection, Tag } from 'contentful'

interface IResourceFilters {
  currentFilters: string[] // current filters
  tags: TagCollection
}

export default function ResourceFilters({
  currentFilters,
  tags,
}: IResourceFilters) {
  const { t } = useTranslation()
  const [filtersOpen, setFiltersOpen] = useState(currentFilters.length > 0)
  const filterToggleLabel = filtersOpen
    ? t('resources.filters.hide')
    : t('resources.filters.show')

  /* Reveal filters if a filter has been set via resource card tag */
  const location = useLocation()
  useEffect(() => {
    if (currentFilters.length > 0) setFiltersOpen(true)
  }, [location, currentFilters])

  return (
    <div className="mb-4">
      <div className="d-flex flex-row align-items-center gap-2 mb-2">
        <a
          className="pe-auto link-dark"
          role="button"
          aria-controls="resource-filters-container"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <i className="bi bi-filter me-1" />
          {filterToggleLabel}
        </a>
      </div>
      <Collapse in={filtersOpen}>
        <div id="resource-filters-container">
          <div className="d-flex flex-row flex-wrap gap-2">
            {tags.items.map((t: Tag, i: number) => (
              <div className="" key={`rfcp-${i}`}>
                <CategoryPill {...buildPillProps(t, currentFilters)} />
              </div>
            ))}
            {currentFilters.length > 0 && (
              <Link to="/resources" className="link-dark">
                {t('resources.filters.clear', { count: currentFilters.length })}
              </Link>
            )}
          </div>
        </div>
      </Collapse>
    </div>
  )
}

// Util
function buildCategoryHref(list: string[]) {
  const p = new URLSearchParams(list.map((c) => ['category', c]))
  return `?${p.toString()}`
}

function buildPillProps(
  tag: Tag,
  currentFilters: string[], // current filters
) {
  const {
    name,
    sys: { id },
  } = tag
  const active = currentFilters.includes(id)
  const href = active
    ? buildCategoryHref(currentFilters.filter((c) => c !== id))
    : buildCategoryHref([...currentFilters, id])

  return {
    active,
    label: `${active ? '-' : '+'} ${name}`,
    href,
  }
}
