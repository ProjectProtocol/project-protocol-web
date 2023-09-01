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
    <Modal show={show} onHide={close}>
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
        />
        <p>{offices.length} Results</p>
        <div>
          {offices.map((r) => (
            <SearchResult result={r as Office} key={r.id} />
          ))}
        </div>
      </Modal.Body>
    </Modal>
  )
}
