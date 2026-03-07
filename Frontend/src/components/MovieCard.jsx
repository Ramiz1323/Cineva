import React from "react";
import { Link } from "react-router-dom";
import { Star } from "lucide-react";

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Poster";

  return (
    <Link
      to={`/movie/${movie.id}`}
      className="group relative block rounded-xl overflow-hidden shadow-lg bg-zinc-900 hover:shadow-2xl transition-all duration-300"
    >
      {/* Poster */}
      <div className="aspect-2/3 overflow-hidden">
        <img
          src={posterUrl}
          alt={movie.title || movie.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Rating Badge */}
      <div className="absolute top-2 left-2 flex items-center gap-1 bg-black/70 backdrop-blur-sm px-2 py-1 rounded-md text-yellow-400 text-xs">
        <Star className="fill-current w-3 h-3" />
        <span>{movie.vote_average?.toFixed(1)}</span>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <h3 className="text-sm md:text-base font-semibold line-clamp-2">
          {movie.title || movie.name}
        </h3>
      </div>
    </Link>
  );
};

export default MovieCard;