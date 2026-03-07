import { useEffect, useState } from "react";

export default function useTheme() {
  const [dark, setDark] = useState(() => {
    // Check localStorage or fallback to system preference
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true; // Default to true if you want dark by default
  });

  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [dark]);

  return { dark, setDark };
}