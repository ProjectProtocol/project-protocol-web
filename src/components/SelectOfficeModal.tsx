import { Modal } from 'react-bootstrap'
import SearchBar from './SearchBar'
import SearchResult from './SearchResult'
import Office from 'src/types/Office'

interface ISelectOfficeModal {
  show: boolean
  close: () => void
  offices: Office[]
  onChange: (s: string) => void
  searchText: string
}

export default function SelectOfficeModal({
  close,
  show,
  offices,
  searchText,
  onChange,
}: ISelectOfficeModal) {
  return (
    <Modal show={show} scrollable onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Select an office</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SearchBar
          id="search"
          aria-label="Search offices"
          size="lg"
          placeholder="Search offices"
          type="text"
          defaultValue={searchText}
          onChange={(e) => onChange(e.target.value)}
          autoFocus
        />
        {searchText !== '' ? (
          <div>
            <p className="m-3">{offices.length} Results</p>
            <div>
              {offices.map((r) => (
                <SearchResult result={r as Office} key={r.id} />
              ))}
            </div>
          </div>
        ) : (
          <p className="m-5">
            Search for an office using the address or city name.
          </p>
        )}
      </Modal.Body>
    </Modal>
  )
}
