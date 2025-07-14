import { useState, useEffect } from 'react';
import { useClientes } from '../context/contextUtils';

export default function Clientes() {
  const { clientes, loading, addCliente, updateCliente, deleteCliente } = useClientes();
  const [nuevo, setNuevo] = useState({ nombre: '', email: '', telefono: '', direccion: '' });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ nombre: '', email: '', telefono: '', direccion: '' });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' o 'edit'
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClientes, setFilteredClientes] = useState([]);

  useEffect(() => {
    setFilteredClientes(
      clientes.filter(c => 
        c.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) || 
        c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.telefono?.includes(searchTerm) ||
        c.direccion?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [clientes, searchTerm]);

  const handleOpenAddModal = () => {
    setNuevo({ nombre: '', email: '', telefono: '', direccion: '' });
    setModalMode('add');
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (id) => {
    const cliente = clientes.find(c => c.id === id);
    setEditId(id);
    setEditData({ 
      nombre: cliente.nombre || '', 
      email: cliente.email || '', 
      telefono: cliente.telefono || '', 
      direccion: cliente.direccion || '' 
    });
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addCliente(nuevo);
    setNuevo({ nombre: '', email: '', telefono: '', direccion: '' });
    setIsModalOpen(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    await updateCliente(editId, editData);
    setEditId(null);
    setIsModalOpen(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de que desea eliminar este cliente?')) {
      await deleteCliente(id);
    }
  };

  // Modal para agregar o editar clientes
  const ClienteModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-auto">
        <div className="p-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">
            {modalMode === 'add' ? 'Registrar Nuevo Cliente' : 'Editar Cliente'}
          </h3>
        </div>
        
        <form onSubmit={modalMode === 'add' ? handleAdd : handleUpdate} className="p-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Nombre Completo</label>
            <input 
              type="text" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Nombre del cliente" 
              value={modalMode === 'add' ? nuevo.nombre : editData.nombre} 
              onChange={e => modalMode === 'add' 
                ? setNuevo({ ...nuevo, nombre: e.target.value })
                : setEditData({ ...editData, nombre: e.target.value })
              } 
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Correo Electrónico</label>
            <input 
              type="email" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="email@ejemplo.com" 
              value={modalMode === 'add' ? nuevo.email : editData.email} 
              onChange={e => modalMode === 'add' 
                ? setNuevo({ ...nuevo, email: e.target.value })
                : setEditData({ ...editData, email: e.target.value })
              } 
              required 
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
            <input 
              type="tel" 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Teléfono de contacto" 
              value={modalMode === 'add' ? nuevo.telefono : editData.telefono} 
              onChange={e => modalMode === 'add' 
                ? setNuevo({ ...nuevo, telefono: e.target.value })
                : setEditData({ ...editData, telefono: e.target.value })
              } 
            />
          </div>
          
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Dirección</label>
            <textarea 
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200"
              placeholder="Dirección del cliente" 
              value={modalMode === 'add' ? nuevo.direccion : editData.direccion} 
              onChange={e => modalMode === 'add' 
                ? setNuevo({ ...nuevo, direccion: e.target.value })
                : setEditData({ ...editData, direccion: e.target.value })
              } 
              rows="2"
            />
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
              {modalMode === 'add' ? 'Registrar' : 'Actualizar'}
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
              placeholder="Buscar clientes..."
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
          Registrar Cliente
        </button>
      </div>
      
      {/* Tabla de clientes */}
      <div className="bg-white overflow-hidden shadow-md rounded-lg">
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          filteredClientes.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cliente
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contacto
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dirección
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredClientes.map((cliente) => (
                    <tr key={cliente.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-semibold">
                            {cliente.nombre?.charAt(0) || 'C'}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{cliente.nombre}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{cliente.email}</div>
                        {cliente.telefono && (
                          <div className="text-sm text-gray-500">{cliente.telefono}</div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900">{cliente.direccion || '—'}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end gap-3">
                          <button 
                            onClick={() => handleOpenEditModal(cliente.id)} 
                            className="text-indigo-600 hover:text-indigo-900 flex items-center"
                            title="Editar"
                          >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                            </svg>
                          </button>
                          <button 
                            onClick={() => handleDelete(cliente.id)} 
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
              <p className="text-gray-500">No se encontraron clientes que coincidan con la búsqueda.</p>
            </div>
          )
        )}
      </div>
      
      {/* Modal */}
      {isModalOpen && <ClienteModal />}
    </div>
  );
}