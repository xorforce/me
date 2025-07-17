"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <>
      {/* Theme Toggle (Bottom Right) */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          aria-label="Toggle light/dark theme"
          className="h-auto p-0 text-xs text-gray-600 hover:text-gray-900 hover:bg-transparent dark:text-gray-400 dark:hover:text-gray-50
            focus-visible:ring-0 focus-visible:ring-offset-0 outline-none border-0"
        >
          {theme === "dark" ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </>
  )
} 