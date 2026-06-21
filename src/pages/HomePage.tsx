import { Link } from "react-router-dom";
import { ArticleCard } from "../features/articles/components/ArticleCard";
import { mockArticles } from "../features/articles/data/mockArticles";

export function HomePage() {
  const recentArticles = mockArticles.slice(0, 3);

  return (
    <>
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Developer Knowledge Base
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Build notes that become portfolio projects.
        </h1>

        <p className="mt-4 max-w-2xl text-slate-300">
          StackWiki is your personal developer wiki for React, TypeScript,
          FastAPI, PostgreSQL, deployment notes, and interview prep.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/articles"
            className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Browse Articles
          </Link>

          <Link
            to="/categories"
            className="rounded-lg border border-slate-700 px-5 py-3 font-semibold text-slate-200 hover:border-cyan-500"
          >
            View Categories
          </Link>
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent Articles</h2>

          <Link
            to="/articles"
            className="text-sm text-cyan-400 hover:text-cyan-300"
          >
            View all
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {recentArticles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </section>
    </>
  );
}
