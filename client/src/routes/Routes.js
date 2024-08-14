import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/Login';
import SignUp from '../components/SignUp';
import Dashboard from '../components/dashboard';
import PrivateRoute from '../routes/PrivateRoute'; 

const RoutesComponent = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/" element={<Login />} />
    <Route
      path="/dashboard"
      element={<PrivateRoute element={<Dashboard />} />}
    />
  </Routes>
);

export default RoutesComponent;
