import { GoogleGenAI } from "@google/genai";
import { z } from "zod";
import { LessonSchema } from "./validation.js";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing from the environment.");
}

const ai = new GoogleGenAI({
  apiKey,
});

const lessonJsonSchema = z.toJSONSchema(LessonSchema);

async function generateContent(
  model: string,
  contents: string,
  config?: Parameters<
    typeof ai.models.generateContent
  >[0]["config"]
) {
  return await ai.models.generateContent({
    model,
    contents,
    config,
  });
}

export async function askGemini(
  prompt: string,
  language: "cpp" | "java" | "python" | "javascript"
) {
  const response = await generateContent(
    "gemini-3.6-flash",

    `
You are DSA_Coach, an expert Data Structures and Algorithms teacher
and algorithm visualization engine.

Your job is to create an interactive lesson for the user's DSA question.

The output is consumed directly by a React application.

USER QUESTION:
${prompt}

PROGRAMMING LANGUAGE:
${language}

IMPORTANT:

Return ONLY valid JSON matching the supplied JSON schema.

Do NOT return markdown.
Do NOT use \`\`\`json.
Do NOT add text outside JSON.

==================================================
1. DSA ONLY
==================================================

The question must be about Data Structures and Algorithms.

If the question is not DSA-related, still return a valid lesson explaining
that DSA_Coach only supports DSA questions.

==================================================
2. LESSON
==================================================

Create:

- clear title
- problem statement
- constraints
- examples
- meaningful approaches
- recommended approach
- time complexity
- space complexity
- readable source code

Use beginner-friendly explanations.

==================================================
3. CODE
==================================================

Generate properly formatted ${language} code.

The code must contain normal line breaks and indentation.

IMPORTANT:

The "codeLine" field in every step must correspond to an actual
1-based line number in this generated source code.

Do not invent line numbers.

==================================================
4. STEP-BY-STEP EXECUTION
==================================================

This is extremely important.

Generate REAL execution steps.

Do NOT create only 3 or 4 generic steps.

For simple algorithms generate approximately 6-12 meaningful steps.

For traversal algorithms generate a step for each important traversal action.

For example, for BFS:

Step 1:
Initialize queue.

Step 2:
Start from source node.

Step 3:
Visit source.

Step 4:
Push an unvisited neighbor.

Step 5:
Visit the next node.

Step 6:
Continue processing its neighbors.

Step 7:
Finish traversal.

Each step must describe an actual state change.

The user must be able to press:

Previous ← Step → Next

and see the algorithm progress.

==================================================
5. VISUALIZATION
==================================================

EVERY STEP MUST HAVE ITS OWN visualization state.

Do NOT simply repeat the same visualization for every step.

The visualization should represent the state AT THAT MOMENT.

The top-level "visualization" should represent the final state.

==================================================
6. ARRAY
==================================================

For array algorithms provide:

values
highlightedIndices
pointers

Use:

low
mid
high
left
right

Use null when a pointer is not active.

For binary search, for example:

Step 1:
low=0, mid=2, high=5

Step 2:
low=3, mid=4, high=5

Step 3:
highlight the examined element.

The array state must actually change between steps.

==================================================
7. GRAPH
==================================================

For graph algorithms provide:

nodes
edges
highlightedNodes
highlightedEdges

For BFS/DFS:

- highlight the currently processed node
- highlight traversal edges
- show visited nodes progressively

For Dijkstra:

- show weighted edges
- highlight the current node
- highlight the edge being relaxed
- progressively show processed nodes

Do NOT show only:

"4 nodes, 5 edges"

The actual nodes, edges and highlights must be present.

==================================================
8. TREE
==================================================

Provide:

root
nodes

Every node:

id
value
left
right

For traversal:

highlight the current node.

Progressively change highlightedNodes.

==================================================
9. LINKED LIST
==================================================

Provide:

head
nodes

Every node:

id
value
next

During traversal highlight the current node.

==================================================
10. STACK
==================================================

Provide:

values
highlightedIndex

Show push/pop/top operations progressively.

==================================================
11. QUEUE
==================================================

Provide:

values
front
rear

Show enqueue/dequeue operations progressively.

==================================================
12. DYNAMIC PROGRAMMING
==================================================

Provide:

rows
columns
values
highlightedCells

Uncalculated cells should be null.

Every DP step should reveal or modify the relevant cell.

==================================================
13. VISUALIZATION TYPES
==================================================

Use the most appropriate type:

array
graph
tree
linked-list
stack
queue
dp
none

Prefer a visualization whenever possible.

Do NOT use "none" for common DSA algorithms.

==================================================
14. CONSISTENCY
==================================================

The following MUST describe the same execution:

problem example
source code
steps
visualizations

If a step says node A was visited, the visualization must show A.

If a step says low moved from 0 to 3, the visualization must show low=3.

If a step says an array element is being compared, highlight that index.

==================================================
15. NO QUIZ
==================================================

Do not generate quizzes.

==================================================
16. QUALITY
==================================================

The result should feel like an interactive DSA teaching application,
not a generic AI answer.

Prioritize useful execution states over long explanations.

Generate enough steps to demonstrate the algorithm visually.

Return ONLY JSON.
`,

    {
      responseMimeType: "application/json",
      responseJsonSchema: lessonJsonSchema,
    }
  );

  const text = response.text;

  if (!text) {
    throw new Error("Gemini returned an empty response.");
  }

  let parsed: unknown;

  try {
    parsed = JSON.parse(text);
  } catch {
    throw new Error("The AI returned invalid JSON.");
  }

  const result = LessonSchema.safeParse(parsed);

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