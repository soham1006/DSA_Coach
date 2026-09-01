export type Language =
  | "cpp"
  | "java"
  | "python"
  | "javascript";

/*
 * -----------------------------
 * Problem
 * -----------------------------
 */

export interface Example {
  input: string;
  output: string;
  explanation: string;
}

export interface Approach {
  name: string;
  idea: string;
  time: string;
  space: string;
  recommended: boolean;
}

/*
 * -----------------------------
 * Array
 * -----------------------------
 */

export interface ArrayVisualization {
  values: (string | number)[];

  highlightedIndices: number[];

  pointers: {
    low: number | null;
    mid: number | null;
    high: number | null;
    left: number | null;
    right: number | null;
  };
}

/*
 * -----------------------------
 * Graph
 * -----------------------------
 */

export interface GraphEdge {
  from: string;
  to: string;
  weight?: number;
}

export interface GraphVisualization {
  nodes: string[];

  edges: GraphEdge[];

  highlightedNodes: string[];

  highlightedEdges: {
    from: string;
    to: string;
  }[];
}

/*
 * -----------------------------
 * Tree
 * -----------------------------
 */

export interface TreeNode {
  id: string;

  value: string | number;

  left: string | null;

  right: string | null;
}

export interface TreeVisualization {
  root: string | null;

  nodes: TreeNode[];

  highlightedNodes: string[];
}

/*
 * -----------------------------
 * Linked List
 * -----------------------------
 */

export interface LinkedListNode {
  id: string;

  value: string | number;

  next: string | null;
}

export interface LinkedListVisualization {
  head: string | null;

  nodes: LinkedListNode[];

  highlightedNodes: string[];
}

/*
 * -----------------------------
 * Stack
 * -----------------------------
 */

export interface StackVisualization {
  values: (string | number)[];

  highlightedIndex: number | null;
}

/*
 * -----------------------------
 * Queue
 * -----------------------------
 */

export interface QueueVisualization {
  values: (string | number)[];

  front: number | null;

  rear: number | null;
}

/*
 * -----------------------------
 * Dynamic Programming
 * -----------------------------
 */

export interface DPVisualization {
  rows: number;

  columns: number;

  values: (string | number | null)[][];

  highlightedCells: {
    row: number;
    column: number;
  }[];
}

/*
 * -----------------------------
 * Generic Visualization
 * -----------------------------
 */

export type VisualizationState =
  | {
      type: "array";
      data: ArrayVisualization;
    }
  | {
      type: "graph";
      data: GraphVisualization;
    }
  | {
      type: "tree";
      data: TreeVisualization;
    }
  | {
      type: "linked-list";
      data: LinkedListVisualization;
    }
  | {
      type: "stack";
      data: StackVisualization;
    }
  | {
      type: "queue";
      data: QueueVisualization;
    }
  | {
      type: "dp";
      data: DPVisualization;
    }
  | {
      type: "none";
      data: null;
    };

/*
 * -----------------------------
 * Lesson Step
 * -----------------------------
 */

export interface LessonStep {
  title: string;

  explanation: string;

  codeLine: number | null;

  visualization: VisualizationState;
}

/*
 * -----------------------------
 * Lesson
 * -----------------------------
 */

export interface Lesson {
  title: string;

  problem: {
    statement: string;

    constraints: string[];

    examples: Example[];
  };

  approaches: Approach[];

  language: Language;

  code: {
    source: string;
  };

  steps: LessonStep[];

  visualization: VisualizationState;
}