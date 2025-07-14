import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/contextUtils';

const links = [
  { 
    to: '/', 
    label: 'Inicio', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ) 
  },
  { 
    to: '/productos', 
    label: 'Productos', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
      </svg>
    ) 
  },
  { 
    to: '/clientes', 
    label: 'Clientes', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ) 
  },
  { 
    to: '/ventas', 
    label: 'Ventas', 
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ) 
  },
];

export default function Sidebar({ onCloseMobileMenu }) {
  const { logout, isAuthenticated } = useAuth();

  return (
    <aside className="flex flex-col h-screen">
      {/* Logo y título */}
      <div className="p-4 bg-indigo-700 flex items-center justify-center">
        <NavLink to="/" className="text-white text-xl font-bold tracking-wider flex items-center gap-2">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          <span>VENTAS APP</span>
        </NavLink>
      </div>
      
      {/* Botón de cierre en móvil */}
      <div className="p-2 md:hidden bg-indigo-800 flex justify-end">
        <button 
          className="text-indigo-200 hover:text-white"
          onClick={onCloseMobileMenu}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      {/* Navegación principal */}
      <nav className="flex-1 overflow-y-auto bg-gray-900 py-4">
        <div className="px-4 mb-6">
          <div className="px-2 py-1 rounded-md bg-gray-800/40">
            <p className="text-xs font-medium text-gray-400 uppercase">Menú Principal</p>
          </div>
        </div>
        <ul className="space-y-1 px-2">
          {links.map(link => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                onClick={onCloseMobileMenu}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm rounded-lg transition-colors duration-150 ${
                    isActive 
                      ? 'bg-indigo-600 text-white font-medium shadow-md' 
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`
                }
              >
                <span className="mr-3">{link.icon}</span>
                <span>{link.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
        
        {/* Secciones adicionales */}
        <div className="px-4 mt-8 mb-6">
          <div className="px-2 py-1 rounded-md bg-gray-800/40">
            <p className="text-xs font-medium text-gray-400 uppercase">Reportes</p>
          </div>
        </div>
        <ul className="space-y-1 px-2">
          <li>
            <a href="#" className="flex items-center px-4 py-3 text-sm rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-150">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <span>Reportes de Ventas</span>
            </a>
          </li>
          <li>
            <a href="#" className="flex items-center px-4 py-3 text-sm rounded-lg text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-150">
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Estadísticas</span>
            </a>
          </li>
        </ul>
      </nav>
      
      {/* Footer del sidebar */}
      <div className="bg-gray-900 border-t border-gray-800 p-4">
        {isAuthenticated ? (
          <button 
            onClick={logout}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg shadow transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Cerrar Sesión
          </button>
        ) : (
          <NavLink 
            to="/login"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg shadow transition-colors duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
            </svg>
            Iniciar Sesión
          </NavLink>
        )}
      </div>
    </aside>
  );
}