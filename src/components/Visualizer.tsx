import { useMemo, useState } from "react";
import type {
  Lesson,
  VisualizationState,
} from "../types/lesson";

interface VisualizerProps {
  lesson: Lesson;
}

function VisualizationRenderer({
  visualization,
}: {
  visualization: VisualizationState;
}) {
  if (!visualization) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center text-sm text-zinc-500">
        No visualization available.
      </div>
    );
  }

  switch (visualization.type) {
    case "array":
      return (
        <ArrayVisualizer
          visualization={visualization.data}
        />
      );

    case "graph":
      return (
        <GraphVisualizer
          visualization={visualization.data}
        />
      );

    case "tree":
      return (
        <TreeVisualizer
          visualization={visualization.data}
        />
      );

    case "linked-list":
      return (
        <LinkedListVisualizer
          visualization={visualization.data}
        />
      );

    case "stack":
      return (
        <StackVisualizer
          visualization={visualization.data}
        />
      );

    case "queue":
      return (
        <QueueVisualizer
          visualization={visualization.data}
        />
      );

    case "dp":
      return (
        <DPVisualizer
          visualization={visualization.data}
        />
      );

    case "none":
      return (
        <div className="flex min-h-[300px] items-center justify-center text-sm text-zinc-500">
          This algorithm does not require a visual representation.
        </div>
      );

    default:
      return null;
  }
}

/* =========================================================
   ARRAY
   ========================================================= */

function ArrayVisualizer({
  visualization,
}: {
  visualization: Extract<
    VisualizationState,
    { type: "array" }
  >["data"];
}) {
  const {
    values,
    highlightedIndices,
    pointers,
  } = visualization;

  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center gap-8 overflow-x-auto p-6">
      <div className="flex items-end gap-2">
        {values.map((value, index) => {
          const highlighted =
            highlightedIndices.includes(index);

          const pointerNames: string[] = [];

          if (pointers.low === index)
            pointerNames.push("low");

          if (pointers.mid === index)
            pointerNames.push("mid");

          if (pointers.high === index)
            pointerNames.push("high");

          if (pointers.left === index)
            pointerNames.push("left");

          if (pointers.right === index)
            pointerNames.push("right");

          return (
            <div
              key={index}
              className="flex min-w-[64px] flex-col items-center"
            >
              <div className="mb-2 flex h-6 gap-1 text-[10px] font-medium text-zinc-500">
                {pointerNames.map((name) => (
                  <span
                    key={name}
                    className="rounded bg-zinc-800 px-1.5 py-0.5"
                  >
                    {name}
                  </span>
                ))}
              </div>

              <div
                className={[
                  "flex h-14 w-14 items-center justify-center rounded-xl border text-sm font-semibold transition-all duration-300",
                  highlighted
                    ? "border-white bg-white text-black scale-105"
                    : "border-zinc-700 bg-zinc-900 text-zinc-200",
                ].join(" ")}
              >
                {value}
              </div>

              <div className="mt-2 text-[11px] text-zinc-600">
                {index}
              </div>
            </div>
          );
        })}
      </div>

      <div className="text-xs text-zinc-500">
        Highlighted indices:
        {" "}
        {highlightedIndices.length
          ? highlightedIndices.join(", ")
          : "none"}
      </div>
    </div>
  );
}

/* =========================================================
   GRAPH
   ========================================================= */

