// components/StudentList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Modal } from 'react-bootstrap';
import EditStudent from './EditStudent';
import AddStudent from './AddStudent';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [faculties, setFaculties] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const studentsResponse = await axios.get('http://localhost:5235/api/student');
      const facultiesResponse = await axios.get('http://localhost:5235/api/faculty');
      setStudents(studentsResponse.data);
      setFaculties(facultiesResponse.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getFacultyName = (facultyID) => {
    const faculty = faculties.find((f) => f.facultyID === facultyID);
    return faculty ? faculty.facultyName : 'N/A';
  };

  const handleShowAddModal = () => {
    setShowAddModal(true);
  };

  const handleCloseAddModal = () => {
    setShowAddModal(false);
  };

  const handleShowEditModal = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedStudent(null);
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
      await axios.delete(`http://localhost:5235/api/student/${deleteID}`);
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
          Add Student
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Student Code</th>
            <th>Full Name</th>
            <th>Address</th>
            <th>Faculty</th>
            <th>Age</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.studentID}>
              <td>{student.studentCode}</td>
              <td>{student.fullName}</td>
              <td>{student.address}</td>
              <td>{getFacultyName(student.facultyID)}</td>
              <td>{student.age}</td>
              <td>{student.email}</td>
              <td>
                <Button variant="info" onClick={() => handleShowEditModal(student)}>
                  Edit
                </Button>{' '}
                <Button variant="danger" onClick={() => handleShowDeleteModal(student.studentID)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <EditStudent show={showEditModal} handleClose={handleCloseEditModal} fetchData={fetchData} student={selectedStudent} faculties={faculties} />
      <AddStudent show={showAddModal} handleClose={handleCloseAddModal} fetchData={fetchData} faculties={faculties} />

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

export default StudentList;
