"use client";

import { useEffect, useState } from "react";

export const localStorageThemeKey = "theme";

enum ThemeType {
  dark = "dark",
  light = "light",
}

export type Theme = keyof typeof ThemeType;

const getThemeFromLS = () =>
  localStorage.getItem(localStorageThemeKey) as ThemeType | null;
const setThemeToLS = (theme: Theme) =>
  localStorage.setItem(localStorageThemeKey, theme);

export const Theme = () => {
  const [theme, setTheme] = useState<Theme>();

  const changeTheme = () => {
    if (theme) {
      document.documentElement.setAttribute("data-theme", theme);
      setThemeToLS(theme);
      setTheme(theme);
    }
  };

  useEffect(() => {
    const theme = getThemeFromLS();
    if (theme) {
      setThemeToLS(theme);
      setTheme(theme);
    }
  }, []);
  return (
    <>
      <button
        onClick={changeTheme}
        aria-label="Theme"
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
    </>
  );
};
