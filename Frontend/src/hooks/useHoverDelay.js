import { useState, useRef, useCallback, useEffect } from "react";

export const useHoverDelay = (delayMs = 1000) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  const handleMouseEnter = useCallback(() => {
    // Clear any existing timeout first to prevent bugs
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    
    timeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, delayMs);
  }, [delayMs]);

  const handleMouseLeave = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsHovered(false);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return { isHovered, handleMouseEnter, handleMouseLeave };
};
