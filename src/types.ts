export type QuizQuestion = {
  id: string;
  category: string;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type AnswerState = {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
  correctAnswer: string;
};
