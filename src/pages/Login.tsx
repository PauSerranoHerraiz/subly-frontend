import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await api.post("/auth/login", { email, password });
      const token = response.data.authToken || response.data.token;

      if (!token) throw new Error("No token received from server");

      login(token); 
      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">
            Subly
          </h1>
          <p className="text-gray-400 mt-2">
            Sign in to your dashboard
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-400 text-gray-900 font-semibold py-3 rounded-lg transition
                       shadow-[0_0_20px_rgba(163,230,53,0.25)]"
          >
            Sign in
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-lime-400 hover:text-lime-300 font-medium"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
