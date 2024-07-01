// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Signup from './components/Signup';
import Login from './components/Login';
import ProtectedRoute from './components/ProtectedRoute.js';

const App = () => {
  return (
    <div className="h-screen flex flex-col">
      <Navbar />
      <Routes className="flex-grow">
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
      </Routes>
    </div>
  );
};

export default App;
