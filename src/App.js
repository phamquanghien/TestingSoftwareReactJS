// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Student from './components/Students/StudentList';
import Faculty from './components/Faculties/FacultyList';
import Exam from './components/Exams/ExamList';

const App = () => {
  return (
    <Router>
      <div>
        <Menu />
        <Routes>
          <Route path="/student" element={<Student />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/exam" element={<Exam />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
