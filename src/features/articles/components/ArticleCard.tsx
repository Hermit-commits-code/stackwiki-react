import { Link } from "react-router-dom";
import type { Article } from "../data/mockArticles";

type ArticleCardProps = {
  article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="rounded-xl border border-slate-800 bg-slate-900 p-5 transition hover:border-cyan-700">
      <div className="mb-4 flex items-center justify-between">
        <span className="rounded-full bg-cyan-950 px-3 py-1 text-xs text-cyan-300">
          {article.category}
        </span>

        <span className="text-xs text-slate-400">{article.difficulty}</span>
      </div>

      <h2 className="text-xl font-semibold">
        <Link
          to={`/articles/${article.category.toLowerCase()}/${article.slug}`}
          className="hover:text-cyan-400"
        >
          {article.title}
        </Link>
      </h2>

      <p className="mt-3 text-sm text-slate-300">{article.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {article.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-slate-700 px-2 py-1 text-xs text-slate-400"
          >
            #{tag}
          </span>
        ))}
      </div>
    </article>
  );
}
