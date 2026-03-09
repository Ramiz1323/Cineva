import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, PlayCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHoverDelay } from "../hooks/useHoverDelay";
import { getMovieTrailers } from "../services/movieService";
import { getTvTrailers } from "../services/tvService";

const MovieCard = ({ movie }) => {
  const { isHovered, handleMouseEnter, handleMouseLeave } = useHoverDelay(400); // 0.4s hover delay
  const [trailerKey, setTrailerKey] = useState(null);

  const posterUrl = movie.posterUrl
    || (movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : "https://via.placeholder.com/500x750?text=No+Poster");

  const mediaType = movie.media_type || (movie.name ? 'tv' : 'movie');

  useEffect(() => {
    if (isHovered && !trailerKey) {
      // Fetch trailer only when hovered for the first time
      const fetchTrailer = async () => {
        try {
          const trailers = mediaType === 'movie' 
            ? await getMovieTrailers(movie.id)
            : await getTvTrailers(movie.id);

          const officialTrailer = trailers.find(
            (vid) => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser")
          );

          if (officialTrailer) {
            setTrailerKey(officialTrailer.key);
          }
        } catch (error) {
          console.error("Failed to fetch trailer for card hover", error);
        }
      };
      
      // Do not fetch trailer for admin movies as they might not have tmdb ids
      if (!movie.isAdminMovie) {
         fetchTrailer();
      }
    }
  }, [isHovered, movie.id, trailerKey, mediaType, movie.isAdminMovie]);

  return (
    <Link
      to={`/${mediaType}/${movie.id}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative block rounded-2xl overflow-hidden shadow-md hover:shadow-2xl hover:shadow-red-900/20 bg-zinc-900 transition-all duration-500 ease-out"
    >
      {/* Poster / Trailer Container */}
      <div className="aspect-2/3 overflow-hidden bg-slate-200 dark:bg-zinc-800 relative">
        <img
          src={posterUrl}
          alt={movie.title || movie.name}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Video Player */}
        <AnimatePresence>
          {isHovered && trailerKey && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 z-10 bg-black flex items-center justify-center overflow-hidden"
            >
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&loop=1&playlist=${trailerKey}&rel=0`}
                title="Trailer"
                className="w-[200%] h-full object-cover pointer-events-none"
                style={{ marginLeft: "-50%", marginRight: "-50%" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Floating Rating Badge */}
      <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-white/20 dark:bg-black/40 backdrop-blur-md px-2.5 py-1 rounded-full text-white text-xs font-bold shadow-lg border border-white/10">
        <Star className="fill-yellow-400 text-yellow-500 w-3.5 h-3.5" />
        <span>{movie.vote_average?.toFixed(1) || "N/A"}</span>
      </div>

      {/* Animated Glassmorphism Overlay */}
      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black via-black/80 to-transparent p-5 pt-12 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out flex flex-col justify-end">
        <h3 className="text-sm md:text-base font-bold text-white line-clamp-2 leading-tight drop-shadow-md mb-2">
          {movie.title || movie.name}
        </h3>
        
        <div className="flex items-center text-xs font-medium text-slate-300 gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 relative z-20">
          <PlayCircle className="w-4 h-4 text-red-500" />
          <span>View Details</span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;