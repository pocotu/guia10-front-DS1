import { useState, useEffect } from 'react';
import { useClientes, useProductos, useVentas } from '../context/contextUtils';

export default function Ventas() {
  const { clientes } = useClientes();
  const { productos } = useProductos();
  const { ventas, addVenta } = useVentas();
  
  const [clienteId, setClienteId] = useState('');
  const [carrito, setCarrito] = useState([]);
  const [productoId, setProductoId] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const [ventasRecientes, setVentasRecientes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nuevaVenta, setNuevaVenta] = useState(null);
  
  // Cargamos las ventas recientes
  useEffect(() => {
    setVentasRecientes([...ventas].sort((a, b) => new Date(b.fecha) - new Date(a.fecha)).slice(0, 5));
  }, [ventas]);

  const agregarProducto = () => {
    if (!productoId) return;
    
    const prod = productos.find(p => p.id === Number(productoId));
    if (!prod) return;
    
    setCarrito(prev => {
      const existe = prev.find(item => item.id === prod.id);
      if (existe) {
        return prev.map(item => item.id === prod.id ? { ...item, cantidad: item.cantidad + Number(cantidad) } : item);
      }
      return [...prev, { ...prod, cantidad: Number(cantidad) }];
    });
    
    setProductoId('');
    setCantidad(1);
  };

  const quitarProducto = (id) => {
    setCarrito(carrito.filter(item => item.id !== id));
  };

  const calcularTotal = () => {
    return carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
  };

  const confirmarVenta = async () => {
    if (!clienteId || carrito.length === 0) {
      setMensaje('Por favor, seleccione un cliente y agregue al menos un producto');
      setTimeout(() => setMensaje(''), 3000);
      return;
    }
    
    const cliente = clientes.find(c => c.id === Number(clienteId));
    
    const nuevaVenta = {
      clienteId: Number(clienteId),
      clienteNombre: cliente?.nombre,
      productos: [...carrito],
      total: calcularTotal(),
      fecha: new Date().toISOString()
    };
    
    try {
      const ventaGuardada = await addVenta(nuevaVenta);
      setNuevaVenta(ventaGuardada);
      setIsModalOpen(true);
      
      // Limpiar el formulario
      setCarrito([]);
      setClienteId('');
    } catch (error) {
      setMensaje('Error al registrar la venta: ' + error.message);
      setTimeout(() => setMensaje(''), 3000);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNuevaVenta(null);
  };
  
  // Modal de confirmación
  const ConfirmacionModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        <div className="p-4 border-b border-gray-200 flex items-center">
          <div className="bg-green-100 p-2 rounded-full mr-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900">
            ¡Venta registrada con éxito!
          </h3>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Cliente:</p>
            <p className="font-medium">{nuevaVenta?.clienteNombre}</p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Fecha:</p>
            <p className="font-medium">
              {nuevaVenta?.fecha ? new Date(nuevaVenta.fecha).toLocaleString() : ''}
            </p>
          </div>
          
          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Total:</p>
            <p className="text-xl font-bold text-green-600">
              ${nuevaVenta?.total.toFixed(2)}
            </p>
          </div>
          
          <div className="flex justify-end">
            <button 
              onClick={closeModal}
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Formulario de venta */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Registrar Nueva Venta</h3>
            
            {mensaje && (
              <div className={`p-3 mb-4 rounded-md ${mensaje.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                {mensaje}
              </div>
            )}
            
            {/* Selección de cliente */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
              <select 
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                value={clienteId} 
                onChange={e => setClienteId(e.target.value)}
              >
                <option value="">Seleccione un cliente</option>
                {clientes.map(c => (
                  <option key={c.id} value={c.id}>{c.nombre}</option>
                ))}
              </select>
            </div>
            
            {/* Agregar producto */}
            <div className="p-4 bg-gray-50 rounded-md mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-3">Agregar Productos</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
                <div className="col-span-2">
                  <select 
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    value={productoId} 
                    onChange={e => setProductoId(e.target.value)}
                  >
                    <option value="">Seleccione un producto</option>
                    {productos.map(p => (
                      <option key={p.id} value={p.id}>{p.nombre} - ${p.precio.toFixed(2)}</option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-2">
                  <input 
                    type="number" 
                    min="1" 
                    className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500" 
                    value={cantidad} 
                    onChange={e => setCantidad(e.target.value)}
                  />
                  <button 
                    onClick={agregarProducto} 
                    disabled={!productoId}
                    className="bg-indigo-600 text-white p-2 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Tabla de productos en carrito */}
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Producto</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Precio</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Cantidad</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Subtotal</th>
                    <th scope="col" className="px-4 py-3 text-center text-xs font-medium text-gray-500 uppercase">Acciones</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {carrito.length > 0 ? (
                    carrito.map(item => (
                      <tr key={item.id}>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">{item.nombre}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">${item.precio.toFixed(2)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500 text-center">{item.cantidad}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900 text-center">${(item.precio * item.cantidad).toFixed(2)}</td>
                        <td className="px-4 py-3 whitespace-nowrap text-center">
                          <button 
                            onClick={() => quitarProducto(item.id)} 
                            className="text-red-600 hover:text-red-900"
                            title="Quitar producto"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" className="px-4 py-6 text-center text-sm text-gray-500">
                        No hay productos en el carrito
                      </td>
                    </tr>
                  )}
                  
                  {/* Fila de total */}
                  {carrito.length > 0 && (
                    <tr className="bg-gray-50">
                      <td colSpan="3" className="px-4 py-3 text-right text-sm font-bold text-gray-900">TOTAL:</td>
                      <td className="px-4 py-3 text-center text-base font-bold text-indigo-600">${calcularTotal().toFixed(2)}</td>
                      <td></td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            {/* Botón de confirmar */}
            <div className="flex justify-end">
              <button 
                onClick={confirmarVenta} 
                disabled={carrito.length === 0 || !clienteId}
                className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-green-300 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Confirmar Venta
              </button>
            </div>
          </div>
        </div>
        
        {/* Ventas recientes */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-md h-full">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Ventas Recientes</h3>
            
            <div className="space-y-4">
              {ventasRecientes.length > 0 ? (
                ventasRecientes.map((venta, index) => (
                  <div key={venta.id || index} className="p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-medium text-gray-900">{venta.clienteNombre || "Cliente #" + venta.clienteId}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(venta.fecha).toLocaleString()}
                        </p>
                      </div>
                      <span className="font-bold text-green-600">${venta.total?.toFixed(2) || 0}</span>
                    </div>
                    <div className="text-xs text-gray-600">
                      {venta.productos?.length || 0} productos
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-sm text-gray-500 py-4">
                  No hay ventas registradas
                </p>
              )}
              
              {ventasRecientes.length > 0 && (
                <a href="#" className="block text-center text-sm text-indigo-600 hover:text-indigo-800 mt-4 hover:underline">
                  Ver todas las ventas →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Modal de confirmación */}
      {isModalOpen && <ConfirmacionModal />}
    </div>
  );
}