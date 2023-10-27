import {
  ResourceCategoryType,
  resourceCategories,
} from 'src/types/contentful-types'
import CategoryPill from './CategoryPill'

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
    <div>
      <h4>
        <i className="bi bi-filter text-gray-3" /> Filters ({categories.length})
      </h4>
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
