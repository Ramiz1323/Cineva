import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetails } from "../hooks/useMovieDetails";
import { toggleFavorite, addToHistory } from "../services/userService";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import SkeletonMovieDetails from "../components/SkeletonMovieDetails";
import { useDispatch, useSelector } from "react-redux";
import { addHistorySuccess } from "../redux/userSlice";
import CastCarousel from "../components/CastCarousel";
import MediaGallery from "../components/MediaGallery";

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);

  // converts any YouTube URL format into the embeddable version
  const toEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?/\s]+)/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };
  const handleFavorite = async () => {
    if (!movie) return;

    try {
      await toggleFavorite({
        movieId: movie.id,
        title: movie.title,
        posterPath: movie.poster_path,
      });
    } catch (error) {
      console.error("Favorite error:", error);
    }
  };

  const { id } = useParams();

  const { movie, cast, images, loading, error } = useMovieDetails(id);

  // Save watch history
  useEffect(() => {
    if (!movie) return;

    const saveHistory = async () => {
      try {
        const historyItem = {
          movieId: movie.id,
          title: movie.title,
          posterPath: movie.poster_path,
          voteAverage: movie.vote_average || 0
        };
        await addToHistory(historyItem);
        if (isAuthenticated) {
          dispatch(addHistorySuccess(historyItem));
        }
      } catch (err) {
        console.log("History save failed");
      }
    };

    saveHistory();
  }, [movie?.id, dispatch, isAuthenticated]);

  if (loading) return <SkeletonMovieDetails />;

  if (error)
    return (
      <div className="pt-32 bg-white dark:bg-black text-red-500 text-center min-h-screen">
        {error}
      </div>
    );

  if (!movie) return null;

  const trailer = movie?.isAdminMovie
    ? null // admin movies use trailerUrl directly
    : movie?.videos?.results?.find((v) => v.type === "Trailer");

  const trailerUrl = movie?.isAdminMovie
    ? toEmbedUrl(movie.trailerUrl)  // convert raw YT link to embed format
    : trailer
      ? `https://www.youtube.com/embed/${trailer.key}`
      : null;

  const posterSrc = movie?.isAdminMovie
    ? movie.posterUrl
    : movie?.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : "/no-poster.png";

  const backdrop = movie?.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie?.backdropUrl || movie?.posterUrl || null;  // admin: backdrop first, poster as last resort

  return (
    <div className="bg-white dark:bg-black text-slate-900 dark:text-white min-h-screen transition-colors duration-300 pt-16">
      {/* HERO BACKDROP */}
      <div
        className="relative w-full h-[45vh] sm:h-[55vh] md:h-[65vh] bg-cover bg-center flex items-end shadow-inner"
        style={{
          backgroundImage: backdrop ? `url(${backdrop})` : "none",
        }}
      >
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/60 to-white dark:from-transparent dark:via-black/80 dark:to-black" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative px-6 md:px-12 pb-10 max-w-5xl"
        >
          <h1 className="text-3xl md:text-5xl font-extrabold mb-3 tracking-tight">
            {movie.title}
          </h1>

          <p className="text-slate-700 dark:text-gray-300 text-sm md:text-base max-w-2xl font-medium leading-relaxed">
            {movie.overview || "Description not available"}
          </p>
        </motion.div>
      </div>

      {/* MAIN CONTENT */}
      <div className="px-4 sm:px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row gap-10">
          {/* POSTER */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="w-full max-w-sm mx-auto md:mx-0 shadow-2xl rounded-2xl overflow-hidden self-start"
          >
            <motion.img
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6 }}
              src={posterSrc}
              className="w-full h-auto border border-slate-200/50 dark:border-zinc-800/50"
            />
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            className="flex-1 min-w-0"
          >
            <div className="relative bg-white/60 dark:bg-zinc-900/40 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 shadow-xl border border-white/40 dark:border-zinc-800/60 transition-colors">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 border-b border-slate-200 dark:border-zinc-800 pb-2">
                <h2 className="text-2xl font-bold">Movie Overview</h2>

                {/* Favorite Icon */}
                {isAuthenticated && (
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.15 }}
                    onClick={handleFavorite}
                    className="p-2 rounded-full bg-red-600/10 hover:bg-red-600 text-red-600 hover:text-white transition shadow-md"
                  >
                    <Heart size={20} fill="currentColor" />
                  </motion.button>
                )}
              </div>

              {/* Overview */}
              <p className="text-slate-700 dark:text-gray-300 leading-relaxed font-medium">
                {movie.overview || "Description not available"}
              </p>

              {/* Movie Stats */}
              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
                <div className="flex flex-col">
                  <span className="text-slate-500 dark:text-gray-500 font-bold uppercase tracking-wider mb-1">
                    Rating
                  </span>
                  <span className="text-lg font-semibold">
                    ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-slate-500 dark:text-gray-500 font-bold uppercase tracking-wider mb-1">
                    Release
                  </span>
                  <span className="text-lg font-semibold">
                    {movie.release_date
                      ? new Date(movie.release_date).getFullYear()
                      : "N/A"}
                  </span>
                </div>

                <div className="flex flex-col">
                  <span className="text-slate-500 dark:text-gray-500 font-bold uppercase tracking-wider mb-1">
                    Language
                  </span>
                  <span className="text-lg font-semibold">
                    {movie.original_language?.toUpperCase() || "N/A"}
                  </span>
                </div>
              </div>
            </div>

            {/* TRAILER */}
            <div className="mt-12">
              <h3 className="text-xl md:text-2xl font-extrabold mb-6 flex items-center gap-2">
                <span className="w-2 h-8 bg-red-600 rounded-full"></span>
                Official Trailer
              </h3>

              {trailerUrl ? (
                <div className="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-zinc-800 bg-black">
                  <iframe
                    src={trailerUrl}
                    title="Trailer"
                    className="w-full h-full"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="p-10 text-center bg-slate-100 dark:bg-zinc-900 rounded-2xl border border-dashed border-slate-300 dark:border-zinc-700">
                  <p className="text-slate-500 dark:text-red-400 font-medium">
                    Trailer is currently unavailable.
                  </p>
                </div>
              )}
            </div>

            {/* CAST & MEDIA */}
            <CastCarousel cast={cast} loading={loading} />
            <MediaGallery images={images} loading={loading} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
