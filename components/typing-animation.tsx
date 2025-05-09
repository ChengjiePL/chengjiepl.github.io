"use client";

import { useState, useEffect } from "react";

interface TypingAnimationProps {
  text: string;
  typingSpeed?: number;
  erasingSpeed?: number;
  delayAfterTyping?: number;
  delayAfterErasing?: number;
  className?: string;
}

export default function TypingAnimation({
  text,
  typingSpeed = 100,
  erasingSpeed = 50,
  delayAfterTyping = 2000,
  delayAfterErasing = 500,
  className,
}: TypingAnimationProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isDelaying, setIsDelaying] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isDelaying) {
      // We're in a delay phase
      const delayTime = isTyping ? delayAfterTyping : delayAfterErasing;
      timeout = setTimeout(() => {
        setIsDelaying(false);
        setIsTyping(!isTyping);
      }, delayTime);
    } else if (isTyping) {
      // We're in typing phase
      if (displayedText.length < text.length) {
        // Continue typing
        timeout = setTimeout(() => {
          setDisplayedText(text.substring(0, displayedText.length + 1));
        }, typingSpeed);
      } else {
        // Typing complete, start delay
        setIsDelaying(true);
      }
    } else {
      // We're in erasing phase
      if (displayedText.length > 0) {
        // Continue erasing
        timeout = setTimeout(() => {
          setDisplayedText(
            displayedText.substring(0, displayedText.length - 1),
          );
        }, erasingSpeed);
      } else {
        // Erasing complete, start delay
        setIsDelaying(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [
    displayedText,
    isTyping,
    isDelaying,
    text,
    typingSpeed,
    erasingSpeed,
    delayAfterTyping,
    delayAfterErasing,
  ]);

  return (
    <span className={className}>
      {displayedText}
      <span className="animate-pulse">|</span>
    </span>
  );
}
