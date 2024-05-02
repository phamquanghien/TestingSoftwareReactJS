import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { IoPersonOutline } from "react-icons/io5";

const MenuDemo = () => {
  return (
    <Container className="menu-container"> {/* Sử dụng className để áp dụng lớp CSS */}
      <Row className="justify-content-center align-items-center"> {/* Thêm align-items-center để căn giữa theo chiều dọc */}
        <Col md={4}>
          <Card className='text-center' style={{ width: '18rem' }}>
            <div className="icon-wrapper">
              <IoPersonOutline size={120} variant="top"/>
            </div>
            <Card.Body>
              <Button href="admin" variant="primary">Admin Login</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='text-center' style={{ width: '18rem' }}>
            <div className="icon-wrapper">
              <IoPersonOutline size={120} variant="top"/>
            </div>
            <Card.Body>
              <Button href="/employee" variant="primary">Employee Login</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className='text-center' style={{ width: '18rem' }}>
            <div className="icon-wrapper">
              <IoPersonOutline size={120} variant="top"/>
            </div>
            <Card.Body>
              <Button href="/lecturers" variant="primary">Lecture Login</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default MenuDemo;