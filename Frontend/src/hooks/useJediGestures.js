import { useEffect, useRef, useState, useCallback } from "react";
import { HandLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";

export const useJediGestures = (isActive) => {
  const [isReady, setIsReady] = useState(false);
  const videoRef = useRef(null);
  const handLandmarkerRef = useRef(null);
  const requestRef = useRef();
  const lastVideoTimeRef = useRef(-1);
  const gestureStateRef = useRef({ prevX: 0, prevY: 0, lastSwipeTime: Date.now() });

  // 1. Initialize HandLandmarker Model
  useEffect(() => {
    const initModel = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task`,
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numHands: 1, // Track 1 hand for gestures
        });
        handLandmarkerRef.current = landmarker;
        setIsReady(true);
      } catch (err) {
        console.error("Error loading MediaPipe HandLandmarker:", err);
      }
    };
    initModel();

    return () => {
      if (handLandmarkerRef.current) {
        handLandmarkerRef.current.close();
      }
    };
  }, []);

  // 2. Start/Stop Webcam
  useEffect(() => {
    if (!isActive || !isReady) return;
    let stream = null;

    const startWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.play(); // Ensure video plays
        }
      } catch (err) {
        console.error("Webcam permission denied or error:", err);
      }
    };

    startWebcam();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      cancelAnimationFrame(requestRef.current);
    };
  }, [isActive, isReady]);

  // 3. Process video frames & Detect Gestures
  const predictWebcam = useCallback(() => {
    if (!videoRef.current || !handLandmarkerRef.current || !isActive) return;

    const video = videoRef.current;
    if (video.readyState >= 2 && video.currentTime !== lastVideoTimeRef.current) {
      lastVideoTimeRef.current = video.currentTime;

      const results = handLandmarkerRef.current.detectForVideo(video, performance.now());

      if (results.landmarks && results.landmarks.length > 0) {
        // We track the Wrist (index 0) or Index Finger Tip (index 8)
        // MediaPipe coords: X=0(left)-1(right), Y=0(top)-1(bottom)
        const wrist = results.landmarks[0][0];
        const x = wrist.x;
        const y = wrist.y;

        const state = gestureStateRef.current;
        const now = Date.now();

        // Check if hand was already being tracked to calculate delta
        if (state.prevX > 0 && state.prevY > 0) {
          const deltaX = x - state.prevX;
          const deltaY = y - state.prevY;
          
          // Debug Logging: Print large enough movements
          if (Math.abs(deltaX) > 0.02 || Math.abs(deltaY) > 0.02) {
             console.log(`Tracking Movement -> deltaX: ${deltaX.toFixed(3)}, deltaY: ${deltaY.toFixed(3)}`);
          }

          if (now - state.lastSwipeTime > 800) {
            // Determine biggest movement (horizontal vs vertical)
            if (Math.abs(deltaX) > Math.abs(deltaY)) {
              // Horizontal Swipe
              if (deltaX < -0.03) { // Hand moved left
                console.log("🔥 JEDI SWIPE LEFT => Navigating Right");
                window.scrollBy({ left: 600, behavior: "smooth" });
                window.dispatchEvent(new CustomEvent("jedi-swipe", { detail: "left" }));
                state.lastSwipeTime = now;
              } else if (deltaX > 0.03) { // Hand moved right
                console.log("🔥 JEDI SWIPE RIGHT => Navigating Left");
                window.scrollBy({ left: -600, behavior: "smooth" });
                window.dispatchEvent(new CustomEvent("jedi-swipe", { detail: "right" }));
                state.lastSwipeTime = now;
              }
            } else {
              // Vertical Swipe
              // Y=0 is top, Y=1 is bottom. 
              // Positive deltaY means hand moved DOWN.
              if (deltaY < -0.04) { // Hand moved UP
                console.log("🔥 JEDI SWIPE UP => Scrolling Up");
                window.scrollBy({ top: -500, behavior: "smooth" });
                state.lastSwipeTime = now;
              } else if (deltaY > 0.04) { // Hand moved DOWN
                console.log("🔥 JEDI SWIPE DOWN => Scrolling Down");
                window.scrollBy({ top: 500, behavior: "smooth" });
                state.lastSwipeTime = now;
              }
            }
          }
        }
        state.prevX = x;
        state.prevY = y;
      } else {
        // Hand left the frame
        gestureStateRef.current.prevX = 0;
        gestureStateRef.current.prevY = 0;
      }
    }

    if (isActive) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
  }, [isActive]);

  // 4. Trigger prediction loop
  useEffect(() => {
    if (isActive && isReady) {
      requestRef.current = requestAnimationFrame(predictWebcam);
    }
    return () => cancelAnimationFrame(requestRef.current);
  }, [isActive, isReady, predictWebcam]);

  return { videoRef, isReady };
};
