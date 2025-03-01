import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [addressLine1, setAddressLine1] = useState('');
  const [addressLine2, setAddressLine2] = useState('');
  const [gender, setGender] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      setError("Passwords do not match.");
      return;
    }

    const registrationData = {
      firstName,
      lastName,
      username: email,
      password,
      phone,
      address: { line1: addressLine1, line2: addressLine2 },
      gender,
      birthDate,
    };

    try {
      const response = await fetch('/api/auth/register', {
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
        setError(errorData.error || 'Registration failed. Please try again.');
        return;
      }

      // Registration successful - NO ALERT MESSAGE - Redirect to MyProfile page
      console.log('Registration successful');
      // alert('Registration successful!'); // REMOVED Alert Message
      navigate('/MyProfile'); // <-- CHANGED: Redirect to /MyProfile page after successful registration

    } catch (err) {
      console.error("Error during registration:", err);
      setError("Error during registration. Please try again later.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mt-8 mx-auto p-4 border rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create an Account</h2>

      {error && <p className="text-red-500 mb-2">{error}</p>}

      {/* Section 1: Contact Information */}
      <div className="mb-6 p-4 border rounded">
        <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
        <div className="mb-2">
          <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-1">First Name</label>
          <input type="text" id="firstName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-1">Last Name</label>
          <input type="text" id="lastName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-1">Email</label>
          <input type="email" id="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label htmlFor="phone" className="block text-gray-700 text-sm font-bold mb-1">Phone</label>
          <input type="tel" id="phone" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={phone} onChange={(e) => setPhone(e.target.value)} />
        </div>
        <div className="mb-2">
          <label htmlFor="addressLine1" className="block text-gray-700 text-sm font-bold mb-1">Address Line 1</label>
          <input type="text" id="addressLine1" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} />
        </div>
        <div className="mb-2">
          <label htmlFor="addressLine2" className="block text-gray-700 text-sm font-bold mb-1">Address Line 2</label>
          <input type="text" id="addressLine2" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
        </div>
      </div>

      {/* Section 2: Basic Information */}
      <div className="mb-6 p-4 border rounded">
        <h3 className="text-lg font-semibold mb-3">Basic Information</h3>
        <div className="mb-2">
          <label htmlFor="gender" className="block text-gray-700 text-sm font-bold mb-1">Gender</label>
          <select id="gender" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="mb-2">
          <label htmlFor="birthDate" className="block text-gray-700 text-sm font-bold mb-1">Birth Date</label>
          <input type="date" id="birthDate" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
        </div>
      </div>

      {/* Password Section (Outside of sections for clarity) */}
      <div className="mb-4">
        <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
        <input type="password" id="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" value={password} onChange={(e) => setPassword(e.target.value)} required minLength="6" />
      </div>
      <div className="mb-6">
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