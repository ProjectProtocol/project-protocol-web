import { ListGroup, ListGroupItem } from "react-bootstrap"
import { Link } from "react-router-dom"
import { startCase } from "lodash"

export default function Menu() {
  return (
    <ListGroup>
      <ListGroupItem>
        <Link to="">Home</Link>
      </ListGroupItem>
      {["account", "ethical-principles", "about", "faq", "contact-us"].map(
        (i) => (
          <ListGroupItem key={`link-${i}`}>
            <Link to={i}>{startCase(i)}</Link>
          </ListGroupItem>
        )
      )}
    </ListGroup>
  )
}
