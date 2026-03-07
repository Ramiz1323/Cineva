import React, { useEffect, useState } from "react";
import { X, Search } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import { Link } from "react-router-dom";

const SearchOverlay = ({ open, onClose }) => {

  const [query, setQuery] = useState("");

  const { results, loading } = useSearch(query);

  useEffect(() => {

    const handleEsc = (e) => {

      if (e.key === "Escape") onClose();

    };

    window.addEventListener("keydown", handleEsc);

    return () => window.removeEventListener("keydown", handleEsc);

  }, [onClose]);

  if (!open) return null;
  useEffect(() => {

  if (open) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  return () => {
    document.body.style.overflow = "auto";
  };

}, [open]);

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg flex flex-col items-center pt-24">

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-white hover:text-red-500"
      >
        <X size={28} />
      </button>

      {/* Search Input */}
      <div className="w-full max-w-2xl relative">

        <Search className="absolute left-4 top-3 text-gray-400" />

        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
          className="w-full pl-12 pr-4 py-3 rounded-xl bg-zinc-900 text-white border border-zinc-700 focus:ring-2 focus:ring-red-500 outline-none"
        />

      </div>

      {/* Results */}
      <div className="w-full max-w-4xl mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 px-6 overflow-y-auto flex-1 scroll-smooth">

        {loading && (
          <p className="text-gray-400 col-span-full text-center">
            Searching...
          </p>
        )}

        {!loading && results.length === 0 && query && (
          <p className="text-gray-400 col-span-full text-center">
            No results found
          </p>
        )}

        {results.map((movie) => (

          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            onClick={onClose}
            className="hover:scale-105 transition"
          >

            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                  : "/no-poster.png"
              }
              className="rounded-lg"
            />

            <p className="text-sm text-white mt-2 text-center">
              {movie.title || movie.name}
            </p>

          </Link>

        ))}

      </div>

    </div>
  );

};

export default SearchOverlay;