import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './layouts/Layout';
import DashboardLayout from './layouts/DashboardLayout';
import Clientes from './pages/Clientes';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';
import Productos from './pages/Productos';
import Ventas from './pages/Ventas';

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas que usan Layout general (sin Sidebar) */}
        <Route path="/login" element={<Layout><Login /></Layout>} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        
        {/* Rutas que usan DashboardLayout (con Sidebar) */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clientes" element={<Clientes />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ventas" element={<Ventas />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
