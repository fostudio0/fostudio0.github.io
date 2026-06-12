"use client";

import { useEffect, useMemo, useState } from "react";

const ROTATE_MS = 30000;
const LETTER_DELAY_MS = 40;

type HeroAnimatedTitleProps = {
  titles: string[];
};

export function HeroAnimatedTitle({ titles }: HeroAnimatedTitleProps) {
  const safeTitles = titles.length > 0 ? titles : [""];
  const [titleIndex, setTitleIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(0);
  const [cycleKey, setCycleKey] = useState(0);

  const activeTitle = safeTitles[titleIndex] ?? safeTitles[0];

  const characters = useMemo(
    () =>
      activeTitle.split("").map((char, index) => ({
        char,
        index,
      })),
    [activeTitle],
  );

  useEffect(() => {
    setTitleIndex(0);
    setVisibleCount(0);
    setCycleKey((value) => value + 1);
  }, [safeTitles]);

  useEffect(() => {
    setVisibleCount(0);
  }, [activeTitle, cycleKey]);

  useEffect(() => {
    if (activeTitle.length === 0) {
      return;
    }

    const interval = window.setInterval(() => {
      setVisibleCount((count) => {
        if (count >= activeTitle.length) {
          window.clearInterval(interval);
          return count;
        }
        return count + 1;
      });
    }, LETTER_DELAY_MS);

    return () => window.clearInterval(interval);
  }, [activeTitle, cycleKey]);

  useEffect(() => {
    if (safeTitles.length <= 1) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setTitleIndex((index) => (index + 1) % safeTitles.length);
      setCycleKey((value) => value + 1);
    }, ROTATE_MS);

    return () => window.clearTimeout(timeout);
  }, [titleIndex, safeTitles.length, cycleKey]);

  return (
    <h1 className="hero-title" aria-live="polite">
      <span className="sr-only">{activeTitle.replace(/\n/g, " ")}</span>
      <span aria-hidden="true" className="hero-title-animated">
        {characters.map(({ char, index }) => {
          if (char === "\n") {
            return visibleCount > index ? <br key={`${cycleKey}-br-${index}`} /> : null;
          }

          return (
            <span
              key={`${cycleKey}-${index}`}
              className={`hero-title-char${visibleCount > index ? " is-visible" : ""}`}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          );
        })}
      </span>
    </h1>
  );
}
