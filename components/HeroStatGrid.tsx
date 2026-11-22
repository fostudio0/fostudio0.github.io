"use client";

import { useRef, useState, useEffect } from "react";
import type { HeroStat } from "@/components/HeroSection";

export function HeroStatGrid({ stats }: { stats: HeroStat[] }) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!gridRef.current) return;
    const { scrollLeft: sLeft, scrollWidth: sWidth, clientWidth: cWidth } = gridRef.current;
    setCanScrollLeft(sLeft > 8);
    setCanScrollRight(sLeft < sWidth - cWidth - 8);
  };

  useEffect(() => {
    checkScroll();
    const el = gridRef.current;
    if (el) {
      el.addEventListener("scroll", checkScroll, { passive: true });
      window.addEventListener("resize", checkScroll);
      return () => {
        el.removeEventListener("scroll", checkScroll);
        window.removeEventListener("resize", checkScroll);
      };
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!gridRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - gridRef.current.offsetLeft);
    setScrollLeft(gridRef.current.scrollLeft);
  };

  const handleMouseLeave = () => setIsDragging(false);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !gridRef.current) return;
    e.preventDefault();
    const x = e.pageX - gridRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    gridRef.current.scrollLeft = scrollLeft - walk;
  };

  const scrollByAmount = (amount: number) => {
    if (!gridRef.current) return;
    gridRef.current.scrollBy({ left: amount, behavior: "smooth" });
  };

  return (
    <div className="hero-stat-container">
      <div
        ref={gridRef}
        className={`hero-stat-grid ${isDragging ? "is-dragging" : ""}`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {stats.map((stat) => (
          <div key={stat.label} className="hero-stat">
            <div className="hero-stat-value">{stat.value}</div>
            <div className="hero-stat-label">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Subtle indicator controls */}
      <div className="hero-stat-nav">
        <button
          type="button"
          className="hero-stat-arrow"
          aria-label="Previous stat"
          disabled={!canScrollLeft}
          onClick={() => scrollByAmount(-140)}
        >
          ‹
        </button>
        <span className="hero-stat-dots-hint">
          <span className={`hero-stat-dot ${!canScrollLeft ? "is-active" : ""}`} />
          <span className={`hero-stat-dot ${canScrollLeft && canScrollRight ? "is-active" : ""}`} />
          <span className={`hero-stat-dot ${!canScrollRight ? "is-active" : ""}`} />
        </span>
        <button
          type="button"
          className="hero-stat-arrow"
          aria-label="Next stat"
          disabled={!canScrollRight}
          onClick={() => scrollByAmount(140)}
        >
          ›
        </button>
      </div>
    </div>
  );
}
