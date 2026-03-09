import React, { useState, useEffect, useRef } from "react";
import { getTrendingTv, getPopularTv, getTopRatedTv, getTvGenres, discoverTv } from "../services/tvService";
import MovieCard from "../components/MovieCard";
import SkeletonCard from "../components/SkeletonCard";
import { motion } from "framer-motion";
import { Flame, TrendingUp, Star } from "lucide-react";

const SORT_OPTIONS = [
  { label: "Popular", value: "popularity.desc", icon: Flame },
  { label: "Trending", value: "trending", icon: TrendingUp },
  { label: "Top Rated", value: "vote_average.desc", icon: Star },
];

const TVShows = () => {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [sortBy, setSortBy] = useState("popularity.desc");
  const [items, setItems] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const observerRef = useRef(null);
  const lastRef = useRef(null);

  useEffect(() => {
    getTvGenres().then(setGenres).catch(() => {});
  }, []);

  useEffect(() => {
    setItems([]);
    setPage(1);
    setHasMore(true);
  }, [selectedGenre, sortBy]);

  useEffect(() => {
    let cancelled = false;
    const fetchPage = async () => {
      setLoading(true);
      try {
        let data;
        if (sortBy === "trending" && !selectedGenre) {
          data = await getTrendingTv(page);
        } else if (!selectedGenre && sortBy === "popularity.desc") {
          data = await getPopularTv(page);
        } else {
          data = await discoverTv(page, selectedGenre, sortBy === "trending" ? "popularity.desc" : sortBy);
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
          <div className="inline-block px-4 py-1.5 mb-4 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase shadow-sm">
            Binge Worthy
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight drop-shadow-sm">
            TV <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-indigo-500">Shows</span>
          </h1>
        </motion.div>
      </div>

      {/* Sort + Genre Controls */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-8 md:px-12 lg:px-20 mb-8 space-y-4">
        <div className="flex flex-wrap gap-2">
          {SORT_OPTIONS.map(({ label, value, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setSortBy(value)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                sortBy === value
                  ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-900/30"
                  : "border-slate-300 dark:border-zinc-700 text-slate-600 dark:text-gray-400 hover:border-blue-500 hover:text-blue-500"
              }`}
            >
              <Icon size={14} />
              {label}
            </button>
          ))}
        </div>

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
          {items.map((show, index) => {
            const isLast = items.length === index + 1;
            return (
              <motion.div
                ref={isLast ? lastRef : null}
                key={`${show.id}-${index}`}
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <MovieCard movie={{ ...show, title: show.title || show.name }} />
              </motion.div>
            );
          })}
          {loading && skeletons.map((_, i) => <SkeletonCard key={`skel-tv-${i}`} />)}
        </div>
        {!loading && !hasMore && (
          <div className="text-center mt-16 text-slate-500 font-medium">That's a wrap on TV Shows! 📺</div>
        )}
      </section>
    </div>
  );
};

export default TVShows;
