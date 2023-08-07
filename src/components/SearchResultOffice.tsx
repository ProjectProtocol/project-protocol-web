import Office from "../types/Office"

interface SearchResultOfficeI {
  office: Office
}

export default function SearchResultOffice({ office }: SearchResultOfficeI) {
  return (
    <>
      <h3>{office.street}</h3>
      <p>{office.city}</p>
    </>
  )
}
