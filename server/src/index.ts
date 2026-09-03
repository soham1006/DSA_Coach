import "dotenv/config";

import cors from "cors";
import express from "express";

import { askGemini } from "./gemini.js";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT) || 4000;

/*
 * ----------------------------------------
 * Health Check
 * ----------------------------------------
 */

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "AI DSA Visual Coach API is running",
  });
});

/*
 * ----------------------------------------
 * Gemini Test
 * ----------------------------------------
 */

app.get("/api/test-gemini", async (_req, res) => {
  try {
    const lesson = await askGemini(
      "Explain binary search using the array [2, 5, 8, 12, 16, 23, 38]. Show the search process step by step.",
      "cpp"
    );

    res.json({
      success: true,
      lesson,
    });
  } catch (error) {
    console.error("GEMINI TEST ERROR:", error);

    res.status(500).json({
      success: false,
      error:
        "The AI service is temporarily unavailable.",
    });
  }
});

/*
 * ----------------------------------------
 * Generate Lesson
 * ----------------------------------------
 */

app.post("/api/lesson", async (req, res) => {
  try {
    const { query, language } = req.body;

    /*
     * Validate query
     */

    if (
      typeof query !== "string" ||
      query.trim().length === 0
    ) {
      return res.status(400).json({
        success: false,
        error: "Please enter a DSA question.",
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

    /*
     * Validate language
     */

    const supportedLanguages = [
      "cpp",
      "java",
      "python",
      "javascript",
    ];

    if (
      typeof language !== "string" ||
      !supportedLanguages.includes(language)
    ) {
      return res.status(400).json({
        success: false,
        error:
          "Please select a supported programming language.",
      });
    }

    /*
     * Generate complete lesson in ONE Gemini call
     */

    const lesson = await askGemini(
      cleanQuery,
      language as
        | "cpp"
        | "java"
        | "python"
        | "javascript"
    );

    /*
     * Send lesson to frontend
     */

    return res.json({
      success: true,
      lesson,
    });
  } catch (error) {
    console.error(
      "LESSON GENERATION ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      error:
        "We couldn't generate the lesson right now. Please try again in a moment.",
    });
  }
});

/*
 * ----------------------------------------
 * Start Server
 * ----------------------------------------
 */

app.listen(PORT, "0.0.0.0", () => {
  console.log(
    `Server running on port ${PORT}`
  );
});