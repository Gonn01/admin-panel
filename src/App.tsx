// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout.tsx';
import Home from './pages/Home.tsx';
import Settings from './pages/Settings.tsx';
import Users from './pages/Users.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Aquí no le pasamos props a DashboardLayout */}
        <Route path="/" element={<DashboardLayout />}>  
          <Route index element={<Navigate to="home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<Users />} />
          <Route path="*" element={<Navigate to="home" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
