import { useEffect, useState } from "react";

export default function HomePage() {
  const [visibleImages, setVisibleImages] = useState<number[]>([]);
  const [showText, setShowText] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setVisibleImages((prev) => [...prev, 0]), 800),
      setTimeout(() => setVisibleImages((prev) => [...prev, 1]), 1600),
      setTimeout(() => setVisibleImages((prev) => [...prev, 2]), 2400),
      setTimeout(() => setShowText(true), 2700),
      setTimeout(() => setShowButton(true), 2800),
    ];

    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, []);

  const images = [
    { src: "/images/title-syoku.png", alt: "食" },
    { src: "/images/title-shin.png", alt: "診" },
    { src: "/images/title-dan.png", alt: "断" },
  ];

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center relative"
      style={{ backgroundImage: "url('/images/title-back.jpg')" }}
    >
      {/* オーバーレイ */}
      <div className="absolute inset-0 bg-black/5"></div>

      {/* タイトル */}
      <div className="relative text-center text-brown-800 px-4 max-w-4xl">
        <div className="flex flex-col items-center drop-shadow-lg">
          {images.map((image, index) => (
            <img
              key={index}
              src={image.src}
              alt={image.alt}
              className={`w-20 h-20 md:w-50 md:h-50 transition-all duration-300 ${
                visibleImages.includes(index) ? "opacity-100" : "opacity-0"
              }`}
              style={{
                transitionTimingFunction: visibleImages.includes(index)
                  ? "cubic-bezier(0.68, -0.55, 0.265, 1.55)"
                  : "ease-out",
                transform: visibleImages.includes(index)
                  ? `scale(1.1) rotate(0deg)`
                  : `scale(2.5) rotate(-20deg) translateY(-100px)`,
                filter: visibleImages.includes(index)
                  ? "drop-shadow(2px 4px 8px rgba(0,0,0,0.3))"
                  : "none",
              }}
            />
          ))}
        </div>

        <p
          className={`text-xl md:text-2xl mb-8 font-bold max-w-2xl mx-auto transition-all duration-1000 ${
            showText ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          生きるために食べるのか
          <br />
          食べるために生きるのか
        </p>

        <button
          className={`bg-brown-800 hover:bg-brown-800/90 hover:scale-105 hover:shadow-xl text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 shadow-lg cursor-pointer ${
            showButton ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          診断を始める
        </button>
      </div>
    </div>
  );
}
