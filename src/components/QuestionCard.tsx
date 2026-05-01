import type { QuizQuestion } from "../types";

type Props = {
  question: QuizQuestion;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string;
  onAnswer: (option: string) => void;
};

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswer
}: Props) => {
  return (
    <article>
      <p className="text-sm uppercase tracking-[0.25em] text-cyan-200/80">
        {question.category}
      </p>
      <h2 className="mt-3 text-xl font-semibold leading-snug text-white sm:text-2xl">
        {questionNumber}. {question.question}
      </h2>
      <p className="mt-2 text-sm text-slate-300">
        Question {questionNumber} of {totalQuestions}
      </p>

      <div className="mt-6 grid gap-3">
        {question.options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = option === question.correctAnswer;
          const hasSelection = Boolean(selectedAnswer);

          return (
            <button
              key={option}
              type="button"
              onClick={() => onAnswer(option)}
              disabled={hasSelection}
              className={`rounded-xl border p-4 text-left text-sm transition sm:text-base ${
                !hasSelection
                  ? "border-white/20 bg-white/5 hover:border-cyan-300/60 hover:bg-cyan-300/10"
                  : isSelected && isCorrect
                    ? "border-emerald-300 bg-emerald-500/20 text-emerald-100"
                    : isSelected
                      ? "border-rose-300 bg-rose-500/20 text-rose-100"
                      : isCorrect
                        ? "border-emerald-300/80 bg-emerald-500/10 text-emerald-100"
                        : "border-white/10 bg-white/5 text-slate-400"
              }`}
            >
              {option}
            </button>
          );
        })}
      </div>
    </article>
  );
};

export default QuestionCard;
