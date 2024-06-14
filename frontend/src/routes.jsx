import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import MainBlock from './components/MainBlock';
import Login from './pages/Login';
import Registration from './pages/Registration';

const useRoutes = (isLogin) => {
    if (isLogin) {
      return (
        <Routes>
          <Route path="/" element={<MainBlock />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      );
    }
  
    return (
      <Routes>
        <Route path="/registration" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    );
  };
  
  export default useRoutes;
  