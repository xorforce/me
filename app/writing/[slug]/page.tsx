import Link from "next/link"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import remarkGfm from "remark-gfm"
import { SubpageShell } from "@/components/subpage-shell"
import { getInternalArticle, getInternalArticleSlugs } from "@/lib/articles"

export async function generateStaticParams() {
  const slugs = await getInternalArticleSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getInternalArticle(slug)

  if (!article) return {}

  return {
    title: article.frontmatter.title,
    description: article.frontmatter.excerpt,
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getInternalArticle(slug)

  if (!article) {
    notFound()
  }

  return (
    <SubpageShell showFooterBorder>
      <article>
        <div className="mb-8">
          <Link href="/writing" className="site-inline-link site-meta">
            ← writing
          </Link>
        </div>

        <h1 className="site-page-title">{article.frontmatter.title}</h1>
        <div className="site-meta mb-10">
          {article.frontmatter.date}
          {article.frontmatter.readTime ? ` • ${article.frontmatter.readTime}` : ""}
        </div>

        <div className="site-article-body">
          <MDXRemote
            source={article.content}
            options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
          />
        </div>
      </article>
    </SubpageShell>
  )
}
