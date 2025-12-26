'use client';

import { useLayoutEffect, useState } from 'react';

export const localStorageThemeKey = 'theme';

enum ThemeType {
  dark = 'dark',
  light = 'light',
}

export type Theme = keyof typeof ThemeType;

const setThemeToLS = (theme: Theme) => localStorage.setItem(localStorageThemeKey, theme);

export const Theme = () => {
  const [theme, setTheme] = useState<Theme>();

  const changeTheme = () => {
    const newTheme = theme === ThemeType.light ? ThemeType.dark : ThemeType.light;
    document.documentElement.setAttribute('data-theme', newTheme);
    setThemeToLS(newTheme);
    setTheme(newTheme);
  };

  useLayoutEffect(() => {
    const currentTheme = document.documentElement.dataset.theme as Theme;

    setTheme(currentTheme);
  }, []);

  if (!theme) return;

  return (
    <>
      <button
        onClick={changeTheme}
        aria-label="Theme"
        className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
      >
        {theme === ThemeType.light ? (
          <span className="text-xl text-yellow-600">🌙</span>
        ) : (
          <span className="text-xl text-blue-300">☀️</span>
        )}
      </button>
    </>
  );
};
