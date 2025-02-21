import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext(); // <-- ADDED 'export const' HERE

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null); // Initialize from localStorage
  const navigate = useNavigate();

  useEffect(() => {
    // Update localStorage whenever the token changes
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  const login = (data) => {
    setToken(data.token);
    // Optionally, store other user data in state if needed
    navigate('/'); // Redirect after login
  };

  const logout = () => {
    setToken(null);
    navigate('/login'); // Redirect after logout
  };

  const value = {
    token,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};