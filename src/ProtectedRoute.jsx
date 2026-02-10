import { Navigate } from 'react-router-dom';
import { isAuthenticated } from './utils/auth';

const ProtectedRoute = ({ children }) => {
    // Check if user is authenticated
    if (!isAuthenticated()) {
        return <Navigate to="/signin" replace />;
    }

    // User is authenticated, render the protected component
    return children;
};

export default ProtectedRoute;
