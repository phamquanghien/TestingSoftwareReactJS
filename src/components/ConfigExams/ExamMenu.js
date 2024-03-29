import React from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
const ExamMenu = ({ onConfirmClick }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <LinkContainer to="/upload-student">
            <Nav.Link>Upload</Nav.Link>
          </LinkContainer> */}
          <Button className="nav-link" onClick={onConfirmClick}>Upload Student</Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ExamMenu;
