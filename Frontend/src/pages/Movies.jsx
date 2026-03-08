import React, { useCallback } from "react";
import { getPopularMovies } from "../services/movieService";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { motion } from "framer-motion";

const Movies = () => {
  // We use useCallback to keep the function reference stable for the useEffect dependency
  const fetchMovies = useCallback((page) => getPopularMovies(page), []);
  const { items, loading, hasMore, lastElementRef } = useInfiniteScroll(fetchMovies);

  const skeletons = Array.from({ length: 12 });

  return (
    <div className="bg-white dark:bg-black text-slate-900 dark:text-white min-h-screen pt-24 pb-20 transition-colors duration-300">
      
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 mb-12">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-semibold tracking-wide uppercase shadow-sm">
            Cinematic Library
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight drop-shadow-sm">
            All <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-orange-500">Movies</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-gray-400 font-medium max-w-2xl leading-relaxed">
            Endless scrolling of the most popular movies worldwide. Hand-picked and continuously updated.
          </p>
        </motion.div>
      </div>

      {/* Infinite Grid */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
          {items.map((movie, index) => {
            // Attach the ref to the last element in the list to trigger the observer
            const isLastElement = items.length === index + 1;
            
            return (
              <motion.div
                ref={isLastElement ? lastElementRef : null}
                key={`${movie.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            );
          })}
          
          {/* Append Skeletons to the bottom when fetching the next page */}
          {loading && skeletons.map((_, i) => <SkeletonCard key={`skel-${i}`} />)}
        </div>

        {!loading && !hasMore && (
          <div className="text-center mt-16 text-slate-500 font-medium">
            You've reached the end of the universe. 🚀
          </div>
        )}
      </section>
    </div>
  );
};

export default Movies;
