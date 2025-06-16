import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="container-fluid my-4 py-4">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout; 