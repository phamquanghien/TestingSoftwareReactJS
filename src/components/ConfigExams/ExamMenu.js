import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
const ExamMenu = ({ onConfirmUploadClick, onGenRegistrationCode, OnProcess }) => {
  return (
    <Navbar bg="light" expand="lg" className='ml-2'>
      <Navbar.Brand href="/">Home</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <li className="nav-item ud-cursor">
            <b className="nav-link active w3-hover-text-blue" onClick={onConfirmUploadClick} href="#">Upload Student</b>
          </li>
          <li className="nav-item ud-cursor">
            <b className="nav-link active w3-hover-text-blue" onClick={onGenRegistrationCode} href="#">Sinh phách</b>
          </li>
          <li className="nav-item ud-cursor">
            <b className="nav-link active w3-hover-text-blue" onClick={() => OnProcess(0)} href="#">Cập nhật dữ liệu</b>
          </li>
          <li className="nav-item ud-cursor">
            <b className="nav-link active w3-hover-text-blue" onClick={() => OnProcess(1)} href="#">Tải file phách</b>
          </li>
          <li className="nav-item ud-cursor">
            <b className="nav-link active w3-hover-text-blue" onClick={() => OnProcess(2)} href="#">Thống kê</b>
          </li>
          <li className="nav-item ud-cursor">
            <b className="nav-link active w3-hover-text-blue" onClick={() => OnProcess(3)} href="#">Phúc khảo</b>
          </li>
          <li className="nav-item ud-cursor">
            <b className="nav-link active w3-hover-text-blue" onClick={() => OnProcess(4)} href="#">Xuất bảng điểm</b>
          </li>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default ExamMenu;
