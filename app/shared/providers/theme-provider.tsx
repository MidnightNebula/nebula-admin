'use client';

import { useCallback, useState } from 'react';

export const localStorageThemeKey = 'theme';

enum ThemeType {
  dark = 'dark',
  light = 'light',
}

export type Theme = keyof typeof ThemeType;

export type ThemeContextProps = {
  theme: Theme;
  handleChangeTheme: (value: Theme) => void;
};

export const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>(ThemeType.light);

  const handleChangeTheme = useCallback(
    (value: Theme) => {
      localStorage.setItem(localStorageThemeKey, value);
      if (value !== theme) document.documentElement.classList.remove(theme);
      document.documentElement.classList.add(value);
      setTheme(value);
    },
    [theme, setTheme],
  );

  return (
    <button
      onClick={() => handleChangeTheme(theme === ThemeType.light ? ThemeType.dark : ThemeType.light)}
      aria-label="Toggle theme"
      className="
        relative flex h-10 w-10 items-center justify-center 
        rounded-full bg-gray-200 hover:bg-gray-300
        dark:bg-gray-700 dark:hover:bg-gray-600 
        transition-colors
      "
    >
      {theme === ThemeType.light ? (
        <span className="text-yellow-600 text-xl">☀️</span>
      ) : (
        <span className="text-blue-300 text-xl">🌙</span>
      )}
    </button>
  );
};
