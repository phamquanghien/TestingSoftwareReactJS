// AddFaculty.js
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddExam = ({ show, handleClose, fetchData }) => {
  const [newExam, setNewExam] = useState({
    examCode: '',
    examName: '',
    createDate: new Date(),
    createPerson:'Admin',
    isDelete: false,
    status: false,
    startRegistrationCode: 10000,
    isAutoGenRegistrationCode: false,
  });

  const handleInputChange = (e) => {
    setNewExam({ ...newExam, [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setNewExam({ ...newExam, [name]: checked });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5107/api/exam', newExam);
      handleClose(); // Close the modal after adding a new faculty
      fetchData(); // Refresh the faculty list after adding a new faculty
    } catch (error) {
      console.error(error);
    }
  };

  return (
    
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Tạo mới Kỳ thi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Exam Code:</Form.Label>
            <Form.Control type="text" name="examCode" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Exam Name:</Form.Label>
            <Form.Control type="text" name="examName" onChange={handleInputChange} />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Create Person:</Form.Label>
            <Form.Control type="text" name="examName" value={newExam.createPerson} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Note:</Form.Label>
            <Form.Control type="text" name="note" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phách bắt đầu:</Form.Label>
            <Form.Control type="text" name="startRegistrationCode" value={newExam.startRegistrationCode} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group as={Row}>
              <Form.Label as={Col} sm={8}>Tự động sinh phách:</Form.Label>
              <Col sm={3}>
              <Form.Check type="switch" name="isAutoGenRegistrationCode" checked={newExam.isAutoGenRegistrationCode} onChange={handleCheckboxChange} />
              </Col>
          </Form.Group>
          <hr/>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddExam;
