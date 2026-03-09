import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadWatchlist } from "../redux/userSlice";
import { selectWatchlist, selectUserLoading } from "../redux/userSlice";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { Bookmark } from "lucide-react";

const Watchlist = () => {
  const dispatch = useDispatch();
  const watchlist = useSelector(selectWatchlist);
  const loading = useSelector(selectUserLoading);

  useEffect(() => {
    dispatch(loadWatchlist());
  }, [dispatch]);

  return (
    <div className="pt-24 min-h-screen px-6 bg-white dark:bg-black transition-colors">
      <div className="max-w-[1600px] mx-auto">
        <div className="flex items-center gap-3 mb-10">
          <Bookmark size={28} className="text-blue-500" />
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Your Watchlist
          </h1>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <SkeletonCard key={`wl-skel-${i}`} />
            ))}
          </div>
        ) : watchlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 gap-4 text-slate-500 dark:text-gray-500">
            <Bookmark size={52} strokeWidth={1.2} />
            <p className="text-lg font-medium">Your watchlist is empty.</p>
            <p className="text-sm">Tap the bookmark icon on any movie to save it here.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {watchlist.map((movie) => (
              <MovieCard key={movie.id || movie.movieId} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Watchlist;
