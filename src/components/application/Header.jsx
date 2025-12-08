import { Bell, Menu } from "lucide-react";

export default function Header({ onToggleSidebar }) {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
      <div className="px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {onToggleSidebar && (
              <button
                type="button"
                className="inline-flex items-center justify-center rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden"
                onClick={onToggleSidebar}
                aria-label="Open sidebar"
              >
                <Menu className="h-6 w-6" />
              </button>
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
              ProductsUp
            </h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              className="text-gray-600 hover:text-gray-900"
              aria-label="View notifications"
            >
              <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
              JD
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
