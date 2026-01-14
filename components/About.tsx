export default function About() {
  return (
    <section className="pt-0 pb-16 px-4 max-w-2xl mx-auto">
      {/* Decorative line */}
      <div className="w-12 h-0.5 bg-muted mb-16 mx-auto" />

      <h2 className="text-2xl md:text-2xl font-normal mb-8 text-heading">
        About
      </h2>

      <div className="space-y-6 text-muted-foreground leading-relaxed">
        <p>
          i&apos;m a full-stack software engineer with a passion for design and
          crafting digital experiences that feel intuitive and intentional

        </p>

        <p>
          i care about the details—the subtle interactions, the flow, the moments
          that make software feel human
        </p>

        <p>
          outside of building things, i stay active through sports, explore the
          outdoors, and embrace new adventures whenever i can
        </p>
      </div>
    </section>
  );
}
