// EditFaculty.js
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const EditFaculty = ({ show, handleClose, fetchData, faculty }) => {
  const apiURL = process.env.REACT_APP_API_BASE_URL;
  const [editedFaculty, setEditedFaculty] = useState({
    facultyID: faculty.facultyID,
    facultyCode: faculty.facultyCode,
    facultyName: faculty.facultyName,
  });

  const handleInputChange = (e) => {
    setEditedFaculty({ ...editedFaculty, [e.target.name]: e.target.value });
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${apiURL}/api/faculty/${editedFaculty.facultyID}`, editedFaculty);
      handleClose(); // Close the modal after editing the faculty
      fetchData(); // Refresh the faculty list after editing
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Faculty</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleEdit}>
          <Form.Group className="mb-3">
            <Form.Label>Faculty Code:</Form.Label>
            <Form.Control type="text" name="facultyCode" value={editedFaculty.facultyCode} onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Faculty Name:</Form.Label>
            <Form.Control type="text" name="facultyName" value={editedFaculty.facultyName} onChange={handleInputChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EditFaculty;
