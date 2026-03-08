import React from "react";
import { useFavorites } from "../hooks/useFavorites";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";

const Favorites = () => {
  const { favorites, loading } = useFavorites();

  return (
    <div className="pt-24 min-h-screen px-6 bg-white dark:bg-black">
      <h1 className="text-3xl font-bold mb-10 text-slate-900 dark:text-white">
        ❤️ Your Favorites
      </h1>

      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={`fav-skel-${i}`} />
          ))}
        </div>
      ) : favorites.length === 0 ? (
        <p className="text-gray-500">No favorite movies yet.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.isArray(favorites) &&
            favorites.map((movie) => (
              <MovieCard key={movie.movieId || movie.id} movie={movie} />
            ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
