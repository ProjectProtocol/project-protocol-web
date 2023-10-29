import {
  ResourceCategoryType,
  resourceCategories,
} from 'src/types/contentful-types'
import CategoryPill from './CategoryPill'
import { Link } from 'react-router-dom'

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
    label: category,
    href,
  }
}

export default function ResourceFilters({ categories }: IResourceFilters) {
  return (
    <div className="mb-5">
      <div className="d-flex flex-row align-items-center mb-3">
        <div className="h4 mb-0 me-2">
          <i className="bi bi-filter text-gray-3" /> Filters (
          {categories.length})
        </div>
        <div>
          {categories.length > 0 && (
            <Link to="/resources" className="text-dark">
              clear
            </Link>
          )}
        </div>
      </div>
      <div className="d-flex flex-row flex-wrap gap-2">
        {resourceCategories.map((c, i) => (
          <div className="" key={`rfcp-${i}`}>
            <CategoryPill {...buildPillProps(c, categories)} />
          </div>
        ))}
      </div>
    </div>
  )
}
