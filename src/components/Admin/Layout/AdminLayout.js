import React, { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import './AdminLayout.css';
import { useTheme } from '../../../context/ThemeContext';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { isDarkMode, toggleTheme } = useTheme();

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const closeSidebar = () => {
        if (window.innerWidth <= 768) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="admin-layout">
            <div className={`sidebar-overlay ${isSidebarOpen ? 'open' : ''}`} onClick={closeSidebar}></div>
            {!isSidebarOpen && <button className="menu-toggle" onClick={toggleSidebar}>
                <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
            </button>}
            <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="sidebar-header">
                    <h2>Portfolio Admin</h2>
                    <button className="theme-toggle" onClick={toggleTheme}>
                        <i className={`fas ${isDarkMode ? 'fa-sun' : 'fa-moon'}`}></i>
                    </button>
                    <button className="theme-toggle button-close" onClick={toggleSidebar}>
                        <i className={`fas ${isSidebarOpen ? 'fa-times' : 'fa-bars'}`}></i>
                    </button>
                </div>
                <nav className="sidebar-nav">
                    <NavLink
                        to="/admin/projects"
                        className={({ isActive }) => isActive ? 'active' : ''}
                        onClick={closeSidebar}
                    >
                        <i className="fas fa-project-diagram"></i> Projects
                    </NavLink>
                    <NavLink
                        to="/admin/resume"
                        className={({ isActive }) => isActive ? 'active' : ''}
                        onClick={closeSidebar}
                    >
                        <i className="fas fa-file-alt"></i> Resume
                    </NavLink>
                </nav>
            </aside>
            <main className="admin-content">
                <Outlet />
            </main>
        </div>
    );
};

export default AdminLayout; 