import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const passwordOk =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(password);

    if (!passwordOk) {
      setError("Password must be 6+ characters, include 1 uppercase, 1 lowercase and 1 number");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await api.post("/auth/signup", { email, password, companyName });

      const res = await api.post("/auth/login", { email, password });
      login(res.data.authToken);
      navigate("/customers");
    } catch (err: any) {
      console.error("Signup error:", err);
      setError(err.response?.data?.message || "Error during signup");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 px-4">
      <div className="w-full max-w-md bg-gray-800 border border-gray-700 rounded-2xl p-8 shadow-xl">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">Create your account</h1>
          <p className="text-gray-400 mt-2">
            Start managing subscriptions with Subly
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {error}
          </div>
        )}

        <form onSubmit={submit} className="space-y-5">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Company name
            </label>
            <input
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="Acme Inc."
              required
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
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
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Confirm password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 bg-gray-900 text-white rounded-lg border border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-lime-500 hover:bg-lime-400 text-gray-900 font-semibold py-3 rounded-lg transition
                       shadow-[0_0_20px_rgba(163,230,53,0.25)]"
          >
            Create account
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-lime-400 hover:text-lime-300 font-medium"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
