"use client";

import { DEFAULT_THEME } from "@/app/shared/constants";
import { useChangeTheme } from "@/lib/useChangeTheme";
import { useEffect } from "react";

export default function ThemeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { changeTheme } = useChangeTheme();

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    changeTheme(currentTheme || DEFAULT_THEME);
  }, [changeTheme]);

  return <>{children}</>;
}
