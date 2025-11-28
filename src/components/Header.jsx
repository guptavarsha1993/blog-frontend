import React from "react";
import { Link,useNavigate } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';
import Dashboard from '../pages/Dashboard.jsx';
import { Routes, Route  } from "react-router-dom";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

function Header(){
 const Navigate = useNavigate();

 const token = localStorage.getItem('token');

 const PublicRoute = ({children}) => {

  return token ? <Navigate to="/dashbaord" replace /> :children;

 };

 const PrivateRoute = ({children}) => {

  return token ? children : <Navigate to="/login" replace />;

 };


 const handleLogout=()=>{
  localStorage.removeItem('token');
    Navigate('/login');
 };


                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
        return (
          <>
        <Box sx={{ flexGrow: 1 }}>
              <AppBar position="static">
                <Toolbar>
                  <IconButton
                    size="large"
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ mr: 2 }}
                  >
               
                  </IconButton>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                     <Link to="/">Home</Link> 
                  </Typography>
                  
            {!token ? (
              <>
              
              <Link to="/login">Login</Link> | 
              <Link to="/register">Register</Link> | 
              
               </>
            ) : (
              <>
              <Link to="/dashboard">Dashboard</Link> |
              <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: 'white', textDecoration: 'underline', cursor: 'pointer' }}>
            Logout
          </button>
              </>
            )}
                </Toolbar>

              </AppBar>
            </Box>
          <Box>
              <Routes>
              <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
              <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route onClick={handleLogout} element={<PrivateRoute></PrivateRoute>} />
              </Routes>
          </Box>
  </>
    );

}

export default Header;



