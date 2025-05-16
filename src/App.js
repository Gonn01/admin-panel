// App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';

// Tus páginas
import Home from './pages/Home';
// import ListUsers from './pages/ListUsers';
// import CreateUser from './pages/CreateUser';
// import Preferences from './pages/Preferences';
// import Security from './pages/Security';
// import CreateTicket from './pages/CreateTicket';
// import ListTickets from './pages/ListTickets';
// import CreateUser from './pages/CreateUser';
// import Preferences from './pages/Preferences';
// import Security from './pages/Security';
// import CreateTicket from './pages/CreateTicket';
// import ListTickets from './pages/ListTickets';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          {/* Home */}
          <Route index element={<Home />} />

          {/* Usuarios */}
          <Route path="users">
            <Route index element={<div ></div>} />
            <Route path="new" element={<div ></div>} />
          </Route>

          {/* Configuración */}
          <Route path="settings">
            <Route path="preferences" element={<div ></div>} />
            <Route path="security" element={<div ></div>} />
          </Route>

          {/* Ticket */}
          <Route path="ticket">
            <Route path="create" element={<div ></div>} />
            <Route path="list" element={<div ></div>} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
