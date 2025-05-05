import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from '../pages/Login';
import Home from '../pages/Home';
import UserEdit from '../pages/UserEdit';
import UserRegister from '../pages/UserRegister';

const AppRoutes: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<UserRegister />} />
        <Route path="/edit/:id" element={<UserEdit />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;