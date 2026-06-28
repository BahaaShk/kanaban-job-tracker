/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";
import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  if (!mounted) return null;

  return (
    <button onClick={toggleTheme}>
      {theme === "dark" ? <Sun size={20}></Sun> : <Moon size={20}></Moon>}
      <span className="sr-only">Toggle Theme</span>
    </button>
  );
};

export default ThemeToggle;
