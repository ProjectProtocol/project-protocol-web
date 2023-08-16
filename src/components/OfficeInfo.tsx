import Office from "../types/Office"

interface IOfficeInfo {
  /** An `Agent` object */
  office: Office
}

// ;<>
//   <Row>
//     <Col>
//       <h4 className="m-0">{office.city}</h4>
//       <p className="m-0 fw-bold">Office</p>
//     </Col>
//     <Col xs="auto">
//       <img src={officeIcon} width={45} />
//     </Col>
//   </Row>
//   <p className="m-0">{office.street}</p>
//   <p className="m-0">
//     {office.city}, {office.state} {office.zip}
//   </p>
// </>
/** Repeatable UI pattern for basic agent info */
export default function OfficeInfo({ office }: IOfficeInfo) {
  return (
    <div className="d-flex flex-column">
      <span className="m-0 large h4 lh-sm">{office.city}</span>
      <span className="mb-1 text-secondary h4 lh-sm">Office</span>
      <p className="m-0 lh-sm">{office.street}</p>
      <p className="m-0 lh-sm">
        {office.city}, {office.state} {office.zip}
      </p>
    </div>
  )
}
