import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const { handleSignup, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignup(formData);
    navigate("/login");
  };

  return (
    <div className="pt-32 min-h-screen bg-black flex justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-900 p-8 rounded-lg w-full max-w-md h-fit border border-gray-800"
      >
        <h2 className="text-3xl font-bold text-white mb-6">Create Account</h2>

        {error && (
          <div className="text-red-500 mb-4 bg-red-500/10 p-2 rounded text-sm border border-red-500/50">
            {error}
          </div>
        )}

        <input
          name="username"
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 bg-gray-800 rounded text-white outline-none focus:ring-2 focus:ring-red-600"
          onChange={handleChange}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 bg-gray-800 rounded text-white outline-none focus:ring-2 focus:ring-red-600"
          onChange={handleChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-6 bg-gray-800 rounded text-white outline-none focus:ring-2 focus:ring-red-600"
          onChange={handleChange}
          required
        />

        <button
          disabled={loading}
          className="w-full bg-red-600 py-3 rounded font-bold text-white hover:bg-red-700 transition disabled:bg-gray-700"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>

        <p className="text-gray-400 mt-4 text-sm text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-white hover:underline">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
