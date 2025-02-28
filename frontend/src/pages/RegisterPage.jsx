import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const RegisterPage = () => { // Changed component name to RegisterPage
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null); // State for error messages
  const navigate = useNavigate(); // Hook for redirection

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Basic frontend validation (you should also have backend validation)
    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    const registrationData = {
      firstName,
      lastName,
      username: email, // Use email as username for registration
      password,
    };

    try {
      const response = await fetch('/api/auth/register', { // <-- CORRECTED API URL - Relative URL with /api prefix
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        setError(errorData.error || 'Registration failed. Please try again.'); // Display backend error message
        return;
      }

      // Registration successful
      console.log('Registration successful');
      alert('Registration successful!');
      navigate('/login'); // Redirect to login page after successful registration

    } catch (err) {
      console.error("Error during registration:", err);
      setError("Error during registration. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mt-8 mx-auto p-4 border rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create an Account</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>} {/* Display error message */}

      <div className="mb-4">
        <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">First Name</label>
        <input type="text" id="firstName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
      </div>

      <div className="mb-4">
        <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">Last Name</label>
        <input type="text" id="lastName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
      </div>

      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">Email</label>
        <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" /> {/* Added minLength validation */}
      </div>

      <div className="mb-4">
        <label htmlFor="passwordConfirmation" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
        <input type="password" id="passwordConfirmation" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={passwordConfirmation} onChange={(e) => setPasswordConfirmation(e.target.value)} required />
      </div>

      <div className="flex items-center justify-between">
        <button className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Sign Up</button>
      </div>
    </form>
  );
};

export default RegisterPage; 