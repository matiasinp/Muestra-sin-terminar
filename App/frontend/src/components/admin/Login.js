import React, {useState} from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";

const Login = () => {
  const [fields, setFields] = useState({ user: "", password: "" });
  const [response, setResponse] = useState("");

  const onFormSubmit = e => {
    e.preventDefault();

    setFields({ user: "", password: "" })
    setResponse("Gracias por comunicarte con nosotros")
  }

  const onChange = e => {
    let _fields = {...fields};

    if (e.target.name === "user")
      _fields.user = e.target.value;
    else if (e.target.name === "password")
      _fields.password = e.target.value;

    setFields(_fields)
    setResponse("")
  }

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={8} lg={6} xl={4}>
        <Form onSubmit={e => {onFormSubmit(e)}}>
          <Form.Group controlId="user">
            <Form.Label>Usuario</Form.Label>
            <Form.Control type="text" placeholder="Usuario" name="user" required onChange={e => {onChange(e)}} value={fields.user} />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" name="password" required onChange={e => {onChange(e)}} value={fields.password} />
          </Form.Group>

          <Form.Group controlId="ReCAPTCHA">

          </Form.Group>

          <Button
          variant="primary"
          type="submit"
          style={{
            width: "100%",
            background: "#0e94b5",
            borderColor: "#0e94b5"
          }}>
            Enviar
          </Button>
          <p className="text-justify">{response}</p>
        </Form>
      </Col>
    </Row>
  );
}

export default Login;
