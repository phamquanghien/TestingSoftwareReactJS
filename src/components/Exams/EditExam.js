// EditExam.js
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const EditExam = ({ show, handleClose, fetchData, exam }) => {
  const apiURL = process.env.REACT_APP_API_BASE_URL;
  const [editedExam, setEditedExam] = useState({
    examId: exam.examId,
    examCode: exam.examCode,
    examName: exam.examName,
    createDate: exam.createDate,
    createPerson: exam.createPerson,
    note: exam.note,
    isDelete: exam.isDelete,
    status: exam.status,
    startRegistrationCode: exam.startRegistrationCode,
    isAutoGenRegistrationCode: exam.isAutoGenRegistrationCode,
  });

  const handleInputChange = (e) => {
    setEditedExam({ ...editedExam, [e.target.name]: e.target.value });
  };
  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setEditedExam({ ...editedExam, [name]: checked });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiURL}/api/exam/${editedExam.examId}`, editedExam);
      handleClose(); // Close the modal after editing the faculty
      fetchData(); // Refresh the faculty list after editing
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Sửa thông tin kỳ thi</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEdit}>
          <Form.Group className="mb-3">
            <Form.Label>Mã kỳ thi:</Form.Label>
            <Form.Control type="text" name="examCode" value={editedExam.examCode} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tên kỳ thi:</Form.Label>
            <Form.Control type="text" name="examName" value={editedExam.examName} onChange={handleInputChange} />
          </Form.Group>
          
          <Form.Group className="mb-3">
            <Form.Label>Người tạo:</Form.Label>
            <Form.Control type="text" name="createPerson" value={editedExam.createPerson} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Chú thích:</Form.Label>
            <Form.Control type="text" name="note" value={editedExam.note} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phách bắt đầu:</Form.Label>
            <Form.Control type="number" name="startRegistrationCode" value={editedExam.startRegistrationCode} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group as={Row}>
              <Form.Label as={Col} sm={8}>Tự động sinh phách:</Form.Label>
              <Col sm={3}>
              <Form.Check type="switch" name="isAutoGenRegistrationCode" checked={editedExam.isAutoGenRegistrationCode} onChange={handleCheckboxChange} />
              </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label as={Col} sm={3}>Đã xoá?</Form.Label>
            <Col sm={2}>
                <Form.Check type="switch" name="isDelete" checked={editedExam.isDelete} onChange={handleCheckboxChange} />
            </Col>
            <Form.Label as={Col} sm={3}>Trạng thái:</Form.Label>
            <Col sm={2}>
            <Form.Check type="switch" name="status" checked={editedExam.status} onChange={handleCheckboxChange} />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={handleClose}>Cancel</Button>
        <Button variant="primary" type="submit" onClick={handleEdit}>Save Changes</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditExam;
