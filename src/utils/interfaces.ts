export interface Question {
    id: number;
    question: string;
    correctAnswerIndex: number;
    answers: string[];
    explanation: string;
    category: string;

}