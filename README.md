# DSA_Coach

DSA_Coach is an AI-powered interactive learning tool that helps students understand Data Structures and Algorithms through simple explanations, multiple approaches, code, and step-by-step visualizations.

## Features

- Beginner-friendly explanations of DSA problems
- Multiple approaches with time and space complexity
- Code generation in the selected programming language
- Step-by-step algorithm execution
- Visualizations for Arrays, Graphs, Trees, Linked Lists, Stacks, Queues, and Dynamic Programming
- Accepts only DSA-related questions
- Structured and validated AI-generated lessons

## Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- Node.js
- Express
- Google Gemini API
- Zod

## How It Works

```text
User enters a DSA question
          ↓
React Frontend
          ↓
Express Backend
          ↓
DSA Question Validation
          ↓
Google Gemini
          ↓
Structured Lesson
          ↓
Explanation + Code + Steps + Visualization
```

The backend validates the AI-generated lesson before sending it to the React frontend. This helps keep the generated data consistent with the UI and visualization components.

## Project Structure

```text
DSA_Coach/
├── src/
│   ├── components/
│   ├── types/
│   ├── App.tsx
│   └── ...
│
├── server/
│   └── src/
│       ├── gemini.ts
│       ├── validation.ts
│       ├── normalize.ts
│       └── index.ts
│
├── public/
├── package.json
└── README.md
```

## Run Locally

### Frontend

```bash
npm install
npm run dev
```

### Backend

```bash
cd server
npm install
npm run dev
```

Create a `.env` file inside the `server` folder:

```env
GEMINI_API_KEY=your_gemini_api_key
```

## Production Build

### Frontend

```bash
npm run build
```

### Backend

```bash
cd server
npm run build
```

## Project Goal

The goal of DSA_Coach is to make learning algorithms more visual and interactive by connecting the problem explanation, source code, execution steps, and algorithm state in one learning experience.

## Demo

[Watch the Demo Video](https://drive.google.com/file/d/1CN6n3KGOENfdzCkZigRUe-JJL4cJfTY1/view?usp=sharing)

## Author

**Soham Mewada**
