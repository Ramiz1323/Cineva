import React from 'react';
import { Sun, Moon } from 'lucide-react';
import useTheme from '../hooks/useTheme';

const ThemeToggle = () => {
  const { dark, setDark } = useTheme();

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-yellow-400 transition-colors"
      aria-label="Toggle Theme"
    >
      {dark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

export default ThemeToggle;