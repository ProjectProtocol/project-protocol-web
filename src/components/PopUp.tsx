import { Modal, ModalProps } from 'react-bootstrap'
import defaultIcon from 'src/images/icon.svg'

interface IPopUp extends ModalProps {
  title?: string
  titleHelper?: string
  icon?: string
  bodyClass?: string
}

export default function PopUp({
  bodyClass,
  children,
  title,
  titleHelper,
  icon,
  ...props
}: IPopUp) {
  return (
    <Modal centered size="sm" {...props}>
      <Modal.Header closeButton={props.closeButton} />
      <Modal.Body className={bodyClass}>
        {title && (
          <div className="mb-3">
            <h3>
              <img
                src={icon || defaultIcon}
                alt="Project protocol logo"
                className="me-2"
                style={{ height: '1.125rem' }}
              />
              {title}
            </h3>
            {titleHelper && <p className="small">{titleHelper}</p>}
          </div>
        )}
        {children}
      </Modal.Body>
    </Modal>
  )
}
