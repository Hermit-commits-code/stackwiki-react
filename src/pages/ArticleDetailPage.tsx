import { Link, useParams } from "react-router-dom";
import { mockArticles } from "../features/articles/data/mockArticles";

export function ArticleDetailPage() {
  const { category, slug } = useParams();

  const article = mockArticles.find(
    (article) =>
      article.category.toLowerCase() === category?.toLowerCase() &&
      article.slug === slug,
  );

  if (!article) {
    return (
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="text-3xl font-bold">Article not found</h1>

        <p className="mt-3 text-slate-300">That article does not exist yet.</p>

        <Link
          to="/articles"
          className="mt-6 inline-block rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
        >
          Back to Articles
        </Link>
      </section>
    );
  }

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        to="/articles"
        className="text-sm text-cyan-400 hover:text-cyan-300"
      >
        ← Back to Articles
      </Link>

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-8">
        <div className="mb-5 flex flex-wrap items-center gap-3">
          <span className="rounded-full bg-cyan-950 px-3 py-1 text-xs text-cyan-300">
            {article.category}
          </span>

          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
            {article.difficulty}
          </span>
        </div>

        <h1 className="text-4xl font-bold tracking-tight">{article.title}</h1>

        <p className="mt-4 text-lg text-slate-300">{article.description}</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-400"
            >
              #{tag}
            </span>
          ))}
        </div>

        <hr className="my-8 border-slate-800" />

        <div className="space-y-4 text-slate-200">
          <p>{article.content}</p>
        </div>
      </div>
    </article>
  );
}