function GraphVisualizer({
  visualization,
}: {
  visualization: Extract<
    VisualizationState,
    { type: "graph" }
  >["data"];
}) {
  const { nodes, edges, highlightedNodes, highlightedEdges } =
    visualization;

  const positions = useMemo(() => {
    const result: Record<
      string,
      { x: number; y: number }
    > = {};

    const radius = 125;
    const centerX = 300;
    const centerY = 180;

    nodes.forEach((node, index) => {
      const angle =
        (2 * Math.PI * index) /
        Math.max(nodes.length, 1);

      result[node] = {
        x:
          centerX +
          radius * Math.cos(angle),
        y:
          centerY +
          radius * Math.sin(angle),
      };
    });

    return result;
  }, [nodes]);

  function edgeHighlighted(
    from: string,
    to: string
  ) {
    return highlightedEdges.some(
      (edge) =>
        (edge.from === from &&
          edge.to === to) ||
        (edge.from === to &&
          edge.to === from)
    );
  }

  return (
    <div className="flex min-h-[380px] items-center justify-center overflow-auto p-4">
      {nodes.length === 0 ? (
        <div className="text-sm text-zinc-500">
          No graph data.
        </div>
      ) : (
        <svg
          viewBox="0 0 600 360"
          className="h-auto w-full max-w-3xl"
        >
          {edges.map((edge, index) => {
            const from =
              positions[edge.from];

            const to =
              positions[edge.to];

            if (!from || !to) return null;

            const active = edgeHighlighted(
              edge.from,
              edge.to
            );

            return (
              <g key={index}>
                <line
                  x1={from.x}
                  y1={from.y}
                  x2={to.x}
                  y2={to.y}
                  stroke={
                    active
                      ? "white"
                      : "#3f3f46"
                  }
                  strokeWidth={
                    active ? 4 : 2
                  }
                />

                {edge.weight !== undefined && (
                  <text
                    x={(from.x + to.x) / 2}
                    y={(from.y + to.y) / 2 - 8}
                    textAnchor="middle"
                    className="fill-zinc-400 text-xs"
                  >
                    {edge.weight}
                  </text>
                )}
              </g>
            );
          })}

          {nodes.map((node) => {
            const position =
              positions[node];

            const active =
              highlightedNodes.includes(node);

            return (
              <g key={node}>
                <circle
                  cx={position.x}
                  cy={position.y}
                  r="28"
                  fill={
                    active
                      ? "white"
                      : "#18181b"
                  }
                  stroke={
                    active
                      ? "white"
                      : "#52525b"
                  }
                  strokeWidth="3"
                />

                <text
                  x={position.x}
                  y={position.y + 5}
                  textAnchor="middle"
                  className={
                    active
                      ? "fill-black text-sm font-semibold"
                      : "fill-white text-sm font-semibold"
                  }
                >
                  {node}
                </text>
              </g>
            );
          })}
        </svg>
      )}
    </div>
  );
}

/* =========================================================
   TREE
   ========================================================= */

function TreeVisualizer({
  visualization,
}: {
  visualization: Extract<
    VisualizationState,
    { type: "tree" }
  >["data"];
}) {
  const {
    root,
    nodes,
    highlightedNodes,
  } = visualization;

  const nodeMap = useMemo(() => {
    const map: Record<
      string,
      (typeof nodes)[number]
    > = {};

    nodes.forEach((node) => {
      map[node.id] = node;
    });

    return map;
  }, [nodes]);

  function renderNode(
    id: string | null,
    x: number,
    y: number,
    gap: number
  ): React.ReactNode {
    if (!id || !nodeMap[id]) {
      return null;
    }

    const node = nodeMap[id];

    const leftX = x - gap;
    const rightX = x + gap;
    const childY = y + 80;

    const active =
      highlightedNodes.includes(node.id);

    return (
      <g key={node.id}>
        {node.left &&
          nodeMap[node.left] && (
            <line
              x1={x}
              y1={y}
              x2={leftX}
              y2={childY}
              stroke="#52525b"
              strokeWidth="2"
            />
          )}

        {node.right &&
          nodeMap[node.right] && (
            <line
              x1={x}
              y1={y}
              x2={rightX}
              y2={childY}
              stroke="#52525b"
              strokeWidth="2"
            />
          )}

        {renderNode(
          node.left,
          leftX,
          childY,
          Math.max(gap / 2, 45)
        )}

        {renderNode(
          node.right,
          rightX,
          childY,
          Math.max(gap / 2, 45)
        )}

        <circle
          cx={x}
          cy={y}
          r="26"
          fill={
            active
              ? "white"
              : "#18181b"
          }
          stroke={
            active
              ? "white"
              : "#52525b"
          }
          strokeWidth="3"
        />

        <text
          x={x}
          y={y + 5}
          textAnchor="middle"
          className={
            active
              ? "fill-black text-sm font-semibold"
              : "fill-white text-sm font-semibold"
          }
        >
          {node.value}
        </text>
      </g>
    );
  }

  return (
    <div className="flex min-h-[420px] items-center justify-center overflow-auto">
      {!root ? (
        <div className="text-sm text-zinc-500">
          Empty tree.
        </div>
      ) : (
        <svg
          viewBox="0 0 600 450"
          className="h-auto w-full max-w-3xl"
        >
          {renderNode(root, 300, 55, 150)}
        </svg>
      )}
    </div>
  );
}

