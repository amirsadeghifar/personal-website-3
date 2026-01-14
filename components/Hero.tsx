export default function Hero() {
  return (
    <section className="flex flex-col items-center justify-center pt-20 pb-16 px-4">
      {/* Decorative line */}
      <div className="w-16 h-1 bg-muted mb-8" />

      {/* Main heading */}
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-normal text-center mb-4 text-heading">
        Amir Sadeghifar
      </h1>

      {/* Subtitle */}
      <p className="text-muted-foreground text-base md:text-lg text-center max-w-md">
        software developer
        <br />
        crafting digital experiences
      </p>
    </section>
  );
}
