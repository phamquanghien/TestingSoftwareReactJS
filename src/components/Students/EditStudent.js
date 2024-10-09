// components/EditStudent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const EditStudent = ({ show, handleClose, fetchData, student, faculties }) => {
  const apiURL = process.env.REACT_APP_API_BASE_URL;
  const [editedStudent, setEditedStudent] = useState({
    studentID: '',
    studentCode: '',
    fullName: '',
    address: '',
    facultyID: '',
    age: '',
    email: '',
  });

  useEffect(() => {
    // Kiểm tra xem student có tồn tại hay không trước khi thiết lập giá trị
    if (student) {
      setEditedStudent({
        studentID: student.studentID || '', // Kiểm tra studentID
        studentCode: student.studentCode || '',
        fullName: student.fullName || '',
        address: student.address || '',
        facultyID: student.facultyID || '',
        age: student.age || '',
        email: student.email || '',
      });
    }
  }, [student]);

  const handleInputChange = (e) => {
    setEditedStudent({ ...editedStudent, [e.target.name]: e.target.value });
  };

  const handleEditStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiURL}/api/student/${editedStudent.studentID}`, editedStudent);
      handleClose();
      fetchData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEditStudent}>
          <Form.Group className="mb-3">
            <Form.Label>Student Code:</Form.Label>
            <Form.Control type="text" name="studentCode" value={editedStudent?.studentCode} readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control type="text" name="fullName" value={editedStudent?.fullName} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" name="address" value={editedStudent?.address} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Faculty:</Form.Label>
            <Form.Select name="facultyID" value={editedStudent?.facultyID} onChange={handleInputChange}>
              <option value="">Select Faculty</option>
              {faculties.map((faculty) => (
                <option key={faculty.facultyID} value={faculty.facultyID}>
                  {faculty.facultyName}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Age:</Form.Label>
            <Form.Control type="number" name="age" value={editedStudent?.age} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" name="email" value={editedStudent?.email} onChange={handleInputChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditStudent;
