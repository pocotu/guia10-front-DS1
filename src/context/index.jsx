import { createContext, useState, useEffect } from 'react';
import { ProductoService, ClienteService, VentaService } from '../services';

// Contexto para la autenticación
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  // Comprobar si hay sesión guardada al iniciar
  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    setIsAuthenticated(true);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Contexto para productos
export const ProductosContext = createContext();

export const ProductosProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const data = await ProductoService.getAll();
      setProductos(data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const addProducto = async (producto) => {
    // Simulamos agregar un producto
    const newProducto = { id: Date.now(), ...producto };
    setProductos([...productos, newProducto]);
    return newProducto;
  };

  const updateProducto = async (id, producto) => {
    setProductos(productos.map(p => p.id === id ? { ...p, ...producto } : p));
  };

  const deleteProducto = async (id) => {
    setProductos(productos.filter(p => p.id !== id));
  };

  return (
    <ProductosContext.Provider value={{ 
      productos, 
      loading, 
      fetchProductos, 
      addProducto, 
      updateProducto, 
      deleteProducto 
    }}>
      {children}
    </ProductosContext.Provider>
  );
};

// Contexto para clientes
export const ClientesContext = createContext();

export const ClientesProvider = ({ children }) => {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClientes();
  }, []);

  const fetchClientes = async () => {
    try {
      setLoading(true);
      const data = await ClienteService.getAll();
      setClientes(data);
    } catch (error) {
      console.error('Error al cargar clientes:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCliente = async (cliente) => {
    // Simulamos agregar un cliente
    const newCliente = { id: Date.now(), ...cliente };
    setClientes([...clientes, newCliente]);
    return newCliente;
  };

  const updateCliente = async (id, cliente) => {
    setClientes(clientes.map(c => c.id === id ? { ...c, ...cliente } : c));
  };

  const deleteCliente = async (id) => {
    setClientes(clientes.filter(c => c.id !== id));
  };

  return (
    <ClientesContext.Provider value={{ 
      clientes, 
      loading, 
      fetchClientes, 
      addCliente, 
      updateCliente, 
      deleteCliente 
    }}>
      {children}
    </ClientesContext.Provider>
  );
};

// Contexto para ventas
export const VentasContext = createContext();

export const VentasProvider = ({ children }) => {
  const [ventas, setVentas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVentas();
  }, []);

  const fetchVentas = async () => {
    try {
      setLoading(true);
      const data = await VentaService.getAll();
      setVentas(data);
    } catch (error) {
      console.error('Error al cargar ventas:', error);
    } finally {
      setLoading(false);
    }
  };

  const addVenta = async (venta) => {
    // Simulamos agregar una venta
    const newVenta = { 
      id: Date.now(), 
      fecha: new Date().toISOString(),
      ...venta
    };
    setVentas([...ventas, newVenta]);
    return newVenta;
  };

  return (
    <VentasContext.Provider value={{ 
      ventas, 
      loading, 
      fetchVentas, 
      addVenta 
    }}>
      {children}
    </VentasContext.Provider>
  );
};

// Proveedor combinado para envolver la aplicación
export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <ProductosProvider>
        <ClientesProvider>
          <VentasProvider>
            {children}
          </VentasProvider>
        </ClientesProvider>
      </ProductosProvider>
    </AuthProvider>
  );
};
