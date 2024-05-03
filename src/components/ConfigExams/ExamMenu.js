import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
const ExamMenu = ({
  onConfirmUploadClick,
  onGenRegistrationCode,
  onEnterExamResult,
}) => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* <LinkContainer to="/upload-student">
            <Nav.Link>Upload</Nav.Link>
          </LinkContainer> */}
          <Button className="nav-link" onClick={onConfirmUploadClick}>
            Upload Student
          </Button>
          <Button className="nav-link" onClick={onGenRegistrationCode}>
            Sinh phách
          </Button>
          <Button className="nav-link" onClick={onEnterExamResult}>
            Nhập điểm
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ExamMenu;
