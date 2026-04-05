"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { SubpageShell } from "@/components/subpage-shell"
import articles from "@/data/articles.json"

export default function Writing() {
  const [selectedSource, setSelectedSource] = useState("All")
  const [selectedContentType, setSelectedContentType] = useState("All")

  const sources = useMemo(() => ["All", "Medium", "Kodeco"], [])
  const contentTypes = useMemo(() => ["All", "Article", "Course", "Book"], [])

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      if (selectedSource === "All") return true
      if (selectedSource === "Medium" && article.mediumUrl) return true
      if (selectedSource === "Kodeco" && article.kodecoUrl) {
        if (selectedContentType === "All") return true
        return article.contentType === selectedContentType
      }

      return false
    })
  }, [selectedSource, selectedContentType])

  return (
    <SubpageShell
      title="Writing"
      description="Thoughts on iOS, music, the internet, and surviving life in general."
      showFooterBorder
    >
      <div className="space-y-12">
        <section className="space-y-4">
          <h2 className="site-subtle-label">Sources</h2>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-900 dark:text-gray-50">
            {sources.map((source) => (
              <button
                key={source}
                onClick={() => {
                  setSelectedSource(source)
                  setSelectedContentType("All")
                }}
                className={`transition-colors duration-200 hover:text-gray-700 dark:hover:text-gray-300 ${
                  selectedSource === source ? "font-bold" : ""
                }`}
              >
                {source}
              </button>
            ))}
          </div>

          {selectedSource === "Kodeco" ? (
            <div className="space-y-3 pt-2">
              <h3 className="site-subtle-label">Content type</h3>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-900 dark:text-gray-50">
                {contentTypes.map((contentType) => (
                  <button
                    key={contentType}
                    onClick={() => setSelectedContentType(contentType)}
                    className={`transition-colors duration-200 hover:text-gray-700 dark:hover:text-gray-300 ${
                      selectedContentType === contentType ? "font-bold" : ""
                    }`}
                  >
                    {contentType}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </section>

        <section className="space-y-8">
          {filteredArticles.map((article) => {
            const externalUrl = article.mediumUrl || article.kodecoUrl
            const externalSource = article.mediumUrl
              ? "Medium"
              : article.kodecoUrl
                ? "Kodeco"
                : null

            return (
              <article key={article.id} className="group site-card cursor-pointer p-4 -m-4">
                <div>
                  <Link
                    href={externalUrl || `/writing/${article.id}`}
                    className="block"
                    target={externalUrl ? "_blank" : "_self"}
                    rel={externalUrl ? "noopener noreferrer" : undefined}
                  >
                    <h2 className="site-card-title mb-2">{article.title}</h2>
                    <div className="site-meta mb-3">
                      {article.date} • {article.readTime || "Book"}
                    </div>
                    <p className="site-card-copy mb-4">{article.excerpt}</p>
                    <div className="mb-3 flex flex-wrap gap-2">
                      {article.tags.map((tag) => (
                        <span key={tag} className="site-chip">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                  {externalSource ? (
                    <div className="text-xs text-blue-600 transition-colors duration-200 group-hover:text-blue-800 dark:text-blue-400 dark:group-hover:text-blue-300">
                      {externalSource === "Kodeco" && article.contentType === "Course"
                        ? "Complete the full course on Kodeco →"
                        : null}
                      {externalSource === "Kodeco" && article.contentType === "Book"
                        ? "Get the book on Kodeco →"
                        : null}
                      {externalSource === "Kodeco" && article.contentType === "Article"
                        ? "Read full article on Kodeco →"
                        : null}
                      {externalSource === "Medium" ? "Read full article on Medium →" : null}
                    </div>
                  ) : null}
                </div>
              </article>
            )
          })}

          {filteredArticles.length === 0 ? (
            <div className="py-8 text-center">
              <p className="site-footer-note">No articles found for the selected filters.</p>
            </div>
          ) : null}
        </section>

        <section className="py-4 text-center">
          <p className="site-footer-note">
            More articles coming soon. Follow me on{" "}
            <Link href="https://twitter.com/soulful_swift" className="site-inline-link">
              Twitter
            </Link>{" "}
            for updates.
          </p>
        </section>
      </div>
    </SubpageShell>
  )
}
