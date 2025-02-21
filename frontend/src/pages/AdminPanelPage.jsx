import React from 'react';
import AdminPanel from '../components/AdminPanel';
import { useAuth } from '../context/AuthContext'; // Import useAuth
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

const AdminPanelPage = () => {
  const { token } = useAuth(); // Get the JWT token from AuthContext
  let userRole = null; // Initialize userRole to null

  if (token) {
    try {
      const decodedToken = jwtDecode(token); // Decode the JWT token
      userRole = decodedToken.role; // Extract the role from the decoded token
    } catch (error) {
      console.error("Error decoding JWT token in AdminPanelPage:", error);
      // Handle token decoding error if needed
    }
  }

  return (
    <div>
      <h1>Admin Panel Page</h1>

      {/* Conditionally render Admin indicator based on userRole */}
      {userRole === 'admin' && (
        <div style={{ backgroundColor: '#e0f7fa', padding: '10px', marginBottom: '20px', border: '1px solid #b2ebf2', borderRadius: '5px', textAlign: 'center', color: '#0097a7' }}>
          <strong><i className="fas fa-shield-alt"></i> You are logged in as Admin. <i className="fas fa-shield-alt"></i></strong>
        </div>
      )}

      <p>Welcome to the Admin Panel.</p>
      <AdminPanel />
    </div>
  );
};

export default AdminPanelPage;