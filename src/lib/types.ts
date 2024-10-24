export type Question = {
	question: string;
};

export type Theme = {
	title: string;
	questions: Question[];
};

export type QuizData = {
	themes: Theme[];
};
