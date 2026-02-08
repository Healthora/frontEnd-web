import React, { useState } from "react";
import {
  LayoutDashboard,
  Calendar,
  CalendarCheck,
  Users,
  Stethoscope,
  BarChart3,
  Settings,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  User,
  Menu,
  X,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, logout } from "../utils/auth";
import Dashboard from "./Dashboard";
import Calander from "./Calander";
import Pipeline from "./Pipeline";
import Statisticsdashboard from "./Statisticsdashboard";
import PatientManagement from "./PatientManagement";
import SettingsPage from "./SettingsPage";

const MedicalDashboard = () => {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [user, setUser] = useState(getCurrentUser());

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const menuItems = [
    { id: "dashboard", label: "Tableau de Bord", icon: LayoutDashboard },
    { id: "calendar", label: "Calendrier", icon: Calendar },
    { id: "appointments", label: "Rendez-vous", icon: CalendarCheck, badge: 12 },
    { id: "patients", label: "Patients", icon: Users },
    { id: "statistics", label: "Statistiques", icon: BarChart3 },
    { id: "settings", label: "Paramètres", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-sky-50/30">
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-100 shadow-xl shadow-gray-200/50 transition-all duration-300 z-40 ${sidebarOpen ? "w-72" : "w-20"
          }`}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
          {sidebarOpen ? (
            <>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/30">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h1 className="text-lg font-black text-gray-900">MedSaaS</h1>
                  <p className="text-xs text-gray-500">Cabinet Médical</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors lg:hidden"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarOpen(true)}
              className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-500/30 mx-auto"
            >
              <Menu className="w-5 h-5 text-white" />
            </button>
          )}
        </div>

        {/* Navigation Menu */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200 relative group ${isActive
                    ? "bg-gradient-to-r from-sky-500 to-indigo-500 text-white shadow-lg shadow-sky-500/30"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
              >
                <Icon
                  className={`w-5 h-5 flex-shrink-0 ${isActive
                      ? "text-white"
                      : "text-gray-500 group-hover:text-sky-500"
                    }`}
                />

                {sidebarOpen && (
                  <>
                    <span className="flex-1 text-left">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`px-2 py-0.5 rounded-full text-xs font-bold ${isActive
                            ? "bg-white/20 text-white"
                            : "bg-sky-100 text-sky-600"
                          }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </>
                )}

                {/* Active indicator dot when collapsed */}
                {!sidebarOpen && isActive && (
                  <div className="absolute right-2 w-1.5 h-1.5 bg-white rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* User Profile Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-100 bg-white">
          {sidebarOpen ? (
            <div className="flex items-center gap-3 px-3 py-3 rounded-xl bg-gradient-to-r from-gray-50 to-sky-50/50 border border-gray-100">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  Dr
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 truncate">
                  {user ? `Dr. ${user.firstName} ${user.lastName}` : 'Dr. Inconnu'}
                </p>
                <p className="text-xs text-gray-500">{user.specialty}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-1.5 hover:bg-red-300 rounded-lg transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 text-gray-500" />
              </button>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                  Dr
                </div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full" />
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content Area */}
      <div
        className={`transition-all duration-300 ${sidebarOpen ? "ml-72" : "ml-20"}`}
      >
        {/* Top Navigation Bar */}
        <header className="sticky top-0 z-30 h-20 bg-white border-b border-gray-100 shadow-sm">
          <div className="h-full px-8 flex items-center justify-between">
            {/* Left: Search Bar */}
            <div className="flex items-center gap-4 flex-1 max-w-xl">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Menu className="w-5 h-5 text-gray-600" />
              </button>

              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un patient, rendez-vous..."
                  className="w-full pl-11 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-4">
              {/* Status Badge */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-emerald-50 border border-emerald-200 rounded-full">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-xs font-semibold text-emerald-700">
                  En Ligne
                </span>
              </div>

              {/* Notifications */}
              <button className="relative p-2.5 hover:bg-gray-100 rounded-xl transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>

              {/* Profile Dropdown */}
              <div className="flex items-center gap-3 pl-3 pr-2 py-2 hover:bg-gray-50 rounded-xl transition-colors cursor-pointer border border-gray-100">
                <div className="hidden md:block text-right">
                  <p className="text-sm font-bold text-gray-900">
                    {user ? `Dr. ${user.firstName} ${user.lastName}` : 'Dr. Inconnu'}
                  </p>
                  <p className="text-xs text-gray-500">{user.specialty}</p>
                </div>
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    Dr
                  </div>
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-400 border-2 border-white rounded-full" />
                </div>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Container */}
        <main className="p-8">
          {/* Page Header */}
          {activePage == 'dashboard' && <Dashboard />}
          {activePage == 'calendar' && <Calander />}
          {activePage == 'appointments' && <Pipeline />}
          {activePage == 'statistics' && <Statisticsdashboard />}
          {activePage == 'patients' && <PatientManagement />}
          {activePage == 'settings' && <SettingsPage />}
        </main>
      </div>
    </div>
  );
};

export default MedicalDashboard;