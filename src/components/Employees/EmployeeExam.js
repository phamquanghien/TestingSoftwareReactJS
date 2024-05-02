// ExamList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Table} from 'react-bootstrap';
import { format } from 'date-fns';
import { FiSettings } from 'react-icons/fi';

const EmployeeExam = () => {
  const [exams, setExams] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5107/api/exam/get-exam-by-isActive');
      setExams(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='m-3'>
      <div className="d-flex justify-content-between mb-2">
        <br/>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='text-center'>Mã</th>
            <th className='text-center'>Tên kỳ thi</th>
            <th className='text-center'>Ngày tạo</th>
            <th className='text-center'>Nhập danh sách vắng thi</th>
          </tr>
        </thead>
        <tbody>
          {exams.map((exam) => (
            <tr key={exam.examId}>
                <td className='text-center'>{exam.examCode}</td>
                <td className='text-center'>{exam.examName}</td>
                <td className='text-center'>{format(exam.createDate,'dd/MM/yyyy')}</td>
                <td className="text-center text-primary">
                    <Link to={`/employee-examBag/${exam.examId}`}>
                        <FiSettings />
                    </Link>
                </td>
            </tr>
          ))}
        </tbody>
      </Table>

    </div>
  );
};

export default EmployeeExam;