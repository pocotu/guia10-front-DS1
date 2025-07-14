import { useState, useEffect } from 'react';
import { useProductos } from '../context/contextUtils';

export default function Productos() {
  const { productos, loading, addProducto, updateProducto, deleteProducto } = useProductos();
  const [nuevo, setNuevo] = useState({ nombre: '', precio: '' });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ nombre: '', precio: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' o 'edit'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setFilteredProducts(
      productos.filter(p => 
        p.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
        String(p.precio).includes(searchTerm)
      )
    );
  }, [productos, searchTerm]);

  const handleOpenAddModal = () => {
    setNuevo({ nombre: '', precio: '' });
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (id) => {
    const prod = productos.find(p => p.id === id);
    setEditId(id);
    setEditData({ nombre: prod.nombre, precio: prod.precio });
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addProducto({ ...nuevo, precio: Number(nuevo.precio) });
    setNuevo({ nombre: '', precio: '' });
    setIsModalOpen(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateProducto(editId, { ...editData, precio: Number(editData.precio) });
    setEditId(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este producto?')) {
      await deleteProducto(id);
    }
  };

  // Modal para agregar o editar productos
  const ProductModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {modalMode === 'add' ? 'Agregar Nuevo Producto' : 'Editar Producto'}
          </h3>
        </div>
        
        <form onSubmit={modalMode === 'add' ? handleAdd : handleUpdate} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre del Producto</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Nombre" 
              value={modalMode === 'add' ? nuevo.nombre : editData.nombre} 
              onChange={e => modalMode === 'add' 
                ? setNuevo({ ...nuevo, nombre: e.target.value })
                : setEditData({ ...editData, nombre: e.target.value })
              } 
              required 
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <div className="relative mt-1 rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500 sm:text-sm">$</span>
              </div>
              <input 
                type="number" 
                className="w-full pl-7 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
                placeholder="0.00" 
                min="0"
                step="0.01"
                value={modalMode === 'add' ? nuevo.precio : editData.precio} 
                onChange={e => modalMode === 'add' 
                  ? setNuevo({ ...nuevo, precio: e.target.value })
                  : setEditData({ ...editData, precio: e.target.value })
                } 
                required 
              />
            </div>
          </div>
          
          <div className="flex justify-end gap-3">
            <button 
              type="button"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
              onClick={() => setIsModalOpen(false)}
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
            >
              {modalMode === 'add' ? 'Agregar' : 'Actualizar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Cabecera con buscador y botón de agregar */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="w-full sm:w-64">
          <div className="relative">
            <input 
              type="text" 
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-200 focus:border-indigo-300" 
              placeholder="Buscar productos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
        </div>
        <button 
          onClick={handleOpenAddModal}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 shadow-sm"
        >
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Agregar Producto
        </button>
      </div>
      
      {/* Tabla de productos */}
      <div className="bg-white overflow-hidden shadow-md rounded-lg">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          filteredProducts.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Producto
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Precio
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((producto) => (
                    <tr key={producto.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{producto.nombre}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">${producto.precio.toFixed(2)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => handleOpenEditModal(producto.id)} 
                            className="text-indigo-600 hover:text-indigo-900 flex items-center"
                            title="Editar"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(producto.id)} 
                            className="text-red-600 hover:text-red-900 flex items-center"
                            title="Eliminar"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="py-8 px-4 text-center">
              <p className="text-gray-500">No se encontraron productos que coincidan con la búsqueda.</p>
            </div>
          )
        )}
      </div>
      
      {/* Modal */}
      {isModalOpen && <ProductModal />}
    </div>
  );
}