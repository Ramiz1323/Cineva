import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDebounce } from '../hooks/useDebounce';
import { Search, LogOut } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/authSlice';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearch = useDebounce(searchTerm, 500);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (debouncedSearch) {
      navigate(`/search?q=${debouncedSearch}`);
    }
  }, [debouncedSearch, navigate]);

  return (
    <nav className="fixed top-0 w-full z-50 p-4 transition-colors duration-300 border-b border-slate-200/50 dark:border-white/10">
      <div className="absolute inset-0 z-[-1] 
          /* Adaptive Glass - High blur + Very low opacity + Edge border */
          bg-white/40 dark:bg-black/40 backdrop-blur-xl 
          border-b border-slate-200/50 dark:border-white/10" 
      />

      <div className="flex justify-between items-center text-slate-900 dark:text-white">
        
        <Link to="/" className="text-2xl font-bold text-red-600 tracking-tighter drop-shadow-md">
          CINEVA
        </Link>
        
        {/* Search Bar */}
        <div className="flex-1 max-w-md mx-4 relative">
          <Search className="absolute left-3 top-2.5 text-slate-500 dark:text-slate-400 h-5 w-5" />
          <input
            type="text"
            placeholder="Search movies..."
            className="w-full bg-slate-100/40 dark:bg-zinc-800/40 backdrop-blur-md 
              rounded-full py-2 pl-10 pr-4 outline-none border border-slate-200/50 dark:border-zinc-700/50
              focus:ring-2 focus:ring-red-500/50 transition-all placeholder:text-slate-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden md:flex items-center gap-6 font-medium">
            <Link to="/movies" className="hover:text-red-500 transition">Movies</Link>
            <Link to="/tv" className="hover:text-red-500 transition">TV Shows</Link>
          </div>
          
          <ThemeToggle />

          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <Link to="/favorites" className="hidden sm:block hover:text-red-500 transition font-medium">Favorites</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="text-yellow-600 dark:text-yellow-500 font-bold">Admin</Link>
              )}
              <button 
                onClick={() => dispatch(logout())} 
                className="p-2 hover:bg-slate-100 dark:hover:bg-zinc-800/40 rounded-full transition text-red-600"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <Link to="/login" className="bg-red-600/90 hover:bg-red-600 text-white px-5 py-1.5 rounded-full transition-all shadow-lg active:scale-95 font-bold text-sm">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;