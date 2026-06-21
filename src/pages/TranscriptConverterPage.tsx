import { useMemo, useState } from "react";
import { generateArticleDraft } from "../features/transcripts/utils/generateArticleDraft";

export function TranscriptConverterPage() {
  const [transcript, setTranscript] = useState("");

  const articleDraft = useMemo(
    () => generateArticleDraft(transcript),
    [transcript],
  );

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Article Builder
        </p>

        <h1 className="mt-2 text-4xl font-bold">Transcript Converter</h1>

        <p className="mt-3 max-w-2xl text-slate-300">
          Paste raw course transcripts and turn them into clean StackWiki
          article drafts.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <label
            htmlFor="transcript"
            className="mb-3 block text-sm font-semibold text-slate-200"
          >
            Raw Transcript
          </label>

          <textarea
            id="transcript"
            value={transcript}
            onChange={(event) => setTranscript(event.target.value)}
            placeholder="Paste your raw transcript here..."
            className="min-h-[520px] w-full rounded-lg border border-slate-700 bg-slate-950 p-4 text-sm text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200">
              Markdown Draft
            </h2>

            <button
              type="button"
              onClick={() => navigator.clipboard.writeText(articleDraft)}
              disabled={!articleDraft}
              className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Copy Markdown
            </button>
          </div>

          {articleDraft ? (
            <pre className="min-h-[520px] overflow-auto whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-300">
              {articleDraft}
            </pre>
          ) : (
            <p className="text-sm text-slate-400">
              Your generated markdown draft will appear here.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
