import { useState } from "react";

type AuthFormProps = {
  mode: "signup" | "login";
  onSuccess: (token: string) => void;
};

export default function AuthForm({ mode, onSuccess }: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch(`/auth/${mode}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Something went wrong");
      } else {
        onSuccess(data.authToken || "");
      }
    } catch (err: any) {
      setError(err.message || "Network error");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-20 p-8 bg-gray-800 rounded-2xl shadow-lg"
    >
      <h2 className="text-3xl font-bold mb-6 text-white text-center">
        {mode === "signup" ? "Sign Up" : "Login"}
      </h2>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded mb-4 text-center">
          {error}
        </div>
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="w-full mb-4 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        className="w-full mb-6 p-3 rounded-lg bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-lime-400 focus:border-lime-400 transition"
        required
      />

      <button
        type="submit"
        className="w-full py-3 bg-lime-500 text-gray-900 font-semibold rounded-lg hover:bg-lime-400 transition"
      >
        {mode === "signup" ? "Sign Up" : "Login"}
      </button>
    </form>
  );
}
