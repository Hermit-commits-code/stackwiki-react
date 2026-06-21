import { useState } from "react"

export function TranscriptConverterPage() {
  const [transcript, setTranscript] = useState("")

  return (
    <section>
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">
          Article Builder
        </p>

        <h1 className="mt-2 text-4xl font-bold">Transcript Converter</h1>

        <p className="mt-3 max-w-2xl text-slate-300">
          Paste raw course transcripts and turn them into clean StackWiki article
          drafts.
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
            className="min-h-[420px] w-full rounded-lg border border-slate-700 bg-slate-950 p-4 text-sm text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <h2 className="mb-3 text-sm font-semibold text-slate-200">
            Article Preview
          </h2>

          {transcript.trim().length === 0 ? (
            <p className="text-sm text-slate-400">
              Your generated article preview will appear here.
            </p>
          ) : (
            <div className="space-y-4 text-slate-200">
              <h3 className="text-2xl font-bold">Generated Article Draft</h3>

              <p className="text-sm text-slate-400">
                Transcript length: {transcript.length} characters
              </p>

              <div className="rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-300">
                {transcript}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}