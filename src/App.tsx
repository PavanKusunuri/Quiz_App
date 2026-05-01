import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { getQuizQuestions } from "./API";
import QuestionCard from "./components/QuestionCard";
import type { AnswerState, QuizQuestion } from "./types";

const QUESTIONS_PER_ROUND = 12;

type QuizMode = "setup" | "playing" | "finished";

const App = () => {
  const [mode, setMode] = useState<QuizMode>("setup");
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [answers, setAnswers] = useState<AnswerState[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const availableTopics = useMemo(
    () => [
      "History",
      "Geography",
      "Civics",
      "Economics",
      "Science",
      "Law",
      "Mathematics",
      "English",
      "Technology",
      "Environment"
    ],
    []
  );

  const currentQuestion = questions[activeIndex];
  const currentAnswer = answers[activeIndex];
  const score = answers.filter((answer) => answer.isCorrect).length;
  const progress = questions.length
    ? Math.round(((activeIndex + 1) / questions.length) * 100)
    : 0;

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((item) => item !== topic)
        : [...prev, topic]
    );
  };

  const startQuiz = async () => {
    setLoading(true);
    const topicsToUse = selectedTopics.length ? selectedTopics : availableTopics;
    const nextQuestions = await getQuizQuestions(QUESTIONS_PER_ROUND, topicsToUse);
    setQuestions(nextQuestions);
    setAnswers([]);
    setActiveIndex(0);
    setMode("playing");
    setLoading(false);
  };

  const submitAnswer = (selectedOption: string) => {
    if (!currentQuestion || currentAnswer) {
      return;
    }

    setAnswers((prev) => [
      ...prev,
      {
        questionId: currentQuestion.id,
        selectedOption,
        isCorrect: selectedOption === currentQuestion.correctAnswer,
        correctAnswer: currentQuestion.correctAnswer
      }
    ]);
  };

  const goToNextQuestion = () => {
    const isLastQuestion = activeIndex >= questions.length - 1;
    if (isLastQuestion) {
      setMode("finished");
      return;
    }

    setActiveIndex((prev) => prev + 1);
  };

  const resetQuiz = () => {
    setMode("setup");
    setQuestions([]);
    setAnswers([]);
    setActiveIndex(0);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_#1f2937_0%,_#0f172a_55%,_#020617_100%)] text-slate-100">
      <div className="pointer-events-none absolute inset-0">
        <motion.div
          className="absolute -left-24 top-16 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl"
          animate={{ y: [0, -22, 0], x: [0, 10, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-amber-400/20 blur-3xl"
          animate={{ y: [0, 18, 0], x: [0, -12, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <section className="relative mx-auto flex min-h-screen w-full max-w-4xl flex-col px-4 py-10 sm:px-6">
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="mb-8"
        >
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">
            Smart Quiz Arena
          </p>
          <h1 className="mt-3 font-display text-4xl font-bold leading-tight sm:text-5xl">
            Test your knowledge across meaningful subjects.
          </h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Topics include history, geography, civics, economics, science, law,
            mathematics, English and more. Questions are loaded from local JSON data.
          </p>
        </motion.header>

        {mode !== "setup" && (
          <div className="mb-6 rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-amber-300"
                animate={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <AnimatePresence mode="wait">
          {mode === "setup" && (
            <motion.section
              key="setup"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              className="rounded-3xl border border-white/15 bg-slate-950/55 p-6 shadow-2xl backdrop-blur-md sm:p-8"
            >
              <h2 className="text-2xl font-semibold text-white">Choose quiz topics</h2>
              <p className="mt-2 text-sm text-slate-300">
                Pick one or more topics. Leave all unselected to get a balanced mix.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {availableTopics.map((topic) => {
                  const selected = selectedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      type="button"
                      onClick={() => toggleTopic(topic)}
                      className={`rounded-full border px-4 py-2 text-sm transition ${
                        selected
                          ? "border-cyan-300 bg-cyan-300/20 text-cyan-100"
                          : "border-white/25 bg-white/5 text-slate-200 hover:border-cyan-300/70"
                      }`}
                    >
                      {topic}
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={startQuiz}
                disabled={loading}
                className="mt-8 rounded-xl bg-gradient-to-r from-cyan-400 to-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-75"
              >
                {loading ? "Loading questions..." : "Start Quiz"}
              </button>
            </motion.section>
          )}

          {mode === "playing" && currentQuestion && (
            <motion.section
              key={currentQuestion.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              className="rounded-3xl border border-white/15 bg-slate-950/55 p-6 shadow-2xl backdrop-blur-md sm:p-8"
            >
              <QuestionCard
                question={currentQuestion}
                questionNumber={activeIndex + 1}
                totalQuestions={questions.length}
                selectedAnswer={currentAnswer?.selectedOption}
                onAnswer={submitAnswer}
              />

              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm text-slate-300">
                  Score: <span className="font-semibold text-white">{score}</span>
                </p>
                <button
                  type="button"
                  onClick={goToNextQuestion}
                  disabled={!currentAnswer}
                  className="rounded-lg border border-white/20 bg-white/10 px-4 py-2 font-medium transition hover:border-cyan-300/70 hover:bg-cyan-300/15 disabled:cursor-not-allowed disabled:opacity-45"
                >
                  {activeIndex === questions.length - 1 ? "Finish" : "Next"}
                </button>
              </div>
            </motion.section>
          )}

          {mode === "finished" && (
            <motion.section
              key="finished"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              className="rounded-3xl border border-white/15 bg-slate-950/60 p-8 text-center shadow-2xl backdrop-blur-md"
            >
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-200/80">
                Round Complete
              </p>
              <h2 className="mt-3 text-3xl font-bold text-white">Great effort!</h2>
              <p className="mt-4 text-lg text-slate-200">
                Final score: {score} / {questions.length}
              </p>
              <p className="mt-2 text-sm text-slate-300">
                Accuracy: {questions.length ? Math.round((score / questions.length) * 100) : 0}%
              </p>
              <button
                type="button"
                onClick={resetQuiz}
                className="mt-8 rounded-xl bg-gradient-to-r from-cyan-400 to-amber-300 px-6 py-3 font-semibold text-slate-950 transition hover:brightness-105"
              >
                Play Again
              </button>
            </motion.section>
          )}
        </AnimatePresence>
      </section>
    </main>
  );
};

export default App;
