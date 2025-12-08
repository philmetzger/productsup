export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 mt-auto">
      <div className="px-4 sm:px-6 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 text-xs sm:text-sm">
          <p>© 2025 ProductHub. All rights reserved.</p>
          <nav
            className="flex flex-wrap gap-x-4 gap-y-1 sm:gap-x-6"
            aria-label="Footer"
          >
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Contact
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
