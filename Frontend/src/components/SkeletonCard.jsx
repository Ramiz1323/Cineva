import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="relative overflow-hidden rounded-lg bg-gray-800 animate-pulse">
      <div className="aspect-2/3 w-full"></div>
      <div className="absolute inset-0 p-4 flex flex-col justify-end gap-2">
        <div className="h-4 bg-gray-700 rounded w-3/4"></div>
        <div className="h-3 bg-gray-700 rounded w-1/4"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;