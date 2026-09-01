import { GoogleGenAI } from "@google/genai";
import { z } from "zod";

import { LessonSchema } from "./validation.js";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error(
    "GEMINI_API_KEY is missing from the environment."
  );
}

const ai = new GoogleGenAI({
  apiKey,
});

const lessonJsonSchema =
  z.toJSONSchema(LessonSchema);


// ----------------------------------------
// Gemini request with retry
// ----------------------------------------

async function generateContentWithRetry(
  model: string,
  contents: string,
  config?: Parameters<
    typeof ai.models.generateContent
  >[0]["config"]
) {
  const maxAttempts = 2;

  for (
    let attempt = 1;
    attempt <= maxAttempts;
    attempt++
  ) {
    try {
      return await ai.models.generateContent({
        model,
        contents,
        config,
      });
    } catch (error) {
      console.error(
        `Gemini request failed (attempt ${attempt}/${maxAttempts}):`,
        error
      );

      if (attempt === maxAttempts) {
        throw error;
      }

      // Wait 1 second before retrying
      await new Promise((resolve) =>
        setTimeout(resolve, 1000)
      );
    }
  }

  throw new Error(
    "Gemini request failed."
  );
}


// ----------------------------------------
// Check whether the question is DSA-related
// ----------------------------------------

export async function isDSAQuestion(
  prompt: string
): Promise<boolean> {
  const response =
    await generateContentWithRetry(
      "gemini-3.6-flash",

      `
Determine whether the following user request is
related to Data Structures and Algorithms (DSA).

Return ONLY one word:

YES

or

NO

Consider the request DSA-related if it involves
algorithms, data structures, solving coding problems,
algorithmic techniques, or programming concepts
directly related to DSA.

Examples of DSA topics include:

- Arrays
- Strings
- Linked Lists
- Stacks
- Queues
- Trees
- Graphs
- Heaps
- Hashing
- Sorting
- Searching
- Binary Search
- Recursion
- Backtracking
- Greedy Algorithms
- Dynamic Programming
- Divide and Conquer
- Shortest Path
- Minimum Spanning Tree
- Traversal algorithms
- Time Complexity
- Space Complexity

User request:

${prompt}
`
    );

  const text =
    response.text?.trim().toUpperCase();

  return text === "YES";
}


// ----------------------------------------
// Generate DSA Lesson
// ----------------------------------------

export async function askGemini(
  prompt: string
) {
  const response =
    await generateContentWithRetry(
      "gemini-3.5-flash",

      `
You are an expert DSA teacher and algorithm visualization designer.

Create a complete, beginner-friendly lesson for the user's request.

The lesson will be displayed in an interactive DSA learning application.

IMPORTANT RULES:

1. EXPLANATION

Do NOT give only a short definition.

Explain:
- What the algorithm/data structure is
- The intuition behind it
- How it works
- Why it works
- When it is useful

Use simple language suitable for a beginner.

2. EXAMPLE

Provide at least one concrete example.

The example must actually demonstrate the algorithm.

Explain what happens in the example.

3. APPROACHES

Include meaningful approaches when they exist.

For example:

Brute Force
Optimized Approach

Explain the idea and complexity of each.

Mark the best practical approach as recommended.

4. CODE

Generate properly formatted, readable code.

NEVER put the entire program on one line.

Use normal indentation and line breaks.

The code MUST be written in the programming language requested by the user.

5. CODE LINES

Every important execution step must reference the relevant line of the generated code.

Use actual 1-based source-code line numbers.

6. STEP-BY-STEP EXPLANATION

Generate clear execution steps.

Each step should describe an actual operation.

Avoid vague steps such as:

"The algorithm continues."

Instead explain exactly what changes.

7. VISUALIZATION

Every lesson must contain a visualization.

Choose the visualization type that naturally represents the algorithm.

Allowed types:

- array
- graph
- tree
- linked-list
- stack
- queue
- dp
- none

Use "none" only when visualization genuinely does not make sense.

8. ARRAY

For array algorithms provide:

values

highlightedIndices

pointers:
- low
- mid
- high
- left
- right

Use null when a pointer is not relevant.

Example:

{
  "type": "array",
  "data": {
    "values": [-1, 0, 3, 5, 9, 12],
    "highlightedIndices": [2],
    "pointers": {
      "low": 0,
      "mid": 2,
      "high": 5,
      "left": null,
      "right": null
    }
  }
}

9. GRAPH

For graph algorithms provide:

nodes

edges

highlightedNodes

highlightedEdges

Include weights when the algorithm uses weighted edges.

For BFS/DFS show the nodes being processed.

For Dijkstra show relevant weighted edges and processed nodes.

10. TREE

For tree algorithms provide:

root

nodes

Each node must contain:

id
value
left
right

Also provide highlightedNodes.

11. LINKED LIST

Each node must contain:

id
value
next

Also provide:

head
highlightedNodes

12. STACK

Provide:

values
highlightedIndex

13. QUEUE

Provide:

values
front
rear

14. DYNAMIC PROGRAMMING

Provide:

rows
columns
values
highlightedCells

Use null for cells that have not yet been calculated.

15. STEP VISUALIZATION

Every step MUST have its own visualization state.

The state must represent what is happening during that specific step.

When the algorithm changes state, the visualization must also change.

16. CONSISTENCY

The following must describe the SAME execution:

- problem example
- generated code
- steps
- visualization

Do not create contradictory information.

17. QUIZ

Do NOT generate a quiz.

18. OUTPUT

Return ONLY valid JSON matching the provided schema.

Do NOT return markdown.

Do NOT return \`\`\`json.

Do NOT add explanations outside the JSON.

USER REQUEST:

${prompt}
`,

      {
        responseMimeType: "application/json",
        responseJsonSchema:
          lessonJsonSchema,
      }
    );

  const text = response.text;

  if (!text) {
    throw new Error(
      "Gemini returned an empty response."
    );
  }


  // ----------------------------------------
  // Parse AI response safely
  // ----------------------------------------

  let parsedResponse: unknown;

  try {
    parsedResponse = JSON.parse(text);
  } catch {
    throw new Error(
      "The AI returned an invalid lesson format."
    );
  }


  // ----------------------------------------
  // Validate lesson against schema
  // ----------------------------------------

  const result =
    LessonSchema.safeParse(
      parsedResponse
    );

  if (!result.success) {
    console.error(
      "LESSON SCHEMA VALIDATION ERROR:",
      result.error
    );

    throw new Error(
      "The AI returned an incomplete lesson."
    );
  }


  return result.data;
}