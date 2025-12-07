import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Products from './pages/Products';
import About from './pages/About';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [currentPage, setCurrentPage] = useState('products');

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />

        <main className="flex-1 overflow-y-auto">
          {currentPage === 'products' && <Products />}
          {currentPage === 'about' && <About />}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
