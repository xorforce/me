import Link from "next/link"
import { Button } from "@/components/ui/button"
import usesData from "@/data/uses.json"

export default function Uses() {
  return (
    <div className="min-h-screen bg-background font-mono">
      <nav className="flex items-center justify-between px-8 py-6 max-w-3xl mx-auto text-sm">
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
        >
          <Link href="/" className="hover:underline flex items-center">
            ← back
          </Link>
        </Button>

        <div className="flex items-center space-x-4 text-xs">
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
          >
            <Link href="/" className="hover:underline">
              home
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
          >
            <Link href="https://github.com/xorforce" className="hover:underline">
              github
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
          >
            <Link href="https://twitter.com/soulful_swift" className="hover:underline">
              twitter
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="h-auto p-0 text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-transparent"
          >
            <Link href="mailto:bhagatsingh2297@gmail.com" className="hover:underline">
              email
            </Link>
          </Button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-8 py-12 animate-in fade-in duration-500">
        <section className="mb-12">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400 mb-3">
            Uses
          </p>
          <h1 className="text-3xl font-medium text-gray-900 dark:text-gray-50 mb-3 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
            Uses
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-2 max-w-2xl">
            {usesData.intro}
          </p>
          <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500 dark:text-gray-400">
            Last updated: {usesData.updated}
          </p>
        </section>

        <div className="space-y-10">
          {usesData.sections.map((section) => (
            <section key={section.title} className="space-y-3">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                  {section.title}
                  </h2>
                </div>
                {section.description ? (
                  <p className="text-xs text-gray-500 dark:text-gray-400 max-w-xs text-right">
                    {section.description}
                  </p>
                ) : null}
              </div>
              <div className="mt-3 space-y-3">
                {section.items.map((item) => (
                  <p key={item.name} className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    <span className="font-medium text-gray-900 dark:text-gray-50">
                      {item.name}
                    </span>{" "}
                    {item.note}
                  </p>
                ))}
              </div>
              <div className="h-px bg-gray-100 dark:bg-gray-800" />
            </section>
          ))}
        </div>

      </main>
    </div>
  )
}
