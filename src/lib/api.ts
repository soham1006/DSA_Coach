import type {
  Language,
  Lesson,
} from "../types/lesson";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:4000";
  
export async function generateLesson(
  query: string,
  language: Language
): Promise<Lesson> {
  const response = await fetch(
    `${API_URL}/api/lesson`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        language,
      }),
    }
  );

  let data: unknown;

  try {
    data = await response.json();
  } catch {
    throw new Error(
      "The server returned an invalid response."
    );
  }

  if (!response.ok) {
    if (
      typeof data === "object" &&
      data !== null &&
      "error" in data &&
      typeof data.error === "string"
    ) {
      throw new Error(data.error);
    }

    throw new Error(
      `Request failed with status ${response.status}.`
    );
  }

  if (
    typeof data !== "object" ||
    data === null ||
    !("lesson" in data)
  ) {
    throw new Error(
      "The server returned an invalid lesson."
    );
  }

  return data.lesson as Lesson;
}