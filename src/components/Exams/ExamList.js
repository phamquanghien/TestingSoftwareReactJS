// ExamList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Table, Modal, InputGroup, DropdownButton, DropdownItem } from 'react-bootstrap';
import { format } from 'date-fns';
import AddExam from './AddExam';
import EditExam from './EditExam';

const ExamList = ({ examId, onConfigClick }) => {
  const [exams, setExams] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedExam, setSelectedExam] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5107/api/exam');
      setExams(response.data);
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

  const handleShowEditModal = (exam) => {
    setSelectedExam(exam);
    setShowEditModal(true);
  };

  const handleCloseEditModal = () => {
    setSelectedExam(null);
    setShowEditModal(false);
  };

  const handleShowDeleteModal = (exam) => {
    setSelectedExam(exam);
    setDeleteID(exam.examId);
    setShowDeleteModal(true);
  };

  const handleCloseDeleteModal = () => {
    setDeleteID(null);
    setSelectedExam(null);
    setShowDeleteModal(false);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5107/api/exam/${deleteID}`);
      fetchData();
      handleCloseDeleteModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='m-3'>
      <div className="d-flex justify-content-between mb-2">
        <br/>
        <Button variant="primary" onClick={handleShowAddModal}>
          + Create new
        </Button>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Mã</th>
            <th>Tên kỳ thi</th>
            <th>Ngày tạo</th>
            <th>Người tạo</th>
            <th>Ghi chú</th>
            <th>Phách bắt đầu</th>
            <th>Tự động sinh phách</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.examId}>
              <td>{exam.examCode}</td>
              <td>{exam.examName}</td>
              <td>{format(exam.createDate,'dd/MM/yyyy')}</td>
              <td>{exam.createPerson}</td>
              <td>{exam.note}</td>
              <td>{exam.startRegistrationCode}</td>
              <td>{exam.isAutoGenRegistrationCode?'Yes' : 'No'}</td>
              <td>
                <InputGroup className='mb-3'>
                  <DropdownButton variant="success" title="Actions" id="input-group-dropdown-1">
                    <DropdownItem onClick={() => handleShowEditModal(exam)}>Edit</DropdownItem>
                    <DropdownItem variant="danger" onClick={() => handleShowDeleteModal(exam)}>Delete</DropdownItem>
                    <DropdownItem href={`/config-exam/${exam.examId}`}>Config</DropdownItem>
                  </DropdownButton>
                </InputGroup>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {selectedExam && (
        <EditExam
          show={showEditModal}
          handleClose={handleCloseEditModal}
          fetchData={fetchData}
          exam={selectedExam}
        />
      )}
      <AddExam show={showAddModal} handleClose={handleCloseAddModal} fetchData={fetchData} />
      {selectedExam && (
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Bạn có muốn xoá bản ghi này không?</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{selectedExam.examName}</p>
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
      )}
    </div>
  );
};

export default ExamList;