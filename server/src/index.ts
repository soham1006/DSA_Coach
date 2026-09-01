import "dotenv/config";

import cors from "cors";
import express from "express";

import {
  askGemini,
  isDSAQuestion,
} from "./gemini.js";

const app = express();

app.use(cors());
app.use(express.json());


// ----------------------------------------
// Health Check
// ----------------------------------------

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message:
      "AI DSA Visual Coach API is running",
  });
});


// ----------------------------------------
// Gemini Test
// ----------------------------------------

app.get(
  "/api/test-gemini",
  async (_req, res) => {
    try {
      const lesson = await askGemini(
        "Explain binary search with a simple example. Generate the solution in C++."
      );

      res.json({
        success: true,
        answer: lesson,
      });
    } catch (error) {
      console.error(
        "GEMINI TEST ERROR:",
        error
      );

      res.status(500).json({
        success: false,
        error:
          "The AI service is temporarily unavailable. Please try again in a moment.",
      });
    }
  }
);


// ----------------------------------------
// Generate Lesson
// ----------------------------------------

app.post(
  "/api/lesson",
  async (req, res) => {
    try {
      const {
        query,
        language,
      } = req.body;


      // Validate query
if (
  typeof query !== "string" ||
  query.trim().length === 0
) {
  return res.status(400).json({
    success: false,
    error:
      "Please enter a DSA question.",
  });
}

const cleanQuery = query.trim();

if (cleanQuery.length > 5000) {
  return res.status(400).json({
    success: false,
    error:
      "Your question is too long. Please keep it under 5000 characters.",
  });
}


      // Validate language
      if (
        typeof language !== "string" ||
        language.trim().length === 0
      ) {
        return res.status(400).json({
          success: false,
          error:
            "Please select a programming language.",
        });
      }


      // Check whether the question is DSA-related
      const dsaQuestion =
  await isDSAQuestion(
    cleanQuery
  );

      if (!dsaQuestion) {
        return res.status(400).json({
          success: false,
          error:
            "Please ask a DSA-related question.",
        });
      }


      // Generate lesson
      const prompt = `
Explain the following DSA problem in a clear,
beginner-friendly way.

Problem:
${cleanQuery}

Generate the solution code in:
${language}

Important requirements:

1. Explain the problem clearly.
2. Give a simple example.
3. Explain multiple approaches when applicable.
4. Clearly identify the recommended approach.
5. Include time and space complexity.
6. Generate step-by-step execution states.
7. Generate visualization data for every step.
8. Make the explanation educational rather than
   just giving a short definition.
9. Generate valid ${language} code.
10. Keep the visualization synchronized with
    the algorithm steps.
`;


      const lesson =
        await askGemini(prompt);


      res.json({
        success: true,
        lesson,
      });

    } catch (error) {

      // Keep technical details in the server terminal
      console.error(
        "LESSON GENERATION ERROR:",
        error
      );


      // Friendly message for the user
      res.status(500).json({
        success: false,
        error:
          "We couldn't generate the lesson right now. Please try again in a moment.",
      });
    }
  }
);


// ----------------------------------------
// Start Server
// ----------------------------------------

const PORT = 4000;

app.listen(PORT, () => {
  console.log(
    `Server running at http://localhost:${PORT}`
  );
});