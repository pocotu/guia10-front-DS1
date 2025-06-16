import React from 'react';

const Home = () => {
  return (
    <div className="home-page container-fluid py-5 bg-light">
      {/* Hero Section */}
      <div className="jumbotron jumbotron-fluid text-center bg-white p-5 rounded shadow-sm mb-5">
        <h1 className="display-4 mb-3">Bienvenido a Mi Sistema de Ventas</h1>
        <p className="lead mb-4">Simplifica la gestión de tus ventas, clientes y productos con nuestra plataforma intuitiva y potente.</p>
        <hr className="my-4" />
        <p>Accede a todas las herramientas que necesitas para optimizar tu negocio.</p>
        <a className="btn btn-primary btn-lg mt-3" href="/login" role="button">Iniciar Sesión</a>
      </div>

      {/* Features Section */}
      <div className="row text-center mt-5">
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100 shadow-sm border-primary">
            <div className="card-body">
              <i className="bi bi-people-fill display-4 text-primary"></i>
              <h5 className="card-title mt-3">Gestión de Clientes</h5>
              <p className="card-text">Administra la información de tus clientes de forma eficiente y segura.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-6 mb-4">
          <div className="card h-100 shadow-sm border-success">
            <div className="card-body">
              <i className="bi bi-box-seam display-4 text-success"></i>
              <h5 className="card-title mt-3">Inventario de Productos</h5>
              <p className="card-text">Controla tu stock, añade nuevos productos y gestiona precios.</p>
            </div>
          </div>
        </div>
        <div className="col-lg-4 col-md-12 mb-4">
          <div className="card h-100 shadow-sm border-info">
            <div className="card-body">
              <i className="bi bi-graph-up display-4 text-info"></i>
              <h5 className="card-title mt-3">Análisis de Ventas</h5>
              <p className="card-text">Obtén reportes y métricas clave para tomar mejores decisiones.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Optional: Call to Action at the bottom */}
      <div className="text-center mt-5 p-4 bg-primary text-white rounded shadow-sm">
        <h3>¿Listo para transformar tu negocio?</h3>
        <p className="lead">Regístrate hoy mismo y empieza a gestionar tus ventas como un profesional.</p>
        <a className="btn btn-light btn-lg" href="/register" role="button">Regístrate Gratis</a>
      </div>
    </div>
  );
};

export default Home; 