export type Question = {
	question: string;
};

export type Theme = {
	id: number;
	title: string;
	questions: Question[];
};

export type QuizData = {
	themes: Theme[];
};
