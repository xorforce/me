"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { Sun, Moon } from "lucide-react"
import { useEffect, useState } from "react"

export function ThemeSwitcher() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Prevent hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          aria-label="Toggle light/dark theme"
          className="h-auto p-0 text-xs text-gray-600 hover:text-gray-900 hover:bg-transparent dark:text-gray-400 dark:hover:text-gray-50
            focus-visible:ring-0 focus-visible:ring-offset-0 outline-none border-0"
          disabled
        >
          <Moon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    )
  }

  const isDark = resolvedTheme === "dark"

  return (
    <>
      {/* Theme Toggle (Bottom Right) */}
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setTheme(isDark ? "light" : "dark")}
          aria-label="Toggle light/dark theme"
          className="h-auto p-0 text-xs text-gray-600 hover:text-gray-900 hover:bg-transparent dark:text-gray-400 dark:hover:text-gray-50
            focus-visible:ring-0 focus-visible:ring-offset-0 outline-none border-0"
        >
          {isDark ? <Sun className="h-[1.2rem] w-[1.2rem]" /> : <Moon className="h-[1.2rem] w-[1.2rem]" />}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </>
  )
} 