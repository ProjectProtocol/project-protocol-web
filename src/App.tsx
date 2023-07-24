import Container from "react-bootstrap/Container"
import icon from "./images/icon.svg"
import { Button, FloatingLabel, Form } from "react-bootstrap"

function App() {
  return (
    <Container className="pt-5">
      <div className="d-flex justify-content-center align-items-center flex-column mb-5">
        <div
          className="bg-light bg-gradient p-2 border rounded-5 d-flex align-items-center justify-content-center"
          style={{ height: "100px", width: "100px" }}
        >
          <img src={icon} alt="Project protocol logo" />
        </div>
      </div>
      <div className="m-auto p-3" style={{ maxWidth: "300px" }}>
        <h4 className="mb-3">Log in to Project Protocol</h4>
        <Form>
          <FloatingLabel label="Email address" className="mb-3">
            <Form.Control
              type="email"
              name="email"
              placeholder="name@example.com"
            />
          </FloatingLabel>
          <FloatingLabel label="Password" className="mb-3">
            <Form.Control type="password" placeholder="Password" />
          </FloatingLabel>
          <Button
            size="lg"
            variant="primary"
            type="submit"
            className="float-end"
          >
            Submit
          </Button>
        </Form>
      </div>
    </Container>
  )
}

export default App
