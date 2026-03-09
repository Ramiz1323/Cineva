import React, { useState, useEffect, useCallback, useRef } from "react";
import { getMovieGenres, getTrendingMovies, getPopularMovies, discoverMovies } from "../services/movieService";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { motion } from "framer-motion";
import { Flame, TrendingUp, ListFilter } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Popular", value: "popularity.desc", icon: Flame },
  { label: "Trending", value: "trending", icon: TrendingUp },
  { label: "Top Rated", value: "vote_average.desc", icon: ListFilter },
  { label: "Newest", value: "primary_release_date.desc", icon: ListFilter },
];

const Movies = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const lastRef = useRef(null);

  // load genres once
  useEffect(() => {
    getMovieGenres().then(setGenres).catch(() => {});
  }, []);

  // reset & reload when filter/sort changes
  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [selectedGenre, sortBy]);

  // fetch page
  useEffect(() => {
    let cancelled = false;
    const fetchPage = async () => {
      setLoading(true);
      try {
        let data;
        if (sortBy === "trending" && !selectedGenre) {
          data = await getTrendingMovies(page);
        } else if (!selectedGenre && sortBy === "popularity.desc") {
          data = await getPopularMovies(page);
        } else {
          data = await discoverMovies(page, selectedGenre, sortBy === "trending" ? "popularity.desc" : sortBy);
        }
        const results = data.results || data;
        if (!cancelled) {
          setItems(prev => page === 1 ? results : [...prev, ...results]);
          setHasMore(results.length > 0);
        }
      } catch (e) {
        console.error(e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    fetchPage();
    return () => { cancelled = true; };
  }, [page, selectedGenre, sortBy]);

  // infinite scroll observer
  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore && !loading) {
        setPage(p => p + 1);
      }
    });
    if (lastRef.current) observerRef.current.observe(lastRef.current);
    return () => observerRef.current?.disconnect();
  }, [hasMore, loading, items]);

  const skeletons = Array.from({ length: 12 });

  return (
    <div className="bg-white dark:bg-black text-slate-900 dark:text-white min-h-screen pt-24 pb-20 transition-colors duration-300">

      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 mb-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-semibold tracking-wide uppercase shadow-sm">
            Cinematic Library
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight drop-shadow-sm">
            All <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-orange-500">Movies</span>
          </h1>
        </motion.div>
      </div>

      {/* Sort + Genre Controls */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 mb-8 space-y-4">
        {/* Sort pills */}
        <div className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setSortBy(value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                sortBy === value
                  ? "bg-red-600 text-white border-red-600 shadow-lg shadow-red-900/30"
                  : "border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-gray-400 hover:border-red-500 hover:text-red-500"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

        {/* Genre pills — horizontally scrollable */}
        {genres.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-2 slim-scrollbar">
            <button
              onClick={() => setSelectedGenre(null)}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                !selectedGenre
                  ? "bg-slate-900 dark:bg-white text-white dark:text-black border-transparent"
                  : "border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-gray-400 hover:border-slate-500"
              }`}
            >
              All
            </button>
            {genres.map((g) => (
              <button
                key={g.id}
                onClick={() => setSelectedGenre(g.id)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all border ${
                  selectedGenre === g.id
                    ? "bg-slate-900 dark:bg-white text-white dark:text-black border-transparent"
                    : "border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-gray-400 hover:border-slate-500"
                }`}
              >
                {g.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Grid */}
      <section className="px-4 sm:px-8 md:px-12 lg:px-20 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 md:gap-8">
          {items.map((movie, index) => {
            const isLast = items.length === index + 1;
            return (
              <motion.div
                ref={isLast ? lastRef : null}
                key={`${movie.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <MovieCard movie={movie} />
              </motion.div>
            );
          })}
          {loading && skeletons.map((_, i) => <SkeletonCard key={`skel-${i}`} />)}
        </div>

        {!loading && !hasMore && (
          <div className="text-center mt-16 text-slate-500 font-medium">You've reached the end of the universe. 🚀</div>
        )}
      </section>
    </div>
  );
};

export default Movies;
