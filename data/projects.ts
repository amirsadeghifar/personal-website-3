export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  technologies: string[];
  color: "orange" | "cream" | "cyan" | "green";
  pattern: "lines" | "grid" | "waves" | "dots";
  image?: string;
  link?: string;
}

export const projects: Project[] = [
  {
    id: "splinter",
    title: "Splinter",
    description: "transform unstructured data for AI applications",
    longDescription:
      "An open-source data ingestion pipeline that converts unstructured data into vectorized formats for AI applications. Features real-time observability, a RAG sandbox for testing queries, and an event-driven architecture that scales to zero.",
    technologies: ["AWS", "TypeScript", "React", "Serverless"],
    color: "orange",
    pattern: "lines",
    image: "/splinter.png",
    link: "https://splinter-app.github.io/",
  },
  {
    id: "design-stash",
    title: "Design Stash",
    description: "curated design tools and inspiration",
    longDescription:
      "A tool for collecting, organizing, and sharing design inspiration. Save references from across the web and keep your creative library in one place.",
    technologies: [],
    color: "cream",
    pattern: "grid",
    image: "/design-stash.png",
    link: "https://designstash.dev",
  },
  {
    id: "cartridge",
    title: "Cartridge",
    description: "building tools that matter",
    longDescription:
      "A suite of developer tools designed to streamline workflows and boost productivity. Features intuitive interfaces and powerful automation capabilities.",
    technologies: ["Next.js", "Node.js", "PostgreSQL"],
    color: "cyan",
    pattern: "waves",
  },
  {
    id: "med-device-design-copilot",
    title: "Med Device Copilot",
    description: "exploring new possibilities",
    longDescription:
      "An experimental project pushing the boundaries of what's possible on the web. Combines cutting-edge technologies with creative design thinking.",
    technologies: ["Three.js", "WebGL", "Motion"],
    color: "green",
    pattern: "dots",
  },
];
