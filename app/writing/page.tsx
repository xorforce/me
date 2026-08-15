import Link from "next/link"
import { SubpageShell } from "@/components/subpage-shell"
import { getInternalArticles } from "@/lib/articles"
import articles from "@/data/articles.json"

const hiddenArticleIds = new Set(["mvc-modern-ios"])

function formatDate(date: string) {
  const parsed = new Date(date)
  if (Number.isNaN(parsed.getTime())) return date
  return parsed.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
}

type ListArticle = {
  id: string
  title: string
  date: string
  readTime?: string
  excerpt: string
  tags: string[]
  href: string
  external: boolean
  externalSource: string | null
}

export default async function Writing() {
  const internalArticles = await getInternalArticles()

  const internal: ListArticle[] = internalArticles.map((article) => ({
    id: article.slug,
    title: article.frontmatter.title,
    date: formatDate(article.frontmatter.date),
    readTime: article.frontmatter.readTime,
    excerpt: article.frontmatter.excerpt,
    tags: article.frontmatter.tags ?? [],
    href: `/writing/${article.slug}`,
    external: false,
    externalSource: null,
  }))

  const external: ListArticle[] = articles
    .filter((article) => !article.tags.includes("Kodeco") && !hiddenArticleIds.has(article.id))
    .map((article) => ({
      id: article.id,
      title: article.title,
      date: article.date,
      readTime: article.readTime || "Book",
      excerpt: article.excerpt,
      tags: article.tags,
      href: article.mediumUrl || article.kodecoUrl || `/writing/${article.id}`,
      external: Boolean(article.mediumUrl || article.kodecoUrl),
      externalSource: article.mediumUrl ? "Medium" : null,
    }))

  return (
    <SubpageShell
      title="Writing"
      showFooterBorder
    >
      <div className="space-y-12">
        {internal.length > 0 && (
          <section className="space-y-6">
            <div>
              <h2 className="site-section-title">Essays</h2>
            </div>
            <div className="space-y-8">
              {internal.map((article) => (
                <article key={article.id} className="group cursor-pointer">
                  <Link
                    href={article.href}
                    className="block"
                    target={article.external ? "_blank" : "_self"}
                    rel={article.external ? "noopener noreferrer" : undefined}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="site-card-title group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors flex-1">
                        {article.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 whitespace-nowrap">
                        {article.date}
                      </p>
                    </div>
                    <p className="site-card-copy">{article.excerpt}</p>
                  </Link>
                </article>
              ))}
            </div>
            <div className="site-divider" />
          </section>
        )}

        {external.length > 0 && (
          <section className="space-y-6">
            <div>
              <h2 className="site-section-title">Published Work</h2>
            </div>
            <div className="space-y-8">
              {external.map((article) => (
                <article key={article.id} className="group cursor-pointer">
                  <Link
                    href={article.href}
                    className="block"
                    target={article.external ? "_blank" : "_self"}
                    rel={article.external ? "noopener noreferrer" : undefined}
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h3 className="site-card-title group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors flex-1">
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-3 whitespace-nowrap">
                        {article.externalSource && (
                          <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                            {article.externalSource}
                          </span>
                        )}
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {article.date}
                        </p>
                      </div>
                    </div>
                    <p className="site-card-copy">{article.excerpt}</p>
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}

        {internal.length === 0 && external.length === 0 && (
          <div className="py-8 text-center">
            <p className="site-footer-note">No articles found.</p>
          </div>
        )}
      </div>
    </SubpageShell>
  )
}
