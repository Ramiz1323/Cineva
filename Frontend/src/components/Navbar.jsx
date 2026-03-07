import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, LogOut } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import ThemeToggle from "./ThemeToggle";
import { useSearch } from "../hooks/useSearch";
import SearchOverlay from "./SearchOverlay";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);

  const { results, loading } = useSearch(searchTerm);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {

  const handler = (e) => {

    if (e.key === "/") {

      e.preventDefault();
      setSearchOpen(true);

    }

  };

  window.addEventListener("keydown", handler);

  return () => window.removeEventListener("keydown", handler);

}, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      const query = searchTerm.trim();

      if (query.length > 0) {
        navigate(`/search?q=${query}`);

        setSearchTerm("");
      }
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;

    setSearchTerm(value);
  };

  const handleResultClick = () => {
    setSearchTerm("");
  };

  return (
    <nav className="fixed top-0 w-full z-50 p-4 border-b border-slate-200/50 dark:border-white/10">
      <div className="absolute inset-0 z-[-1] bg-white/40 dark:bg-black/40 backdrop-blur-xl" />

      <div className="flex justify-between items-center text-slate-900 dark:text-white">
        <Link
          to="/"
          className="text-2xl font-bold text-red-600 tracking-tighter"
        >
          CINEVA
        </Link>



        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-6 font-medium">
            <Link to="/movies" className="hover:text-red-500 transition">
              Movies
            </Link>

            <Link to="/tv" className="hover:text-red-500 transition">
              TV Shows
            </Link>
          </div>
          <button
  onClick={() => setSearchOpen(true)}
  className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800 rounded-full"
>
  <Search size={20} />
</button>
<SearchOverlay
  open={searchOpen}
  onClose={() => setSearchOpen(false)}
/>
          <ThemeToggle />

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link
                to="/favorites"
                className="hidden sm:block hover:text-red-500 transition font-medium"
              >
                Favorites
              </Link>

              {user?.role === "admin" && (
                <Link
                  to="/admin"
                  className="text-yellow-600 dark:text-yellow-500 font-bold"
                >
                  Admin
                </Link>
              )}

              <button
                onClick={() => dispatch(logout())}
                className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800/40 rounded-full transition text-red-600"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-1.5 rounded-full transition shadow-lg"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
