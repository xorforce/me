"use client"

import Link from "next/link"
import { useMemo } from "react"
import { SubpageShell } from "@/components/subpage-shell"
import articles from "@/data/articles.json"

export default function Writing() {
  const hiddenArticleIds = useMemo(() => new Set(["mvc-modern-ios"]), [])

  const filteredArticles = useMemo(() => {
    return articles.filter(
      (article) => !article.tags.includes("Kodeco") && !hiddenArticleIds.has(article.id),
    )
  }, [hiddenArticleIds])

  return (
    <SubpageShell
      title="Writing"
      description="Thoughts on iOS, music, the internet, and surviving life in general."
      showFooterBorder
    >
      <div className="space-y-12">
        <section className="space-y-8">
          {filteredArticles.map((article) => {
            const externalUrl = article.mediumUrl || article.kodecoUrl
            const externalSource = article.mediumUrl ? "Medium" : null

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
                      {externalSource === "Medium" ? "Read full article on Medium →" : null}
                    </div>
                  ) : null}
                </div>
              </article>
            )
          })}

          {filteredArticles.length === 0 ? (
            <div className="py-8 text-center">
              <p className="site-footer-note">No articles found.</p>
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
