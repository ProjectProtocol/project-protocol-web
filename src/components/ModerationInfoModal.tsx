import { Link } from 'react-router-dom'
import PopUp, { IPopUp } from './PopUp'
import logo from 'src/images/icon.svg'
import { Button } from 'react-bootstrap'
import { ApiProfile } from 'src/api'

export default function ModerationInfoModal(props: IPopUp) {
  const acknowledgePolicy = async () => {
    const result = await ApiProfile.acknowledgePolicy()
    if (result) {
      props.onHide?.()
    }
  }
  return (
    <PopUp {...props} closeButton={props.closeButton}>
      <div style={{ maxWidth: '300px', margin: '0 auto' }}>
        <div className="d-flex flex-column align-items-center justify-content-center vertical-rhythm">
          <img src={logo} width="50" />
          <h3 className="text-center">Comments are hidden until approved</h3>
          <p>
            Your safety and the safety of the community is very important to us.
            For that reason, we will hide any comments you give until we approve
            them.
          </p>
          <p>
            Once approved, the comment will be visible on the Rate My PO page
            for the public to see.
          </p>
          <p>We review comments for the following things:</p>
          <ul>
            <li>
              Information that could identify you to a parole officer including
              personal information and details of events
            </li>
            <li>
              Information about a parole officer that could put them at risk of
              personal harm
            </li>
            <li>
              Descriptions of harmful activity or events that could lead to
              serious retaliation
            </li>
          </ul>
          <p>
            During the review process, we may email you to make changes to your
            comment. If you have any questions, contact us at{' '}
            <a href="mailto:info@projectprotocol.org">
              info@projectprotocol.org
            </a>
            .
          </p>
        </div>
        <div className="mt-3 text-center">
          <Link to="/terms-of-service">Read our terms of service</Link>
        </div>
        {!props.closeButton && (
          <div className="text-center">
            <Button onClick={acknowledgePolicy}>I understand</Button>
          </div>
        )}
      </div>
    </PopUp>
  )
}
