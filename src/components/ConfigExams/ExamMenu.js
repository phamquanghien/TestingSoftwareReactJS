import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
const ExamMenu = ({ onConfirmUploadClick, onGenRegistrationCode, OnDownloadFile }) => {
  return (
    <Navbar bg="light" expand="lg" className=''>
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <li className="nav-item ud-cursor w3-hover-light">
            <b className="nav-link active" onClick={onConfirmUploadClick} href="#">Upload Student</b>
          </li>
          <li className="nav-item ud-cursor">
            <b className="nav-link active" onClick={onGenRegistrationCode} href="#">Sinh phách</b>
          </li>
          <li className="nav-item ud-cursor">
            <b className="nav-link active" onClick={OnDownloadFile} href="#">Download</b>
          </li>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ExamMenu;
