import { Link } from 'react-router-dom';
import { useProductos, useClientes, useVentas } from '../context/contextUtils';

export default function Home() {
  const { productos } = useProductos();
  const { clientes } = useClientes();
  const { ventas } = useVentas();

  const cardData = [
    {
      title: 'Productos',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
        </svg>
      ),
      count: productos.length,
      link: '/productos',
      description: 'Gestión de productos',
      color: 'bg-amber-500'
    },
    {
      title: 'Clientes',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      count: clientes.length,
      link: '/clientes',
      description: 'Gestión de clientes',
      color: 'bg-blue-500'
    },
    {
      title: 'Ventas',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      count: ventas.length,
      link: '/ventas',
      description: 'Registro de ventas',
      color: 'bg-green-500'
    },
    {
      title: 'Estadísticas',
      icon: (
        <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      count: '→',
      link: '/dashboard',
      description: 'Panel de control',
      color: 'bg-purple-500'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">¡Bienvenido al Sistema de Ventas!</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Administre su negocio de forma eficiente con nuestro sistema integral
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cardData.map((card, index) => (
          <Link 
            key={index} 
            to={card.link}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
          >
            <div className={`${card.color} text-white p-4 flex justify-center items-center transition-all duration-300 group-hover:scale-110`}>
              {card.icon}
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-xl font-semibold text-gray-800">{card.title}</h3>
                <span className="text-2xl font-bold">{card.count}</span>
              </div>
              <p className="text-gray-600">{card.description}</p>
              <div className="mt-4 flex justify-end">
                <span className="text-sm font-medium text-indigo-600 group-hover:translate-x-2 transition-transform duration-300 flex items-center">
                  Acceder 
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Productos Destacados</h3>
            <Link to="/productos" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              Ver todos →
            </Link>
          </div>
          <div className="space-y-4">
            {productos.slice(0, 5).map(producto => (
              <div key={producto.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 mr-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <span className="font-medium">{producto.nombre}</span>
                </div>
                <span className="font-semibold text-green-600">${producto.precio.toFixed(2)}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-800">Últimas Ventas</h3>
            <Link to="/ventas" className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              Ver todas →
            </Link>
          </div>
          <div className="space-y-4">
            {ventas.length > 0 ? (
              ventas.slice(0, 5).map(venta => (
                <div key={venta.id} className="flex justify-between items-center p-3 hover:bg-gray-50 rounded-lg transition-colors">
                  <div>
                    <div className="font-medium">{venta.clienteNombre}</div>
                    <div className="text-sm text-gray-500">
                      {new Date(venta.fecha).toLocaleDateString()}
                    </div>
                  </div>
                  <span className="font-semibold text-green-600">${venta.total.toFixed(2)}</span>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No hay ventas registradas
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}