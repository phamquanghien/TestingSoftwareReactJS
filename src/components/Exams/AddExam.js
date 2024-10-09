import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';

const AddExam = ({ show, handleClose, fetchData }) => {
  const [newExam, setNewExam] = useState({
    examCode: '',
    examName: '',
    createDate: new Date(),
    createPerson: 'Admin',
    note: '',
    isDelete: false,
    status: false,
    startRegistrationCode: 10000,
    isAutoGenRegistrationCode: false,
  });

  const [errors, setErrors] = useState({});
  const [isChecking, setIsChecking] = useState(false);

  const checkExamCodeExist = async (examCode) => {
    setIsChecking(true);
    try {
      const response = await axios.get(`http://localhost:5107/api/exam/check-exam-code/${examCode}`);
      return response.data;
    } catch (error) {
      console.error('Error checking ExamCode:', error);
      return false;
    } finally {
      setIsChecking(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewExam({ 
      ...newExam, 
      [name]: name === 'startRegistrationCode' ? value.replace(/\D/, '') : value.trim()
    });
  
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setNewExam({ ...newExam, [name]: checked });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!newExam.examCode) newErrors.examCode = 'Không được để trống';
    if (!newExam.examName) newErrors.examName = 'Không được để trống';
    if (!newExam.startRegistrationCode) {
      newErrors.startRegistrationCode = 'Không được để trống';
    } else if (isNaN(newExam.startRegistrationCode)) {
      newErrors.startRegistrationCode = 'Bắt buộc nhập dữ liệu kiểu số';
    } else if (Number(newExam.startRegistrationCode) < 1000 || Number(newExam.startRegistrationCode) > 1000000) {
      newErrors.startRegistrationCode = 'Nhập giá trị >= 1000';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const isExist = await checkExamCodeExist(newExam.examCode);
    if (isExist) {
      setErrors({ ...errors, examCode: 'Exam Code đã được sử dụng, vui lòng nhập giá trị khác!' });
      return;
    }
    try {
      await axios.post('http://localhost:5107/api/exam', newExam);
      handleClose();
      fetchData();
      setNewExam({
        examCode: '',
        examName: '',
        createDate: new Date(),
        createPerson: 'Admin',
        note: '',
        isDelete: false,
        status: false,
        startRegistrationCode: 10000,
        isAutoGenRegistrationCode: false,
      });
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
            <Form.Label>Mã kỳ thi:</Form.Label>
            <Form.Control 
              type="text" 
              name="examCode" 
              value={newExam.examCode} 
              onChange={handleInputChange} 
              isInvalid={!!errors.examCode} 
              disabled={isChecking} 
            />
            {errors.examCode && (
              <Form.Control.Feedback type="invalid">{errors.examCode}</Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Tên kỳ thi:</Form.Label>
            <Form.Control 
              type="text" 
              name="examName" 
              value={newExam.examName} 
              onChange={handleInputChange} 
              isInvalid={!!errors.examName} 
            />
            {errors.examName && (
              <Form.Control.Feedback type="invalid">{errors.examName}</Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Người tạo:</Form.Label>
            <Form.Control 
              type="text" 
              name="createPerson" 
              value={newExam.createPerson} 
              onChange={handleInputChange} 
              readOnly 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Chú thích:</Form.Label>
            <Form.Control 
              type="text" 
              name="note" 
              value={newExam.note} 
              onChange={handleInputChange} 
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phách bắt đầu:</Form.Label>
            <Form.Control 
              type="text" 
              name="startRegistrationCode" 
              value={newExam.startRegistrationCode} 
              onChange={handleInputChange} 
              isInvalid={!!errors.startRegistrationCode} 
            />
            {errors.startRegistrationCode && (
              <Form.Control.Feedback type="invalid">{errors.startRegistrationCode}</Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label as={Col} sm={8}>Tự động sinh phách:</Form.Label>
            <Col sm={3}>
              <Form.Check 
                type="switch" 
                name="isAutoGenRegistrationCode" 
                checked={newExam.isAutoGenRegistrationCode} 
                onChange={handleCheckboxChange} 
              />
            </Col>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          + Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddExam;