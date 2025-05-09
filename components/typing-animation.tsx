"use client";

import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  typingSpeed?: number;
  startDelay?: number;
  className?: string;
}

export default function TypingAnimation({
  text,
  typingSpeed = 100,
  startDelay = 500,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (currentIndex >= text.length) {
      setIsComplete(true);
      return;
    }

    const initialDelay = currentIndex === 0 ? startDelay : 0;

    const timeout = setTimeout(
      () => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      },
      initialDelay + Math.random() * typingSpeed * 0.5 + typingSpeed * 0.75,
    );

    return () => clearTimeout(timeout);
  }, [currentIndex, text, typingSpeed, startDelay]);

  return (
    <span className={className}>
      {displayedText}
      {!isComplete && <span className="animate-pulse">|</span>}
    </span>
  );
}
