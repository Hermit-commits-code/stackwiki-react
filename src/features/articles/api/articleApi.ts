import { api } from "../../../lib/api";

export type ApiArticle = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  category: string;
  difficulty: string;
  createdAt: string;
  updatedAt: string;
};

export async function getArticles() {
  const response = await api.get<ApiArticle[]>("/articles");
  return response.data;
}

export async function getArticleBySlug(slug: string) {
  const response = await api.get<ApiArticle>(`/articles/${slug}`);
  return response.data;
}
