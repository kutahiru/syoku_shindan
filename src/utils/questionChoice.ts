import type { Question } from "../data/questions";
import {
  onePointQuestions,
  specialPointQuestions,
  threePointQuestions,
  twoPointQuestions,
} from "../data/questions";

export interface QuestionChoice {
  specialResult: string;
  specialResultMsg: string;
  points: number;
  question: string;
}

// 質問一覧を取得
export function getQuestionChoices(): QuestionChoice[] {
  const result: QuestionChoice[] = [];
  result.push(...getRandomQuestions(onePointQuestions, 2));
  result.push(...getRandomQuestions(twoPointQuestions, 2));
  result.push(...getRandomQuestions(threePointQuestions, 2));
  result.push(...getRandomQuestions(specialPointQuestions, 4));
  return result;
}

// 引数のリストからランダムな質問を指定数取得する
export function getRandomQuestions(
  questions: Question[],
  getCount: number
): QuestionChoice[] {
  const shuffled = questions.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, getCount).map((question) => ({
    specialResult: question.specialResult,
    specialResultMsg: question.specialResultMsg,
    points: question.points,
    question: question.question,
  }));
}
