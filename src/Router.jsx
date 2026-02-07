import { createBrowserRouter } from "react-router-dom";
import App from './App';
import Dashboard from "./Dashboard/DashboardApp";
import Signin from "./auth/Signin";
import Signup from "./auth/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

export const router = createBrowserRouter([
    { path: '/', element: <App /> },
    { path: '/signin', element: <Signin /> },
    { path: '/signup', element: <Signup /> },
    {
        path: '/dashboard',
        element: (
            <ProtectedRoute>
                <Dashboard />
            </ProtectedRoute>
        )
    },
]);

