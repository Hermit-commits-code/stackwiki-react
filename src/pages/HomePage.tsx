import { Link } from "react-router-dom";
import { ArticleCard } from "../features/articles/components/ArticleCard";
import { mockArticles } from "../features/articles/data/mockArticles";
import { mockCategories } from "../features/categories/data/mockCategories";
import { mockConversions } from "../features/transcripts/data/mockConversions";

export function HomePage() {
  const recentArticles = mockArticles.slice(0, 3);

  return (
    <>
      <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          StackWiki Dashboard
        </p>

        <h1 className="mt-3 text-4xl font-bold tracking-tight">
          Your developer knowledge base.
        </h1>

        <p className="mt-4 max-w-2xl text-slate-300">
          Capture course notes, convert transcripts, organize articles, and turn
          learning into portfolio-ready proof.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/transcript-converter"
            className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Convert Transcript
          </Link>

          <Link
            to="/articles"
            className="rounded-lg border border-slate-700 px-5 py-3 font-semibold text-slate-200 hover:border-cyan-500"
          >
            Browse Articles
          </Link>
        </div>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Total Articles</p>
          <p className="mt-2 text-3xl font-bold">{mockArticles.length}</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Categories</p>
          <p className="mt-2 text-3xl font-bold">{mockCategories.length}</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Transcript Drafts</p>
          <p className="mt-2 text-3xl font-bold">{mockConversions.length}</p>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div>
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
        </div>

        <aside className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold">Recent Conversions</h2>

            <Link
              to="/transcript-converter"
              className="text-sm text-cyan-400 hover:text-cyan-300"
            >
              New
            </Link>
          </div>

          <div className="space-y-3">
            {mockConversions.map((conversion) => (
              <div
                key={conversion.id}
                className="rounded-lg border border-slate-800 bg-slate-950 p-4"
              >
                <p className="font-semibold">{conversion.title}</p>

                <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>{conversion.category}</span>
                  <span>{conversion.status}</span>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </section>
    </>
  );
}
