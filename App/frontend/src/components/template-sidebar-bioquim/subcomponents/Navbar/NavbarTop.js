import React, { useState } from "react";
import { Navbar, Nav, Form, Container, Button, ListGroup } from "react-bootstrap";
import { Link } from 'react-router-dom';
import './NavbarTop.css';
import { FiMenu } from "react-icons/fi";
import { GoSearch } from "react-icons/go";

const NavbarTop = (props) => {
  const { active } = props;
  const [nav, setNav] = useState(false);

  const handleNav = () => setNav(!nav);

  return (
    <div className="NavbarTop">
      <div className={"navbarTop" + active } id="navbarTop1" />
      <Navbar className={"navbar navbarTop" + active } variant="light" bg="light" expand="lg" id="navbarTop2">
          <Container fluid>
              {props.children}
              <Button className="d-inline-block d-lg-none ml-auto" variant="dark" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded={!nav ? true : false} aria-label="Toggle navigation" onClick={handleNav}>
                  <FiMenu style={{fontSize:"1.5em"}}/>
              </Button>

              <Navbar.Collapse in={nav}>
                <ListGroup style={ {flexDirection: window.matchMedia('(max-width: 991px)').matches ? "column" : "row"} }>
                  <ListGroup.Item>
                    <Link to={"/"} onClick={handleNav}>Inicio</Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to={"/Noticias/"} onClick={handleNav}>Noticias</Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to={"/quienessomos/"} onClick={handleNav}>Institucional</Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Link to={"/contacto/"} onClick={handleNav}>Contacto</Link>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Form inline className="d-flex justify-content-center md-form form-sm active-cyan-2 mt-2">
                      <Form.Control type="text" placeholder="Buscar" size="sm" className="mr-3 w-75"/>
                      <GoSearch/>
                    </Form>
                  </ListGroup.Item>
                </ListGroup>
              </Navbar.Collapse>
          </Container>
      </Navbar>
      <div className={active } id="navbarTop3" />
    </div>
  )
}

export default NavbarTop;
