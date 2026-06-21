import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useParams } from "react-router-dom";
import {
  getSavedConversions,
  updateConversion,
} from "../features/transcripts/storage/conversionStorage";

export function ConversionDetailPage() {
  const { id } = useParams();

  const conversion = getSavedConversions().find(
    (conversion) => conversion.id === id,
  );

  const [markdown, setMarkdown] = useState(conversion?.markdown ?? "");
  const [saveMessage, setSaveMessage] = useState("");

  if (!conversion) {
    return (
      <section className="rounded-xl border border-slate-800 bg-slate-900 p-8">
        <h1 className="text-3xl font-bold">Conversion not found</h1>

        <p className="mt-3 text-slate-300">
          This saved draft does not exist in local storage.
        </p>

        <Link
          to="/conversions"
          className="mt-6 inline-block rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 hover:bg-cyan-400"
        >
          Back to Conversions
        </Link>
      </section>
    );
  }

  function handleSaveChanges() {
    updateConversion({
      ...conversion,
      markdown,
    });

    setSaveMessage("Changes saved locally.");

    window.setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  }

  return (
    <section>
      <Link
        to="/conversions"
        className="text-sm text-cyan-400 hover:text-cyan-300"
      >
        ← Back to Conversions
      </Link>

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-8">
        <div className="mb-5 flex flex-wrap gap-3">
          <span className="rounded-full bg-cyan-950 px-3 py-1 text-xs text-cyan-300">
            {conversion.category}
          </span>

          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-slate-300">
            {conversion.status}
          </span>
        </div>

        <h1 className="text-4xl font-bold">{conversion.title}</h1>

        <p className="mt-3 text-sm text-slate-400">
          Created {new Date(conversion.createdAt).toLocaleString()}
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleSaveChanges}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-500"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(markdown)}
            className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Copy Markdown
          </button>
        </div>

        {saveMessage ? (
          <p className="mt-4 rounded-lg border border-cyan-900 bg-cyan-950 px-4 py-3 text-sm text-cyan-200">
            {saveMessage}
          </p>
        ) : null}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-3 text-sm font-semibold text-slate-200">
            Markdown Editor
          </h2>

          <textarea
            value={markdown}
            onChange={(event) => setMarkdown(event.target.value)}
            className="min-h-[600px] w-full rounded-lg border border-slate-700 bg-slate-950 p-4 text-sm text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-3 text-sm font-semibold text-slate-200">
            Rendered Preview
          </h2>

          <div className="prose prose-invert max-w-none rounded-lg border border-slate-800 bg-slate-950 p-5 text-slate-200">
            <ReactMarkdown>{markdown}</ReactMarkdown>
          </div>
        </div>
      </div>
    </section>
  );
}
