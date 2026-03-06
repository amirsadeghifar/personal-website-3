"use client";

import { projects } from "@/data/projects";
import { Tilt } from "@/components/motion-primitives/tilt";
import { ExternalLinkIcon } from "lucide-react";

const splinter = projects.find((p) => p.id === "splinter")!;
const designStash = projects.find((p) => p.id === "design-stash")!;

function Card({ project }: { project: (typeof projects)[number] }) {
  return (
    <Tilt rotationFactor={3} isRevese className="w-full">
      <div className="relative flex h-auto w-full flex-col overflow-hidden rounded-3xl bg-neutral-900 border border-neutral-700">
        {/* Image */}
        <div className="h-48 w-full">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-5 text-white">
          <h3 className="text-xl font-medium">{project.title}</h3>
          <p className="mt-1 text-sm text-white/70">{project.description}</p>
          {/* Link */}
          {project.link && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex items-center gap-1 text-sm underline underline-offset-2 text-white/70 hover:text-white"
            >
              View project
              <ExternalLinkIcon className="h-3 w-3" />
            </a>
          )}
        </div>
      </div>
    </Tilt>
  );
}

export default function ProjectCards() {
  return (
    <section className="pt-16 pb-24 px-4">
      <div className="mx-auto max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card project={splinter} />
        <Card project={designStash} />
      </div>
    </section>
  );
}
