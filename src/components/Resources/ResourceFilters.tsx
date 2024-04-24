import { SetURLSearchParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Collapse from 'react-bootstrap/Collapse'
import { ResourceTag } from 'src/types/Resource'
import ResourceTagFilter from './ResourceTagFilter'
import ResourceLocationFilter from './ResourceLocationFilter'
import classNames from 'classnames'

interface IResourceFilters {
  currentFilters: ResourceTag[] // current filters
  setParams: SetURLSearchParams
}

// TODO use searchparams directly
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
    <div
      className={classNames('mb-4 text-cobalt ', {})}
      style={{ transition: 'all 0.3s' }}
    >
      <div className="d-flex flex-row align-items-center justify-content-between gap-2">
        <a
          className="pe-auto link-cobalt"
          role="button"
          aria-controls="resource-filters-container"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          <i className="bi bi-filter me-1" />
          {filterToggleLabel}
        </a>
        <a
          className="btn btn-cobalt"
          href="https://airtable.com/shrPJ7SKahULdzcMj"
          target="_blank"
        >
          {t('resources.suggestResource')}
        </a>
      </div>
      <Collapse in={filtersOpen}>
        <div id="resource-filters-container">
          <div className="vertical-rhythm mt-3 p-3 rounded bg-white">
            <ResourceLocationFilter />
            <ResourceTagFilter />
          </div>
        </div>
      </Collapse>
    </div>
  )
}
