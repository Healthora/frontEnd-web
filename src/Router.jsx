import { createBrowserRouter } from "react-router-dom";
import App from './App'
import Dashboard from "./Dashboard/DashboardApp";

export const router = createBrowserRouter([
    {path: '/', element: <App/> },
    {path: '/Dashboard', element: <Dashboard/> },
])
