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
        i like building things - mostly digital

        <br />
        
        i fixate on details in interfaces and i think craft still matters
        </p>
      </div>
    </section>
  );
}
