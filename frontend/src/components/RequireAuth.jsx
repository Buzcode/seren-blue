import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode

const RequireAuth = ({ children, requiredRole }) => {
    const { token } = useContext(AuthContext); // Get token from AuthContext
    const location = useLocation();

    if (!token) {
        // Not logged in
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    try {
        const decodedToken = jwtDecode(token); // Decode the JWT token
        const userRole = decodedToken.role; // Assuming your JWT payload has a 'role' claim

        if (requiredRole && userRole !== requiredRole) {
            // Logged in, but wrong role
            console.warn(`Unauthorized access attempt. User role: ${userRole}, Required role: ${requiredRole}`); // Optional logging
            return <Navigate to="/" replace />; // Or redirect to a "Not Authorized" page
        }

        // Logged in and has the required role (or no role is required)
        return children;

    } catch (error) {
        // Token is invalid or expired
        console.error("Error decoding or verifying JWT:", error);
        return <Navigate to="/login" state={{ from: location }} replace />; // Treat as not logged in
    }
};

export default RequireAuth;