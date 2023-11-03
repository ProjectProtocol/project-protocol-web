import {
  ResourceCategoryType,
  resourceCategories,
} from 'src/types/contentful-types'
import CategoryPill from './CategoryPill'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import Collapse from 'react-bootstrap/Collapse'

interface IResourceFilters {
  categories: ResourceCategoryType[]
}

function buildCategoryHref(list: ResourceCategoryType[]) {
  const p = new URLSearchParams(list.map((c) => ['category', c]))
  return `?${p.toString()}`
}

function buildPillProps(
  category: ResourceCategoryType,
  categories: ResourceCategoryType[],
) {
  const active = categories.includes(category)
  const href = active
    ? buildCategoryHref(categories.filter((c) => c !== category))
    : buildCategoryHref([...categories, category])

  return {
    active,
    label: `${active ? '-' : '+'} ${category}`,
    href,
  }
}

export default function ResourceFilters({ categories }: IResourceFilters) {
  const [filtersOpen, setFiltersOpen] = useState(false)
  const filterToggleLabel = filtersOpen ? 'Hide filters' : 'Show filters'
  return (
    <div className="mb-4">
      <div className="d-flex flex-row align-items-center gap-2 mb-2">
        <a
          className="pe-auto link-tertiary"
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
            {resourceCategories.map((c, i) => (
              <div className="" key={`rfcp-${i}`}>
                <CategoryPill {...buildPillProps(c, categories)} />
              </div>
            ))}
            {categories.length > 0 && (
              <Link to="/resources" className="link-tertiary">
                clear ({categories.length})
              </Link>
            )}
          </div>
        </div>
      </Collapse>
    </div>
  )
}
