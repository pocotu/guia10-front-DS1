import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../pages/Dashboard.jsx';
import Login from '../pages/Login.jsx';
import Productos from '../pages/Productos.jsx';
import Clientes from '../pages/Clientes.jsx';
import Ventas from '../pages/Ventas.jsx';
import Home from '../pages/Home.jsx'; 
import DashboardLayout from '../layouts/DashboardLayout.jsx';

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        {/* Ruta pública para login */}
        <Route path="/login" element={<Login />} />
        
        {/* Ruta principal - muestra la página de Home */}
        <Route path="/" element={
          <DashboardLayout title="Inicio">
            <Home />
          </DashboardLayout>
        } />
        
        {/* Ruta al Dashboard */}
        <Route path="/dashboard" element={
          <DashboardLayout title="Panel de Control">
            <Dashboard />
          </DashboardLayout>
        } />
        
        <Route path="/productos" element={
          <DashboardLayout title="Gestión de Productos">
            <Productos />
          </DashboardLayout>
        } />
        
        <Route path="/clientes" element={
          <DashboardLayout title="Gestión de Clientes">
            <Clientes />
          </DashboardLayout>
        } />
        
        <Route path="/ventas" element={
          <DashboardLayout title="Gestión de Ventas">
            <Ventas />
          </DashboardLayout>
        } />
        
        {/* Ruta por defecto - redirige a la página principal */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}