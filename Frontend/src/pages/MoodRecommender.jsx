import React, { useEffect, useRef, useState, useCallback } from 'react';
import { FilesetResolver, FaceLandmarker } from '@mediapipe/tasks-vision';
import { discoverMovies } from '../services/movieService';
import MovieCard from '../components/MovieCard';
import { Loader2, Camera, CameraOff, Smile } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MOODS = {
  HAPPY: { label: 'Happy', genres: '35,16', emoji: '😄', color: 'text-yellow-400' }, // Comedy, Animation
  SAD: { label: 'Sad', genres: '18,10749', emoji: '😢', color: 'text-blue-400' },    // Drama, Romance
  SURPRISED: { label: 'Surprised', genres: '964,14', emoji: '😲', color: 'text-purple-400' }, // Mystery, Fantasy
  NEUTRAL: { label: 'Neutral', genres: '28,878', emoji: '😐', color: 'text-gray-400' }, // Action, Sci-Fi
};

const MoodRecommender = () => {
  const videoRef = useRef(null);
  const faceLandmarkerRef = useRef(null);
  const requestRef = useRef(null);
  const lastVideoTimeRef = useRef(-1);

  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isModelLoading, setIsModelLoading] = useState(true);
  const [liveMood, setLiveMood] = useState('NEUTRAL');
  const [lockedMood, setLockedMood] = useState('NEUTRAL');
  const [movies, setMovies] = useState([]);
  const [isFetchingMovies, setIsFetchingMovies] = useState(false);
  
  // Track last fetched mood to prevent re-fetching the same mood
  const lastFetchedMoodRef = useRef('');

  useEffect(() => {
    const initializeModel = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
        );
        faceLandmarkerRef.current = await FaceLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task",
            delegate: "GPU"
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1
        });
        setIsModelLoading(false);
      } catch (error) {
        console.error("Error loading MediaPipe model:", error);
      }
    };
    initializeModel();

    return () => {
      stopCamera();
      if (faceLandmarkerRef.current) {
        faceLandmarkerRef.current.close();
      }
    };
  }, []);

  const fetchMoviesForMood = useCallback(async (moodKey) => {
    if (lastFetchedMoodRef.current === moodKey) return;
    
    setIsFetchingMovies(true);
    lastFetchedMoodRef.current = moodKey;
    
    try {
      const data = await discoverMovies(1, MOODS[moodKey].genres);
      setMovies(data.results.slice(0, 10)); // keep top 10
    } catch (error) {
      console.error("Failed to fetch mood movies", error);
    } finally {
      setIsFetchingMovies(false);
    }
  }, []);

  const detectMood = (blendshapes) => {
    // MediaPipe blendshape scores are roughly 0.0 to 1.0
    const findCategory = (name) => blendshapes.find(c => c.categoryName === name)?.score || 0;

    const smileL = findCategory('mouthSmileLeft');
    const smileR = findCategory('mouthSmileRight');
    const sadL = findCategory('mouthFrownLeft');
    const sadR = findCategory('mouthFrownRight');
    const jawOpen = findCategory('jawOpen');
    const eyeWideL = findCategory('eyeWideLeft');

    let detectedMood = 'NEUTRAL';

    // Heuristics for mood
    if (smileL > 0.5 && smileR > 0.5) {
      detectedMood = 'HAPPY';
    } else if (jawOpen > 0.2 && eyeWideL > 0.2) {
      detectedMood = 'SURPRISED';
    } else if (sadL > 0.2 && sadR > 0.2) {
      detectedMood = 'SAD';
    }

    if (detectedMood !== liveMood) {
      setLiveMood(detectedMood);
    }
  };

  const predictWebcam = () => {
    if (!videoRef.current || !faceLandmarkerRef.current) return;

    const video = videoRef.current;
    if (video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime;
      const results = faceLandmarkerRef.current.detectForVideo(video, performance.now());
      
      if (results.faceBlendshapes && results.faceBlendshapes.length > 0) {
        detectMood(results.faceBlendshapes[0].categories);
      }
    }

    if (isCameraActive) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  };

  useEffect(() => {
    if (isCameraActive) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    } else {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    }
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [isCameraActive, liveMood]);

  const handleCaptureMood = () => {
    fetchMoviesForMood(liveMood);
    setLockedMood(liveMood);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener('loadeddata', () => {
            setIsCameraActive(true);
        });
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      alert("Please allow camera access to use this feature.");
    }
  };

  const stopCamera = () => {
    setIsCameraActive(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  // Initial fetch for neutral state
  useEffect(() => {
    if (!isCameraActive && movies.length === 0) {
      fetchMoviesForMood('NEUTRAL');
      setLockedMood('NEUTRAL');
    }
  }, [isCameraActive, movies.length, fetchMoviesForMood]);


  return (
    <div className="bg-white dark:bg-black text-slate-900 dark:text-white min-h-screen pt-24 pb-20 transition-colors duration-300">
      <div className="px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3">
          <Smile className="w-10 h-10 text-red-500" />
          Mood Matcher
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg">
          Turn on your camera and express a mood! We'll magically analyze your expression and recommend movies tailored to how you feel.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_2fr] gap-8">
        
        {/* Left Side: Camera & Mood Status */}
        <div className="flex flex-col gap-6">
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 aspect-video flex flex-col items-center justify-center shadow-2xl">
            {isModelLoading && (
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/90 backdrop-blur-sm">
                 <Loader2 className="w-8 h-8 animate-spin text-red-500 mb-2" />
                 <p className="text-sm text-slate-300 font-medium">Loading AI Model...</p>
                 <p className="text-xs text-slate-500 mt-1 text-center px-4">Downloading ~3MB FaceLandmarker. Please wait.</p>
              </div>
            )}
            
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className={`w-full h-full object-cover transform -scale-x-100 ${!isCameraActive ? 'hidden' : ''}`}
            ></video>
            
            {!isCameraActive && !isModelLoading && (
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center z-10">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mb-4">
                  <CameraOff className="w-10 h-10 text-slate-500" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">Camera is Off</h3>
                <p className="text-slate-400 text-sm mb-6">Enable your camera to let the AI detect your mood live.</p>
                <button
                  onClick={startCamera}
                  className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-full transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95 shadow-lg shadow-red-600/20"
                >
                  <Camera className="w-5 h-5" />
                  Turn On Camera
                </button>
              </div>
            )}

            {isCameraActive && (
               <button
                  onClick={stopCamera}
                  className="absolute bottom-4 right-4 z-30 px-4 py-2 bg-red-600/80 hover:bg-red-700 text-white text-sm font-medium rounded-full backdrop-blur-md transition-all"
                >
                  Stop Camera
               </button>
            )}
            
            {/* Live Detection Overlay */}
            {isCameraActive && (
              <div className="absolute top-4 left-4 z-20">
                <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-bold uppercase tracking-wider rounded-full flex items-center gap-2 backdrop-blur-md border border-green-500/30">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                  Live Analyzing
                </span>
              </div>
            )}
          </div>

          {/* Current Mood Display */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-white/5 shadow-xl text-center">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Detected Mood
            </h3>
            <div className="flex flex-col items-center justify-center gap-2">
               <span className="text-6xl mb-2">{MOODS[liveMood].emoji}</span>
               <h2 className={`text-3xl font-black tracking-tight ${MOODS[liveMood].color}`}>
                 {MOODS[liveMood].label}
               </h2>
               <p className="text-slate-600 dark:text-slate-300 font-medium mt-1 mb-4">
                 {isCameraActive ? "Make a face, then lock it in!" : "Enable camera to detect"}
               </p>
               <button 
                 onClick={handleCaptureMood}
                 disabled={!isCameraActive || isFetchingMovies}
                 className="w-full py-3 bg-red-600 hover:bg-red-700 disabled:bg-slate-600/50 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
               >
                 {isFetchingMovies ? <Loader2 className="w-5 h-5 animate-spin" /> : null}
                 Find Movies for {MOODS[liveMood].emoji}
               </button>
            </div>
          </div>
        </div>

        {/* Right Side: Movie Recommendations */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-100 dark:border-white/5 shadow-xl min-h-[500px] flex flex-col">
           <div className="flex items-center justify-between mb-6">
             <h2 className="text-2xl font-bold dark:text-white flex items-center gap-2">
                Movie Recommendations
             </h2>
             {isFetchingMovies && <Loader2 className="w-5 h-5 animate-spin text-red-500" />}
           </div>

           <div className="flex-1 relative">
             <AnimatePresence mode="wait">
               {isFetchingMovies ? (
                 <motion.div 
                    key="loading"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                    className="absolute inset-0 flex items-center justify-center"
                 >
                    <Loader2 className="w-10 h-10 animate-spin text-slate-300 dark:text-slate-700" />
                 </motion.div>
               ) : (
                 <motion.div 
                    key={lockedMood}
                    initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4"
                 >
                   {movies.map(movie => (
                     <MovieCard key={movie.id} movie={movie} />
                   ))}
                   {movies.length === 0 && (
                     <div className="col-span-full py-20 text-center text-slate-500">
                        No movies found. Try another expression!
                     </div>
                   )}
                 </motion.div>
               )}
             </AnimatePresence>
           </div>
        </div>

      </div>
      </div>
    </div>
  );
};

export default MoodRecommender;
