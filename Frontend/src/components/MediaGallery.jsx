import React from "react";
import { motion } from "framer-motion";
import { Image as ImageIcon } from "lucide-react";

const MediaGallery = ({ images, loading }) => {
  if (loading) {
    return (
      <div className="mt-12">
        <h3 className="text-xl md:text-2xl font-extrabold mb-6 flex items-center gap-2">
          <span className="w-2 h-8 bg-red-600 rounded-full"></span>
          Media
        </h3>
        {/* skeleton gallery */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-video bg-slate-200 dark:bg-zinc-800 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      </div>
    );
  }

  // get backdrops
  const backdrops = images?.backdrops?.slice(0, 6) || [];

  if (backdrops.length === 0) return null;

  return (
    <div className="mt-12">
      <h3 className="text-xl md:text-2xl font-extrabold mb-6 flex items-center gap-2">
        <span className="w-2 h-8 bg-red-600 rounded-full"></span>
        Media
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {backdrops.map((image, i) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            key={i}
            className="group relative aspect-video rounded-2xl overflow-hidden shadow-default border border-slate-200 dark:border-zinc-800 bg-slate-100 dark:bg-zinc-900 flex items-center justify-center cursor-pointer"
          >
            {image.file_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w780${image.file_path}`}
                alt="Movie Scene"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
            ) : (
              <ImageIcon size={40} className="text-slate-400 dark:text-zinc-600" />
            )}
            
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
               <span className="text-white font-semibold flex items-center gap-2 drop-shadow-md">
                 <ImageIcon size={18} /> View
               </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MediaGallery;
