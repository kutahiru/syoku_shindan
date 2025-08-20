import Button from "./Button";

interface QuestionCardProps {
  question: {
    specialResult: string;
    points: number;
    question: string;
  };
  currentQuestion: number;
  totalQuestions: number;
  onAnswer: (answer: boolean) => void;
}

export default function QuestionCard({
  question,
  currentQuestion,
  totalQuestions,
  onAnswer,
}: QuestionCardProps) {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl">
      <h2 className="text-2xl font-bold text-brown-800 mb-6 text-center">
        質問 {currentQuestion + 1} / {totalQuestions}
      </h2>
      <p className="text-lg text-brown-800 mb-8 text-center leading-relaxed">
        {question.question}
      </p>
      <div className="flex gap-4 justify-center">
        <Button onClick={() => onAnswer(true)} variant="primary" size="md">
          はい
        </Button>
        <Button onClick={() => onAnswer(false)} variant="secondary" size="md">
          いいえ
        </Button>
      </div>
    </div>
  );
}
