// add searchbar            SearchBar.tsx
// add results section      SearchResultOffice.tsx

import { Modal } from 'react-bootstrap'

interface ISelectOfficeModal {
  show: boolean
  close: () => void
}

export default function SelectOfficeModal({ close, show }: ISelectOfficeModal) {
  return (
    <Modal show={show} onHide={close}>
      <Modal.Header closeButton>
        <Modal.Title>Select an office</Modal.Title>
      </Modal.Header>
    </Modal>
  )
}
