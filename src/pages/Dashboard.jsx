import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout.jsx';
import { useProductos, useClientes, useVentas } from '../context/contextUtils';

export default function Dashboard() {
  const { productos } = useProductos();
  const { clientes } = useClientes();
  const { ventas } = useVentas();
  const [stats, setStats] = useState({
    ventas: {
      total: 0,
      porcentaje: 0,
      tendencia: 'up'
    },
    ingresos: {
      total: 0,
      porcentaje: 0,
      tendencia: 'up'
    },
    clientes: {
      total: 0,
      nuevos: 0,
      tendencia: 'up'
    },
    productos: {
      total: 0,
      populares: []
    }
  });
  
  useEffect(() => {
    // Simulamos estadísticas basadas en los datos disponibles
    setStats({
      ventas: {
        total: ventas.length || 8,
        porcentaje: 12,
        tendencia: 'up'
      },
      ingresos: {
        total: ventas.reduce((acc, v) => acc + (v.total || 0), 0) || 1250,
        porcentaje: 8,
        tendencia: 'up'
      },
      clientes: {
        total: clientes.length || 12,
        nuevos: 3,
        tendencia: 'up'
      },
      productos: {
        total: productos.length || 25,
        populares: productos.slice(0, 3) || []
      }
    });
  }, [productos, clientes, ventas]);

  return (
    <DashboardLayout title="Panel de Control">
      <div className="space-y-8">
        {/* Mensaje de bienvenida */}
        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">¡Bienvenido de vuelta!</h1>
          <p className="text-gray-600">Aquí tienes un resumen de la actividad reciente de tu negocio.</p>
        </div>
        
        {/* Tarjetas de estadísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Ventas */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-500">Ventas Totales</h3>
              <div className="bg-indigo-100 text-indigo-600 rounded-full p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats.ventas.total}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium ${stats.ventas.tendencia === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.ventas.tendencia === 'up' ? '↑' : '↓'} {stats.ventas.porcentaje}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs último mes</span>
                </div>
              </div>
              <div className="h-12 flex items-end">
                <div className="bg-indigo-100 w-2 h-3 rounded-t-sm mx-0.5"></div>
                <div className="bg-indigo-300 w-2 h-6 rounded-t-sm mx-0.5"></div>
                <div className="bg-indigo-400 w-2 h-8 rounded-t-sm mx-0.5"></div>
                <div className="bg-indigo-600 w-2 h-10 rounded-t-sm mx-0.5"></div>
                <div className="bg-indigo-700 w-2 h-12 rounded-t-sm mx-0.5"></div>
              </div>
            </div>
          </div>

          {/* Card 2: Ingresos */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-500">Ingresos</h3>
              <div className="bg-green-100 text-green-600 rounded-full p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">${stats.ingresos.total}</p>
                <div className="flex items-center mt-1">
                  <span className={`text-xs font-medium ${stats.ingresos.tendencia === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                    {stats.ingresos.tendencia === 'up' ? '↑' : '↓'} {stats.ingresos.porcentaje}%
                  </span>
                  <span className="text-xs text-gray-500 ml-1">vs último mes</span>
                </div>
              </div>
              <div className="text-green-500">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" strokeWidth="0.5" />
                  <path d="M12 16V8M9 11L12 8L15 11" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            </div>
          </div>

          {/* Card 3: Clientes */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-500">Clientes</h3>
              <div className="bg-blue-100 text-blue-600 rounded-full p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
            </div>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats.clientes.total}</p>
                <div className="flex items-center mt-1">
                  <span className="text-xs font-medium text-green-600">+{stats.clientes.nuevos} nuevos</span>
                  <span className="text-xs text-gray-500 ml-1">este mes</span>
                </div>
              </div>
              <div className="flex -space-x-2">
                <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-xs font-bold">JD</div>
                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold">AM</div>
                <div className="w-8 h-8 rounded-full bg-pink-500 text-white flex items-center justify-center text-xs font-bold">+{stats.clientes.total - 2}</div>
              </div>
            </div>
          </div>

          {/* Card 4: Productos */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-gray-500">Productos</h3>
              <div className="bg-amber-100 text-amber-600 rounded-full p-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                </svg>
              </div>
            </div>
            <div className="flex flex-col">
              <p className="text-2xl font-bold text-gray-800">{stats.productos.total}</p>
              <div className="flex items-center mt-1 mb-2">
                <span className="text-xs text-gray-500">productos en inventario</span>
              </div>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <div className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded-md">
                  Top ventas
                </div>
                <div className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-md">
                  En stock
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Gráficos y tablas */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Gráfico de actividad */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Actividad de Ventas</h3>
            <div className="relative h-64 flex items-end">
              <div className="absolute inset-0 flex flex-col justify-between">
                <div className="border-b border-gray-200"></div>
                <div className="border-b border-gray-200"></div>
                <div className="border-b border-gray-200"></div>
                <div className="border-b border-gray-200"></div>
              </div>
              
              <div className="relative z-10 flex items-end justify-around w-full">
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 bg-indigo-200 rounded-t-md" style={{ height: '30%' }}></div>
                  <span className="text-xs text-gray-500">Lun</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 bg-indigo-400 rounded-t-md" style={{ height: '60%' }}></div>
                  <span className="text-xs text-gray-500">Mar</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 bg-indigo-200 rounded-t-md" style={{ height: '40%' }}></div>
                  <span className="text-xs text-gray-500">Mié</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 bg-indigo-600 rounded-t-md" style={{ height: '80%' }}></div>
                  <span className="text-xs text-gray-500">Jue</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 bg-indigo-400 rounded-t-md" style={{ height: '55%' }}></div>
                  <span className="text-xs text-gray-500">Vie</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 bg-indigo-300 rounded-t-md" style={{ height: '45%' }}></div>
                  <span className="text-xs text-gray-500">Sáb</span>
                </div>
                <div className="flex flex-col items-center space-y-2">
                  <div className="w-12 bg-indigo-200 rounded-t-md" style={{ height: '25%' }}></div>
                  <span className="text-xs text-gray-500">Dom</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Ventas recientes */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Ventas Recientes</h3>
            <div className="space-y-3">
              {Array(4).fill(0).map((_, i) => (
                <div key={i} className="flex items-center p-2 rounded-lg hover:bg-gray-50">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                    <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-800">Venta #{1001 + i}</p>
                    <p className="text-xs text-gray-500">Cliente: {["Juan Pérez", "María López", "Carlos Ruiz", "Ana Gómez"][i]}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-800">${[120, 45, 210, 68][i]}</p>
                    <p className="text-xs text-gray-500">Hace {[2, 5, 12, 16][i]} horas</p>
                  </div>
                </div>
              ))}
              
              <a href="/ventas" className="block text-center text-sm text-indigo-600 hover:text-indigo-800 mt-4 hover:underline">
                Ver todas las ventas →
              </a>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}