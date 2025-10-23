import {useEffect, useState} from 'react';

export default function useDarkMode() {
  // Determine initial preference
  const getInitialTheme = () => {
    if (typeof window === 'undefined') return false;
    const saved = localStorage.getItem('theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme);

  // Apply initial theme on mount
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    const newState = !isDarkMode;
    setIsDarkMode(newState);
    document.documentElement.classList.toggle('dark', newState);
    localStorage.setItem('theme', newState ? 'dark' : 'light');
  };

  return {isDarkMode, toggleDarkMode};
}
