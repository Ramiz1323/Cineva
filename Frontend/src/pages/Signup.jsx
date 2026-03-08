import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Eye, EyeOff, Mail, Lock, User, Sparkles } from "lucide-react";

const Signup = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const { handleSignup, loading, error } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleSignup(formData);
    if (res?.success) navigate("/login");
  };

  return (
    <div className="min-h-screen flex bg-zinc-950">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-red-950/30 to-zinc-950" />

        {/* Animated orbs */}
        <div className="absolute top-1/3 left-1/3 w-72 h-72 bg-red-600/15 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-1/5 w-56 h-56 bg-red-900/20 rounded-full blur-3xl animate-pulse delay-700" />

        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          <Link to="/" className="text-3xl font-extrabold text-red-500 tracking-tighter">
            CINEVA
          </Link>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center">
                <Sparkles size={20} className="text-red-500" />
              </div>
              <span className="text-sm text-gray-400 font-medium uppercase tracking-widest">Join the community</span>
            </div>
            <h2 className="text-5xl font-extrabold text-white leading-tight mb-4">
              Your watchlist,<br />
              <span className="text-red-500">your world.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xs leading-relaxed">
              Save favorites, track what you've watched, and discover films tailored to you.
            </p>
          </div>

          {/* Feature list */}
          <ul className="space-y-3">
            {["Unlimited watchlist & favorites", "Personalized watch history", "Admin-curated movie picks"].map((feat) => (
              <li key={feat} className="flex items-center gap-3 text-sm text-gray-400">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
                {feat}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 lg:py-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden block text-2xl font-extrabold text-red-500 tracking-tighter mb-10">
            CINEVA
          </Link>

          <h1 className="text-3xl font-extrabold text-white mb-2">Create account</h1>
          <p className="text-gray-500 mb-8 text-sm">Start your journey with CINEVA today</p>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Username</label>
              <div className="relative">
                <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder="your_username"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-gray-600 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-11 pr-4 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-gray-600 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all"
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Password</label>
              <div className="relative">
                <Lock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                  className="w-full pl-11 pr-12 py-3.5 bg-zinc-900 border border-zinc-800 rounded-xl text-white placeholder-gray-600 text-sm outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/50 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 mt-2 bg-red-600 hover:bg-red-700 disabled:bg-zinc-700 disabled:text-gray-500 text-white font-bold rounded-xl transition-all duration-200 shadow-lg shadow-red-900/30 hover:shadow-red-900/50 active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating account...
                </span>
              ) : "Create Account"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-8">
            Already have an account?{" "}
            <Link to="/login" className="text-red-500 font-semibold hover:text-red-400 transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;