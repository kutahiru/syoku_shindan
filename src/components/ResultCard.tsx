import { useState, useEffect } from "react";
import Button from "./Button";

interface DiagnosisResult {
  title: string;
  description: string;
}

interface ResultCardProps {
  result: DiagnosisResult;
  onRetry: () => void;
}

const shareToX = (result: DiagnosisResult) => {
  const text = `食診断の結果は「${result.title}」でした！\n\n${result.description}\n\n#食診断`;
  const url = window.location.href;
  const shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
  window.open(shareUrl, '_blank', 'width=550,height=420');
};

export default function ResultCard({ result, onRetry }: ResultCardProps) {
  const [showCard, setShowCard] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [showDescription, setShowDescription] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timer1 = setTimeout(() => setShowCard(true), 100);
    const timer2 = setTimeout(() => setShowTitle(true), 800);
    const timer3 = setTimeout(() => setShowDescription(true), 1400);
    const timer4 = setTimeout(() => setShowButton(true), 2000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timer4);
    };
  }, []);

  return (
    <div
      className={`relative bg-white/95 backdrop-blur-sm rounded-lg p-10 max-w-2xl mx-auto shadow-lg text-center border border-stone-200 transform transition-all duration-1000 ease-out ${
        showCard
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-8"
      }`}
    >
      {/* 和風装飾枠 */}
      <div className="absolute inset-2 border border-stone-300/50 rounded-md"></div>
      
      {/* 角の装飾 */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-stone-400/60"></div>
      <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-stone-400/60"></div>
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-stone-400/60"></div>
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-stone-400/60"></div>

      {/* 診断結果ヘッダー */}
      <div className="relative mb-8">
        <h2 className="text-2xl font-semibold text-stone-800 tracking-wide">
          診断結果
        </h2>
        <div className="mt-2 w-16 h-0.5 bg-stone-400 mx-auto"></div>
      </div>

      {/* タイトル */}
      <div
        className={`transform transition-all duration-1000 ease-out ${
          showTitle
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <h3 className="text-3xl font-bold text-stone-800 mb-6 tracking-wide leading-relaxed">
          {result.title}
        </h3>
      </div>

      {/* 説明文 */}
      <div
        className={`transform transition-all duration-1000 ease-out ${
          showDescription
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="relative mb-8 p-6 bg-stone-50/80 rounded border-l-4 border-stone-400">
          <p className="text-lg text-stone-700 leading-relaxed font-medium">
            {result.description}
          </p>
        </div>
      </div>

      {/* ボタン */}
      <div
        className={`transform transition-all duration-1000 ease-out ${
          showButton
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-6"
        }`}
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button 
            onClick={() => shareToX(result)}
            variant="primary" 
            size="md"
            className="relative transition-all duration-300 hover:shadow-md bg-black hover:bg-gray-800 text-white"
          >
            Xに投稿する
          </Button>
          <Button 
            onClick={onRetry} 
            variant="primary" 
            size="md"
            className="relative transition-all duration-300 hover:shadow-md bg-stone-500 hover:bg-stone-600 text-white"
          >
            もう一度診断する
          </Button>
        </div>
      </div>
    </div>
  );
}
