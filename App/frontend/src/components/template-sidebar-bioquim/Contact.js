import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import ReCAPTCHA from "react-google-recaptcha";

const Contact = () => {
  const [fields, setFields] = useState({ name: "", email: "", message: "" });
  const [response, setResponse] = useState("");

  const onFormSubmit = e => {
    e.preventDefault();

    setFields({ name: "", email: "", message: "" })
    setResponse("Gracias por comunicarte con nosotros")
  }

  const onChange = e => {
    let _fields = {...fields};

    if (e.target.name === "name")
      _fields.name = e.target.value;
    else if (e.target.name === "email")
      _fields.email = e.target.value;
    else if (e.target.name === "message")
      _fields.message = e.target.value;

    setFields(_fields)
    setResponse("")
  }

  return (
    <Row className="justify-content-md-center">
      <Col xs={12} md={8} lg={6} xl={4}>
        <Form onSubmit={e => {onFormSubmit(e)}}>
          <Form.Group controlId="nombre">
            <Form.Label>Nombre</Form.Label>
            <Form.Control type="text" placeholder="Nombre" name="name" required onChange={e => {onChange(e)}} value={fields.name} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>E-Mail</Form.Label>
            <Form.Control type="email" placeholder="E-Mail" name="email" required onChange={e => {onChange(e)}} value={fields.email} />
            <Form.Text className="text-muted">
              Nunca compartiremos tu E-Mail.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="mensaje" >
            <Form.Label>Mensaje</Form.Label>
            <Form.Control as="textarea" rows={4} name="message" required onChange={e => {onChange(e)}} value={fields.message}/>
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

export default Contact;
