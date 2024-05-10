import React, { useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Col, InputGroup } from 'react-bootstrap';
import { FaSearch, FaRegEdit } from 'react-icons/fa';
import { GrView } from "react-icons/gr";
import StudentExamModal from './StudentExamModal';
import StudentExamModalView from './StudentExamModalView';
import { useParams } from 'react-router-dom';

const SubjectExamList = () => {
  const { examId } = useParams();
  const [keySearch, setKeySearch] = useState("");
  const [subjectExam, setSubjectExam] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [isAction, setIsAction] = useState(false);
  const fetchData = async () => {
    setIsLoading(false);
    setIsNotFound(false);
    try {
      const result = await axios.get(`http://localhost:5107/api/SubjectExam/employee-get-by-exam-bag?examID=${examId}&examBag=${keySearch}`);
      setSubjectExam(result.data);
      setIsAction(result.data.isEnterCandidatesAbsent);
      setIsLoading(true);
    } catch (error) {
      console.error(error);
      setIsNotFound(true);
    } finally {
    }
  };
  const handleSearch = () => {
    fetchData();
  };
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };
  const handleOpenModal = async () => {
    setShowModal(true);
  }
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleOpenModalView = async () => {
    setShowModalView(true);
  };
  const handleCloseModalView = () => {
    setShowModalView(false);
  };

  return (
    <div className='m-3'>
      <Col className="mb-3" md={6} lg={3}>
        <InputGroup>
          <Form.Control
            type="text" 
            placeholder="Nhập túi bài thi để tìm kiếm" 
            value={keySearch}
            aria-label="Example text with button addon"
            onChange={(e) => setKeySearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <Button onClick={handleSearch}>
            <FaSearch />
          </Button>
        </InputGroup>
      </Col>
      {isLoading && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center">Mã môn</th>
              <th className="text-center">Tên môn</th>
              <th className="text-center">Túi bài thi</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            {subjectExam && (
              <tr key={subjectExam.subjectExamID}>
                <td className="text-center">{subjectExam.subjectCode}</td>
                <td className="text-center">{subjectExam.subject && subjectExam.subject.subjectName}</td>
                <td className="text-center">{subjectExam.examBag}</td>
                <td className="text-center text-primary">
                  { isLoading && (isAction?
                    <GrView className="fs-4" onClick={handleOpenModalView}/>:
                    <FaRegEdit className="fs-4" onClick={handleOpenModal}/>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      )}
      {isNotFound && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th className="text-center">Mã môn</th>
              <th className="text-center">Tên môn</th>
              <th className="text-center">Túi bài thi</th>
              <th className="text-center">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="text-center text-primary" colSpan={4}><h4>Không tìm thấy túi bài thi</h4></td>
            </tr>
          </tbody>
        </Table>
      )}
      {isLoading && (
        <>
          <StudentExamModal showModal={showModal} handleClose={handleCloseModal} examID={examId} examBag={keySearch} setIsAction={setIsAction}/>
          <StudentExamModalView showModalView={showModalView} handleCloseView={handleCloseModalView} examID={examId} examBag={keySearch}/>
        </>
      )}
      
    </div>
  );
};

export default SubjectExamList;