import { projects } from "@/data/projects";
import { ExternalLinkIcon } from "lucide-react";

const splinter = projects.find((p) => p.id === "splinter")!;

export default function ProjectCards() {
  return (
    <section className="pt-16 pb-24 px-4">
      <div className="flex justify-center">
        <div className="relative flex h-auto w-full max-w-[500px] flex-col overflow-hidden rounded-3xl bg-neutral-900">
          {/* Image */}
          <div className="h-64 w-full">
            <img
              src={splinter.image}
              alt={splinter.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="p-6 text-white">
            <h3 className="text-2xl font-medium">{splinter.title}</h3>
            <p className="mt-1 text-white/70">{splinter.description}</p>
            {/* Link */}
            {splinter.link && (
              <a
                href={splinter.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1 text-sm underline underline-offset-2 text-white/70 hover:text-white"
              >
                View project
                <ExternalLinkIcon className="h-3 w-3" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
