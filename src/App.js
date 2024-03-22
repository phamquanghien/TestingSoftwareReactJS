// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Menu from './components/Menu';
import Student from './components/Students/StudentList';
import Faculty from './components/Faculties/FacultyList';

const App = () => {
  return (
    <Router>
      <div>
        <Menu />
        <Routes>
          <Route path="/student" element={<Student />} />
          <Route path="/faculty" element={<Faculty />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
