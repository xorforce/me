"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState, useMemo } from "react"
import articles from "@/data/articles.json"

export default function Writing() {
  const [selectedSource, setSelectedSource] = useState("All")
  const [selectedContentType, setSelectedContentType] = useState("All")

  const sources = useMemo(() => ["All", "Medium", "Kodeco"], [])
  const contentTypes = useMemo(() => ["All", "Article", "Course", "Book"], [])

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // First filter by source
      if (selectedSource === "All") return true
      if (selectedSource === "Medium" && article.mediumUrl) return true
      if (selectedSource === "Kodeco" && article.kodecoUrl) {
        // Then filter by content type (only for Kodeco)
        if (selectedContentType === "All") return true
        return article.contentType === selectedContentType
      }
      return false
    })
  }, [selectedSource, selectedContentType])

  return (
    <div className="min-h-screen bg-background font-mono dark:bg-gray-950">
      {/* Navigation */}
      <nav className="flex items-center justify-end px-8 py-6 max-w-2xl mx-auto text-sm">
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
            Writing
          </h1>
          <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-12 hover:text-gray-800 dark:hover:text-gray-300 transition-colors duration-200">
            Thoughts on everything going around me, mainly iOS developement, me pusuing music, and surviving life in general.
          </p>

          {/* Filter Section */}
          <div className="mb-8">
            <h2 className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-4">Sources</h2>
            <div className="flex space-x-4 text-sm text-gray-900 dark:text-gray-50 mb-4">
              {sources.map((source) => (
                <button
                  key={source}
                  onClick={() => {
                    setSelectedSource(source)
                    setSelectedContentType("All") // Reset content type when source changes
                  }}
                  className={`${
                    selectedSource === source ? "font-bold" : ""
                  } hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200`}
                >
                  {source}
                </button>
              ))}
            </div>
            
            {/* Sub-filter for Kodeco */}
            {selectedSource === "Kodeco" && (
              <div className="mt-4">
                <h3 className="text-xs text-gray-500 dark:text-gray-400 uppercase mb-2">Content Type</h3>
                <div className="flex space-x-4 text-sm text-gray-900 dark:text-gray-50">
                  {contentTypes.map((contentType) => (
                    <button
                      key={contentType}
                      onClick={() => setSelectedContentType(contentType)}
                      className={`${
                        selectedContentType === contentType ? "font-bold" : ""
                      } hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-200`}
                    >
                      {contentType}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-8">
            {filteredArticles.map((article) => {
              const externalUrl = article.mediumUrl || article.kodecoUrl;
              const externalSource = article.mediumUrl ? 'Medium' : article.kodecoUrl ? 'Kodeco' : null;
              
              return (
                <article key={article.id} className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 p-4 -m-4 rounded-lg hover:scale-[1.005] transition-transform duration-200 cursor-pointer">
                  <div>
                    <Link href={externalUrl || `/writing/${article.id}`} className="block" target={externalUrl ? "_blank" : "_self"} rel={externalUrl ? "noopener noreferrer" : ""}>
                      <h2 className="text-lg font-medium text-gray-900 dark:text-gray-50 group-hover:text-gray-600 dark:group-hover:text-gray-300 mb-2 transition-colors duration-200">
                        {article.title}
                      </h2>
                      <div className='text-xs text-gray-500 mb-3'>
                        {article.date} • {article.readTime || 'Book'}
                      </div>
                      <p className='text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors duration-200'>
                        {article.excerpt}
                      </p>
                      <div className='flex space-x-2 mb-3'>
                        {article.tags.map((tag, index) => (
                          <span key={index} className='text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200'>
                            {tag}
                          </span>
                        ))}
                      </div>
                    </Link>
                    {externalSource && (
                      <div className='text-xs text-blue-600 dark:text-blue-400 group-hover:text-blue-800 dark:group-hover:text-blue-300 transition-colors duration-200'>
                        {externalSource === 'Kodeco' && article.contentType === 'Course' && 'Complete the full course on Kodeco →'}
                        {externalSource === 'Kodeco' && article.contentType === 'Book' && 'Get the book on Kodeco →'}
                        {externalSource === 'Kodeco' && article.contentType === 'Article' && 'Read full article on Kodeco →'}
                        {externalSource === 'Medium' && 'Read full article on Medium →'}
                      </div>
                    )}
                  </div>
                </article>
              );
            })}
          </div>

          {filteredArticles.length === 0 && (
            <div className="text-center text-gray-500 dark:text-gray-400 py-8">
              No articles found for the selected filters.
            </div>
          )}
        </section>

        <section>
          <div className='text-center py-8'>
            <p className='text-xs text-gray-500 hover:text-gray-700 transition-colors duration-200'>
              More articles coming soon. Follow me on{' '}
              <Link
                href='https://twitter.com/soulful_swift'
                className='hover:text-gray-900 transition-colors duration-200 hover:underline'
              >
                Twitter
              </Link>{' '}
              for updates.
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className='border-t border-gray-200 dark:border-gray-800 py-8'>
        <div className='max-w-2xl mx-auto px-8'>
          <div className='flex justify-between items-center text-xs text-gray-500'>
            <p>© 2024 Bhagat Singh</p>
            <div className='flex space-x-4'>
              <Link
                href='/about'
                className='hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 hover:underline'
              >
                about
              </Link>
              <Link
                href='mailto:bhagatsingh2297@gmail.com'
                className='hover:text-gray-900 dark:hover:text-gray-100 transition-colors duration-200 hover:underline'
              >
                contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
