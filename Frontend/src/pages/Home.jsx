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
      
      {/* HERO SECTION - Cinematic */}
      <div className="relative h-[65vh] md:h-[75vh] flex items-center justify-center text-center px-4 overflow-hidden">
        {/* Dynamic Animated Background */}
        <div className="absolute inset-0 bg-linear-to-b from-black/60 via-slate-900/60 to-white dark:from-red-900/20 dark:via-black dark:to-black z-0 pointer-events-none" />
        
        {/* Soft vignette behind text for ultimate contrast */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.4)_100%)] z-0 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative z-10 max-w-4xl"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full border border-red-500/50 bg-red-500/20 text-white dark:text-red-400 text-sm font-semibold tracking-wide uppercase shadow-sm backdrop-blur-md"
          >
            Premium Entertainment
          </motion.div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tighter leading-tight drop-shadow-2xl text-white">
            Discover <span className="text-transparent bg-clip-text bg-linear-to-r from-red-500 to-orange-400 text-shadow-sm">Movies</span>
          </h1>
          <p className="text-slate-100 dark:text-gray-300 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg">
            Explore trending films, popular hits, and discover your next favorite movie in a stunning cinematic experience.
          </p>
        </motion.div>
      </div>

      {/* TRENDING SECTION */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-20 py-12 max-w-[1600px] mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between mb-10"
        >
          <h2 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3 tracking-tight">
            <span className="text-orange-500 drop-shadow-md">🔥</span> Trending Today
          </h2>
          <div className="h-[2px] flex-1 mx-6 bg-linear-to-r from-slate-200 to-transparent dark:from-zinc-800 hidden md:block" />
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
          {loading
            ? skeletons.map((_, i) => <SkeletonCard key={i} />)
            : trending.map((movie, index) => (
                <motion.div
                  key={movie.id}
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                >
                  <MovieCard movie={movie} />
                </motion.div>
              ))}
        </div>
      </section>

      {/* POPULAR SECTION - Subtle Background Shift */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-20 py-20 bg-slate-50 dark:bg-zinc-900/40 transition-colors duration-300">
        <div className="max-w-[1600px] mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-between mb-10"
          >
            <h2 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-3 tracking-tight">
              <span className="text-yellow-500 drop-shadow-md">⭐</span> Popular Hits
            </h2>
            <div className="h-[2px] flex-1 mx-6 bg-linear-to-r from-slate-200 to-transparent dark:from-zinc-800 hidden md:block" />
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
            {loading
              ? skeletons.map((_, i) => <SkeletonCard key={i} />)
              : popular.map((movie, index) => (
                  <motion.div
                    key={movie.id}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
                  >
                    <MovieCard movie={movie} />
                  </motion.div>
                ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;