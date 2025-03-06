import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';

const AdminPanel = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('doctor');
    const [gender, setGender] = useState('');
    const [createUserError, setCreateUserError] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const { token } = useAuth();

    const handleCreateUser = async (event) => {
        event.preventDefault();
        setCreateUserError('');

        const userData = {
            username,
            firstName,
            lastName,
            displayName,
            password,
            role,
            gender,
        };

        console.log("Data being sent to backend:", userData);

        try {
            const response = await fetch('http://localhost:5001/api/admin/create-user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(userData),
                credentials: "include",
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Create user failed:', errorData);
                setCreateUserError(`Create user failed: ${errorData.error || 'Unknown error'}`);
                return;
            }

            const responseData = await response.json();
            console.log('User created successfully:', responseData);
            alert('User created successfully!');

            setUsername('');
            setFirstName('');
            setLastName('');
            setDisplayName('');
            setPassword('');
            setRole('doctor');
            setGender('');
        } catch (error) {
            console.error('Error creating user:', error);
            setCreateUserError('Error creating user. Please try again.');
        }
    };

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            <p>Here you can manage users.</p>

            <form onSubmit={handleCreateUser} className="max-w-md mt-4">
                <div className="mb-4">
                    <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="username"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Email"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                        First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="firstName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="First Name"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                        Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="lastName"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
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

                <div className="mb-4 relative">
                    <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
                        Password <span className="text-red-500">*</span>
                    </label>
                    <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        id="password"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute top-1/2 right-2 transform -translate-y-1/2" 
                    >
                        {isPasswordVisible ? <AiFillEyeInvisible /> : <AiFillEye />}
                    </button>
                </div>

                <div className="mb-4">
                    <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-2">
                        Gender <span className="text-red-500">*</span>
                    </label>
                    <select
                        id="gender"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
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
                        <option value="doctor">Doctor</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                {createUserError && <p className="text-red-500 mt-2">{createUserError}</p>}

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