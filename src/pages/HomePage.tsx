import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ArticleCard } from "../features/articles/components/ArticleCard";
import { getArticles } from "../features/articles/api/articleApi";
import { mockCategories } from "../features/categories/data/mockCategories";
import { mockConversions } from "../features/transcripts/data/mockConversions";

export function HomePage() {
  const {
    data: apiArticles = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["articles"],
    queryFn: getArticles,
  });

  const recentArticles = apiArticles.slice(0, 3);

  return (
    <>
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          StackWiki Dashboard
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight text-white">
          Build, convert, and organize developer knowledge.
        </h1>

        <p className="mt-4 max-w-2xl text-slate-400">
          StackWiki helps you turn transcripts, notes, and coding lessons into
          searchable technical articles.
        </p>

        <div className="mt-6 flex gap-4">
          <Link
            to="/articles"
            className="rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Browse Articles
          </Link>

          <Link
            to="/converter"
            className="rounded-lg border border-slate-700 px-4 py-2 font-semibold text-slate-200 hover:bg-slate-800"
          >
            Convert Transcript
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Articles</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {apiArticles.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Categories</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {mockCategories.length}
          </p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Conversions</p>
          <p className="mt-2 text-3xl font-bold text-white">
            {mockConversions.length}
          </p>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Recent Articles</h2>

          <Link
            to="/articles"
            className="text-sm font-semibold text-cyan-400 hover:text-cyan-300"
          >
            View all
          </Link>
        </div>

        {isLoading && <p className="text-slate-400">Loading articles...</p>}

        {isError && (
          <p className="text-red-400">Could not load articles from the API.</p>
        )}

        {!isLoading && !isError && recentArticles.length === 0 && (
          <p className="text-slate-400">No articles found yet.</p>
        )}

        {!isLoading && !isError && recentArticles.length > 0 && (
          <div className="grid gap-4 md:grid-cols-3">
            {recentArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
