import React from "react";
import { motion } from "framer-motion";

const SkeletonMovieDetails = () => {
  return (
    <div className="bg-white dark:bg-black w-full min-h-screen pt-16 transition-colors duration-300">
      {/* SHIMMER OVERLAY (Global across the page) */}
      <div className="absolute inset-0 z-50 pointer-events-none animate-shimmer overflow-hidden mix-blend-overlay opacity-50" />

      {/* HERO BACKDROP SKELETON */}
      <div className="relative w-full h-[45vh] sm:h-[55vh] md:h-[65vh] bg-slate-200 dark:bg-zinc-900 flex items-end">
        <div className="absolute inset-0 bg-linear-to-b from-transparent via-white/50 to-white dark:via-black/50 dark:to-black" />

        <div className="relative px-6 md:px-12 pb-10 max-w-5xl w-full z-10">
          {/* Title Skeleton */}
          <div className="h-10 md:h-14 w-2/3 bg-slate-300 dark:bg-zinc-800 rounded-lg mb-4" />
          
          {/* Overview Lines Skeleton */}
          <div className="space-y-2 max-w-2xl">
            <div className="h-4 w-full bg-slate-300 dark:bg-zinc-800 rounded-md" />
            <div className="h-4 w-5/6 bg-slate-300 dark:bg-zinc-800 rounded-md" />
            <div className="h-4 w-4/6 bg-slate-300 dark:bg-zinc-800 rounded-md" />
          </div>
        </div>
      </div>

      {/* MAIN CONTENT SKELETON */}
      <div className="px-4 sm:px-6 md:px-12 py-12">
        <div className="flex flex-col md:flex-row gap-10">
          
          {/* POSTER SKELETON */}
          <div className="w-full max-w-sm mx-auto md:mx-0 shadow-xl rounded-2xl overflow-hidden self-start">
            <div className="aspect-[2/3] w-full bg-slate-200 dark:bg-zinc-800" />
          </div>

          {/* DETAILS & TRAILER SKELETON */}
          <div className="flex-1">
            <div className="bg-white/60 dark:bg-zinc-900/40 backdrop-blur-2xl rounded-3xl p-8 lg:p-10 shadow-xl border border-slate-100 dark:border-zinc-800/60">
              {/* Header Box */}
              <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-zinc-800 pb-4">
                <div className="h-7 w-48 bg-slate-300 dark:bg-zinc-800 rounded-md" />
                <div className="h-10 w-10 bg-slate-300 dark:bg-zinc-800 rounded-full" />
              </div>

              {/* Stats Grid Skeleton */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8 mt-12">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex flex-col gap-2">
                    <div className="h-3 w-16 bg-slate-300 dark:bg-zinc-800 rounded" />
                    <div className="h-6 w-24 bg-slate-300 dark:bg-zinc-800 rounded" />
                  </div>
                ))}
              </div>
            </div>

            {/* TRAILER BOX SKELETON */}
            <div className="mt-12">
               <div className="flex items-center gap-2 mb-6">
                 <div className="w-2 h-8 bg-slate-300 dark:bg-zinc-800 rounded-full" />
                 <div className="h-7 w-48 bg-slate-300 dark:bg-zinc-800 rounded-md" />
               </div>
               <div className="aspect-video w-full rounded-2xl bg-slate-200 dark:bg-zinc-900" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonMovieDetails;
