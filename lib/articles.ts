import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export type ArticleFrontmatter = {
  title: string;
  excerpt: string;
  date: string;
  readTime?: string;
  tags?: string[];
};

export type InternalArticle = {
  slug: string;
  content: string;
  frontmatter: ArticleFrontmatter;
};

function slugify(filename: string) {
  return filename
    .replace(/\.(mdx|md)$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function deriveTitle(content: string, fallback: string) {
  const heading = content.match(/^#{1,6}\s+(.+)$/m);
  return heading ? heading[1].trim() : fallback;
}

function deriveExcerpt(content: string) {
  const withoutHeading = content.replace(/^#{1,6}\s+.+$/m, "").trim();
  const firstBlock = withoutHeading.split(/\n\s*\n/)[0] ?? "";

  return firstBlock
    .replace(/^>\s?/gm, "")
    .replace(/[*_`]/g, "")
    .replace(/\[(.+?)\]\(.+?\)/g, "$1")
    .trim()
    .slice(0, 220);
}

async function readArticleFile(filename: string): Promise<InternalArticle> {
  const filePath = path.join(articlesDirectory, filename);
  const source = await fs.readFile(filePath, "utf8");
  const { data, content } = matter(source);
  const stats = await fs.stat(filePath);
  const slug = (data.slug as string | undefined) || slugify(filename);

  const frontmatter: ArticleFrontmatter = {
    title: data.title || deriveTitle(content, slug),
    excerpt: data.excerpt || deriveExcerpt(content),
    date: data.date || stats.mtime.toISOString().slice(0, 10),
    readTime: data.readTime,
    tags: data.tags,
  };

  return { slug, content, frontmatter };
}

export async function getInternalArticles(): Promise<InternalArticle[]> {
  let entries;

  try {
    entries = await fs.readdir(articlesDirectory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }

  const files = entries.filter(
    (entry) => entry.isFile() && /\.(mdx|md)$/.test(entry.name),
  );

  const articles = await Promise.all(files.map((entry) => readArticleFile(entry.name)));

  return articles.sort((a, b) => (a.frontmatter.date < b.frontmatter.date ? 1 : -1));
}

export async function getInternalArticleSlugs() {
  const articles = await getInternalArticles();
  return articles.map((article) => article.slug);
}

export async function getInternalArticle(slug: string) {
  const articles = await getInternalArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}
