import { useEffect, useState } from "react";

interface TitleAnimationProps {
  onAnimationComplete?: () => void;
}

export default function TitleAnimation({
  onAnimationComplete,
}: TitleAnimationProps) {
  const [visibleImages, setVisibleImages] = useState<number[]>([]);

  const images = [
    { src: "/images/title-syoku.png", alt: "食" },
    { src: "/images/title-shin.png", alt: "診" },
    { src: "/images/title-dan.png", alt: "断" },
  ];

  useEffect(() => {
    const timeouts = [
      setTimeout(() => setVisibleImages((prev) => [...prev, 0]), 800),
      setTimeout(() => setVisibleImages((prev) => [...prev, 1]), 1600),
      setTimeout(() => setVisibleImages((prev) => [...prev, 2]), 2400),
      setTimeout(() => {
        if (onAnimationComplete) {
          onAnimationComplete();
        }
      }, 2700),
    ];

    return () => timeouts.forEach((timeout) => clearTimeout(timeout));
  }, [onAnimationComplete]);

  return (
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
  );
}
