import React, { useState } from "react";
import Sidebar from "./components/application/Sidebar";
import Products from "./pages/Products";
import About from "./pages/About";
import Header from "./components/application/Header";
import Footer from "./components/application/Footer";

const App = () => {
  const [currentPage, setCurrentPage] = useState("products");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleNavigate = (page) => {
    setCurrentPage(page);
    // Close the sidebar on smaller screens when navigating
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Desktop / large screens sidebar */}
      <div className="hidden lg:flex">
        <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
      </div>

      {/* Mobile / tablet sidebar overlay with slide animation */}
      <div
        className={`fixed inset-0 z-40 flex lg:hidden transition-opacity duration-300 ${
          isSidebarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div
          className="absolute inset-0 bg-black/50"
          onClick={() => setIsSidebarOpen(false)}
        />
        <div
          className={`relative z-50 w-64 max-w-[80%] h-full transform transition-transform duration-300 ease-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <Sidebar currentPage={currentPage} onNavigate={handleNavigate} />
        </div>
      </div>

      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onToggleSidebar={() => setIsSidebarOpen((prev) => !prev)} />

        <main className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
          {currentPage === "products" && <Products />}
          {currentPage === "about" && <About />}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default App;
