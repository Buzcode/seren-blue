import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLocation, Navigate } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import PropTypes from 'prop-types'; 

const RequireAuth = ({ children, requiredRole }) => {
    const { token } = useContext(AuthContext);
    const location = useLocation();

    if (!token) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    try {
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;

        if (requiredRole && userRole !== requiredRole) {
            console.warn(`Unauthorized access attempt. User role: ${userRole}, Required role: ${requiredRole}`);
            return <Navigate to="/" replace />;
        }

        return children;

    } catch (error) {
        console.error("Error decoding or verifying JWT:", error);
        return <Navigate to="/login" state={{ from: location }} replace />;
    }
};

// Define PropTypes for RequireAuth component
RequireAuth.propTypes = {
    children: PropTypes.node.isRequired, // Children is required and should be renderable
    requiredRole: PropTypes.string,       // requiredRole is a string and is optional
};

export default RequireAuth;