import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/Footer';

const DashboardLayout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />
      <div className="d-flex flex-grow-1">
        <Sidebar />
        <main className="p-3 flex-grow-1">
          {children}
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default DashboardLayout; 