interface CodeViewerProps {
  code:
    | string
    | {
        source?: string;
      }
    | null
    | undefined;
  language?: string;
}

function CodeViewer({
  code,
  language,
}: CodeViewerProps) {
  const source =
    typeof code === "string"
      ? code
      : code?.source ?? "";

  if (!source.trim()) {
    return (
      <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-5 text-sm text-zinc-500">
        Code is not available for this lesson.
      </div>
    );
  }

  const lines = source.split("\n");

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950">
      <div className="flex items-center justify-between border-b border-zinc-800 px-4 py-3">
        <span className="text-xs font-medium uppercase tracking-wide text-zinc-500">
          {language || "Code"}
        </span>

        <span className="text-xs text-zinc-600">
          {lines.length} lines
        </span>
      </div>

      <div className="overflow-x-auto p-4">
        <pre className="text-sm leading-6">
          <code>
            {lines.map((line, index) => (
              <div
                key={index}
                className="flex min-w-max"
              >
                <span className="mr-5 w-8 select-none text-right text-zinc-700">
                  {index + 1}
                </span>

                <span className="text-zinc-300">
                  {line || " "}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}

export default CodeViewer;