import {
  ResourceCategoryType,
  resourceCategories,
} from 'src/types/contentful-types'
import CategoryPill from './CategoryPill'
import { Col, Row } from 'react-bootstrap'

interface IResourceFilters {
  categories: ResourceCategoryType[]
}

export default function ResourceFilters({ categories }: IResourceFilters) {
  return (
    <div>
      <Row className="g-2">
        {resourceCategories.map((c, i) => (
          <Col xs="auto" key={`rfcp-${i}`}>
            <CategoryPill active={categories.includes(c)} label={c} />
          </Col>
        ))}
      </Row>
    </div>
  )
}
