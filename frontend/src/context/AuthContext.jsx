// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null); // Initialize token to null, no localStorage check on init
    const [user, setUser] = useState(null); // State to store user information
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        console.log("AuthContext useEffect - Token changed:", token);
<<<<<<< Updated upstream
        if (token) {
            localStorage.setItem('token', token); // Persist token to localStorage
            console.log("AuthContext useEffect - Token set in localStorage:", token);
            const fetchUserProfile = async () => {
=======
        const fetchUserProfile = async () => {
            if (token) {
                setIsLoading(true);
                localStorage.setItem('token', token);
                console.log("AuthContext useEffect - Token set in localStorage:", token);
>>>>>>> Stashed changes
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
                        console.log("AuthContext useEffect - User data:", userData); // Add this line
                            setUser(userData);
                        setUser(userData); // Set user data in AuthContext
                        console.log("AuthContext useEffect - User profile fetched successfully:", userData);
                    } else {
                        console.error("AuthContext useEffect - Failed to fetch user profile:", response.status, response.statusText);
                        setUser(null); // Clear user if profile fetch fails
                    }
                } catch (error) {
                    console.error("AuthContext useEffect - Error during user profile fetch:", error);
                    setUser(null); // Clear user on error
                } finally {
                    setIsLoading(false);
                }
<<<<<<< Updated upstream
            };
            fetchUserProfile();
        } else {
            localStorage.removeItem('token'); // Remove token from localStorage on logout/null token
            console.log("AuthContext useEffect - Token removed from localStorage.");
            setUser(null); // Clear user on logout/token removal
        }
=======
            } else {
                setIsLoading(false);
                localStorage.removeItem('token');
                console.log("AuthContext useEffect - Token removed from localStorage.");
                setUser(null); // Clear user on logout/token removal
            }
        };

        fetchUserProfile();
>>>>>>> Stashed changes
    }, [token]);

    const login = async (data) => {
        setToken(data.token);
        console.log("AuthContext login - Token set:", data.token);
        // Instead of fetching profile again, set the user here with data received after login
        setUser(data.user); // Assuming your login response includes the user data in the `user` property
        setIsLoading(false);
        const userRole = data.user?.role;
        console.log("AuthContext login - User Role:", userRole);
        console.log("AuthContext login - Role Type:", typeof userRole);
        console.log("AuthContext login - Role Value (Stringified):", JSON.stringify(userRole));

        if (userRole === 'doctor') {
            console.log("AuthContext login - Condition: userRole === 'doctor' is TRUE");
            navigate('/doctor-dashboard');
        } else if (userRole === 'patient') {
            console.log("AuthContext login - Condition: userRole === 'patient' is TRUE");
            navigate('/');
        } else {
            console.log("AuthContext login - Condition: Default case");
            navigate('/doctor-dashboard');
        }
    };

    const logout = () => {
        setToken(null);
        console.log("AuthContext logout - Token set to null.");
        setUser(null);
        navigate('/login');
    };

    const value = {
        token,
        login,
        logout,
        user,
        isLoading,
    };

    return (
        <AuthContext.Provider value={value}>
            {isLoading ? <p>Loading user...</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};