// AuthContext.jsx (with console logs)
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || null);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("AuthContext useEffect - Token changed:", token); // <--- ADD THIS LOG
    if (token) {
      localStorage.setItem('token', token);
      console.log("AuthContext useEffect - Token set in localStorage:", token); // <--- ADD THIS LOG
    } else {
      localStorage.removeItem('token');
      console.log("AuthContext useEffect - Token removed from localStorage."); // <--- ADD THIS LOG
    }
  }, [token]);

  const login = (data) => {
    setToken(data.token);
    console.log("AuthContext login - Token set:", data.token); // <--- ADD THIS LOG
    navigate('/');
  };

  const logout = () => {
    setToken(null);
    console.log("AuthContext logout - Token set to null."); // <--- ADD THIS LOG
    navigate('/login');
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