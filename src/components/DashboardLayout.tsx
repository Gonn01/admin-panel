// src/components/DashboardLayout.tsx
import React, { useState, useEffect, FC } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar.tsx';
import Navbar from './Navbar.tsx';
import { menuConfig } from './menuConfig.tsx';
import './DashboardLayout.css';

const DashboardLayout: FC = () => {
  const [collapsed, setCollapsed] = useState<boolean>(() => {
    return localStorage.getItem('dashboard.collapsed') === 'true';
  });

  useEffect(() => {
    localStorage.setItem('dashboard.collapsed', JSON.stringify(collapsed));
  }, [collapsed]);

  const [hovered, setHovered] = useState(false);
  const toggleSidebar = () => setCollapsed(prev => !prev);
  const handleMouseEnter = () => collapsed && setHovered(true);
  const handleMouseLeave = () => collapsed && setHovered(false);
  const effectiveCollapsed = collapsed && !hovered;

  return (
    <div className={`dashboard ${effectiveCollapsed ? 'collapsed' : ''}`}>
      <div
        className="sidebar-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Sidebar collapsed={effectiveCollapsed} menuConfig={menuConfig} />
      </div>

      {/* Asegurate de tener esta línea */}
      <Navbar collapsed={effectiveCollapsed} onToggleSidebar={toggleSidebar} />

      <div className="main-content">
        {/* espacio para que no quede tapado por el navbar */}
        <div style={{ height: '60px' }} />
        <div className="content-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
