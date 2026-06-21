import type { Article } from "../data/mockArticles";

const STORAGE_KEY = "stackwiki_articles";

export type SavedArticle = Article & {
  markdown: string;
  createdAt: string;
};

export function getSavedArticles(): SavedArticle[] {
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) return [];

  try {
    return JSON.parse(saved) as SavedArticle[];
  } catch {
    return [];
  }
}

export function saveArticle(article: SavedArticle) {
  const existingArticles = getSavedArticles();
  const updatedArticles = [article, ...existingArticles];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedArticles));
}
