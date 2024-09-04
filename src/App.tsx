import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import ProjectCreate from './pages/ProjectCreate'
import ProjectEdit from './pages/ProjectEdit';
import ProjectShow from './pages/ProjectShow';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
           <Route path="/dashboard" element={<ProjectList />} />
          <Route path="/create" element={<ProjectCreate />} />
          <Route path="/edit/:id" element={<ProjectEdit />} />
          <Route path="/show/:id" element={<ProjectShow />} />
      </Routes>
    </Router>
  );
};

export default App;
