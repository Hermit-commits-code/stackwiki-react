import { mockArticles } from "./features/articles/data/mockArticles";

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto max-w-6xl px-6 py-10">
        <header className="mb-12 flex items-center justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
              StackWiki
            </p>
            <h1 className="mt-2 text-3xl font-bold">
              Developer Knowledge Base
            </h1>
          </div>

          <span className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300">
            React + FastAPI
          </span>
        </header>

        <section className="rounded-2xl border border-slate-800 bg-slate-900 p-8">
          <h2 className="text-4xl font-bold tracking-tight">
            Build notes that become portfolio projects.
          </h2>

          <p className="mt-4 max-w-2xl text-slate-300">
            StackWiki is your personal developer wiki for React, TypeScript,
            FastAPI, PostgreSQL, deployment notes, and interview prep.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="mb-4 text-2xl font-bold">Recent Articles</h2>

          <div className="grid gap-4 md:grid-cols-3">
            {mockArticles.map((article) => (
              <article
                key={article.id}
                className="rounded-xl border border-slate-800 bg-slate-900 p-5"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="rounded-full bg-cyan-950 px-3 py-1 text-xs text-cyan-300">
                    {article.category}
                  </span>

                  <span className="text-xs text-slate-400">
                    {article.difficulty}
                  </span>
                </div>

                <h3 className="text-xl font-semibold">{article.title}</h3>

                <p className="mt-3 text-sm text-slate-300">
                  {article.description}
                </p>
              </article>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}

export default App;
