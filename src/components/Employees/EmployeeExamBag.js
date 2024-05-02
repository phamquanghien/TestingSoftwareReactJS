// ExamList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EmployeeMenu from './EmployeeMenu';
import { useParams } from 'react-router-dom';
import SubjectExamList from './SubjectExamList';


const EmployeeExamBag = () => {
  const { examId } = useParams();
  const [exam, setExam] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
          const examData = await axios.get(`http://localhost:5107/api/Exam/${examId}`);
          setExam(examData.data);
        } catch (error) {
          console.error('Error fetching exam data:', error);
        }
    };
    fetchData();
  }, [examId]);

  return (
    <div>
      <EmployeeMenu/>
      <h2 className='m-3'>{exam.examName}</h2>
      <hr/>
      <SubjectExamList examID={examId}/>
    </div>
  );
};

export default EmployeeExamBag;