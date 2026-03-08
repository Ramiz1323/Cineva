import React from "react";
import { Link } from "react-router-dom";
import { Star, PlayCircle } from "lucide-react";

const MovieCard = ({ movie }) => {
  const posterUrl = movie.posterUrl
    || (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster");

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative block rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-red-900/20 bg-zinc-900 transition-all duration-500 ease-out"
    >
      {/* Poster */}
      <div className="aspect-2/3 overflow-hidden bg-slate-200 dark:bg-zinc-800">
        <img
          src={posterUrl}
          alt={movie.title || movie.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {/* Floating Rating Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/20 dark:bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs font-bold shadow-lg border border-white/10">
        <Star className="fill-yellow-400 text-yellow-500 w-3.5 h-3.5" />
        <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
      </div>

      {/* Animated Glassmorphism Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/80 to-transparent p-5 pt-12 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex flex-col justify-end">
        <h3 className="text-sm md:text-base font-bold text-white line-clamp-2 leading-tight drop-shadow-md mb-2">
          {movie.title || movie.name}
        </h3>
        
        <div className="flex items-center text-xs font-medium text-slate-300 gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <PlayCircle className="w-4 h-4 text-red-500" />
          <span>View Details</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;