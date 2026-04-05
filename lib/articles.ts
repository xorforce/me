import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

const articlesDirectory = path.join(process.cwd(), "content/articles");

export type ArticleFrontmatter = {
  title: string;
  excerpt: string;
  publishedAt: string;
  readTime?: string;
  tags?: string[];
};

export async function getInternalArticleSlugs() {
  let entries;

  try {
    entries = await fs.readdir(articlesDirectory, { withFileTypes: true });
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }

  return entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
    .map((entry) => entry.name.replace(/\.mdx$/, ""));
}

export async function getInternalArticle(slug: string) {
  const articlePath = path.join(articlesDirectory, `${slug}.mdx`);
  const source = await fs.readFile(articlePath, "utf8");
  const { data, content } = matter(source);

  return {
    slug,
    content,
    frontmatter: data as ArticleFrontmatter,
  };
}
