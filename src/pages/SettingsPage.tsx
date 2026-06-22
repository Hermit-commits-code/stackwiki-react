import { getSavedArticles } from "../features/articles/storage/articleStorage";
import { getSavedConversions } from "../features/transcripts/storage/conversionStorage";

export function SettingsPage() {
  const articles = getSavedArticles();
  const conversions = getSavedConversions();

  function handleClearStorage() {
    const confirmed = window.confirm(
      "Clear all local StackWiki data? This cannot be undone.",
    );

    if (!confirmed) return;

    localStorage.removeItem("stackwiki_articles");
    localStorage.removeItem("stackwiki_conversions");

    window.location.reload();
  }

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          App Settings
        </p>

        <h1 className="mt-2 text-4xl font-bold">Settings</h1>

        <p className="mt-3 max-w-2xl text-slate-300">
          View local storage stats and manage your StackWiki frontend data.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Saved Articles</p>
          <p className="mt-2 text-3xl font-bold">{articles.length}</p>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <p className="text-sm text-slate-400">Saved Conversions</p>
          <p className="mt-2 text-3xl font-bold">{conversions.length}</p>
        </div>
      </div>

      <div className="mt-8 rounded-xl border border-slate-800 bg-slate-900 p-5">
        <h2 className="text-xl font-bold">Local Storage</h2>

        <p className="mt-3 max-w-2xl text-slate-300">
          StackWiki currently saves drafts and published articles in your
          browser. Backend database storage will replace this later.
        </p>

        <button
          type="button"
          onClick={handleClearStorage}
          className="mt-5 rounded-lg border border-red-900 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-950"
        >
          Clear Local Data
        </button>
      </div>
    </section>
  );
}
