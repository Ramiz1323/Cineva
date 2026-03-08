import React from "react";

const SkeletonSearchRow = () => {
  return (
    <div className="relative overflow-hidden rounded-xl bg-slate-200 dark:bg-zinc-800 shadow-md">
      {/* SHIMMER OVERLAY */}
      <div className="animate-shimmer z-10" />

      {/* Content Placeholder mimicking the poster layout */}
      <div className="aspect-[2/3] w-full bg-slate-200 dark:bg-zinc-800 border border-slate-300 dark:border-zinc-700/50 rounded-lg relative overflow-hidden">
         {/* Internal subtle gradient for depth */}
         <div className="absolute inset-0 bg-linear-to-tr from-transparent via-white/10 to-transparent dark:via-white/5" />
      </div>

      {/* Title Placeholder */}
      <div className="mt-3 flex justify-center">
        <div className="h-3 bg-slate-300 dark:bg-zinc-700 rounded-md w-3/4"></div>
      </div>
    </div>
  );
};

export default SkeletonSearchRow;
