import { Link } from 'react-router-dom'
import PopUp, { IPopUp } from './PopUp'
import logo from 'src/images/icon.svg'

export default function ModerationInfoModal(props: IPopUp) {
  return (
    <PopUp {...props} closeButton>
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
              Details of events that could identify you to a parole officer
            </li>
            <li>
              Personal information that could identify you to a parole officer
            </li>
            <li>
              Details about a parole officer that could put them at risk of
              personal harm
            </li>
            <li>Descriptions of harmful activity.</li>
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
        <div className="mt-5 text-center">
          <Link to="/terms-of-service">Read our terms of service</Link>
        </div>
      </div>
    </PopUp>
  )
}
