import { Link } from "react-router-dom";
import { mockArticles } from "../features/articles/data/mockArticles";
import { mockCategories } from "../features/categories/data/mockCategories";

export function CategoriesPage() {
  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Topics
        </p>

        <h1 className="mt-2 text-4xl font-bold">Categories</h1>

        <p className="mt-3 max-w-2xl text-slate-300">
          Browse StackWiki by major parts of your developer stack.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {mockCategories.map((category) => {
          const articleCount = mockArticles.filter(
            (article) =>
              article.category.toLowerCase() === category.slug.toLowerCase(),
          ).length;

          return (
            <Link
              key={category.slug}
              to={`/articles?category=${category.slug}`}
              className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-cyan-700"
            >
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold">{category.name}</h2>

                <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                  {articleCount} article{articleCount === 1 ? "" : "s"}
                </span>
              </div>

              <p className="text-sm text-slate-300">{category.description}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
