import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getArticles } from "../features/articles/api/articleApi";
import { ArticleCard } from "../features/articles/components/ArticleCard";
import { mockArticles } from "../features/articles/data/mockArticles";

export function ArticlesPage() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get("category") ?? "All";

  const {
    data: apiArticles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  const articles = useMemo(() => {
    return [
      ...apiArticles.map((article) => ({
        id: article.id,
        title: article.title,
        category: article.category,
        slug: article.slug,
        difficulty: article.difficulty as
          | "Beginner"
          | "Intermediate"
          | "Advanced",
        description: article.description,
        tags: [],
        content: article.content,
      })),
      ...mockArticles,
    ];
  }, [apiArticles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const searchText = search.toLowerCase();

      const matchesSearch =
        article.title.toLowerCase().includes(searchText) ||
        article.description.toLowerCase().includes(searchText) ||
        article.category.toLowerCase().includes(searchText) ||
        article.tags.some((tag) => tag.toLowerCase().includes(searchText));

      const matchesDifficulty =
        difficulty === "All" || article.difficulty === difficulty;

      const matchesCategory =
        selectedCategory === "All" ||
        article.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesDifficulty && matchesCategory;
    });
  }, [articles, search, difficulty, selectedCategory]);

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Browse Knowledge
        </p>

        <h1 className="mt-2 text-4xl font-bold">Articles</h1>

        <p className="mt-3 max-w-2xl text-slate-300">
          Search your developer notes by topic, difficulty, and tags.
        </p>
      </div>

      {isLoading ? (
        <p className="mb-4 rounded-lg border border-slate-800 bg-slate-900 p-4 text-sm text-slate-300">
          Loading articles from backend...
        </p>
      ) : null}

      {isError ? (
        <p className="mb-4 rounded-lg border border-red-900 bg-red-950 p-4 text-sm text-red-200">
          Could not load backend articles. Showing local mock articles.
        </p>
      ) : null}

      <div className="mb-8 grid gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 md:grid-cols-[1fr_220px_220px]">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search articles..."
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-500"
        />

        <select
          value={selectedCategory}
          onChange={(event) => {
            const value = event.target.value;

            if (value === "All") {
              setSearchParams({});
            } else {
              setSearchParams({ category: value });
            }
          }}
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-500"
        >
          <option>All</option>
          <option value="react">React</option>
          <option value="typescript">TypeScript</option>
          <option value="node">Node</option>
          <option value="express">Express</option>
          <option value="postgresql">PostgreSQL</option>
          <option value="prisma">Prisma</option>
        </select>

        <select
          value={difficulty}
          onChange={(event) => setDifficulty(event.target.value)}
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-500"
        >
          <option>All</option>
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>
      </div>

      <p className="mb-4 text-sm text-slate-400">
        Showing {filteredArticles.length} article
        {filteredArticles.length === 1 ? "" : "s"}
      </p>

      {filteredArticles.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h2 className="text-2xl font-bold">No articles found</h2>
          <p className="mt-3 text-slate-300">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-3">
          {filteredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </section>
  );
}
