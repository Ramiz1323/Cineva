import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Menu, X, Film, Tv, Clock, Heart, ShieldCheck, Bookmark } from "lucide-react";
import { useSelector } from "react-redux";
import { useAuth } from "../hooks/useAuth";
import ThemeToggle from "./ThemeToggle";
import SearchOverlay from "./SearchOverlay";
import { motion, AnimatePresence } from "framer-motion";

const NAV_LINKS = [
  { to: "/movies", label: "Movies", icon: Film },
  { to: "/tv", label: "TV Shows", icon: Tv },
];

const AUTH_LINKS = [
  { to: "/history", label: "History", icon: Clock },
  { to: "/favorites", label: "Favorites", icon: Heart },
  { to: "/watchlist", label: "Watchlist", icon: Bookmark },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const location = useLocation();
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { handleLogout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close mobile menu on route change
  useEffect(() => setMobileOpen(false), [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav className={`p-1.5 fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-black/80 backdrop-blur-xl border-b border-slate-200/50 dark:border-white/5 shadow-sm"
          : "bg-transparent"
      }`}>
        <div className="w-full px-4 sm:px-6 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link
            to="/"
            className="text-xl font-extrabold text-red-600 tracking-tighter shrink-0 hover:text-red-500 transition-colors"
          >
            CINEVA
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-1 flex-1">
            {NAV_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(to)
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800"
                }`}
              >
                {label}
              </Link>
            ))}

            {isAuthenticated && AUTH_LINKS.map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(to)
                    ? "bg-red-600 text-white shadow-sm"
                    : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800"
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2.5 rounded-lg text-slate-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all"
              aria-label="Search"
            >
              <Search size={18} />
            </button>

            {/* Theme */}
            <ThemeToggle />

            {isAuthenticated ? (
              <>
                {/* Admin badge */}
                {user?.role === "admin" && (
                  <Link
                    to="/admin"
                    className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-amber-500/10 text-amber-500 hover:bg-amber-500/20 rounded-lg text-xs font-bold transition-all"
                  >
                    <ShieldCheck size={14} />
                    Admin
                  </Link>
                )}

                {/* Avatar + logout */}
                <div className="hidden md:flex items-center gap-2 pl-2 ml-1 border-l border-slate-200 dark:border-zinc-800">
                  <Link
                    to="/profile"
                    title="View Profile"
                    className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold uppercase shadow hover:ring-2 hover:ring-red-500 hover:ring-offset-1 transition-all"
                  >
                    {user?.username?.[0] || "U"}
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-xs font-medium text-slate-500 dark:text-gray-500 hover:text-red-500 dark:hover:text-red-400 transition-colors px-1"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="hidden md:inline-flex items-center px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-semibold rounded-lg transition-all shadow-sm hover:shadow-red-800/30"
              >
                Sign In
              </Link>
            )}

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2.5 rounded-lg text-slate-500 dark:text-gray-400 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-all"
              aria-label="Menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-white dark:bg-zinc-950 border-b border-slate-200 dark:border-zinc-800 shadow-2xl"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {/* All nav links for mobile */}
              {[...NAV_LINKS, ...(isAuthenticated ? AUTH_LINKS : [])].map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    isActive(to)
                      ? "bg-red-600 text-white"
                      : "text-slate-700 dark:text-gray-300 hover:bg-slate-100 dark:hover:bg-zinc-800"
                  }`}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}

              {/* Admin (mobile) */}
              {isAuthenticated && user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-amber-500 hover:bg-amber-500/10 transition-all"
                >
                  <ShieldCheck size={16} />
                  Admin Panel
                </Link>
              )}

              <div className="border-t border-slate-200 dark:border-zinc-800 mt-2 pt-3">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-red-600 flex items-center justify-center text-white text-xs font-bold uppercase">
                        {user?.username?.[0] || "U"}
                      </div>
                      <span className="text-sm font-semibold text-slate-900 dark:text-white">{user?.username}</span>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/login"
                    className="flex items-center justify-center py-3 bg-red-600 hover:bg-red-700 text-white text-sm font-bold rounded-xl transition-all mx-0"
                  >
                    Sign In
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-30 md:hidden bg-black/20 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>

      {/* Search overlay */}
      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
};

export default Navbar;
