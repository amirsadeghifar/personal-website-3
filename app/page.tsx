import Hero from "@/components/Hero";
import ProjectCards from "@/components/ProjectCards";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProjectCards />
      <Contact />
    </main>
  );
}
