import React, { useState } from 'react';
import axios from 'axios';
import { Table, Form, Button, Col, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { FaFileDownload } from "react-icons/fa";
import { useParams } from 'react-router-dom';

const SubjectExamList = () => {
  const { examId } = useParams();
  const [keySearch, setKeySearch] = useState("");
  const [subjectExam, setSubjectExam] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);
  const fetchData = async () => {
    setIsLoading(false);
    setIsNotFound(false);
    try {
      const result = await axios.get(`http://localhost:5107/api/SubjectExam/employee-get-subject-exam?examID=${examId}&examBag=${keySearch}`);
      setSubjectExam(result.data);
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
  const handleDownload = async () => {
    const response = await axios.get(`http://localhost:5107/api/RegistrationCode/download-excel-file?examID=${examId}&examBag=${keySearch}`, {
        responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'TuiBaiThi' + keySearch + '.xlsx'); // Đặt tên file mặc định
    document.body.appendChild(link);
    link.click();
    window.URL.revokeObjectURL(url);
  }

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
                  <FaFileDownload onClick={handleDownload}/>
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
    </div>
  );
};

export default SubjectExamList;