import React from "react";

const SkeletonCard = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-slate-200 dark:bg-zinc-800 shadow-md">
      {/* SHIMMER OVERLAY */}
      <div className="animate-shimmer z-10" />

      {/* Content Placeholder */}
      <div className="aspect-2/3 w-full bg-slate-300 dark:bg-zinc-700/50"></div>
      <div className="absolute inset-0 p-4 flex flex-col justify-end gap-3 bg-linear-to-t from-black/60 to-transparent">
        <div className="h-4 bg-slate-400 dark:bg-zinc-600 rounded-md w-3/4"></div>
        <div className="h-3 bg-slate-400 dark:bg-zinc-600 rounded-md w-1/4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;