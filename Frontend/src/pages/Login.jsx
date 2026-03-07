import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const { handleLogin, loading, error } = useAuth();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const res = await handleLogin({ email, password });

    if (res?.success) {
      navigate("/");
    }

  };

  return (
    <div className="pt-32 min-h-screen flex justify-center px-4 bg-white dark:bg-black transition-colors">

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 p-8 rounded-lg w-full max-w-md border border-slate-200 dark:border-zinc-800 shadow-lg"
      >

        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
          Sign In
        </h2>

        {error && (
          <p className="text-red-500 mb-4 bg-red-500/10 p-2 rounded text-sm">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-slate-100 dark:bg-zinc-800 rounded text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 bg-slate-100 dark:bg-zinc-800 rounded text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-red-600 py-3 rounded font-bold text-white hover:bg-red-700 transition disabled:bg-gray-500"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-sm text-slate-600 dark:text-gray-400 mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/signup" className="text-red-600 font-semibold hover:underline">
            Sign up
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Login;