import { z } from "zod";

const LanguageSchema = z.enum([
  "cpp",
  "java",
  "python",
  "javascript",
]);

const ExampleSchema = z.object({
  input: z.string(),
  output: z.string(),
  explanation: z.string(),
});

const ApproachSchema = z.object({
  name: z.string(),
  idea: z.string(),
  time: z.string(),
  space: z.string(),
  recommended: z.boolean(),
});

/*
 * -----------------------------
 * Visualization schemas
 * -----------------------------
 */

const ArrayVisualizationSchema = z.object({
  values: z.array(z.union([z.string(), z.number()])),

  highlightedIndices: z.array(z.number()).default([]),

  pointers: z
  .object({
    low: z.number().nullable().default(null),
    mid: z.number().nullable().default(null),
    high: z.number().nullable().default(null),
    left: z.number().nullable().default(null),
    right: z.number().nullable().default(null),
  })
  .default({
    low: null,
    mid: null,
    high: null,
    left: null,
    right: null,
  }),
});

const GraphEdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
  weight: z.number().optional(),
});

const GraphVisualizationSchema = z.object({
  nodes: z.array(z.string()),

  edges: z.array(GraphEdgeSchema),

  highlightedNodes: z.array(z.string()).default([]),

  highlightedEdges: z
    .array(
      z.object({
        from: z.string(),
        to: z.string(),
      })
    )
    .default([]),
});

const TreeNodeSchema = z.object({
  id: z.string(),
  value: z.union([z.string(), z.number()]),
  left: z.string().nullable().default(null),
  right: z.string().nullable().default(null),
});

const TreeVisualizationSchema = z.object({
  root: z.string().nullable(),

  nodes: z.array(TreeNodeSchema),

  highlightedNodes: z.array(z.string()).default([]),
});

const LinkedListNodeSchema = z.object({
  id: z.string(),
  value: z.union([z.string(), z.number()]),
  next: z.string().nullable().default(null),
});

const LinkedListVisualizationSchema = z.object({
  head: z.string().nullable(),

  nodes: z.array(LinkedListNodeSchema),

  highlightedNodes: z.array(z.string()).default([]),
});

const StackVisualizationSchema = z.object({
  values: z.array(z.union([z.string(), z.number()])),

  highlightedIndex: z.number().nullable().default(null),
});

const QueueVisualizationSchema = z.object({
  values: z.array(z.union([z.string(), z.number()])),

  front: z.number().nullable().default(null),

  rear: z.number().nullable().default(null),
});

const DPVisualizationSchema = z.object({
  rows: z.number().int().nonnegative(),

  columns: z.number().int().nonnegative(),

  values: z.array(
    z.array(z.union([z.string(), z.number(), z.null()]))
  ),

  highlightedCells: z.array(
    z.object({
      row: z.number(),
      column: z.number(),
    })
  ).default([]),
});

/*
 * -----------------------------
 * Generic visualization
 * -----------------------------
 */

const VisualizationSchema = z.discriminatedUnion(
  "type",
  [
    z.object({
      type: z.literal("array"),
      data: ArrayVisualizationSchema,
    }),

    z.object({
      type: z.literal("graph"),
      data: GraphVisualizationSchema,
    }),

    z.object({
      type: z.literal("tree"),
      data: TreeVisualizationSchema,
    }),

    z.object({
      type: z.literal("linked-list"),
      data: LinkedListVisualizationSchema,
    }),

    z.object({
      type: z.literal("stack"),
      data: StackVisualizationSchema,
    }),

    z.object({
      type: z.literal("queue"),
      data: QueueVisualizationSchema,
    }),

    z.object({
      type: z.literal("dp"),
      data: DPVisualizationSchema,
    }),

    z.object({
      type: z.literal("none"),
      data: z.null(),
    }),
  ]
);

/*
 * -----------------------------
 * Step
 * -----------------------------
 */

const StepSchema = z.object({
  title: z.string(),

  explanation: z.string(),

  codeLine: z.number().nullable(),

  visualization: VisualizationSchema,
});

/*
 * -----------------------------
 * Lesson
 * -----------------------------
 */

export const LessonSchema = z.object({
  title: z.string(),

  problem: z.object({
    statement: z.string(),

    constraints: z.array(z.string()),

    examples: z.array(ExampleSchema),
  }),

  approaches: z.array(ApproachSchema),

  language: LanguageSchema,

  code: z.object({
    source: z.string(),
  }),

  steps: z.array(StepSchema),

  visualization: VisualizationSchema,
});

export type Lesson = z.infer<typeof LessonSchema>;