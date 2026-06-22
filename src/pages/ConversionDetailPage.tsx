import { useState } from "react";
import ReactMarkdown from "react-markdown";
import { Link, useNavigate, useParams } from "react-router-dom";
import { saveArticle } from "../features/articles/storage/articleStorage";
import {
  deleteConversion,
  getSavedConversions,
  updateConversion,
} from "../features/transcripts/storage/conversionStorage";

export function ConversionDetailPage() {
  const navigate = useNavigate();
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
    if (!conversion) return;

    updateConversion({
      ...conversion,
      markdown,
    });

    setSaveMessage("Changes saved locally.");

    window.setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  }

  function handlePublishArticle() {
    if (!conversion) return;

    saveArticle({
      id: Date.now(),
      title: conversion.title,
      category: conversion.category,
      slug: conversion.title.toLowerCase().replaceAll(" ", "-"),
      difficulty: conversion.metadata.difficulty,
      description: "Article generated from transcript conversion.",
      tags: conversion.metadata.tags,
      content: markdown,
      markdown,
      createdAt: new Date().toISOString(),
    });

    updateConversion({
      ...conversion,
      markdown,
      status: "Published",
    });

    setSaveMessage("Draft published to articles.");
  }

  function handleDeleteDraft() {
    if (!conversion) return;

    const confirmed = window.confirm(
      "Delete this draft? This cannot be undone.",
    );

    if (!confirmed) return;

    deleteConversion(conversion.id);
    navigate("/conversions");
  }

  function handleDownloadMarkdown() {
    const fileName = `${conversion.title.toLowerCase().replaceAll(" ", "-")}.md`;

    const blob = new Blob([markdown], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();

    URL.revokeObjectURL(url);
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
            onClick={handlePublishArticle}
            className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
          >
            Publish Article
          </button>

          <button
            type="button"
            onClick={() => navigator.clipboard.writeText(markdown)}
            className="rounded-lg bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 hover:bg-cyan-400"
          >
            Copy Markdown
          </button>
          <button
            type="button"
            onClick={handleDownloadMarkdown}
            className="rounded-lg border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-500"
          >
            Download .md
          </button>
          <button
            type="button"
            onClick={handleDeleteDraft}
            className="rounded-lg border border-red-900 px-4 py-2 text-sm font-semibold text-red-300 hover:bg-red-950"
          >
            Delete Draft
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
            className="min-h-150 w-full rounded-lg border border-slate-700 bg-slate-950 p-4 text-sm text-slate-100 outline-none focus:border-cyan-500"
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
