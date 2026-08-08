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

  const filteredArticles = [...internal, ...external]

  return (
    <SubpageShell
      title="Writing"
      description="Thoughts on iOS, music, the internet, and surviving life in general."
      showFooterBorder
    >
      <div className="space-y-12">
        <section className="space-y-8">
          {filteredArticles.map((article) => (
            <article key={article.id} className="group site-card cursor-pointer p-4 -m-4">
              <div>
                <Link
                  href={article.href}
                  className="block"
                  target={article.external ? "_blank" : "_self"}
                  rel={article.external ? "noopener noreferrer" : undefined}
                >
                  <h2 className="site-card-title mb-2">{article.title}</h2>
                  <div className="site-meta mb-3">
                    {article.date}
                    {article.readTime ? ` • ${article.readTime}` : ""}
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
                {article.externalSource ? (
                  <div className="text-xs text-blue-600 transition-colors duration-200 group-hover:text-blue-800 dark:text-blue-400 dark:group-hover:text-blue-300">
                    Read full article on {article.externalSource} →
                  </div>
                ) : null}
              </div>
            </article>
          ))}

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
