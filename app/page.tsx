"use client"

import Link from "next/link"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background font-mono dark:bg-gray-950 flex flex-col">
      {/* Main Content - Centered */}
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-8 py-12 animate-in fade-in duration-500 text-center">
          {/* Hero Section */}
          <section className="mb-16">
            <h1 className="text-2xl font-medium text-gray-900 dark:text-gray-50 mb-2 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300 hover:scale-[1.01] transition-transform duration-200">
              Bhagat Singh
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              software engineer with an ever-lasting knack for{" "}
              <span className="text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 px-1 rounded hover:rotate-2 inline-block">
                design
              </span>
              . for me, a perfect user interface should look{" "}
              <span className="text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 px-1 rounded hover:-rotate-1 inline-block">
                good
              </span>
              {" "}and work even{" "}
              <span className="text-gray-900 dark:text-gray-50 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all duration-200 px-1 rounded hover:rotate-1 inline-block">
                better
              </span>
              .
            </p>
            
            {/* Merged content with inline links */}
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              I{" "}
              <Link
                href="/writing"
                className="hover:underline text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800 px-1 rounded"
              >
                write
              </Link>
              , give{" "}
              <Link
                href="/"
                className="hover:underline text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800 px-1 rounded"
              >
                tech talks
              </Link>
              , do{" "}
              <Link
                href="/podcasts"
                className="hover:underline text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800 px-1 rounded"
              >
                podcasts
              </Link>
              , and work on{" "}
              <Link
                href="/"
                className="hover:underline text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800 px-1 rounded"
              >
                projects
              </Link>
              . know more{" "}
              <Link
                href="/"
                className="hover:underline text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800 px-1 rounded"
              >
                about me
              </Link>
              {" "} or see what weird{" "}
              <Link
                href="/"
                className="hover:underline text-gray-900 dark:text-gray-50 bg-gray-100 dark:bg-gray-800 px-1 rounded"
              >
                things I collect
              </Link>
              .
            </p>
          </section>
        </div>
      </main>
      {/* Footer */}
      <footer className="py-8 text-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          This website is being vibe coded and is WIP. All data that you see here might or might not be true.
        </p>
      </footer>
    </div>
  )
}
