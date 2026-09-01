import type { VisualizationState } from "../types/lesson";

interface VisualizerProps {
  visualization?: VisualizationState | null;
}

function Visualizer({
  visualization,
}: VisualizerProps) {
  if (!visualization) {
    return (
      <EmptyVisualizer message="Visualization data is not available." />
    );
  }

  if (visualization.type === "none") {
    return (
      <EmptyVisualizer message="No visualization available for this lesson." />
    );
  }

  // ----------------------------------------
  // ARRAY
  // ----------------------------------------

  if (visualization.type === "array") {
    const data = visualization.data;

    if (
      !data ||
      !Array.isArray(data.values)
    ) {
      return (
        <EmptyVisualizer message="The AI returned invalid array visualization data." />
      );
    }

    const highlightedIndices =
      Array.isArray(data.highlightedIndices)
        ? data.highlightedIndices
        : [];

    const pointers = data.pointers ?? {
      low: null,
      mid: null,
      high: null,
      left: null,
      right: null,
    };

    return (
      <div className="min-h-56 overflow-x-auto py-8">
        <div className="flex min-w-max justify-center gap-3 px-4">
          {data.values.map(
            (value, index) => {
              const highlighted =
                highlightedIndices.includes(
                  index
                );

              const isLow =
                pointers.low === index;

              const isMid =
                pointers.mid === index;

              const isHigh =
                pointers.high === index;

              const isLeft =
                pointers.left === index;

              const isRight =
                pointers.right === index;

              return (
                <div
                  key={index}
                  className="flex w-16 flex-col items-center gap-2"
                >
                  <div className="flex h-5 items-center justify-center text-xs text-zinc-500">
                    {isMid
                      ? "mid"
                      : isLow
                        ? "low"
                        : isHigh
                          ? "high"
                          : isLeft
                            ? "left"
                            : isRight
                              ? "right"
                              : ""}
                  </div>

                  <div
                    className={`flex h-16 w-16 items-center justify-center rounded-xl border text-lg font-semibold transition-all duration-300 ${
                      highlighted
                        ? "scale-110 border-zinc-300 bg-zinc-100 text-zinc-950"
                        : "border-zinc-800 bg-zinc-900 text-zinc-300"
                    }`}
                  >
                    {String(value)}
                  </div>

                  <span className="text-xs text-zinc-600">
                    {index}
                  </span>
                </div>
              );
            }
          )}
        </div>
      </div>
    );
  }

  // ----------------------------------------
  // GRAPH
  // ----------------------------------------

  if (visualization.type === "graph") {
    const data = visualization.data;

    if (!data) {
      return (
        <EmptyVisualizer message="The AI returned incomplete graph visualization data." />
      );
    }

    return (
      <div className="flex min-h-56 items-center justify-center">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-6 py-5 text-center">
          <p className="text-sm font-medium text-zinc-300">
            Graph Visualization
          </p>

          <p className="mt-2 text-xs text-zinc-500">
            {Array.isArray(data.nodes)
              ? `${data.nodes.length} nodes`
              : "Nodes unavailable"}
            {" • "}
            {Array.isArray(data.edges)
              ? `${data.edges.length} edges`
              : "Edges unavailable"}
          </p>
        </div>
      </div>
    );
  }

  // ----------------------------------------
  // TREE
  // ----------------------------------------

  if (visualization.type === "tree") {
    const data = visualization.data;

    if (!data) {
      return (
        <EmptyVisualizer message="The AI returned incomplete tree visualization data." />
      );
    }

    return (
      <div className="flex min-h-56 items-center justify-center">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-6 py-5 text-center">
          <p className="text-sm font-medium text-zinc-300">
            Tree Visualization
          </p>

          <p className="mt-2 text-xs text-zinc-500">
            {Array.isArray(data.nodes)
              ? `${data.nodes.length} nodes`
              : "Tree data unavailable"}
          </p>
        </div>
      </div>
    );
  }

  // ----------------------------------------
  // LINKED LIST
  // ----------------------------------------

  if (
    visualization.type ===
    "linked-list"
  ) {
    const data = visualization.data;

    if (!data) {
      return (
        <EmptyVisualizer message="The AI returned incomplete linked-list data." />
      );
    }

    return (
      <div className="flex min-h-56 items-center justify-center">
        <div className="rounded-xl border border-zinc-800 bg-zinc-950 px-6 py-5 text-center">
          <p className="text-sm font-medium text-zinc-300">
            Linked List Visualization
          </p>

          <p className="mt-2 text-xs text-zinc-500">
            {Array.isArray(data.nodes)
              ? `${data.nodes.length} nodes`
              : "Linked-list data unavailable"}
          </p>
        </div>
      </div>
    );
  }

  // ----------------------------------------
  // STACK
  // ----------------------------------------

  if (visualization.type === "stack") {
    const data = visualization.data;

    if (
      !data ||
      !Array.isArray(data.values)
    ) {
      return (
        <EmptyVisualizer message="The AI returned invalid stack visualization data." />
      );
    }

    return (
      <div className="flex min-h-56 items-center justify-center">
        <div className="flex flex-col-reverse gap-2">
          {data.values.map(
            (value, index) => (
              <div
                key={index}
                className={`flex h-12 w-40 items-center justify-center rounded-lg border ${
                  data.highlightedIndex ===
                  index
                    ? "border-zinc-300 bg-zinc-100 text-zinc-950"
                    : "border-zinc-800 bg-zinc-900 text-zinc-300"
                }`}
              >
                {String(value)}
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  // ----------------------------------------
  // QUEUE
  // ----------------------------------------

  if (visualization.type === "queue") {
    const data = visualization.data;

    if (
      !data ||
      !Array.isArray(data.values)
    ) {
      return (
        <EmptyVisualizer message="The AI returned invalid queue visualization data." />
      );
    }

    return (
      <div className="flex min-h-56 items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="mb-3 flex gap-2 text-xs text-zinc-500">
            <span>Front →</span>
            <span>Rear →</span>
          </div>

          <div className="flex gap-2">
            {data.values.map(
              (value, index) => (
                <div
                  key={index}
                  className="flex h-14 w-16 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900 text-zinc-300"
                >
                  {String(value)}
                </div>
              )
            )}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------
  // DP
  // ----------------------------------------

  if (visualization.type === "dp") {
    const data = visualization.data;

    if (
      !data ||
      !Array.isArray(data.values)
    ) {
      return (
        <EmptyVisualizer message="The AI returned invalid DP visualization data." />
      );
    }

    return (
      <div className="flex min-h-56 items-center justify-center overflow-auto py-6">
        <div className="space-y-2">
          {data.values.map(
            (row, rowIndex) => (
              <div
                key={rowIndex}
                className="flex gap-2"
              >
                {Array.isArray(row) &&
                  row.map(
                    (value, columnIndex) => {
                      const highlighted =
                        Array.isArray(
                          data.highlightedCells
                        ) &&
                        data.highlightedCells.some(
                          (cell) =>
                           cell.row === rowIndex &&
cell.column === columnIndex
                        );

                      return (
                        <div
                          key={columnIndex}
                          className={`flex h-12 w-12 items-center justify-center rounded-lg border text-sm ${
                            highlighted
                              ? "border-zinc-300 bg-zinc-100 text-zinc-950"
                              : "border-zinc-800 bg-zinc-900 text-zinc-300"
                          }`}
                        >
                          {value === null
                            ? "—"
                            : String(value)}
                        </div>
                      );
                    }
                  )}
              </div>
            )
          )}
        </div>
      </div>
    );
  }

  return (
    <EmptyVisualizer message="This visualization type is not supported yet." />
  );
}


// ----------------------------------------
// Empty State
// ----------------------------------------

function EmptyVisualizer({
  message,
}: {
  message: string;
}) {
  return (
    <div className="flex min-h-56 items-center justify-center rounded-xl bg-zinc-950 px-6 text-center text-sm text-zinc-500">
      {message}
    </div>
  );
}

export default Visualizer;