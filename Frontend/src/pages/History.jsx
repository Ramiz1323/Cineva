import React from "react";
import { useHistory } from "../hooks/useHistory";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";

const History = () => {

  const { history, loading } = useHistory();

  if (loading) {
    return (
      <div className="pt-24 px-6 min-h-screen bg-slate-50 dark:bg-black transition-colors duration-300">
        <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
          Recently Watched
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <SkeletonCard key={`history-skel-${i}`} />
          ))}
        </div>
      </div>
    );
  }

  if (!history.length) {
    return (
      <div className="pt-24 text-center text-slate-500 dark:text-gray-400 min-h-screen bg-slate-50 dark:bg-black transition-colors duration-300">
        No watch history yet
      </div>
    );
  }

  return (
    <div className="pt-24 px-6 min-h-screen bg-slate-50 dark:bg-black transition-colors duration-300">

      <h1 className="text-3xl font-bold mb-8 text-slate-900 dark:text-white">
        Recently Watched
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">

        {history.map((movie) => (

          <MovieCard
            key={movie.movieId}
            movie={{
              id: movie.movieId,
              title: movie.title,
              poster_path: movie.posterPath,
              vote_average: movie.voteAverage
            }}
          />

        ))}

      </div>

    </div>
  );
};

export default History;