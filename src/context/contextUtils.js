// Este archivo contiene funciones reutilizables y constantes
// para mantener los hooks de contexto separados de los componentes,
// permitiendo un mejor funcionamiento de Fast Refresh.

import { useContext } from 'react';
import { AuthContext, ProductosContext, ClientesContext, VentasContext } from './index.jsx';

// Hooks para acceder a los contextos
export const useAuth = () => useContext(AuthContext);
export const useProductos = () => useContext(ProductosContext);
export const useClientes = () => useContext(ClientesContext);
export const useVentas = () => useContext(VentasContext);
