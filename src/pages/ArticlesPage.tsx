import { useMemo, useState } from "react";
import { ArticleCard } from "../features/articles/components/ArticleCard";
import { mockArticles } from "../features/articles/data/mockArticles";

export function ArticlesPage() {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("All");

  const filteredArticles = useMemo(() => {
    return mockArticles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(search.toLowerCase()) ||
        article.description.toLowerCase().includes(search.toLowerCase()) ||
        article.tags.some((tag) =>
          tag.toLowerCase().includes(search.toLowerCase()),
        );

      const matchesDifficulty =
        difficulty === "All" || article.difficulty === difficulty;

      return matchesSearch && matchesDifficulty;
    });
  }, [search, difficulty]);

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

      <div className="mb-8 grid gap-4 rounded-xl border border-slate-800 bg-slate-900 p-4 md:grid-cols-[1fr_220px]">
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Search articles..."
          className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none focus:border-cyan-500"
        />

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

      <div className="grid gap-4 md:grid-cols-3">
        {filteredArticles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))}
      </div>
    </section>
  );
}
