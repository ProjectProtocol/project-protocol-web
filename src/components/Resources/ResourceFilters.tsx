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
      <div className="d-flex flex-row align-items-center gap-2">
        <a
          className="pe-auto link-cobalt"
          role="button"
          aria-controls="resource-filters-container"
          aria-expanded={filtersOpen}
          onClick={() => setFiltersOpen(!filtersOpen)}
        >
          {t('resources.filters.show')}
        </a>
        <div
          style={{
            fontSize: '1rem',
            transform: filtersOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.3s',
          }}
        >
          <i className="bi bi-chevron-right align-middle" />
        </div>
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
