import { useState } from "react";
import type { Language } from "../types/lesson";

interface ProblemInputProps {
  onSubmit: (
    query: string,
    language: Language
  ) => void;
  loading: boolean;
}

const languages: {
  value: Language;
  label: string;
}[] = [
  {
    value: "cpp",
    label: "C++",
  },
  {
    value: "python",
    label: "Python",
  },
  {
    value: "java",
    label: "Java",
  },
];

function ProblemInput({
  onSubmit,
  loading,
}: ProblemInputProps) {
  const [query, setQuery] =
    useState("");

  const [language, setLanguage] =
    useState<Language>("cpp");

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    const trimmedQuery =
      query.trim();

    if (!trimmedQuery || loading) {
      return;
    }

    onSubmit(
      trimmedQuery,
      language
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      {/* Question */}
      <div>
        <label
          htmlFor="dsa-question"
          className="text-sm font-medium text-zinc-200"
        >
          What do you want to learn?
        </label>

        <textarea
          id="dsa-question"
          value={query}
          onChange={(event) =>
            setQuery(event.target.value)
          }
          disabled={loading}
          placeholder="e.g. Explain binary search with an example"
          rows={4}
          className="mt-2 w-full resize-none rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 text-sm text-zinc-200 outline-none transition placeholder:text-zinc-600 focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>


      {/* Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

        {/* Language */}
        <div className="w-full sm:w-40">
          <label
            htmlFor="language"
            className="text-xs font-medium text-zinc-500"
          >
            Programming language
          </label>

          <select
            id="language"
            value={language}
            onChange={(event) =>
              setLanguage(
                event.target.value as Language
              )
            }
            disabled={loading}
            className="mt-2 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 py-2.5 text-sm text-zinc-300 outline-none transition focus:border-zinc-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {languages.map(
              (item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              )
            )}
          </select>
        </div>


        {/* Submit */}
        <button
          type="submit"
          disabled={
            loading ||
            query.trim().length === 0
          }
          className="w-full rounded-xl bg-zinc-100 px-5 py-2.5 text-sm font-medium text-zinc-950 transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
        >
          {loading
            ? "Generating..."
            : "Generate Lesson"}
        </button>

      </div>


      {/* Small hint */}
      <p className="text-xs text-zinc-600">
        Ask about an algorithm, data
        structure, or coding problem.
      </p>
    </form>
  );
}

export default ProblemInput;