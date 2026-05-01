# Smart Quiz Arena

> A fully typed, animated quiz application built with **React 19**, **TypeScript 5**, **Tailwind CSS v4**, and **Vite 6** — demonstrating modern front-end architecture, component design, and UI engineering.

---

## Live Demo

🔗 **[https://pavankusunuri.github.io/Quiz_App/](https://pavankusunuri.github.io/Quiz_App/)**

---

## Overview

Smart Quiz Arena lets users customise a quiz by selecting one or more subject areas, then presents 12 shuffled questions with instant visual feedback on every answer. A real-time progress bar tracks completion, and a results screen breaks down the final score with per-question review.

---

## Key Features

| Feature | Details |
|---|---|
| **Topic selection** | 10 subject areas — History, Geography, Civics, Economics, Science, Law, Mathematics, English, Technology, Environment |
| **Randomised questions** | Fisher-Yates shuffle applied to both the question pool and each question's answer options on every session |
| **Instant answer feedback** | Correct/incorrect state highlighted immediately on the selected option; correct answer revealed if wrong |
| **Progress tracking** | Animated progress bar shows percentage completion throughout the quiz |
| **Results screen** | Final score, percentage, and a full per-question breakdown with correct answers |
| **Fluid animations** | Page transitions and ambient background blobs powered by Framer Motion |
| **Responsive layout** | Mobile-first design using Tailwind CSS utility classes with `sm:` breakpoint variants |
| **120-question bank** | 12 carefully curated questions per category stored in a structured local JSON file |

---

## Technical Highlights

### Architecture & Component Design
- **Finite state machine** pattern for quiz flow — `setup → playing → finished` — managed with a single typed `QuizMode` union type, keeping state transitions predictable and explicit.
- **Separation of concerns**: data fetching logic lives in `API.ts`, shuffle utility in `utils.ts`, type definitions in `types.ts`, and UI is split into focused components.
- **Generic utility function**: `shuffleArray<T>` is fully generic, reusable across any array type, demonstrating TypeScript generics in practice.

### TypeScript Proficiency
- Strict typing throughout — `QuizQuestion`, `AnswerState`, and `QuizMode` types enforce correctness across the entire data flow.
- `useMemo` used to stabilise the topics array reference and avoid unnecessary re-renders.
- Props interfaces defined inline with destructuring for clean, readable component signatures.

### React 19 Patterns
- Functional components exclusively with hooks (`useState`, `useMemo`).
- Controlled state with immutable update patterns (`setAnswers(prev => [...prev, newAnswer])`).
- `AnimatePresence` with `mode="wait"` for coordinated enter/exit animations between quiz screens.
- Conditional rendering driven by state rather than imperative DOM manipulation.

### Styling & UX
- **Tailwind CSS v4** configured via the Vite plugin — zero-config PostCSS setup.
- `backdrop-blur`, `bg-white/5`, and `border-white/15` used for a glassmorphism card aesthetic.
- Radial gradient background with two independently animating ambient blobs (cyan and amber) for visual depth without performance cost.
- Answer button states (`default`, `correct`, `incorrect`, `revealed-correct`) handled through a single dynamic `className` expression.

### Build Tooling
- **Vite 6** for sub-second HMR and optimised production builds.
- **TypeScript composite build** (`tsc -b`) run before `vite build` to catch type errors before bundling.
- ESM-native package (`"type": "module"`) aligned with modern browser standards.

---

## Tech Stack

| Layer | Technology | Version |
|---|---|---|
| UI Library | React | ^19.0.0 |
| Language | TypeScript | ^5.7.2 |
| Styling | Tailwind CSS | ^4.0.0 |
| Animation | Framer Motion | ^11.11.17 |
| Build Tool | Vite | ^6.0.1 |
| React Plugin | @vitejs/plugin-react | ^4.3.4 |

---

## Project Structure

```
src/
├── API.ts               # Data layer — filters and shuffles questions
├── App.tsx              # Root component — state machine + full UI
├── types.ts             # Shared TypeScript types (QuizQuestion, AnswerState)
├── utils.ts             # Generic Fisher-Yates shuffle utility
├── index.tsx            # React 19 createRoot entry point
├── index.css            # Tailwind CSS v4 import
├── components/
│   └── QuestionCard.tsx # Presentational question + answer button component
└── data/
    └── questions.json   # 120-question bank (12 questions × 10 categories)
```

---

## Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start development server (http://localhost:5173)
npm run dev

# Type-check and build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Extending the Question Bank

Questions live in [`src/data/questions.json`](src/data/questions.json). Each entry follows this schema:

```json
{
  "id": "category-n",
  "category": "Category Name",
  "question": "Question text?",
  "options": ["Option A", "Option B", "Option C", "Option D"],
  "correctAnswer": "Option A"
}
```

Add a new object to the array and it will automatically appear in the topic selector and question pool — no other changes needed.

---

## Skills Demonstrated

- **React** — hooks, controlled components, conditional rendering, composition
- **TypeScript** — generics, union types, strict prop typing, type-safe state
- **State management** — FSM-style transitions, immutable updates, derived state
- **Tailwind CSS** — utility-first responsive design, glassmorphism, dark theme
- **Framer Motion** — AnimatePresence, layout animations, keyframe sequences
- **Vite** — modern build pipeline, ESM, plugin configuration
- **Software design** — separation of concerns, single responsibility, reusable utilities
- **UX thinking** — immediate feedback, progress indicators, accessible button states
