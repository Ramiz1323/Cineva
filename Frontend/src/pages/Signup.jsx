import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });

  const { handleSignup, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    const res = await handleSignup(formData);

    if (res?.success) {
      navigate("/login");
    }

  };

  return (
    <div className="pt-32 min-h-screen flex justify-center px-4 bg-white dark:bg-black transition-colors">

      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-zinc-900 p-8 rounded-lg w-full max-w-md border border-slate-200 dark:border-zinc-800 shadow-lg"
      >

        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">
          Create Account
        </h2>

        {error && (
          <div className="text-red-500 mb-4 bg-red-500/10 p-3 rounded text-sm border border-red-500/40">
            {error}
          </div>
        )}

        <input
          name="username"
          type="text"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-slate-100 dark:bg-zinc-800 rounded text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full p-3 mb-4 bg-slate-100 dark:bg-zinc-800 rounded text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full p-3 mb-6 bg-slate-100 dark:bg-zinc-800 rounded text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-red-600"
          required
        />

        <button
          disabled={loading}
          className="w-full bg-red-600 py-3 rounded font-bold text-white hover:bg-red-700 transition disabled:bg-gray-400"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-slate-600 dark:text-gray-400 mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-red-600 font-semibold hover:underline"
          >
            Sign In
          </Link>
        </p>

      </form>

    </div>
  );
};

export default Signup;