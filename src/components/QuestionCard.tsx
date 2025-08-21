import { motion } from "framer-motion";
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
    <motion.div
      key={currentQuestion}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto shadow-2xl"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
    >
      <h2 className="text-2xl font-bold text-brown-800 mb-6 text-center">
        質問 {currentQuestion + 1} / {totalQuestions}
      </h2>
      <p className="text-lg text-brown-800 mb-8 text-center leading-relaxed">
        {question.question}
      </p>
      <div className="flex gap-4 justify-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Button onClick={() => onAnswer(true)} variant="primary" size="md">
            はい
          </Button>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <Button onClick={() => onAnswer(false)} variant="secondary" size="md">
            いいえ
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
