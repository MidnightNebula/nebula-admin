"use client";

import { Context, ThemeType } from "@/app/shared/providers/theme-provider";
import { useCallback, useContext } from "react";

export function useChangeTheme() {
  const context = useContext(Context);
  const changeTheme = useCallback(
    (theme: string) => {
      context?.handleChangeTheme(theme);
    },
    [context]
  );

  return { theme: context?.theme, changeTheme };
}
