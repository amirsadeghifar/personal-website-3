"use client";

import { Project } from "@/data/projects";
import {
  MorphingDialog,
  MorphingDialogTrigger,
  MorphingDialogContent,
  MorphingDialogTitle,
  MorphingDialogSubtitle,
  MorphingDialogClose,
  MorphingDialogDescription,
  MorphingDialogContainer,
} from "@/components/core/morphing-dialog";
import { Tilt } from "@/components/motion-primitives/tilt";
import { ExternalLinkIcon } from "lucide-react";

const colorClasses = {
  orange: "bg-card-orange",
  cream: "bg-card-cream",
  cyan: "bg-card-cyan",
  green: "bg-card-green",
};

const textColorClasses = {
  orange: "text-white",
  cream: "text-gray-800",
  cyan: "text-white",
  green: "text-white",
};

const mutedTextColorClasses = {
  orange: "text-white/70",
  cream: "text-gray-600",
  cyan: "text-white/70",
  green: "text-white/70",
};

function PatternLines({ color }: { color: string }) {
  const strokeColor = color === "cream" ? "#666" : "#fff";
  return (
    <svg className="w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="none">
      {Array.from({ length: 20 }).map((_, i) => (
        <line
          key={i}
          x1="0"
          y1={i * 6}
          x2="200"
          y2={i * 6}
          stroke={strokeColor}
          strokeWidth="2"
          opacity="0.6"
        />
      ))}
    </svg>
  );
}

function PatternGrid({ color }: { color: string }) {
  const strokeColor = color === "cream" ? "#666" : "#fff";
  return (
    <svg className="w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="none">
      {Array.from({ length: 10 }).map((_, i) => (
        <g key={i}>
          <line x1={i * 20} y1="0" x2={i * 20} y2="120" stroke={strokeColor} strokeWidth="1" opacity="0.4" />
          <line x1="0" y1={i * 12} x2="200" y2={i * 12} stroke={strokeColor} strokeWidth="1" opacity="0.4" />
        </g>
      ))}
    </svg>
  );
}

function PatternWaves({ color }: { color: string }) {
  const strokeColor = color === "cream" ? "#666" : "#fff";
  return (
    <svg className="w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="none">
      {Array.from({ length: 15 }).map((_, i) => (
        <path
          key={i}
          d={`M 0 ${i * 8} Q 50 ${i * 8 - 4}, 100 ${i * 8} T 200 ${i * 8}`}
          fill="none"
          stroke={strokeColor}
          strokeWidth="1.5"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}

function PatternDots({ color }: { color: string }) {
  const fillColor = color === "cream" ? "#666" : "#fff";
  return (
    <svg className="w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="none">
      {Array.from({ length: 8 }).map((_, row) =>
        Array.from({ length: 10 }).map((_, col) => (
          <circle
            key={`${row}-${col}`}
            cx={col * 20 + 10}
            cy={row * 15 + 8}
            r="3"
            fill={fillColor}
            opacity="0.4"
          />
        ))
      )}
    </svg>
  );
}

const patterns = {
  lines: PatternLines,
  grid: PatternGrid,
  waves: PatternWaves,
  dots: PatternDots,
};

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const Pattern = patterns[project.pattern];

  return (
    <MorphingDialog
      transition={{
        type: "spring",
        bounce: 0.05,
        duration: 0.25,
      }}
    >
      <Tilt rotationFactor={20} isRevese>
        <MorphingDialogTrigger
          style={{ borderRadius: "16px" }}
          className={`w-full h-full overflow-hidden ${colorClasses[project.color]}`}
        >
          {/* Pattern area */}
          <div className="h-2/3 w-full p-4">
            <Pattern color={project.color} />
          </div>
          {/* Title area */}
          <div className={`h-1/3 px-4 pb-4 flex flex-col justify-end ${textColorClasses[project.color]}`}>
            <MorphingDialogTitle className="text-2xl md:text-3xl font-medium leading-tight">
              {project.title}
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className="hidden">
              {project.description}
            </MorphingDialogSubtitle>
          </div>
        </MorphingDialogTrigger>
      </Tilt>

      <MorphingDialogContainer>
        <MorphingDialogContent
          style={{ borderRadius: "24px" }}
          className={`relative flex h-auto w-full max-w-[500px] flex-col overflow-hidden ${project.image ? "bg-neutral-900" : colorClasses[project.color]}`}
        >
          {/* Image or pattern area - expanded */}
          <div className={project.image ? "h-64 w-full" : "h-48 w-full p-6"}>
            {project.image ? (
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <Pattern color={project.color} />
            )}
          </div>

          {/* Content area */}
          <div className={`p-6 ${project.image ? "text-white" : textColorClasses[project.color]}`}>
            <MorphingDialogTitle className="text-2xl font-medium">
              {project.title}
            </MorphingDialogTitle>
            <MorphingDialogSubtitle className={`mt-1 ${project.image ? "text-white/70" : mutedTextColorClasses[project.color]}`}>
              {project.description}
            </MorphingDialogSubtitle>

            <MorphingDialogDescription
              disableLayoutAnimation
              variants={{
                initial: { opacity: 0, scale: 0.95, y: 20 },
                animate: { opacity: 1, scale: 1, y: 0 },
                exit: { opacity: 0, scale: 0.95, y: 20 },
              }}
            >
              <p className={`mt-4 ${project.image ? "text-white/70" : mutedTextColorClasses[project.color]}`}>
                {project.longDescription}
              </p>

              {/* Technologies */}
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      project.image
                        ? "bg-white/20 text-white"
                        : project.color === "cream"
                        ? "bg-gray-800/10 text-gray-700"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Link */}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`mt-4 inline-flex items-center gap-1 text-sm underline underline-offset-2 ${project.image ? "text-white/70 hover:text-white" : `${mutedTextColorClasses[project.color]} hover:${textColorClasses[project.color]}`}`}
                >
                  View project
                  <ExternalLinkIcon className="h-3 w-3" />
                </a>
              )}
            </MorphingDialogDescription>
          </div>

          <MorphingDialogClose
            className={project.image ? "text-white" : project.color === "cream" ? "text-gray-800" : "text-white"}
          />
        </MorphingDialogContent>
      </MorphingDialogContainer>
    </MorphingDialog>
  );
}
