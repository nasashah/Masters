const services = [
  {
    title: "The Signature Cut",
    body: "Precision without the clinical feel. Every fade is blended by hand, checked in the mirror from three angles before we call it finished, because “close enough” has no place in this chair.",
  },
  {
    title: "The Hot Towel Shave",
    body: "Three towels, each hotter than the last, softening skin that's forgotten what a real shave feels like. Straight razor, steady hand, and a silence in the room that says everything is under control.",
  },
  {
    title: "The Beard Sculpt",
    body: "Not a trim, an architecture. We work with the grain of your face, not against it, until the line looks like it was always meant to be there.",
  },
  {
    title: "The Full Experience",
    body: "Cut, shave, hot towel, tonic: the whole ritual, back to back, no rushing between steps. Come in carrying the week on your shoulders. Leave with none of it.",
  },
];

export default function Services() {
  return (
    <section className="relative border-t border-hairline">
      <div className="mx-auto max-w-6xl px-6 py-28 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-gold-soft">
            The Craft
          </span>
          <h2 className="mt-6 text-balance font-serif text-4xl italic text-foreground sm:text-5xl">
            Every service, a ritual.
          </h2>
        </div>

        <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-background-elevated p-10 transition-colors hover:bg-background"
            >
              <h3 className="font-serif text-2xl text-gold-soft">
                {service.title}
              </h3>
              <p className="mt-4 leading-relaxed text-muted">{service.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
