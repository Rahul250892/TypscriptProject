import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ProjectList from './pages/ProjectList';
import ProjectCreate from './pages/ProjectCreate';
import ProjectEdit from './pages/ProjectEdit';
import ProjectShow from './pages/ProjectShow';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Product from './pages/Product';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/project" element={<ProjectList />} />
        <Route path="/project/create" element={<ProjectCreate />} />
        <Route path="/project/edit/:id" element={<ProjectEdit />} />
        <Route path="/project/show/:id" element={<ProjectShow />} />
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product" element={<Product />} />
      </Routes>
    </Router>
  );
};

export default App;
