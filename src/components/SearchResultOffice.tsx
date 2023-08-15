import { Col, Row } from "react-bootstrap"
import Office from "../types/Office"
import officeIcon from "../images/office-icon.svg"

interface SearchResultOfficeI {
  office: Office
}

export default function SearchResultOffice({ office }: SearchResultOfficeI) {
  return (
    <>
      <Row>
        <Col>
          <h4 className="m-0">{office.city}</h4>
          <p className="m-0 fw-bold">Office</p>
        </Col>
        <Col xs="auto">
          <img src={officeIcon} width={"50"} />
        </Col>
      </Row>
      <p className="m-0">{office.street}</p>
      <p className="m-0">
        {office.city}, {office.state} {office.zip}
      </p>
    </>
  )
}
