import { useState } from "react";
import Button from "../../components/Button";
import QuestionCard from "../../components/QuestionCard";
import ResultCard from "../../components/ResultCard";
import TitleAnimation from "../../components/TitleAnimation";
import type { Answer } from "../../utils/diagnosisEvaluator";
import { evaluateDiagnosis } from "../../utils/diagnosisEvaluator";
import { getQuestionChoices } from "../../utils/questionChoice";

export default function HomePage() {
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showDiagnosis, setShowDiagnosis] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [questions, setQuestions] = useState(() => getQuestionChoices());

  // タイトルアニメーション完了時の処理
  const handleAnimationComplete = () => {
    setShowText(true);
    setTimeout(() => setShowButton(true), 100);
  };

  // 診断開始ボタンのクリックハンドラー
  const handleStartDiagnosis = () => {
    setShowDiagnosis(true);
  };

  // 診断のリセット処理
  const resetDiagnosis = () => {
    setShowDiagnosis(false);
    setShowResult(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setQuestions(getQuestionChoices());
    setShowText(false);
    setShowButton(false);
  };

  // 診断セクションの描画管理
  const renderDiagnosisSection = () => {
    // 診断が開始されていない場合はボタンを表示
    if (!showDiagnosis) {
      return (
        <div className="h-16 flex items-center justify-center">
          {showButton && (
            <Button
              onClick={handleStartDiagnosis}
              variant="primary"
              size="lg"
              className="transition-all duration-700 opacity-100 translate-y-0"
            >
              診断を始める
            </Button>
          )}
        </div>
      );
    }

    // 診断が完了した場合は結果カードを表示
    if (showResult) {
      return (
        <ResultCard
          result={evaluateDiagnosis(answers)}
          onRetry={resetDiagnosis}
        />
      );
    }

    // 診断が進行中の場合は質問カードを表示
    return (
      <QuestionCard
        question={questions[currentQuestion]}
        currentQuestion={currentQuestion}
        totalQuestions={questions.length}
        onAnswer={handleAnswer}
      />
    );
  };

  // 1つずつの回答処理
  const handleAnswer = (answer: boolean) => {
    const currentQuestionData = questions[currentQuestion];
    const newAnswer: Answer = {
      value: answer,
      specialResult: currentQuestionData.specialResult,
      specialResultMsg: currentQuestionData.specialResultMsg,
      points: currentQuestionData.points,
    };
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative"
      style={{ backgroundImage: "url('/images/title-back.jpg')" }}
    >
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/5"></div>

      {/* タイトル */}
      <div className="relative text-center text-brown-800 px-4 max-w-4xl">
        {!showResult && (
          <>
            <TitleAnimation onAnimationComplete={handleAnimationComplete} />

            {!showDiagnosis && (
              <p
                className={`text-xl md:text-2xl mb-8 font-bold max-w-2xl mx-auto transition-all duration-1000 h-20 flex items-center justify-center ${
                  showText
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                }`}
              >
                生きるために食べるのか
                <br />
                食べるために生きるのか
              </p>
            )}
          </>
        )}

        {renderDiagnosisSection()}
      </div>
    </div>
  );
}
