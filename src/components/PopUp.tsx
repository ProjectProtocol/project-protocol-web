import { useTranslation } from 'react-i18next'
import { Modal, ModalProps } from 'react-bootstrap'
import defaultIcon from 'src/images/icon.svg'

export interface IPopUp extends ModalProps {
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
  closeButton,
  ...props
}: IPopUp) {
  const { t } = useTranslation()

  return (
    <Modal centered {...props}>
      <Modal.Header closeButton={closeButton} />
      <Modal.Body className={bodyClass}>
        {title && (
          <div className="mb-3">
            <h3>
              <img
                src={icon || defaultIcon}
                alt={t('ui.ppLogoAlt')}
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
