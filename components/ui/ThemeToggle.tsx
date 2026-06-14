'use client'

import { useTheme } from "next-themes"
import {Sun, Moon} from 'lucide-react';

const ThemeToggle = () => {
  const {theme, setTheme} = useTheme()
const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark')

  return (
    <button onClick={toggleTheme}>
{
  theme === "dark" ? <Sun size={20}></Sun> : <Moon size={20}></Moon>
}
<span className="sr-only">Toggle Theme</span>
    </button>
  )
}

export default ThemeToggle

    