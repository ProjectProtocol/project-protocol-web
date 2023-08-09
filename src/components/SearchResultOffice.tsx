import Office from "../types/Office"

interface SearchResultOfficeI {
  office: Office
}

export default function SearchResultOffice({ office }: SearchResultOfficeI) {
  return (
    <>
      <h4 className="m-0">{office.city}</h4>
      <p className="m-0 fw-bold">Office</p>
      <p className="m-0">{office.street}</p>
      <p className="m-0">
        {office.city}, {office.state} {office.zip}
      </p>
    </>
  )
}
