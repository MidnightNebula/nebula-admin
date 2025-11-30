'use client';

import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';

export const localStorageThemeKey = 'theme';

export enum ThemeType {
  dark = 'dark',
  light = 'light',
}

export type Theme = keyof typeof ThemeType;

export type ThemeContextProps = {
  theme: Theme;
  handleChangeTheme: (value: Theme) => void;
};

export const ThemeContext = createContext<ThemeContextProps>({
  theme: ThemeType.light,
  handleChangeTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
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

  const value = useMemo(
    () => ({
      theme,
      handleChangeTheme,
    }),
    [theme, handleChangeTheme],
  );

  return <ThemeContext value={value}>{children}</ThemeContext>;
};
