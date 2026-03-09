import React, { useEffect, useState, useRef } from "react";
import { X, Search, Mic } from "lucide-react";
import { useSearch } from "../hooks/useSearch";
import { Link } from "react-router-dom";
import SkeletonSearchRow from "./SkeletonSearchRow";

const SearchOverlay = ({ open, onClose }) => {

  const [query, setQuery] = useState("");
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  const { results, loading } = useSearch(query);

  // Initialize Speech Recognition
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => setIsListening(true);
      
      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        // removing the trailing period that some browsers add
        setQuery(transcript.replace(/\.$/, '')); 
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const handleVoiceSearch = () => {
    if (!recognitionRef.current) {
      alert("Your browser does not support Voice Search. Please try Google Chrome.");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setQuery(""); // clear previous before speaking
      recognitionRef.current.start();
    }
  };

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-lg flex flex-col items-center pt-24">

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-8 text-white hover:text-red-500"
      >
        <X size={28} />
      </button>

      {/* Search Input */}
      <div className="w-full max-w-2xl relative">

        <Search className={`absolute left-4 top-3 transition-colors ${isListening ? "text-red-500 animate-pulse" : "text-gray-400"}`} />

        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={isListening ? "Listening..." : "Search movies or TV shows..."}
          className={`w-full pl-12 pr-14 py-3 rounded-xl bg-zinc-900 text-white outline-none transition-all ${
            isListening ? "border border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]" : "border border-zinc-700 focus:ring-2 focus:ring-red-500"
          }`}
        />

        {/* Mic Button */}
        <button
          onClick={handleVoiceSearch}
          title={isListening ? "Stop listening" : "Voice Search"}
          className={`absolute right-3 top-2.5 p-1.5 rounded-full transition-all ${
            isListening 
              ? "bg-red-500 text-white animate-pulse shadow-md shadow-red-500/50" 
              : "text-gray-400 hover:text-white hover:bg-zinc-800"
          }`}
        >
          <Mic size={20} />
        </button>

      </div>

      {/* Results */}
      <div className="w-full max-w-4xl mt-10 grid grid-cols-2 md:grid-cols-4 gap-6 px-6 overflow-y-auto flex-1 scroll-smooth">

        {loading && (
          <>
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonSearchRow key={`skel-search-${i}`} />
            ))}
          </>
        )}

        {!loading && results.length === 0 && query && (
          <p className="text-gray-400 col-span-full text-center">
            No results found
          </p>
        )}

        {results.map((movie) => (

          <Link
            key={movie.id}
            to={`/movie/${movie.id}`}
            onClick={onClose}
            className="hover:scale-105 transition"
          >

            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
                  : "/no-poster.png"
              }
              className="rounded-lg"
            />

            <p className="text-sm text-white mt-2 text-center">
              {movie.title || movie.name}
            </p>

          </Link>

        ))}

      </div>

    </div>
  );

};

export default SearchOverlay;