import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { Eye, EyeOff, Mail, Lock, Film } from "lucide-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { handleLogin, loading, error } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await handleLogin({ email, password });
    if (res?.success) navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-zinc-950">
      {/* Left Panel */}
      <div className="hidden lg:flex flex-1 relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-red-950/30 to-zinc-950" />

        {/* Floating blur orbs */}
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-red-800/15 rounded-full blur-3xl animate-pulse delay-1000" />

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between p-14 w-full">
          <Link to="/" className="text-3xl font-extrabold text-red-500 tracking-tighter">
            CINEVA
          </Link>

          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-red-600/20 rounded-xl flex items-center justify-center">
                <Film size={20} className="text-red-500" />
              </div>
              <span className="text-sm text-gray-400 font-medium uppercase tracking-widest">Your Cinema</span>
            </div>
            <h2 className="text-5xl font-extrabold text-white leading-tight mb-4">
              Every story<br />
              <span className="text-red-500">starts here.</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xs leading-relaxed">
              Explore trending films, build your watchlist, and dive into what the world is watching.
            </p>
          </div>

          {/* Decorative film strip */}
          <div className="flex gap-3 opacity-30">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-14 h-20 bg-zinc-700 rounded-lg flex flex-col justify-between p-1">
                <div className="flex gap-1">
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
                </div>
                <div className="flex gap-1 self-end">
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
                  <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="flex-1 flex items-center justify-center px-6 py-16 lg:py-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <Link to="/" className="lg:hidden block text-2xl font-extrabold text-red-500 tracking-tighter mb-10">
            CINEVA
          </Link>

          <h1 className="text-3xl font-extrabold text-white mb-2">Welcome back</h1>
          <p className="text-gray-500 mb-8 text-sm">Sign in to continue to your account</p>

          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full shrink-0" />
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email */}
            <div className="group">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Email</label>
              <div className="relative">
                <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-red-500 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  Signing in...
                </span>
              ) : "Sign In"}
            </button>
          </form>

          <p className="text-center text-gray-600 text-sm mt-8">
            Don't have an account?{" "}
            <Link to="/signup" className="text-red-500 font-semibold hover:text-red-400 transition-colors">
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;