// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || null);
    const [user, setUser] = useState(null); // State to store user information
    const navigate = useNavigate();

    useEffect(() => {
        console.log("AuthContext useEffect - Token changed:", token);
        if (token) {
            localStorage.setItem('token', token);
            console.log("AuthContext useEffect - Token set in localStorage:", token);
            const fetchUserProfile = async () => {
                console.log("AuthContext useEffect - Fetching user profile..."); // Added log before fetch
                try {
                    const response = await fetch('/api/users/me/profile', { // **CORRECTED URL to /me/profile**
                        headers: {
                            'Authorization': `Bearer ${token}`, // Or however you send the token
                        },
                    });
                    console.log("AuthContext useEffect - User profile fetch response status:", response.status); // Log response status
                    if (response.ok) {
                        const userData = await response.json();
                        setUser(userData); // Set user data in AuthContext
                        console.log("AuthContext useEffect - User profile fetched successfully:", userData);
                    } else {
                        console.error("AuthContext useEffect - Failed to fetch user profile:", response.status, response.statusText);
                        setUser(null); // Clear user if profile fetch fails
                    }
                } catch (error) {
                    console.error("AuthContext useEffect - Error during user profile fetch:", error);
                    setUser(null); // Clear user on error
                }
            };
            fetchUserProfile();
        } else {
            localStorage.removeItem('token');
            console.log("AuthContext useEffect - Token removed from localStorage.");
            setUser(null); // Clear user on logout/token removal
        }
    }, [token]);

    const login = (data) => {
        setToken(data.token);
        // setUser will be set in the useEffect after token change
        console.log("AuthContext login - Token set:", data.token);

        const userRole = data.user?.role;
        console.log("AuthContext login - User Role:", userRole);
        console.log("AuthContext login - Role Type:", typeof userRole);
        console.log("AuthContext login - Role Value (Stringified):", JSON.stringify(userRole));

        if (userRole === 'doctor') {
            console.log("AuthContext login - Condition: userRole === 'doctor' is TRUE");
            navigate('/dashboard');
        } else if (userRole === 'patient') {
            console.log("AuthContext login - Condition: userRole === 'patient' is TRUE");
            navigate('/');
        } else {
            console.log("AuthContext login - Condition: Default case");
            navigate('/dashboard');
        }
    };

    const logout = () => {
        setToken(null); // Setting token to null will trigger useEffect to clear user
        console.log("AuthContext logout - Token set to null (user will be cleared by useEffect).");
        setUser(null); // Explicitly clear user on logout as well
        navigate('/login');
    };

    const value = {
        token,
        login,
        logout,
        user, // Expose user data
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