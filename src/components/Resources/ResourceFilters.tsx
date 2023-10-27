import {
  ResourceCategoryType,
  resourceCategories,
} from 'src/types/contentful-types'
import CategoryPill from './CategoryPill'
import { Card, Col, Row } from 'react-bootstrap'

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
    <Card>
      <Card.Body>
        <Card.Title>
          Showing {categories.length > 0 ? categories[0] : 'all resources'}
        </Card.Title>
        <Row className="g-2">
          {resourceCategories.map((c, i) => (
            <Col xs="auto" key={`rfcp-${i}`}>
              <CategoryPill {...buildPillProps(c, categories)} />
            </Col>
          ))}
        </Row>
      </Card.Body>
    </Card>
  )
}
