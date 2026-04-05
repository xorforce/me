"use client"

import Link from "next/link"

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-background font-mono flex flex-col">
      {/* Main Content - Centered */}
      <main className="flex-1 flex items-center justify-center">
        <div className="max-w-2xl mx-auto px-4 sm:px-8 md:px-12 lg:px-16 py-12 animate-in fade-in duration-500 text-center">
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
                className="underline text-gray-900 dark:text-gray-50"
              >
                write
              </Link>
              , give{" "}
              <Link
                href="/talks"
                className="underline text-gray-900 dark:text-gray-50"
              >
                tech talks
              </Link>
              , do{" "}
              <Link
                href="/podcasts"
                className="underline text-gray-900 dark:text-gray-50"
              >
                podcasts
              </Link>
              ,{" "}
              <Link
                href="/djing"
                className="underline text-gray-900 dark:text-gray-50"
              >
                dj
              </Link>
              , and work on{" "}
              <Link
                href="/projects"
                className="underline text-gray-900 dark:text-gray-50"
              >
                projects
              </Link>
              . Know more{" "}
              <Link
                href="/about"
                className="underline text-gray-900 dark:text-gray-50"
              >
                about me
              </Link>
              {""}, peek at the{" "}
              <Link
                href="/uses"
                className="underline text-gray-900 dark:text-gray-50"
              >
                things I use
              </Link>
              {" "}or dive into my{" "}
              <Link
                href="/inventory"
                className="underline text-gray-900 dark:text-gray-50"
              >
                inventory.
              </Link>
            </p>
          </section>
        </div>
      </main>

      <aside className="pb-10 flex justify-center">
        <Link
          href="/til"
          className="underline text-xs text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 transition-colors duration-200"
        >
          today i learnt
        </Link>
      </aside>
    </div>
  )
}
