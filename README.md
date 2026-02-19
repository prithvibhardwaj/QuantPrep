# QuantPrep

> An AI-powered quantitative finance interview preparation platform with adaptive practice sessions, real-time answer evaluation, and voice-guided explanations.

[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=white)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?logo=openai&logoColor=white)](https://openai.com)
[![ElevenLabs](https://img.shields.io/badge/ElevenLabs-TTS-black)](https://elevenlabs.io)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Question Database](#question-database)
  - [Database Schema](#database-schema)
  - [Adding Your Own Questions](#adding-your-own-questions)
- [AI Integrations](#ai-integrations)
  - [Answer Evaluation (OpenAI)](#answer-evaluation-openai)
  - [Voice Assistant (ElevenLabs)](#voice-assistant-elevenlabs)
- [App Pages](#app-pages)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

QuantPrep is a Next.js application for aspiring quantitative finance professionals. It ships with a curated library of 150+ interview questions spanning derivatives, stochastic processes, statistics, programming, and logic — drawn from real quant interview question banks.

Answers are evaluated by GPT-4o, which understands conceptual equivalence across different phrasings and mathematical notations. A built-in ElevenLabs voice assistant reads out explanations after each question, making it easy to study on the move.

---

## Features

| Feature | Description |
|---|---|
| **Adaptive Practice** | 10-question sessions filtered by difficulty: Easy, Medium, Hard, or Mixed |
| **AI Answer Evaluation** | GPT-4o grades free-text answers by concept, not by exact wording |
| **Voice Explanations** | ElevenLabs TTS reads explanations aloud after each answer |
| **Progress Analytics** | Track accuracy, study time, streaks, and per-category mastery |
| **Topic Browser** | Browse all 8 question categories with individual mastery bars |
| **Streak Tracking** | Daily practice streaks with current and longest streak history |
| **Session Scoring** | Live score counter and session timer during practice |

**Question categories covered:**

Purely Quantitative & Logic, Derivatives, Statistics, Other Financial Economics, Calculus & Linear Algebra, Stochastic Processes, Programming & Algorithms, Non-Quantitative (behavioural/market awareness).

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (Pages Router) |
| UI | React 18, Tailwind CSS 3, Lucide React |
| AI Evaluation | OpenAI GPT-4o (`/v1/chat/completions`) |
| Text-to-Speech | ElevenLabs (`/v1/text-to-speech`) |
| Question Data | Embedded JSON (`QUESTIONS_DB` in component) |
| Styling | Tailwind CSS utility classes, custom dark theme |

---

## Getting Started

### Prerequisites

| Tool | Minimum Version |
|---|---|
| Node.js | 18.17.0 |
| npm | 9.0.0 |

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/your-username/quantprep.git
cd quantprep
```

**2. Install dependencies**

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root:

```env
# Required for AI answer evaluation
NEXT_PUBLIC_OPENAI_API_KEY=sk-...

# Required for voice explanations
NEXT_PUBLIC_ELEVENLABS_API_KEY=...
```

> **Note:** Both keys are prefixed with `NEXT_PUBLIC_` because they are used in client-side components. For production, consider proxying these API calls through a Next.js API route to avoid exposing keys in the browser.

### Running the App

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

```bash
# Production build
npm run build
npm start
```

---

## Project Structure

```
quantprep/
├── components/
│   └── QuantPrepApp.js         # Main app component — all pages and state
├── pages/
│   ├── _app.js                 # Global layout and styles
│   └── index.js                # Entry point, renders QuantPrepApp
├── styles/
│   └── globals.css             # Tailwind base + custom dark theme
├── convert_questions.py        # Converts raw JSON database to app format
├── format_for_react.js         # Formats converted JSON as a JS module
├── next.config.js              # Next.js configuration
├── tailwind.config.js          # Tailwind content paths
└── postcss.config.js           # PostCSS plugins
```

---

## Question Database

The full question bank is embedded as `QUESTIONS_DB` at the top of `components/QuantPrepApp.js`. This avoids any external data fetching and makes the app work entirely client-side.

### Database Schema

Each question object follows this structure:

```json
{
  "id": "Q2.5",
  "chapter": 2,
  "category": "Derivatives",
  "difficulty": "Easy",
  "question": "...",
  "tags": ["delta", "greeks", "ATM-options"],
  "type": "multiple_choice",
  "correct_answer": "Greater than 0.5",
  "explanation": "Positive interest rate makes forward price exceed spot...",
  "estimated_time": 120,
  "options": ["Option A", "Option B", "Option C", "Option D"]
}
```

| Field | Type | Description |
|---|---|---|
| `id` | string | Unique identifier in format `Q{chapter}.{number}` |
| `chapter` | number | Book chapter the question is drawn from |
| `category` | string | Topic category (8 possible values) |
| `difficulty` | string | `Easy`, `Medium`, or `Hard` |
| `type` | string | `multiple_choice`, `free_response`, or `numerical` |
| `correct_answer` | string | Expected answer (used for AI evaluation prompt) |
| `explanation` | string | Full explanation shown after submission |
| `estimated_time` | number | Suggested time in seconds |
| `options` | array | Present only for `multiple_choice` questions |

### Adding Your Own Questions

The repo includes two helper scripts for loading an external question database:

**Step 1 — Convert your source JSON**

Place your source file at `combined_quant_finance_db.json` and run:

```bash
python3 convert_questions.py
```

This outputs `converted_questions_db.json` with answer types inferred and multiple-choice options generated automatically.

**Step 2 — Format as a React module**

```bash
node format_for_react.js
```

This writes a `questionsDatabase.js` file. Open `components/QuantPrepApp.js`, find the `QUESTIONS_DB` constant near the top, and replace it with the content from `questionsDatabase.js`.

> Both output files are listed in `.gitignore` — they are generated artifacts and should not be committed.

---

## AI Integrations

### Answer Evaluation (OpenAI)

Free-response and numerical questions are graded by GPT-4o via `evaluateAnswer()` in `QuantPrepApp.js`.

The evaluator is deliberately generous: it accepts different phrasings, mathematical equivalents, and shortened explanations. It scores answers on conceptual understanding, not word-for-word matching.

**Response shape:**

```json
{
  "isCorrect": true,
  "confidence": 0.92,
  "feedback": "You correctly identified the core concept...",
  "keyPointsCovered": ["risk-neutral probability", "put-call parity"],
  "missingPoints": ["mention of continuous discounting"]
}
```

To disable AI evaluation (e.g. to avoid API costs in development), remove the `evaluateAnswer` call in `submitAnswer()` and replace it with a simple string comparison.

### Voice Assistant (ElevenLabs)

After each answer is revealed, users can click **Explain** to hear a spoken version of the explanation via `generateVoiceExplanation()`. The default voice is Rachel (`21m00Tcm4TlvDq8ikWAM`). To swap voices, replace the voice ID in the ElevenLabs API URL inside the function.

If `NEXT_PUBLIC_ELEVENLABS_API_KEY` is absent or invalid, the button shows an error alert and degrades gracefully — the text explanation remains fully visible.

---

## App Pages

| Page | Route | Description |
|---|---|---|
| Dashboard | `/` (default view) | Stats overview, quick-start by difficulty, streak display |
| Practice | `practice` | Full question-and-answer session with AI grading |
| Topics | `topics` | Category browser with mastery progress bars |
| Analytics | `analytics` | Accuracy, completion rate, and per-category breakdown |

Navigation is handled client-side via the `currentPage` state — there are no additional Next.js pages beyond `index.js`.

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

Add your environment variables in the Vercel project dashboard under **Settings → Environment Variables**.

### Other platforms

The app is a standard Next.js project and deploys to any platform that supports Node.js 18+:

```bash
npm run build
npm start
```

> **Security note:** `NEXT_PUBLIC_` environment variables are bundled into the client-side JavaScript and visible in the browser. For a production deployment with real users, proxy the OpenAI and ElevenLabs calls through Next.js API routes (`/pages/api/`) to keep your keys server-side.

---

## Contributing

1. Fork the repository and create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
2. Make your changes and test locally.
3. Open a pull request with a clear description.

**Ideas for contributions:**

- Proxy API calls through Next.js API routes to secure credentials
- Persistent user progress with a database (e.g. Supabase, PlanetScale)
- User authentication so progress syncs across devices
- Expand the question bank with new categories (e.g. Machine Learning for Finance)
- Leaderboard or social comparison features
- Mobile app wrapper (React Native or Expo)

---

## Acknowledgements

- [Lucide React](https://lucide.dev) — icon library
- [Tailwind CSS](https://tailwindcss.com) — utility-first styling
- [Next.js](https://nextjs.org) — React framework
- [OpenAI](https://openai.com) — GPT-4o answer evaluation
- [ElevenLabs](https://elevenlabs.io) — text-to-speech voice assistant
- Question content adapted from *Paul & Dominic's Guide to Quantitative Finance Interviews* and related quant interview resources
