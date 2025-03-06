// AdminPanelPage.jsx (with console logs)
import React from 'react';
import AdminPanel from '../components/AdminPanel';
import Login from './Login';
import { useAuth } from '../context/AuthContext';
import { jwtDecode } from 'jwt-decode';

const AdminPanelPage = () => {
  const { token } = useAuth();
  let userRole = null;

  console.log("AdminPanelPage - Token from useAuth:", token); // <--- ADD THIS LOG

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userRole = decodedToken.role;
      console.log("AdminPanelPage - Decoded Role:", userRole); // <--- ADD THIS LOG
    } catch (error) {
      console.error("Error decoding JWT token in AdminPanelPage:", error);
    }
  } else {
    console.log("AdminPanelPage - No token found."); // <--- ADD THIS LOG
  }

  if (!token || userRole !== 'admin') {
    console.log("AdminPanelPage - Not authorized, rendering Login."); // <--- ADD THIS LOG
    return (
      <div>
        <h1>Admin Login Required</h1>
        <p>Please log in as an administrator to access this page.</p>
        <Login />
      </div>
    );
  }

  console.log("AdminPanelPage - Authorized, rendering Admin Panel."); // <--- ADD THIS LOG
  return (
    <div>
      <AdminPanel />
    </div>
  );
};

export default AdminPanelPage;