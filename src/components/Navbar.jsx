import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/contextUtils';

export default function Navbar({ title, onMobileMenuToggle }) {
  const { user, logout, isAuthenticated } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          {/* Botón de hamburguesa para móvil */}
          <button 
            className="md:hidden text-gray-500 hover:text-gray-700 focus:outline-none" 
            onClick={onMobileMenuToggle}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          {/* Logo y título */}
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 rounded-lg p-2 shadow-md hidden sm:block">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-gray-800">{title}</h1>
          </div>
        </div>
        
        {/* Área de usuario */}
        <div className="flex items-center gap-4">
          {/* Botón de notificaciones */}
          <button className="text-gray-500 hover:text-gray-700">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
          
          {/* Menú de usuario o botón de login */}
          {isAuthenticated ? (
            <div className="relative">
              <button 
                className="flex items-center gap-2 focus:outline-none"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center font-semibold">
                  {user?.name?.charAt(0) || 'A'}
                </div>
                <span className="text-sm font-medium text-gray-700 hidden sm:block">
                  {user?.name || 'Admin'}
                </span>
                <svg className="w-4 h-4 text-gray-500 hidden sm:block" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {/* Menú desplegable */}
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Perfil
                  </button>
                  <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Configuración
                  </button>
                  <button 
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    onClick={handleLogout}
                  >
                    Cerrar sesión
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
              </svg>
              <span className="hidden sm:inline">Iniciar sesión</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}