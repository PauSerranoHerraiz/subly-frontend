import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isAuthenticated = Boolean(localStorage.getItem("authToken"));

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  const links = [
    { name: "Dashboard", to: "/dashboard" },
    { name: "Customers", to: "/customers" },
    { name: "Plans", to: "/plans" },
    { name: "Subscriptions", to: "/subscriptions" },
  ];

  const isActive = (to: string) => location.pathname === to;

  return (
    <nav className="bg-gray-800 border-b border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex justify-between h-16 items-center">
          <Link to="/dashboard" className="flex items-center">
            <img src="/subly-navbar.svg" alt="Subly" className="h-10" />
          </Link>

          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {links.map((link) => (
                  <Link
                    key={link.name}
                    to={link.to}
                    className={`inline-flex items-center px-3 py-1.5 rounded-lg transition ${
                      isActive(link.to)
                        ? "text-lime-300 bg-lime-500/10 border border-lime-400/20"
                        : "text-gray-300 hover:text-white hover:bg-gray-700/50"
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="ml-2 px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-sm"
                >
                  Sign in
                </Link>
                <Link
                  to="/signup"
                  className="px-3 py-1.5 rounded-lg bg-lime-500 hover:bg-lime-400 text-gray-900 text-sm font-semibold"
                >
                  Get started
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-gray-300"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-gray-800 border-t border-gray-700 px-6 py-4 space-y-2">
          {isAuthenticated ? (
            <>
              {links.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-2 rounded ${
                    isActive(link.to) ? "text-lime-300" : "text-gray-300 hover:text-white"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="w-full text-left py-2 text-gray-300 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="block py-2 text-gray-300 hover:text-white">
                Sign in
              </Link>
              <Link
                to="/signup"
                className="block py-2 text-lime-300 font-semibold"
              >
                Get started
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
