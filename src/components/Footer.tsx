import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col items-center gap-3">
        <Link
          to="/about"
          className="text-sm font-medium text-lime-400 hover:text-lime-300 transition"
        >
          About Subly
        </Link>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Subly. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
