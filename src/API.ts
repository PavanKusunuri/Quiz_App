import questions from "./data/questions.json";
import type { QuizQuestion } from "./types";
import { shuffleArray } from "./utils";

const questionBank: QuizQuestion[] = questions;

export const getQuizQuestions = async (
	count: number,
	categories: string[]
): Promise<QuizQuestion[]> => {
	const filteredQuestions = categories.length
		? questionBank.filter((question) => categories.includes(question.category))
		: questionBank;

	const chosenQuestions = shuffleArray(filteredQuestions).slice(0, count);

	return chosenQuestions.map((question) => ({
		...question,
		options: shuffleArray(question.options)
	}));
};
