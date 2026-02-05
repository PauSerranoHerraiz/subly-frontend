import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-lime-400 mb-4">404</h1>
        <p className="text-xl text-gray-300 mb-8">Page not found</p>
        <Link
          to="/"
          className="px-5 py-3 bg-lime-500 hover:bg-lime-400 text-gray-900 font-semibold rounded-lg inline-block"
        >
          Back to home
        </Link>
      </div>
    </div>
  );
}