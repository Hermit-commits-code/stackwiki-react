import { useEffect, useMemo, useState } from "react";
import {
  generateArticleDraft,
  generateMetadata,
  type ArticleMetadata,
} from "../features/transcripts/utils/generateArticleDraft";
import ReactMarkdown from "react-markdown";

export function TranscriptConverterPage() {
  const [transcript, setTranscript] = useState("");
  const [metadata, setMetadata] = useState<ArticleMetadata | null>(null);
  const [tagsInput, setTagsInput] = useState("");
  const [saveMessage, setSaveMessage] = useState("");
  const [activeTab, setActiveTab] = useState<"editor" | "markdown" | "preview">(
    "editor",
  );

  useEffect(() => {
    if (!transcript.trim()) {
      setMetadata(null);
      setTagsInput("");
      return;
    }

    const generatedMetadata = generateMetadata(transcript);
    setMetadata(generatedMetadata);
    setTagsInput(generatedMetadata.tags.join(", "));
  }, [transcript]);

  const articleDraft = useMemo(() => {
    if (!metadata) return "";

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    return generateArticleDraft(transcript, {
      ...metadata,
      tags,
    });
  }, [transcript, metadata, tagsInput]);

  function updateMetadata<K extends keyof ArticleMetadata>(
    key: K,
    value: ArticleMetadata[K],
  ) {
    setMetadata((currentMetadata) => {
      if (!currentMetadata) return currentMetadata;

      return {
        ...currentMetadata,
        [key]: value,
      };
    });
  }

  function handleSaveDraft() {
    if (!articleDraft) return;

    setSaveMessage("Draft saved locally. Backend save will be added later.");

    window.setTimeout(() => {
      setSaveMessage("");
    }, 3000);
  }
  const hasTranscript = transcript.trim().length > 0;
  const hasMetadata = metadata !== null;
  const hasDraft = articleDraft.trim().length > 0;

  function handleResetDraft() {
    setTranscript("");
    setMetadata(null);
    setTagsInput("");
    setSaveMessage("");
    setActiveTab("editor");
  }

  // Major Return
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
      <div className="mb-6 grid gap-3 md:grid-cols-4">
        {[
          { label: "Transcript", complete: hasTranscript },
          { label: "Metadata", complete: hasMetadata },
          { label: "Draft", complete: hasDraft },
          { label: "Ready to Save", complete: hasDraft },
        ].map((step) => (
          <div
            key={step.label}
            className={
              step.complete
                ? "rounded-xl border border-cyan-900 bg-cyan-950 p-4"
                : "rounded-xl border border-slate-800 bg-slate-900 p-4"
            }
          >
            <p
              className={
                step.complete
                  ? "text-sm font-semibold text-cyan-200"
                  : "text-sm font-semibold text-slate-400"
              }
            >
              {step.complete ? "✓ " : "○ "}
              {step.label}
            </p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-3 flex items-center justify-between gap-3">
            <label
              htmlFor="transcript"
              className="block text-sm font-semibold text-slate-200"
            >
              Raw Transcript
            </label>

            <button
              type="button"
              onClick={handleResetDraft}
              disabled={!transcript}
              className="text-sm font-semibold text-slate-400 hover:text-cyan-300 disabled:cursor-not-allowed disabled:opacity-40"
            >
              Clear
            </button>
          </div>

          <textarea
            id="transcript"
            value={transcript}
            onChange={(event) => setTranscript(event.target.value)}
            placeholder="Paste your raw transcript here..."
            className="min-h-[520px] w-full rounded-lg border border-slate-700 bg-slate-950 p-4 text-sm text-slate-100 outline-none focus:border-cyan-500"
          />
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900 p-5">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-200">
              Article Settings
            </h2>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleResetDraft}
                disabled={!articleDraft}
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={!articleDraft}
                className="rounded-lg border border-slate-700 px-3 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Save Draft
              </button>
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(articleDraft)}
                disabled={!articleDraft}
                className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Copy Markdown
              </button>
            </div>
          </div>

          <div className="mb-4 flex rounded-lg border border-slate-800 bg-slate-950 p-1">
            {["editor", "markdown", "preview"].map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() =>
                  setActiveTab(tab as "editor" | "markdown" | "preview")
                }
                className={
                  activeTab === tab
                    ? "flex-1 rounded-md bg-cyan-500 px-3 py-2 text-sm font-semibold capitalize text-slate-950"
                    : "flex-1 rounded-md px-3 py-2 text-sm font-semibold capitalize text-slate-300 hover:text-white"
                }
              >
                {tab}
              </button>
            ))}
          </div>
          {saveMessage ? (
            <p className="mt-3 rounded-lg border border-cyan-900 bg-cyan-950 px-4 py-3 text-sm text-cyan-200">
              {saveMessage}
            </p>
          ) : null}
          {activeTab === "editor" && metadata ? (
            <div className="mb-5 grid gap-3">
              <input
                value={metadata.title}
                onChange={(event) =>
                  updateMetadata("title", event.target.value)
                }
                className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-500"
              />

              <div className="grid gap-3 md:grid-cols-3">
                <select
                  value={metadata.category}
                  onChange={(event) =>
                    updateMetadata("category", event.target.value)
                  }
                  className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-500"
                >
                  <option>React</option>
                  <option>TypeScript</option>
                  <option>FastAPI</option>
                  <option>Python</option>
                  <option>Learning</option>
                  <option>General</option>
                </select>

                <select
                  value={metadata.difficulty}
                  onChange={(event) =>
                    updateMetadata(
                      "difficulty",
                      event.target.value as ArticleMetadata["difficulty"],
                    )
                  }
                  className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-500"
                >
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                </select>

                <select
                  value={metadata.type}
                  onChange={(event) =>
                    updateMetadata(
                      "type",
                      event.target.value as ArticleMetadata["type"],
                    )
                  }
                  className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-500"
                >
                  <option>Technical Concept</option>
                  <option>Course Guidance</option>
                  <option>General Notes</option>
                </select>
              </div>

              <input
                value={tagsInput}
                onChange={(event) => setTagsInput(event.target.value)}
                placeholder="react, learning-strategy, course-notes"
                className="rounded-lg border border-slate-700 bg-slate-950 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-500"
              />
            </div>
          ) : (
            <p className="mb-5 text-sm text-slate-400">
              Article settings will appear after you paste a transcript.
            </p>
          )}

          <div className="grid gap-4">
            <div>
              {activeTab === "markdown" && (
                <>
                  <h2 className="mb-3 text-sm font-semibold text-slate-200">
                    Markdown Draft
                  </h2>

                  {articleDraft ? (
                    <pre className="max-h-[320px] overflow-auto whitespace-pre-wrap rounded-lg border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-300">
                      {articleDraft}
                    </pre>
                  ) : (
                    <p className="text-sm text-slate-400">
                      Your generated markdown draft will appear here.
                    </p>
                  )}
                </>
              )}
            </div>

            <div>
              {activeTab === "preview" && (
                <>
                  <h2 className="mb-3 text-sm font-semibold text-slate-200">
                    Rendered Preview
                  </h2>

                  {articleDraft ? (
                    <div className="prose prose-invert max-w-none rounded-lg border border-slate-800 bg-slate-950 p-5 text-slate-200">
                      <ReactMarkdown>{articleDraft}</ReactMarkdown>
                    </div>
                  ) : (
                    <p className="text-sm text-slate-400">
                      Your rendered article preview will appear here.
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
