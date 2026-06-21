import "./App.css";

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <section className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-cyan-400">
          StackWiki React
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          React + FastAPI Developer Stack
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300">
          Frontend is running with React, TypeScript, Vite, Tailwind, React
          Router, TanStack Query, and testing ready.
        </p>
      </section>
    </main>
  );
}

export default App;
