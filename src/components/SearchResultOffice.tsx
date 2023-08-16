import { Col, Row } from "react-bootstrap"
import Office from "../types/Office"
import officeIcon from "../images/office-icon.svg"
import OfficeInfo from "./OfficeInfo"

interface SearchResultOfficeI {
  office: Office
}

export default function SearchResultOffice({ office }: SearchResultOfficeI) {
  return (
    <Row>
      <Col>
        <OfficeInfo office={office} />
      </Col>
      <Col xs="auto">
        <img src={officeIcon} width={45} />
      </Col>
    </Row>
  )
}
