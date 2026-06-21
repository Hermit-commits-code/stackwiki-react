import ReactMarkdown from "react-markdown"
import { Link, useParams } from "react-router-dom"
import { getSavedConversions } from "../features/transcripts/storage/conversionStorage"

export function ConversionDetailPage() {
  const { id } = useParams()

  const conversion = getSavedConversions().find(
    (conversion) => conversion.id === id,
  )

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
    )
  }

  return (
    <section>
      <Link to="/conversions" className="text-sm text-cyan-400 hover:text-cyan-300">
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

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(conversion.markdown)}
            className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Copy Markdown
          </button>
        </div>
      </div>

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-950 p-6">
        <ReactMarkdown>{conversion.markdown}</ReactMarkdown>
      </div>
    </section>
  )
}