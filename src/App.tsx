import Header from "./components/Header";
import ProblemInput from "./components/ProblemInput";
import LessonView from "./components/LessonView";
import { generateLesson } from "./lib/api";
import type { Language, Lesson } from "./types/lesson";
import { useState } from "react";

function App() {
  const [lesson, setLesson] =
    useState<Lesson | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  async function handleProblemSubmit(
    query: string,
    language: Language
  ) {
    try {
      setLoading(true);
      setError(null);

      const generatedLesson =
        await generateLesson(
          query,
          language
        );

      setLesson(generatedLesson);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100">

      <Header />

      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">

        {/* Hero */}
        <section className="mx-auto max-w-3xl text-center">

          <p className="text-sm font-medium text-zinc-500">
            Interactive DSA learning
          </p>

          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
            Turn algorithms into
            <span className="block text-zinc-500">
              visual experiences.
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-6 text-zinc-500 sm:text-base sm:leading-7">
            Ask about a DSA problem or algorithm and
            explore different approaches, complexity,
            code and step-by-step execution.
          </p>

        </section>


        {/* Input */}
        <section className="mx-auto mt-8 max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4 shadow-2xl shadow-black/20 sm:mt-10 sm:p-6">

          <ProblemInput
            onSubmit={handleProblemSubmit}
            loading={loading}
          />

        </section>


        {/* Error */}
        {error && (
          <div
            role="alert"
            className="mx-auto mt-4 max-w-3xl rounded-xl border border-red-900/70 bg-red-950/30 px-4 py-3 text-sm text-red-400"
          >
            {error}
          </div>
        )}


        {/* Loading */}
        {loading && (
          <section
            aria-live="polite"
            className="mx-auto mt-8 max-w-3xl rounded-2xl border border-zinc-800 bg-zinc-900/50 p-8 text-center"
          >
            <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-zinc-700 border-t-zinc-200" />

            <p className="mt-4 text-sm text-zinc-400">
              Creating your DSA lesson...
            </p>

            <p className="mt-1 text-xs text-zinc-600">
              This may take a few seconds.
            </p>
          </section>
        )}


        {/* Lesson */}
        {lesson && !loading && (
          <LessonView lesson={lesson} />
        )}


        {/* Empty State */}
        {!lesson && !loading && !error && (
          <section className="mx-auto mt-10 max-w-3xl">

            <div className="mb-4">
              <h2 className="text-sm font-medium text-zinc-300">
                Try an example
              </h2>

              <p className="mt-1 text-xs text-zinc-600">
                Start with one of these DSA topics.
              </p>
            </div>


            <div className="grid gap-3 sm:grid-cols-3">

              <button
                type="button"
                onClick={() =>
                  handleProblemSubmit(
                    "Explain Dijkstra's algorithm with a simple example graph",
                    "cpp"
                  )
                }
                className="group rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-left transition hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-800"
              >
                <p className="text-sm font-medium">
                  Dijkstra
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Shortest path on a weighted graph
                </p>
              </button>


              <button
                type="button"
                onClick={() =>
                  handleProblemSubmit(
                    "Explain binary search with a visual example",
                    "cpp"
                  )
                }
                className="group rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-left transition hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-800"
              >
                <p className="text-sm font-medium">
                  Binary Search
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Search an ordered array
                </p>
              </button>


              <button
                type="button"
                onClick={() =>
                  handleProblemSubmit(
                    "Explain BFS with an example graph",
                    "cpp"
                  )
                }
                className="group rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-left transition hover:-translate-y-0.5 hover:border-zinc-600 hover:bg-zinc-800"
              >
                <p className="text-sm font-medium">
                  BFS
                </p>

                <p className="mt-1 text-xs leading-5 text-zinc-500">
                  Traverse a graph level by level
                </p>
              </button>

            </div>

          </section>
        )}

      </main>

    </div>
  );
}

export default App;