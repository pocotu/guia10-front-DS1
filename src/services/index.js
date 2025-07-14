// Servicio de Productos con datos de ejemplo
export const ProductoService = {
  getAll: () => [
    { id: 1, nombre: 'Laptop HP Pavilion', precio: 1200 },
    { id: 2, nombre: 'Mouse Logitech G203', precio: 25 },
    { id: 3, nombre: 'Teclado Mecánico Redragon', precio: 45 },
    { id: 4, nombre: 'Monitor LG 24"', precio: 150 },
    { id: 5, nombre: 'Auriculares Hyperx Cloud II', precio: 80 },
    { id: 6, nombre: 'Silla Gamer Corsair', precio: 250 },
    { id: 7, nombre: 'Webcam Logitech C920', precio: 65 },
    { id: 8, nombre: 'Disco SSD 500GB Samsung', precio: 70 },
  ],
};

// Servicio de Clientes con datos de ejemplo
export const ClienteService = {
  getAll: () => [
    { id: 1, nombre: 'Juan Pérez', email: 'juan@mail.com', telefono: '555-1234', direccion: 'Av. Principal 123' },
    { id: 2, nombre: 'Ana Gómez', email: 'ana@mail.com', telefono: '555-5678', direccion: 'Calle Central 456' },
    { id: 3, nombre: 'Carlos Rodríguez', email: 'carlos@mail.com', telefono: '555-9012', direccion: 'Plaza Mayor 789' },
    { id: 4, nombre: 'María López', email: 'maria@mail.com', telefono: '555-3456', direccion: 'Paseo Norte 101' },
    { id: 5, nombre: 'Pedro Hernández', email: 'pedro@mail.com', telefono: '555-7890', direccion: 'Av. Sur 202' },
  ],
};

// Datos de ejemplo para ventas iniciales
const fechaHoy = new Date();
const fechaAyer = new Date(fechaHoy);
fechaAyer.setDate(fechaAyer.getDate() - 1);
const fechaAnteayer = new Date(fechaHoy);
fechaAnteayer.setDate(fechaAnteayer.getDate() - 2);

// Servicio de Ventas con algunas ventas de ejemplo
export const VentaService = {
  getAll: () => [
    { 
      id: 1001, 
      clienteId: 1, 
      clienteNombre: 'Juan Pérez',
      productos: [
        { id: 1, nombre: 'Laptop HP Pavilion', precio: 1200, cantidad: 1 },
        { id: 2, nombre: 'Mouse Logitech G203', precio: 25, cantidad: 1 }
      ],
      total: 1225,
      fecha: fechaHoy.toISOString()
    },
    {
      id: 1002,
      clienteId: 3,
      clienteNombre: 'Carlos Rodríguez',
      productos: [
        { id: 3, nombre: 'Teclado Mecánico Redragon', precio: 45, cantidad: 1 },
        { id: 5, nombre: 'Auriculares Hyperx Cloud II', precio: 80, cantidad: 1 }
      ],
      total: 125,
      fecha: fechaAyer.toISOString()
    },
    {
      id: 1003,
      clienteId: 2,
      clienteNombre: 'Ana Gómez',
      productos: [
        { id: 4, nombre: 'Monitor LG 24"', precio: 150, cantidad: 2 }
      ],
      total: 300,
      fecha: fechaAnteayer.toISOString()
    }
  ],
};