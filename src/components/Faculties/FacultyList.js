// FacultyList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Modal } from 'react-bootstrap';
import AddFaculty from './AddFaculty';
import EditFaculty from './EditFaculty';

const FacultyList = () => {
  const apiURL = process.env.REACT_APP_API_BASE_URL;
  const [faculties, setFaculties] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(apiURL + '/api/faculty');
      setFaculties(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleShowEditModal = (faculty) => {
    setSelectedFaculty(faculty);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedFaculty(null);
    setShowEditModal(false);
  };

  const handleShowDeleteModal = (studentID) => {
    setDeleteID(studentID);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteID(null);
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5235/api/faculty/${deleteID}`);
      fetchData();
      handleCloseDeleteModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between mb-2">
        <Button variant="primary" onClick={handleShowAddModal}>
          Add Faculty
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Faculty Code</th>
            <th>Faculty Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faculties.map((faculty) => (
            <tr key={faculty.facultyID}>
              <td>{faculty.facultyCode}</td>
              <td>{faculty.facultyName}</td>
              <td>
                <Button variant="info" onClick={() => handleShowEditModal(faculty)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleShowDeleteModal(faculty.facultyID)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedFaculty && (
        <EditFaculty
          show={showEditModal}
          handleClose={handleCloseEditModal}
          fetchData={fetchData}
          faculty={selectedFaculty}
        />
      )}
      <AddFaculty show={showAddModal} handleClose={handleCloseAddModal} fetchData={fetchData} />
      {/* Modal xác nhận xóa */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this record?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default FacultyList;
