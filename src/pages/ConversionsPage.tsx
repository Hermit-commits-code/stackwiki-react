import { Link } from "react-router-dom";
import { mockConversions } from "../features/transcripts/data/mockConversions";

export function ConversionsPage() {
  return (
    <section>
      <div className="mb-8 flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
            Draft History
          </p>

          <h1 className="mt-2 text-4xl font-bold">Conversions</h1>

          <p className="mt-3 max-w-2xl text-slate-300">
            Track transcript drafts before they become published StackWiki
            articles.
          </p>
        </div>

        <Link
          to="/transcript-converter"
          className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
        >
          New Conversion
        </Link>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900">
        <div className="grid grid-cols-[1fr_160px_140px_120px] gap-4 border-b border-slate-800 px-5 py-3 text-sm font-semibold text-slate-300">
          <span>Title</span>
          <span>Category</span>
          <span>Status</span>
          <span>Action</span>
        </div>

        {mockConversions.map((conversion) => (
          <div
            key={conversion.id}
            className="grid grid-cols-[1fr_160px_140px_120px] gap-4 border-b border-slate-800 px-5 py-4 text-sm last:border-b-0"
          >
            <span className="font-semibold text-slate-100">
              {conversion.title}
            </span>

            <span className="text-slate-300">{conversion.category}</span>

            <span>
              <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
                {conversion.status}
              </span>
            </span>

            <button
              type="button"
              className="text-left text-cyan-400 hover:text-cyan-300"
            >
              Open
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
