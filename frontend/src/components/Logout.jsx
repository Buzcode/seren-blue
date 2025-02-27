
import React from 'react';
import { Link } from 'react-router-dom'; 
import { useAuth } from '../context/AuthContext'; 

const Logout = () => { 
  const { token, logout } = useAuth(); // Get token and logout function from AuthContext

  const handleLogout = () => {
    console.log("Logout.jsx handleLogout function is being called!");
    logout(); 
  };

  return (
    <nav className="bg-gray-100 p-4"> 
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-xl">Seren Blue</div>
        <ul className="flex space-x-4">
          <li>
            <Link to="/" className="hover:text-gray-500">Home</Link> 
          </li>
          <li>
            <Link to="/all-doctors" className="hover:text-gray-500">All Doctors</Link> 
          </li>
          <li>
            <Link to="/find-ambulance" className="hover:text-gray-500">Find Ambulance</Link> 
          </li>
          <li>
            <Link to="/about" className="hover:text-gray-500">About</Link> 
          </li>
          <li>
            <Link to="/contact" className="hover:text-gray-500">Contact</Link> 
          </li>
          {token && ( // Conditionally show "Admin Panel" and "Logout" if logged in
            <>
              <li>
                <Link to="/admin-panel" className="hover:text-gray-500">Admin Panel</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:text-gray-500">Logout</button> 
              </li>
            </>
          )}
          {!token && ( 
            <li>
              <Link to="/login" className="hover:text-gray-500">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Logout; 