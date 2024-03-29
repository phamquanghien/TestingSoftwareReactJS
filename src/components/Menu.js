import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const Menu = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <LinkContainer to="/exam">
            <Nav.Link>Exam</Nav.Link>
          </LinkContainer> */}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Menu;
