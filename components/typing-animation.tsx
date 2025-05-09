"use client";

import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  typingSpeed?: number;
  erasingSpeed?: number;
  delayAfterTyping?: number;
  delayAfterErasing?: number;
  startDelay?: number;
  className?: string;
}

export default function TypingAnimation({
  text,
  typingSpeed = 100,
  erasingSpeed = 50, // Erasing is typically faster than typing
  delayAfterTyping = 1500, // Pause after typing completes
  delayAfterErasing = 500, // Pause after erasing completes
  startDelay = 500,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    // Typing mode
    if (isTyping && !isPaused) {
      if (currentIndex >= text.length) {
        // Typing complete, pause before erasing
        setIsPaused(true);
        timeout = setTimeout(() => {
          setIsPaused(false);
          setIsTyping(false);
        }, delayAfterTyping);
      } else {
        // Continue typing
        const initialDelay = currentIndex === 0 ? startDelay : 0;
        timeout = setTimeout(() => {
          setDisplayedText(prev => prev + text[currentIndex]);
          setCurrentIndex(prev => prev + 1);
        }, initialDelay + Math.random() * typingSpeed * 0.5 + typingSpeed * 0.75);
      }
    }
    // Erasing mode
    else if (!isTyping && !isPaused) {
      if (currentIndex <= 0) {
        // Erasing complete, pause before typing again
        setIsPaused(true);
        timeout = setTimeout(() => {
          setIsPaused(false);
          setIsTyping(true);
        }, delayAfterErasing);
      } else {
        // Continue erasing
        timeout = setTimeout(() => {
          setDisplayedText(prev => prev.slice(0, -1));
          setCurrentIndex(prev => prev - 1);
        }, erasingSpeed);
      }
    }

    return () => clearTimeout(timeout);
  }, [currentIndex, text, typingSpeed, erasingSpeed, delayAfterTyping, delayAfterErasing, startDelay, isTyping, isPaused]);

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
`
