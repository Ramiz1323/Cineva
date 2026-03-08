import React from "react";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const CastCarousel = ({ cast, loading }) => {
  if (loading) {
    return (
      <div className="mt-12">
        <h3 className="text-xl md:text-2xl font-extrabold mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-red-600 rounded-full"></span>
          Top Cast
        </h3>
        {/* skeleton carousel */}
        <div className="flex gap-4 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="min-w-[140px] md:min-w-[160px] animate-pulse">
              <div className="w-full h-[200px] md:h-[240px] bg-slate-200 dark:bg-zinc-800 rounded-2xl mb-3"></div>
              <div className="h-4 bg-slate-200 dark:bg-zinc-800 rounded-sm w-3/4 mb-2"></div>
              <div className="h-3 bg-slate-200 dark:bg-zinc-800 rounded-sm w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!cast || cast.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-xl md:text-2xl font-extrabold mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-red-600 rounded-full"></span>
        Top Cast
      </h3>

      <div className="relative cursor-grab active:cursor-grabbing overflow-hidden">
        <motion.div
          drag="x"
          dragConstraints={{ right: 0, left: -((cast.slice(0, 15).length * (window.innerWidth < 768 ? 150 : 220)) - window.innerWidth + 100) }}
          className="flex gap-4 md:gap-6"
        >
          {cast.slice(0, 15).map((actor, i) => (
            <motion.div
              key={actor.id || i}
              className="min-w-[140px] md:min-w-[160px] flex flex-col group"
            >
              <div className="relative w-full aspect-[2/3] rounded-2xl overflow-hidden mb-3 shadow-md border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 flex items-center justify-center">
                {actor.profile_path ? (
                  <img
                    src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                    alt={actor.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    draggable="false"
                  />
                ) : (
                  <User size={40} className="text-slate-400 dark:text-zinc-600" />
                )}
                {/* dark gradient overlay at bottom for pro look */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              </div>
              
              <h4 className="font-bold text-slate-900 dark:text-white text-sm md:text-base truncate">
                {actor.name}
              </h4>
              <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 truncate">
                {actor.character}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CastCarousel;
