"use client";

import { DEFAULT_THEME } from "@/app/shared/constants";
import {
  createContext,
  ReactNode,
  useCallback,
  useMemo,
  useState,
} from "react";

export type ContextProviderProps = {
  children: ReactNode;
};

export type ThemeType = {
  theme: string;
  handleChangeTheme: (value: string) => void;
};

export const Context = createContext<ThemeType | null>(null);

export const ContextProvider = ({ children }: ContextProviderProps) => {
  const [theme, setTheme] = useState<string>(DEFAULT_THEME);

  const handleChangeTheme = useCallback(
    (value: string) => {
      localStorage.setItem("theme", value);
      if (value !== theme) document.documentElement.classList.remove(theme);
      document.documentElement.classList.add(value);
      setTheme(value);
    },
    [theme, setTheme]
  );

  const contextValue = useMemo(
    () => ({
      theme,
      handleChangeTheme,
    }),
    [theme, handleChangeTheme]
  );

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
};
