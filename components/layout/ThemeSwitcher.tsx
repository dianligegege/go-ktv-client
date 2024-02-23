"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react"

export function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="h-8 w-8 flex justify-center items-center cursor-pointer">
      <Sun onClick={() => setTheme('dark')} className="absolute h-[1.2rem] w-[1.2rem] scale-100 transition-all dark:scale-0" />
      <Moon onClick={() => setTheme('light')} className="absolute h-[1.2rem] w-[1.2rem] scale-0 transition-all dark:scale-100" />
    </div>
  )
};