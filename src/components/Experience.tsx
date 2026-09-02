const steps = [
  {
    numeral: "I",
    title: "Sink in.",
    body: "The chair tilts back on its own weight, worn smooth by a thousand men before you. Overhead, a single pendant light throws a warm circle across the ceiling, the kind of light that makes you close your eyes without meaning to.",
  },
  {
    numeral: "II",
    title: "Feel the heat.",
    body: "A towel, steaming, unfolds over your face. The world goes soft at the edges. Somewhere behind you, glass bottles click against a marble counter: pomade, tonic, bay rum, the quiet choreography of a barber who's done this ten thousand times and still treats yours like the first.",
  },
  {
    numeral: "III",
    title: "Leave changed, not just trimmed.",
    body: "You stand up lighter. Not because of the weight of hair on the floor, but because for a little while, nothing was asked of you except to sit still and be taken care of.",
  },
];

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative border-t border-hairline bg-background-elevated"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-gold-soft">
            The Chair Experience
          </span>
          <h2 className="mt-6 text-balance font-serif text-4xl italic text-foreground sm:text-5xl">
            Effortless, from the moment you sit.
          </h2>
        </div>

        <div className="relative mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
          <div className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent md:block" />
          {steps.map((step) => (
            <div key={step.numeral} className="relative flex flex-col items-center text-center">
              <span className="font-serif text-lg italic text-gold">
                {step.numeral}
              </span>
              <h3 className="mt-4 font-serif text-2xl text-foreground">
                {step.title}
              </h3>
              <p className="mt-4 max-w-xs text-balance leading-relaxed text-muted">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
