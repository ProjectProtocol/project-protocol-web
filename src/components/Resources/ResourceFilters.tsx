import { SetURLSearchParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Collapse from 'react-bootstrap/Collapse'
import { ResourceTag } from 'src/types/Resource'
import ResourceTagFilter from './ResourceTagFilter'
import ResourceLocationFilter from './ResourceLocationFilter'

interface IResourceFilters {
  currentFilters: ResourceTag[] // current filters
  setParams: SetURLSearchParams
}

export default function ResourceFilters({ currentFilters }: IResourceFilters) {
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
    <div className="mb-4 text-dark">
      <div className="d-flex flex-row align-items-center gap-2 mb-3">
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
        <div id="resource-filters-container" className="vertical-rhythm">
          <ResourceLocationFilter />
          <ResourceTagFilter />
        </div>
      </Collapse>
    </div>
  )
}
