// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Menu from './components/Menu';
import Exam from './components/Exams/ExamList';
import Student from './components/Students/StudentList';
import ConfigExam from './components/ConfigExams/ConfigExam';

const App = () => {
  return (
    <Router>
      <div>
        {/* <Menu /> */}
        <Routes>
          <Route path="/" element={<Exam />} />
          <Route path="/config-exam/:examId" element={<ConfigExam />} />
          <Route path="/student" element={<Student />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
