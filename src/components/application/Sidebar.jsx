import { Info, Package } from "lucide-react";

const Sidebar = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: "products", label: "Products", icon: Package },
    { id: "about", label: "About Case Study", icon: Info },
  ];

  return (
    <aside className="h-full w-64 bg-gray-900 text-white flex flex-col shadow-lg">
      <div className="p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <div className="w-9 h-9 sm:w-10 sm:h-10 bg-blue-600 rounded-lg flex items-center justify-center text-lg sm:text-xl">
            🏪
          </div>
          <span className="text-lg sm:text-xl font-bold">Dashboard</span>
        </div>
        <nav className="space-y-2" aria-label="Primary">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                currentPage === item.id
                  ? "bg-blue-600 text-white"
                  : "text-gray-300 hover:bg-gray-800"
              }`}
              aria-current={currentPage === item.id ? "page" : undefined}
            >
              <span className="text-lg sm:text-xl">
                <item.icon className="w-5 h-5" />
              </span>
              <span className="font-medium text-sm sm:text-base">
                {item.label}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
