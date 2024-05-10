// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Menu from './components/Menu';
import Exam from './components/Exams/ExamList';
import Student from './components/Students/StudentList';
import ConfigExam from './components/ConfigExams/ConfigExam';
import EmployeeExamBag from './components/Employees/EmployeeExamBag';
import EmployeeExam from './components/Employees/EmployeeExam';
import LecturersExam from './components/Lectures/LecturersExam';
import LecturersExamBag from './components/Lectures/LecturersExamBag';
import Menu from './components/Navigation/MenuDemo';
import SubjectExamByExamBag from './components/DownloadFile/SubjectExamByExamBag';

const App = () => {
  return (
    <Router>
      <div>
        {/* <Menu /> */}
        <Routes>
          <Route path="/" element={<Menu />} />
          <Route path="/admin" element={<Exam />} />
          <Route path="/config-exam/:examId" element={<ConfigExam />} />
          <Route path="/student" element={<Student />} />
          <Route path="/employee" element={<EmployeeExam />} />
          <Route path="/employee-examBag/:examId" element={<EmployeeExamBag />} />
          <Route path="/lecturers" element={<LecturersExam />} />
          <Route path="/lecturers-examBag/:examId" element={<LecturersExamBag />} />
          <Route path="/download/:examId" element={<SubjectExamByExamBag />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;