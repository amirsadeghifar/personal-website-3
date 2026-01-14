"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectCards() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="pt-16 pb-24 px-4">
      <div className="relative flex items-center justify-center gap-2">
        {/* Previous Arrow */}
        <button
          onClick={goToPrevious}
          className="shrink-0 p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Previous project"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Cards Container */}
        <div className="relative flex items-center justify-center mx-[180px] md:mx-[220px]">
          {projects.map((project, index) => {
            const offset = index - currentIndex;
            // Handle wrapping for continuous loop
            let adjustedOffset = offset;
            if (offset > projects.length / 2) adjustedOffset = offset - projects.length;
            if (offset < -projects.length / 2) adjustedOffset = offset + projects.length;

            const isActive = adjustedOffset === 0;
            const isAdjacent = Math.abs(adjustedOffset) === 1;

            let translateX = adjustedOffset * 180;
            let scale = isActive ? 1 : 0.9;
            let opacity = isActive ? 1 : isAdjacent ? 0.5 : 0;
            let zIndex = isActive ? 10 : isAdjacent ? 5 : 0;
            let rotation = isActive ? 0 : adjustedOffset * 2;

            return (
              <div
                key={project.id}
                className="absolute w-[220px] h-[300px] md:w-[260px] md:h-[360px] transition-transform duration-200"
                style={{
                  transform: `translateX(${translateX}px) scale(${scale}) rotate(${rotation}deg)`,
                  opacity,
                  zIndex,
                  pointerEvents: isActive || isAdjacent ? "auto" : "none",
                  cursor: isAdjacent ? "pointer" : "default",
                }}
                onClick={() => {
                  if (isAdjacent) {
                    setCurrentIndex(index);
                  }
                }}
              >
                <ProjectCard project={project} />
              </div>
            );
          })}
          {/* Spacer to maintain layout */}
          <div className="w-[220px] h-[300px] md:w-[260px] md:h-[360px]" />
        </div>

        {/* Next Arrow */}
        <button
          onClick={goToNext}
          className="shrink-0 p-2 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          aria-label="Next project"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-6">
        {projects.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-1.5 h-1.5 rounded-full transition-colors ${
              index === currentIndex ? "bg-foreground" : "bg-muted-foreground/40"
            }`}
            aria-label={`Go to project ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
