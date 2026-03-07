import React from "react";
import { useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { motion } from "framer-motion";

const MovieDetails = () => {
  const { id } = useParams();
  const { movie, loading, error } = useMovieDetails(id);

  if (loading) return (
    <div className="pt-32 bg-white dark:bg-black text-slate-900 dark:text-white text-center min-h-screen">
      Loading movie details...
    </div>
  );

  if (error) return (
    <div className="pt-32 bg-white dark:bg-black text-red-500 text-center min-h-screen">
      {error}
    </div>
  );

  if (!movie) return null;

  const trailer = movie.videos?.results.find((v) => v.type === "Trailer");
  const backdrop = movie.backdrop_path ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}` : null;

  return (
    <div className="bg-white dark:bg-black text-slate-900 dark:text-white min-h-screen transition-colors duration-300 pt-16">
      
      {/* BACKDROP HERO - Adaptive Overlay */}
      <div 
        className="relative w-full h-[45vh] sm:h-[55vh] md:h-[65vh] bg-cover bg-center flex items-end shadow-inner"
        style={{ backgroundImage: `url(${backdrop})` }}
      >
        {/* Gradient shifts based on theme for better text readability */}
        <div className="absolute inset-0 bg-linear-to-b from-white via-white/40 to-transparent dark:from-black dark:via-black/70 dark:to-transparent" />
        
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="relative px-6 md:px-12 pb-10 max-w-5xl">
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight">{movie.title}</h1>
          <p className="text-slate-700 dark:text-gray-300 text-sm md:text-base max-w-2xl font-medium leading-relaxed">
            {movie.overview || "Description not available"}
          </p>
        </motion.div>
      </div>

      {/* MAIN CONTENT */}
      <div className="px-4 sm:px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* POSTER - Enhanced Shadow for Light Mode */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-xs mx-auto md:mx-0"
          >
            <img 
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} 
              className="rounded-2xl shadow-2xl border border-slate-200 dark:border-zinc-800" 
              alt={movie.title} 
            />
          </motion.div>

          {/* MOVIE INFO - Adaptive Glassmorphism */}
          <div className="flex-1">
            <div className="bg-slate-50/80 dark:bg-zinc-900/60 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-slate-200 dark:border-zinc-800">
              <h2 className="text-2xl font-bold mb-4 border-b border-slate-200 dark:border-zinc-800 pb-2">Movie Overview</h2>
              <p className="text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
                {movie.overview || "Description not available"}
              </p>
              
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
                <div className="flex flex-col">
                  <span className="text-slate-500 dark:text-gray-500 font-bold uppercase tracking-wider mb-1">Rating</span>
                  <span className="text-lg font-semibold">⭐ {movie.vote_average?.toFixed(1)}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 dark:text-gray-500 font-bold uppercase tracking-wider mb-1">Release</span>
                  <span className="text-lg font-semibold">{new Date(movie.release_date).getFullYear()}</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-slate-500 dark:text-gray-500 font-bold uppercase tracking-wider mb-1">Language</span>
                  <span className="text-lg font-semibold">{movie.original_language?.toUpperCase()}</span>
                </div>
              </div>
            </div>

            {/* TRAILER SECTION */}
            <div className="mt-12">
              <h3 className="text-xl md:text-2xl font-extrabold mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                Official Trailer
              </h3>
              {trailer ? (
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800 bg-black">
                  <iframe 
                    src={`https://www.youtube.com/embed/${trailer.key}`} 
                    title="Trailer" className="w-full h-full" allowFullScreen 
                  />
                </div>
              ) : (
                <div className="p-10 text-center bg-slate-100 dark:bg-zinc-900 rounded-2xl border border-dashed border-slate-300 dark:border-zinc-700">
                  <p className="text-slate-500 dark:text-red-400 font-medium">Trailer is currently unavailable.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;