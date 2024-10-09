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

  const [errors, setErrors] = useState({});
  const [isChecking, setIsChecking] = useState(false);

  const checkExamCodeExist = async (examCode) => {
    setIsChecking(true);
    try {
      const response = await axios.get(`${apiURL}/api/exam/check-exam-code/${editedExam.examId}/${examCode}`);
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
    setEditedExam((prev) => ({ 
      ...prev, 
      [name]: name === 'startRegistrationCode' ? value.replace(/\D/, '') : value.trim() 
    }));
  
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setEditedExam((prev) => ({ ...prev, [name]: checked }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!editedExam.examCode) newErrors.examCode = 'Không được để trống';
    if (!editedExam.examName) newErrors.examName = 'Không được để trống';
    if (!editedExam.startRegistrationCode) {
      newErrors.startRegistrationCode = 'Không được để trống';
    } else if (isNaN(editedExam.startRegistrationCode)) {
      newErrors.startRegistrationCode = 'Bắt buộc nhập dữ liệu kiểu số';
    } else if (Number(editedExam.startRegistrationCode) < 1000 || Number(editedExam.startRegistrationCode) > 1000000) {
      newErrors.startRegistrationCode = 'Nhập giá trị trong khoảng 1.000 - 1.000.000';
    }
    return newErrors;
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    const isExist = await checkExamCodeExist(editedExam.examCode);
    if (isExist) {
      setErrors((prev) => ({ ...prev, examCode: 'Exam Code đã được sử dụng, vui lòng nhập giá trị khác!' }));
      return;
    }
    try {
      await axios.put(`${apiURL}/api/exam/${editedExam.examId}`, editedExam);
      handleClose();
      fetchData();
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
            <Form.Control 
              type="text" 
              name="examCode" 
              value={editedExam.examCode} 
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
              value={editedExam.examName} 
              onChange={handleInputChange} 
              isInvalid={!!errors.examName}
            />
            {errors.examName && (
              <Form.Control.Feedback type="invalid">{errors.examName}</Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Người tạo:</Form.Label>
            <Form.Control type="text" name="createPerson" value={editedExam.createPerson} onChange={handleInputChange} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Chú thích:</Form.Label>
            <Form.Control type="text" name="note" value={editedExam.note} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Phách bắt đầu:</Form.Label>
            <Form.Control 
              type="number" 
              name="startRegistrationCode" 
              value={editedExam.startRegistrationCode} 
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
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>Hủy</Button>
            <Button variant="primary" type="submit">Lưu thay đổi</Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditExam;