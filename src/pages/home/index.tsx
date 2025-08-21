import { AnimatePresence, motion } from "framer-motion";
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
  const [showResultImage, setShowResultImage] = useState(false);
  const [questions, setQuestions] = useState(() => getQuestionChoices());
  // おにぎりインスタンスの型定義
  interface OniInstance {
    id: string;
    top: string;
    left?: string;
    right?: string;
    delay: number;
    size: string;
    imageIndex: number;
  }

  // おにぎり画像一覧
  const oniImages = [
    "/images/oni.png",
    "/images/oniebi.png",
    "/images/oniikura.png",
    "/images/onimame.png",
    "/images/onitamago.png",
  ];

  // 初期おにぎりインスタンス
  const initialOniInstances: OniInstance[] = [
    {
      id: "oni1",
      top: "10%",
      left: "20%",
      delay: 0,
      size: "w-20 h-20 md:w-28 md:h-28",
      imageIndex: 0,
    },
    {
      id: "oni2",
      top: "20%",
      right: "5%",
      delay: 1,
      size: "w-16 h-16 md:w-24 md:h-24",
      imageIndex: 0,
    },
    {
      id: "oni3",
      top: "70%",
      left: "15%",
      delay: 2,
      size: "w-18 h-18 md:w-26 md:h-26",
      imageIndex: 0,
    },
    {
      id: "oni4",
      top: "80%",
      right: "8%",
      delay: 0.5,
      size: "w-14 h-14 md:w-20 md:h-20",
      imageIndex: 0,
    },
    {
      id: "oni5",
      top: "50%",
      left: "70%",
      delay: 1.5,
      size: "w-24 h-24 md:w-32 md:h-32",
      imageIndex: 0,
    },
  ];

  const [oniInstances, setOniInstances] =
    useState<OniInstance[]>(initialOniInstances);

  // タイトルアニメーション完了時の処理
  const handleAnimationComplete = () => {
    setShowText(true);
    setTimeout(() => setShowButton(true), 100);
  };

  // 診断開始ボタンのクリックハンドラー
  const handleStartDiagnosis = () => {
    // ボタンとテキストをフェードアウト
    setShowButton(false);
    setShowText(false);

    // 少し遅延してから診断画面を表示
    setTimeout(() => {
      setShowDiagnosis(true);
    }, 400);
  };

  // おにぎりクリック処理
  const handleOniClick = (id: string) => {
    setOniInstances((prev) =>
      prev.map((oni) =>
        oni.id === id
          ? { ...oni, imageIndex: (oni.imageIndex + 1) % oniImages.length }
          : oni
      )
    );
  };

  // 診断のリセット処理
  const resetDiagnosis = () => {
    setShowDiagnosis(false);
    setShowResult(false);
    setShowResultImage(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setQuestions(getQuestionChoices());
    setShowText(false);
    setShowButton(false);
    setOniInstances(initialOniInstances);
  };

  // 診断セクションの描画管理
  const renderDiagnosisSection = () => {
    // 診断が開始されていない場合はボタンを表示
    if (!showDiagnosis) {
      return (
        <div className="h-16 flex items-center justify-center">
          <AnimatePresence>
            {showButton && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.9 }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                <Button
                  onClick={handleStartDiagnosis}
                  variant="primary"
                  size="lg"
                >
                  診断を始める
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    // 診断が完了した場合は結果カードを表示
    if (showResult) {
      return (
        <div className="flex flex-col items-center">
          {(() => {
            const result = evaluateDiagnosis(answers);
            return (
              <>
                {/* 診断結果に応じた画像 - カードの上に表示 */}
                <img
                  src={`/images/${result.image}`}
                  alt="診断結果イメージ"
                  className={`w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg h-auto mb-4 sm:mb-6 md:mb-8 transition-all duration-700 ${
                    showResultImage ? "opacity-100" : "opacity-0"
                  }`}
                  style={{
                    transitionTimingFunction: showResultImage
                      ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
                      : "ease-out",
                    transform: showResultImage
                      ? "scale(1.2) rotate(0deg)"
                      : "scale(2.5) rotate(-20deg) translateY(-100px)",
                    filter: showResultImage
                      ? "drop-shadow(2px 4px 8px rgba(0,0,0,0.3))"
                      : "none",
                  }}
                />
                <ResultCard result={result} onRetry={resetDiagnosis} />
              </>
            );
          })()}
        </div>
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
      image: currentQuestionData.image,
    };
    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
      // 結果画像のアニメーション開始
      setTimeout(() => setShowResultImage(true), 300);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative"
      style={{ backgroundImage: "url('/images/title-back.jpg')" }}
    >
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/5"></div>

      {(showText || showResult) &&
        oniInstances.map((oni, index) => (
          <motion.img
            key={oni.id}
            src={oniImages[oni.imageIndex]}
            alt="おにぎり"
            className={`absolute ${oni.size} cursor-pointer z-10 opacity-60 hover:opacity-80`}
            style={{
              top: oni.top,
              left: oni.left,
              right: oni.right,
            }}
            initial={{
              opacity: 0,
              scale: 0,
              y: -50,
              rotate: -180,
            }}
            animate={{
              opacity: 0.6,
              scale: 1,
              y: [-15, 15, -15],
              x: [-8, 8, -8],
              rotate: [-3, 3, -3],
            }}
            transition={{
              opacity: { duration: 0.6, delay: oni.delay },
              scale: {
                duration: 0.8,
                delay: oni.delay,
                type: "spring",
                stiffness: 200,
              },
              y: {
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: oni.delay + 1,
              },
              x: {
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: oni.delay + 1,
              },
              rotate: {
                duration: 4 + index * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: oni.delay + 1,
              },
            }}
            onClick={() => handleOniClick(oni.id)}
            whileHover={{
              scale: 1.2,
              opacity: 0.8,
              transition: { duration: 0.2 },
            }}
            whileTap={{
              scale: 0.9,
              transition: { duration: 0.1 },
            }}
          />
        ))}

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
