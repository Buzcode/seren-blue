// frontend/src/pages/AdminPanelPage.jsx
import React from 'react';
import AdminPanel from '../components/AdminPanel'; // Import the AdminPanel COMPONENT

const AdminPanelPage = () => {
  return (
    <div>
      <h1>Admin Panel Page</h1>
      <p>Welcome to the Admin Panel.</p>
      <AdminPanel /> {/*  Render the AdminPanel component here */}
    </div>
  );
};

export default AdminPanelPage;