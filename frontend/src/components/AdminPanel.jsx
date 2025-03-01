
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const AdminPanel = () => {
  // State for form inputs
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('doctor'); // Default role is 'doctor' - for doctor creation form

  const { token } = useAuth(); // Get the JWT token from the AuthContext

  const handleCreateUser = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5001/api/admin/create-user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Include the JWT token
        },
        body: JSON.stringify({
          username,
          displayName,
          password,
          role,
        }),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Create user failed:', errorData);
        alert(`Create user failed: ${errorData.error || 'Unknown error'}`); // Display error from backend
        return;
      }

      const responseData = await response.json();
      console.log('User created successfully:', responseData);
      alert('User created successfully!');

      // Reset the form after successful creation
      setUsername('');
      setDisplayName('');
      setPassword('');
      setRole('doctor'); // Reset role back to 'doctor' for next doctor creation

    } catch (error) {
      console.error('Error creating user:', error);
      alert('Error creating user. Please try again.');
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <p>Here you can manage users.</p>

      <form onSubmit={handleCreateUser} className="max-w-md mt-4">
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="displayName" className="block text-gray-700 text-sm font-bold mb-2">
            Display Name (Optional)
          </label>
          <input
            type="text"
            id="displayName"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Display Name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 text-sm font-bold mb-2">
            Role
          </label>
          <select
            id="role"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="doctor">Doctor</option> {/* Option to create 'doctor' users */}
            <option value="admin">Admin</option>  {/* Option to create 'admin' users - if you want to add admin creation here */}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPanel;