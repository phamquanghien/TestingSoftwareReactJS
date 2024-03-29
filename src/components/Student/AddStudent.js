// components/AddStudent.js
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const AddStudent = ({ show, handleClose, fetchData, faculties }) => {
  const [newStudent, setNewStudent] = useState({
    studentCode: '',
    fullName: '',
    address: '',
    facultyID: '', // Add facultyID field for the association with Faculty
    age: 0,
    email: '',
  });

  const handleInputChange = (e) => {
    setNewStudent({ ...newStudent, [e.target.name]: e.target.value });
  };

  const handleAddStudent = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5235/api/student', newStudent);
      handleClose(); // Close the modal after adding a new student
      fetchData(); // Refresh the student list after adding a new student
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Student</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleAddStudent}>
          <Form.Group className="mb-3">
            <Form.Label>Student Code:</Form.Label>
            <Form.Control type="text" name="studentCode" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Full Name:</Form.Label>
            <Form.Control type="text" name="fullName" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Address:</Form.Label>
            <Form.Control type="text" name="address" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Faculty:</Form.Label>
            <Form.Select name="facultyID" onChange={handleInputChange}>
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
            <Form.Control type="number" name="age" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email:</Form.Label>
            <Form.Control type="email" name="email" onChange={handleInputChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddStudent;
