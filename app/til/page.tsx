import Link from "next/link"
import { Button } from "@/components/ui/button"
import tilData from "@/data/til.json"

export default function TodayILearnt() {
  return (
    <div className="min-h-screen bg-background font-mono dark:bg-gray-950">
      {/* Navigation */}
      <nav className="flex items-center justify-between px-8 py-6 max-w-2xl mx-auto text-sm">
        {/* Back Arrow */}
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

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-8 py-12 animate-in fade-in duration-500">
        <section className="mb-16">
          <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-50 mb-4 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300">
            Today I Learnt
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-8 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200">
            A small, running log of daily notes, tips, and reminders I pick up along the way.
          </p>

          <div className="space-y-6">
            {tilData.entries.map((entry) => (
              <article
                key={entry.id}
                className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 p-4 -m-4 rounded-lg hover:scale-[1.005] transition-transform duration-200"
              >
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                  {entry.date}
                </div>
                <h2 className="text-sm font-medium text-gray-900 dark:text-gray-50 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200 mb-2">
                  {entry.title}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200">
                  {entry.note}
                </p>
              </article>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 dark:border-gray-800 py-8">
        <div className="max-w-2xl mx-auto px-8">
          <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
            <p>© 2024 Bhagat Singh</p>
            <div className="flex space-x-4">
              <Link
                href="/about"
                className="hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200 hover:underline"
              >
                about
              </Link>
              <Link
                href="mailto:bhagatsingh2297@gmail.com"
                className="hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200 hover:underline"
              >
                contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
