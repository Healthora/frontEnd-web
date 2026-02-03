import { createBrowserRouter } from "react-router-dom";
import App from './App'
import MedicalDashboard from "./Dashboard/Dashboard";

export const router = createBrowserRouter([
    {path: '/', element: <App/> },
    {path: '/Dashboard', element: <MedicalDashboard/> },
])
