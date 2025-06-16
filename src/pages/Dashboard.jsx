import React from 'react';
import Alert from '../components/Alert';

const Dashboard = () => {
  return (
    <div className="container-fluid py-4">
      <h1 className="mb-4 text-center">Dashboard Overview</h1>
      
      <Alert message="¡Bienvenido al panel de control! Aquí puedes ver un resumen de tu actividad." type="success" />

      {/* Sección de Resumen y Acciones Rápidas */}
      <div className="row mt-4">
        {/* Tarjetas de Resumen */}
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="card text-center h-100 shadow-sm border-primary">
            <div className="card-header bg-primary text-white">Total Clientes</div>
            <div className="card-body d-flex flex-column justify-content-between">
              <h2 className="card-title display-4">1,234</h2>
              <p className="card-text">Clientes registrados en el sistema.</p>
              <a href="/clientes" className="btn btn-outline-primary mt-auto">Ver Clientes</a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="card text-center h-100 shadow-sm border-success">
            <div className="card-header bg-success text-white">Total Productos</div>
            <div className="card-body d-flex flex-column justify-content-between">
              <h2 className="card-title display-4">567</h2>
              <p className="card-text">Productos disponibles en el inventario.</p>
              <a href="/productos" className="btn btn-outline-success mt-auto">Ver Productos</a>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="card text-center h-100 shadow-sm border-info">
            <div className="card-header bg-info text-white">Total Ventas</div>
            <div className="card-body d-flex flex-column justify-content-between">
              <h2 className="card-title display-4">890</h2>
              <p className="card-text">Ventas realizadas este mes.</p>
              <a href="/ventas" className="btn btn-outline-info mt-auto">Ver Ventas</a>
            </div>
          </div>
        </div>

        {/* Acciones Rápidas */}
        <div className="col-lg-3 col-md-6 col-sm-12 mb-4">
          <div className="card h-100 shadow-sm border-dark">
            <div className="card-header bg-dark text-white">Acciones Rápidas</div>
            <div className="card-body d-flex flex-column justify-content-around">
              <button className="btn btn-secondary mb-2">Crear Nuevo Pedido</button>
              <button className="btn btn-secondary mb-2">Añadir Nuevo Producto</button>
              <button className="btn btn-secondary">Generar Reporte</button>
            </div>
          </div>
        </div>
      </div>

      {/* Sección de Gráfico y Actividad Reciente */}
      <div className="row mt-4">
        {/* Gráfico (Placeholder) */}
        <div className="col-lg-7 mb-4">
          <div className="card h-100 shadow-sm border-secondary">
            <div className="card-header bg-secondary text-white">Ventas Mensuales</div>
            <div className="card-body d-flex align-items-center justify-content-center" style={{ minHeight: '300px' }}>
              <p className="text-center text-muted">Aquí iría un gráfico de ventas (ej. una gráfica de líneas).</p>
            </div>
          </div>
        </div>

        {/* Tabla de Órdenes Recientes */}
        <div className="col-lg-5 mb-4">
          <div className="card h-100 shadow-sm border-warning">
            <div className="card-header bg-warning text-white">Órdenes Recientes</div>
            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-hover mb-0">
                  <thead>
                    <tr>
                      <th scope="col">#Pedido</th>
                      <th scope="col">Cliente</th>
                      <th scope="col">Total</th>
                      <th scope="col">Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#001</td>
                      <td>Juan Pérez</td>
                      <td>$150.00</td>
                      <td><span className="badge bg-success">Completado</span></td>
                    </tr>
                    <tr>
                      <td>#002</td>
                      <td>María García</td>
                      <td>$230.50</td>
                      <td><span className="badge bg-warning text-dark">Pendiente</span></td>
                    </tr>
                    <tr>
                      <td>#003</td>
                      <td>Carlos Ruiz</td>
                      <td>$75.20</td>
                      <td><span className="badge bg-danger">Cancelado</span></td>
                    </tr>
                    <tr>
                      <td>#004</td>
                      <td>Ana López</td>
                      <td>$300.00</td>
                      <td><span className="badge bg-success">Completado</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="card-footer text-center">
              <a href="#" className="btn btn-sm btn-outline-secondary">Ver Todas las Órdenes</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 