/* =========================================================
   LINKED LIST
   ========================================================= */

function LinkedListVisualizer({
  visualization,
}: {
  visualization: Extract<
    VisualizationState,
    { type: "linked-list" }
  >["data"];
}) {
  const {
    head,
    nodes,
    highlightedNodes,
  } = visualization;

  const nodeMap = useMemo(() => {
    const map: Record<
      string,
      (typeof nodes)[number]
    > = {};

    nodes.forEach((node) => {
      map[node.id] = node;
    });

    return map;
  }, [nodes]);

  const orderedNodes = [];

  let current = head;
  const visited = new Set<string>();

  while (
    current &&
    nodeMap[current] &&
    !visited.has(current)
  ) {
    visited.add(current);
    orderedNodes.push(nodeMap[current]);
    current = nodeMap[current].next;
  }

  return (
    <div className="flex min-h-[300px] items-center justify-center overflow-x-auto p-8">
      {orderedNodes.length === 0 ? (
        <div className="text-sm text-zinc-500">
          Empty linked list.
        </div>
      ) : (
        <div className="flex items-center gap-3">
          {orderedNodes.map((node, index) => {
            const active =
              highlightedNodes.includes(
                node.id
              );

            return (
              <div
                key={node.id}
                className="flex items-center"
              >
                <div className="flex flex-col items-center">
                  <span className="mb-2 text-[10px] text-zinc-600">
                    {index === 0
                      ? "HEAD"
                      : ""}
                  </span>

                  <div
                    className={[
                      "flex h-14 min-w-16 items-center justify-center rounded-xl border px-4 text-sm font-semibold",
                      active
                        ? "border-white bg-white text-black"
                        : "border-zinc-700 bg-zinc-900 text-zinc-200",
                    ].join(" ")}
                  >
                    {node.value}
                  </div>
                </div>

                {node.next && (
                  <div className="mx-3 text-xl text-zinc-500">
                    →
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   STACK
   ========================================================= */

function StackVisualizer({
  visualization,
}: {
  visualization: Extract<
    VisualizationState,
    { type: "stack" }
  >["data"];
}) {
  const {
    values,
    highlightedIndex,
  } = visualization;

  return (
    <div className="flex min-h-[350px] items-center justify-center">
      <div className="flex flex-col-reverse items-center gap-1 border-x-2 border-b-2 border-zinc-600 p-3">
        {values.map((value, index) => {
          const active =
            index === highlightedIndex;

          return (
            <div
              key={index}
              className={[
                "flex h-12 w-40 items-center justify-center rounded-lg border text-sm font-medium",
                active
                  ? "border-white bg-white text-black"
                  : "border-zinc-700 bg-zinc-900 text-zinc-200",
              ].join(" ")}
            >
              {value}
            </div>
          );
        })}

        <div className="mb-2 text-xs text-zinc-500">
          TOP
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   QUEUE
   ========================================================= */

function QueueVisualizer({
  visualization,
}: {
  visualization: Extract<
    VisualizationState,
    { type: "queue" }
  >["data"];
}) {
  const {
    values,
    front,
    rear,
  } = visualization;

  return (
    <div className="flex min-h-[300px] items-center justify-center overflow-x-auto p-8">
      <div className="flex items-end gap-2">
        {values.map((value, index) => {
          const isFront =
            index === front;

          const isRear =
            index === rear;

          return (
            <div
              key={index}
              className="flex min-w-16 flex-col items-center"
            >
              <div className="mb-2 h-4 text-[10px] text-zinc-500">
                {isFront && "FRONT"}
                {isRear &&
                  !isFront &&
                  "REAR"}
              </div>

              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 text-sm font-semibold">
                {value}
              </div>

              <div className="mt-2 text-[10px] text-zinc-600">
                {index}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   DP
   ========================================================= */

function DPVisualizer({
  visualization,
}: {
  visualization: Extract<
    VisualizationState,
    { type: "dp" }
  >["data"];
}) {
  const {
    rows,
    columns,
    values,
    highlightedCells,
  } = visualization;

  function isHighlighted(
    row: number,
    column: number
  ) {
    return highlightedCells.some(
      (cell) =>
        cell.row === row &&
        cell.column === column
    );
  }

  return (
    <div className="flex min-h-[350px] items-center justify-center overflow-auto p-8">
      <div>
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${columns}, minmax(56px, 1fr))`,
          }}
        >
          {Array.from({
            length: rows,
          }).map((_, row) =>
            Array.from({
              length: columns,
            }).map((_, column) => {
              const value =
                values[row]?.[column] ??
                null;

              const active =
                isHighlighted(
                  row,
                  column
                );

              return (
                <div
                  key={`${row}-${column}`}
                  className={[
                    "flex h-14 w-14 items-center justify-center rounded-lg border text-xs font-semibold",
                    active
                      ? "border-white bg-white text-black"
                      : "border-zinc-700 bg-zinc-900 text-zinc-300",
                  ].join(" ")}
                >
                  {value === null
                    ? "—"
                    : value}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

/* =========================================================
   MAIN VISUALIZER
   ========================================================= */

export default function Visualizer({
  lesson,
}: VisualizerProps) {
  const [currentStep, setCurrentStep] =
    useState(0);

  const steps = lesson?.steps ?? [];

  if (!lesson) {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex min-h-[300px] items-center justify-center text-sm text-zinc-500">
          No lesson available.
        </div>
      </section>
    );
  }

  if (steps.length === 0) {
    return (
      <section className="rounded-2xl border border-zinc-800 bg-zinc-950 p-6">
        <div className="flex min-h-[300px] items-center justify-center text-sm text-zinc-500">
          No execution steps were generated.
        </div>
      </section>
    );
  }

  const safeStep = Math.min(
    currentStep,
    steps.length - 1
  );

  const step = steps[safeStep];

  return (
    <section className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950">
      {/* Header */}
      <div className="border-b border-zinc-800 px-5 py-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-zinc-600">
              Visualization
            </p>

            <h3 className="mt-1 text-base font-semibold text-zinc-200">
              {step.title}
            </h3>
          </div>

          <div className="text-xs text-zinc-500">
            Step {safeStep + 1} of{" "}
            {steps.length}
          </div>
        </div>
      </div>

      {/* Step explanation */}
      <div className="border-b border-zinc-800 bg-zinc-900/30 px-5 py-4">
        <p className="text-sm leading-6 text-zinc-400">
          {step.explanation}
        </p>

        {step.codeLine !== null && (
          <div className="mt-3 inline-flex rounded-md border border-zinc-800 bg-zinc-900 px-2.5 py-1 text-xs text-zinc-500">
            Code line: {step.codeLine}
          </div>
        )}
      </div>

      {/* Visualization */}
      <div className="min-h-[350px]">
        <VisualizationRenderer
          visualization={
            step.visualization
          }
        />
      </div>

      {/* Step navigation */}
      <div className="flex items-center justify-between border-t border-zinc-800 px-5 py-4">
        <button
          type="button"
          disabled={safeStep === 0}
          onClick={() =>
            setCurrentStep(
              (value) =>
                Math.max(value - 1, 0)
            )
          }
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Previous
        </button>

        <div className="flex items-center gap-1.5">
          {steps.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to step ${
                index + 1
              }`}
              onClick={() =>
                setCurrentStep(index)
              }
              className={[
                "h-2 rounded-full transition-all",
                index === safeStep
                  ? "w-6 bg-zinc-200"
                  : "w-2 bg-zinc-700 hover:bg-zinc-500",
              ].join(" ")}
            />
          ))}
        </div>

        <button
          type="button"
          disabled={
            safeStep === steps.length - 1
          }
          onClick={() =>
            setCurrentStep(
              (value) =>
                Math.min(
                  value + 1,
                  steps.length - 1
                )
            )
          }
          className="rounded-lg border border-zinc-700 px-4 py-2 text-sm text-zinc-300 transition hover:border-zinc-500 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next →
        </button>
      </div>
    </section>
  );
}