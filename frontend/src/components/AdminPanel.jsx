import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const AdminPanel = () => {
    const [username, setUsername] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('Doctor'); // Default role is Doctor

    const { token } = useAuth(); // Get JWT token from AuthContext

    const handleCreateUser = async (event) => {
        event.preventDefault(); // Prevent default form submission

        const userData = {
            username: username,
            displayName: displayName,
            password: password,
            role: role,
        };

        try {
            const response = await fetch('/api/admin/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // <-- ADDED: Authorization header with JWT token
                },
                body: JSON.stringify(userData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Create user failed:', errorData);
                alert(`Create user failed: ${errorData.message || 'Unknown error'}`);
            } else {
                const successData = await response.json();
                console.log('User created successfully:', successData);
                alert('User created successfully!');
                // Optionally clear form or update user list
            }

        } catch (error) {
            console.error('Error creating user:', error);
            alert('Error creating user. Please check console.');
        }
    };

    return (
        <div>
            <h2>Admin Panel - Create User</h2>
            <form onSubmit={handleCreateUser}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="displayName">Display Name (Optional):</label>
                    <input type="text" id="displayName" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="role">Role:</label>
                    <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                        <option value="Doctor">Doctor</option>
                        <option value="Admin">Admin</option>
                    </select>
                </div>
                <button type="submit">Create User</button>
            </form>
        </div>
    );
};

export default AdminPanel;