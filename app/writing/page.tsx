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

function parseDateToISO(date: string): string {
  const parsed = new Date(date)
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString().split('T')[0]
  }
  return date
}

type ListArticle = {
  id: string
  title: string
  date: string
  sortDate: string
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
    sortDate: article.frontmatter.date,
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
      sortDate: parseDateToISO(article.date),
      readTime: article.readTime || "Book",
      excerpt: article.excerpt,
      tags: article.tags,
      href: article.mediumUrl || article.kodecoUrl || `/writing/${article.id}`,
      external: Boolean(article.mediumUrl || article.kodecoUrl),
      externalSource: article.mediumUrl ? "Medium" : null,
    }))

  const allArticles = [...internal, ...external].sort((a, b) => {
    const dateA = new Date(a.sortDate).getTime()
    const dateB = new Date(b.sortDate).getTime()
    return dateB - dateA
  })

  return (
    <SubpageShell
      title="Writing"
      showFooterBorder
    >
      {allArticles.length > 0 ? (
        <div className="space-y-3">
          {allArticles.map((article) => (
            <article key={article.id} className="group cursor-pointer">
              <Link
                href={article.href}
                className="block flex items-center justify-between gap-4 py-1"
                target={article.external ? "_blank" : "_self"}
                rel={article.external ? "noopener noreferrer" : undefined}
              >
                <span className="text-gray-900 dark:text-gray-50 group-hover:text-gray-600 dark:group-hover:text-gray-400 transition-colors flex-1">
                  {article.title}
                </span>
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
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center">
          <p className="site-footer-note">No articles found.</p>
        </div>
      )}
    </SubpageShell>
  )
}
