import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getSavedConversions,
  type SavedConversion,
} from "../features/transcripts/storage/conversionStorage";

export function ConversionsPage() {
  const [conversions, setConversions] = useState<SavedConversion[]>([]);

  useEffect(() => {
    setConversions(getSavedConversions());
  }, []);

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

      {conversions.length === 0 ? (
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-8 text-center">
          <h2 className="text-2xl font-bold">No conversions saved yet</h2>

          <p className="mt-3 text-slate-300">
            Save your first transcript draft from the converter.
          </p>

          <Link
            to="/transcript-converter"
            className="mt-6 inline-block rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Open Converter
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-slate-800 bg-slate-900">
          <div className="grid grid-cols-[1fr_160px_140px_180px] gap-4 border-b border-slate-800 px-5 py-3 text-sm font-semibold text-slate-300">
            <span>Title</span>
            <span>Category</span>
            <span>Status</span>
            <span>Created</span>
          </div>

          {conversions.map((conversion) => (
            <div
              key={conversion.id}
              className="grid grid-cols-[1fr_160px_140px_180px] gap-4 border-b border-slate-800 px-5 py-4 text-sm last:border-b-0"
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

              <span className="text-slate-400">
                {new Date(conversion.createdAt).toLocaleDateString()}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
