import React from "react";
import { useMovieDiscovery } from "../hooks/useMovieDiscovery";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { motion } from "framer-motion";

const Home = () => {
  const { trending, popular, loading } = useMovieDiscovery();
  const skeletons = Array.from({ length: 12 });

  return (
    // Dynamic background and text colors
    <div className=" bg-white dark:bg-black text-slate-900 dark:text-white min-h-screen pt-16 transition-colors duration-300">
      
      {/* HERO SECTION - Adaptive Gradients */}
      <div className="relative h-[40vh] sm:h-[50vh] md:h-[60vh] flex items-center justify-center text-center px-4 bg-linear-to-b from-slate-100 to-white dark:from-black dark:via-zinc-900 dark:to-black ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight">
            Discover <span className="text-red-600">Movies</span>
          </h1>
          <p className="text-slate-600 dark:text-gray-400 text-sm sm:text-base md:text-lg font-medium">
            Explore trending films, popular hits, and discover your next favorite movie.
          </p>
        </motion.div>
      </div>

      {/* TRENDING SECTION */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-10">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <span className="text-orange-500">🔥</span> Trending Today
          </h2>
          <div className="h-1 flex-1 mx-4 bg-slate-100 dark:bg-zinc-800 rounded-full hidden sm:block" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {loading
            ? skeletons.map((_, i) => <SkeletonCard key={i} />)
            : trending.map((movie) => (
                <motion.div
                  key={movie.id}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
        </div>
      </section>

      {/* POPULAR SECTION - Subtle Background Shift */}
      <section className="px-4 sm:px-6 md:px-10 lg:px-16 py-16 bg-slate-50 dark:bg-zinc-900/30 transition-colors duration-300">
        <motion.div 
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }}
          className="flex items-center justify-between mb-8"
        >
          <h2 className="text-xl sm:text-2xl font-bold flex items-center gap-2">
            <span className="text-yellow-500">⭐</span> Popular Hits
          </h2>
          <div className="h-1 flex-1 mx-4 bg-slate-200 dark:bg-zinc-800 rounded-full hidden sm:block" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {loading
            ? skeletons.map((_, i) => <SkeletonCard key={i} />)
            : popular.map((movie) => (
                <motion.div
                  key={movie.id}
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
        </div>
      </section>
    </div>
  );
};

export default Home;