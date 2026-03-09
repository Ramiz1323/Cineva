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
          <p className="text-slate-100 dark:text-gray-300 text-base sm:text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed drop-shadow-lg mb-8">
            Explore trending films, popular hits, and discover your next favorite movie in a stunning cinematic experience.
          </p>

          <motion.div 
             initial={{ opacity: 0, y: 15 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ delay: 0.6, duration: 0.8 }}
             className="flex flex-wrap items-center justify-center gap-4 mt-8"
          >
            <span className="px-6 py-3 bg-white/10 dark:bg-black/50 backdrop-blur-xl rounded-full text-base sm:text-lg font-bold text-white border border-white/20 flex items-center gap-2 lg:gap-3 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-white/20 transition-all hover:scale-105 cursor-default">
              🎤 <span className="tracking-wide">Voice Search</span>
            </span>
            <span className="px-6 py-3 bg-red-600/30 dark:bg-red-900/40 backdrop-blur-xl rounded-full text-base sm:text-lg font-bold text-red-50 border border-red-500/50 flex items-center gap-2 lg:gap-3 shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:bg-red-600/40 transition-all hover:scale-105 cursor-default ring-1 ring-red-500/50">
              🤖 <span className="tracking-wide">AI Mood Match</span>
            </span>
            <span className="px-6 py-3 bg-white/10 dark:bg-black/50 backdrop-blur-xl rounded-full text-base sm:text-lg font-bold text-white border border-white/20 flex items-center gap-2 lg:gap-3 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:bg-white/20 transition-all hover:scale-105 cursor-default">
              ▶️ <span className="tracking-wide">Trailer on Hover</span>
            </span>
          </motion.div>
        </motion.div>
      </div>

      {/* JEDI GESTURES AD BANNER (PROMOTION) - SHRUNK DOWN */}
      <section className="px-4 py-2 mx-auto w-full max-w-[1000px] -mt-6 mb-6 relative z-20">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="bg-linear-to-r from-cyan-900/60 to-blue-900/40 border border-cyan-500/30 rounded-2xl px-6 py-4 backdrop-blur-xl shadow-[0_0_20px_rgba(6,182,212,0.1)] flex items-center justify-between gap-4 overflow-hidden relative"
        >
          {/* Decorative glow inside banner */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-[40px] -mr-16 -mt-16 pointer-events-none"></div>

          <div className="flex-1 z-10 flex items-center gap-4">
            <span className="shrink-0 px-2.5 py-1 bg-cyan-500/20 text-cyan-300 text-[10px] font-black uppercase tracking-wider rounded-md border border-cyan-500/50">
              New
            </span>
            <div>
               <h3 className="text-sm md:text-base font-bold text-white flex items-center gap-2">
                 <span className="text-lg">🪄</span> Jedi Hand Gestures Mode
               </h3>
               <p className="text-gray-300 text-xs md:text-sm mt-0.5 line-clamp-1 md:line-clamp-2">
                 Navigate Cineva hands-free! Turn on the Jedi Mode toggle (bottom left) and swipe your hand to scroll.
               </p>
            </div>
          </div>

          <div className="flex gap-3 items-center z-10 shrink-0">
             <motion.div 
              animate={{ x: [-3, 3, -3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-cyan-400 text-xs font-bold uppercase hidden sm:block"
             >
               Try It
             </motion.div>
             <motion.div 
              animate={{ rotate: [0, -10, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-cyan-200 shadow-[0_0_15px_rgba(6,182,212,0.3)]"
            >
              <span className="text-lg">👋</span>
            </motion.div>
          </div>
        </motion.div>
      </section>

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