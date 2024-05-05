import React, { useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Col, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { GrView } from "react-icons/gr";
import LecturersUploadFile from './LecturersUploadFile';
import LecturersScanCode from './LecturersScanCode';
import LecturersExamModalView from './LecturersExamModalView';
import { IoCloudUploadOutline } from "react-icons/io5";
import { RxEnter } from "react-icons/rx";
import { useParams } from 'react-router-dom';

const SubjectExamList = () => {
  const { examId } = useParams();
  const [keySearch, setKeySearch] = useState("");
  const [subjectExam, setSubjectExam] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isCandidatesAbsent, setIsCandidatesAbsent] = useState(false);
  const [isMatchingTestScore, setIsMatchingTestScore] = useState(false);
  const [showModalView, setShowModalView] = useState(false);
  const [showModalUpload, setShowModalUpload] = useState(false);
  const [showModalScanCode, setShowModalScanCode] = useState(false);
  const fetchData = async () => {
    setIsLoading(false);
    setIsNotFound(false);
    try {
      const result = await axios.get(`http://localhost:5107/api/SubjectExam/employee-get-subject-exam?examID=${examId}&examBag=${keySearch}`);
      setSubjectExam(result.data);
      setIsCandidatesAbsent(result.data.isEnterCandidatesAbsent);
      setIsMatchingTestScore(result.data.isMatchingTestScore);
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
  const handleChange = (event) => {
    setKeySearch(event.target.value);
  };
  const handleOpenModalUpload = async () => {
    setShowModalUpload(true);
  };
  const handleCloseModalUpload = () => {
    setShowModalUpload(false);
  };
  const handleOpenModalScanCode = async () => {
    setShowModalScanCode(true);
  };
  const handleCloseModalScanCode = () => {
    setShowModalScanCode(false);
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
            onChange={handleChange} 
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
                  { isLoading && !isCandidatesAbsent && (
                    <h4>Vui lòng nhập danh sách vắng thi trước khi upload điểm</h4>
                  )}
                  { isLoading && isCandidatesAbsent && (isMatchingTestScore?
                    <GrView className="fs-4" onClick={handleOpenModalView}/>:
                    <>
                      <IoCloudUploadOutline className="fs-4 mr-4 border rounded p-1 bg-white border-danger" size={30} onClick={handleOpenModalUpload} title="Nhập điểm từ file excel"/> <RxEnter className="fs-4 border rounded p-1 bg-white border-success-subtle" size={30} onClick={handleOpenModalScanCode} title="Quét mã phách để nhập điểm"/>
                    </>
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
          <LecturersUploadFile showModalUpload={showModalUpload} handleCloseModalUpload={handleCloseModalUpload} examID={examId} examBag={keySearch} setIsMatchingTestScore={setIsMatchingTestScore}/>
          <LecturersScanCode showModalScanCode={showModalScanCode} handleCloseModalScanCode={handleCloseModalScanCode} examID={examId} examBag={keySearch} setIsMatchingTestScore={setIsMatchingTestScore}/>
        </>
      )}
      {isLoading && isMatchingTestScore && (
        <>
          <LecturersExamModalView showModalView={showModalView} handleCloseView={handleCloseModalView} examID={examId} examBag={keySearch}/>
        </>
      )}
    </div>
  );
};

export default SubjectExamList;