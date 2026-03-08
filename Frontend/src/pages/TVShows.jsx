import React, { useCallback } from "react";
import { getPopularTv } from "../services/tvService";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { motion } from "framer-motion";

const TVShows = () => {
  // Use useCallback to keep reference stable
  const fetchTv = useCallback((page) => getPopularTv(page), []);
  const { items, loading, hasMore, lastElementRef } = useInfiniteScroll(fetchTv);

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
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase shadow-sm">
            Binge Worthy
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight drop-shadow-sm">
            TV <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">Shows</span>
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-gray-400 font-medium max-w-2xl leading-relaxed">
            Scroll forever through the most critically acclaimed and popular television series available right now.
          </p>
        </motion.div>
      </div>

      {/* Infinite Grid */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
          {items.map((show, index) => {
            // Attach the ref to the last element
            const isLastElement = items.length === index + 1;
            
            return (
              <motion.div
                ref={isLastElement ? lastElementRef : null}
                key={`${show.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* Note: TMDB returns 'name' for TV, but 'title' for movies. MovieCard should handle this gracefully (we might need to tweak MovieCard if it entirely relies on title). We'll map 'name' to 'title' so MovieCard works flawlessly. */}
                <MovieCard movie={{...show, title: show.title || show.name}} />
              </motion.div>
            );
          })}
          
          {loading && skeletons.map((_, i) => <SkeletonCard key={`skel-tv-${i}`} />)}
        </div>

        {!loading && !hasMore && (
          <div className="text-center mt-16 text-slate-500 font-medium">
            That's a wrap on TV Shows! 📺
          </div>
        )}
      </section>
    </div>
  );
};

export default TVShows;
