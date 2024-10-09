// AddFaculty.js
import React, { useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

const AddFaculty = ({ show, handleClose, fetchData }) => {
  const apiURL = process.env.REACT_APP_API_BASE_URL;
  const [newFaculty, setNewFaculty] = useState({
    facultyCode: '',
    facultyName: '',
  });

  const handleInputChange = (e) => {
    setNewFaculty({ ...newFaculty, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(apiURL + '/api/faculty', newFaculty);
      handleClose(); // Close the modal after adding a new faculty
      fetchData(); // Refresh the faculty list after adding a new faculty
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Faculty</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Faculty Code:</Form.Label>
            <Form.Control type="text" name="facultyCode" onChange={handleInputChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Faculty Name:</Form.Label>
            <Form.Control type="text" name="facultyName" onChange={handleInputChange} />
          </Form.Group>
          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddFaculty;
