import type { Lesson } from "./validation.js";

export function normalizeLesson(
  lesson: Lesson
): Lesson {
  const { visualization } = lesson;

  if (
    visualization.type === "graph" &&
    !visualization.data
  ) {
    throw new Error(
      "Graph visualization data is missing."
    );
  }

  if (
    visualization.type === "tree" &&
    !visualization.data
  ) {
    throw new Error(
      "Tree visualization data is missing."
    );
  }

  if (
    visualization.type === "array" &&
    !visualization.data
  ) {
    throw new Error(
      "Array visualization data is missing."
    );
  }

  return lesson;
}