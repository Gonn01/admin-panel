// DashboardLayout.jsx
import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { menuConfig } from './menuConfig';  // <-- importas tu config aquí
import './DashboardLayout.css';

export default function DashboardLayout() {
    const [collapsed, setCollapsed] = useState(() => {
        const saved = localStorage.getItem('dashboard.collapsed');
        return saved === 'true';
    });

    useEffect(() => {
        localStorage.setItem('dashboard.collapsed', collapsed);
    }, [collapsed]);

    const [hovered, setHovered] = useState(false);
    const toggleSidebar = () => setCollapsed(prev => !prev);
    const handleMouseEnter = () => { if (collapsed) setHovered(true) };
    const handleMouseLeave = () => { if (collapsed) setHovered(false) };
    const effectiveCollapsed = collapsed && !hovered;

    return (
        <div className={`dashboard ${effectiveCollapsed ? 'collapsed' : ''}`}>
            <div
                className="sidebar-wrapper"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {/* <-- PASAS menuConfig como children */}
                <Sidebar collapsed={effectiveCollapsed} onToggleSidebar={toggleSidebar}>
                    {menuConfig}
                </Sidebar>
            </div>

            <Navbar
                collapsed={effectiveCollapsed}
                onToggleSidebar={toggleSidebar}
            />

            <div className="main-content">
                <div style={{ height: '60px' }} />
                <div className="content-body">
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
