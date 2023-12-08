import React from 'react';
import { useEffect } from 'react';
import {BrowserRouter, Routes, Route, Navigate, Outlet  } from "react-router-dom";
import { Box } from "@mui/material";
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import Login from './Login.js';
import Home from './Home.js';
import Users from './Users.js';
import Orders from './Orders.js';
import ProtectedRoutes from './ProtectedRoutes.js';
import authService from './AuthService';
import NavSideBar from './NavSideBar.js';
import AboutUs from './AboutUs.js';

function App() {

  useEffect(() => {
    const checkTokenExpiry = async () => {
      try {
        await authService.refreshAccessToken();
        console.log("expired");
      } catch (error) {
        window.location.href = '/';
        localStorage.clear(); // redirect to login page on token refresh failure or expiry
      }
    };

    const intervalId = setInterval(() => {
      checkTokenExpiry();
    }, 60000); // check token expiry every 60 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    
    <BrowserRouter>
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route element={<NavSideBar />}>
              <Route path="/Home" element={<Home />} />
              <Route path="/Users" element={<Users />} />
              <Route path="/Orders" element={<Orders />} />
              <Route path="/AboutUs" element={<AboutUs/>} />
          </Route>
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
    
  )
}

export default App;
