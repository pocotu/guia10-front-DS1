import { useState } from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export default function DashboardLayout({ children, title = 'Sistema de Ventas' }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar - oculto en móvil por defecto */}
      <div className={`${isMobileMenuOpen ? 'block' : 'hidden'} md:block md:w-64 bg-gray-900 transition-all duration-300`}>
        <Sidebar onCloseMobileMenu={() => setIsMobileMenuOpen(false)} />
      </div>
      
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Navbar title={title} onMobileMenuToggle={toggleMobileMenu} />
        
        {/* Área de contenido principal con scroll */}
        <main className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-50 to-gray-100 p-4">
          <div className="container mx-auto">
            {children}
          </div>
        </main>
        
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 p-4 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Sistema de Ventas - Todos los derechos reservados
        </footer>
      </div>
    </div>
  );
}
