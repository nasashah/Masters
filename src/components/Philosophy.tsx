export default function Philosophy() {
  return (
    <section id="philosophy" className="relative border-t border-hairline">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-28 sm:px-10 md:grid-cols-[0.9fr_1.1fr] md:items-center">
        <div className="relative">
          <span className="text-xs uppercase tracking-[0.4em] text-gold-soft">
            The Philosophy
          </span>
          <h2 className="mt-6 text-balance font-serif text-4xl italic leading-tight text-foreground sm:text-5xl">
            Never just a haircut.
          </h2>
          <div className="mt-8 h-px w-24 bg-gold/60" />
        </div>

        <div className="space-y-6 text-lg leading-relaxed text-muted">
          <p>
            At Masters, a haircut is forty-five uninterrupted minutes where
            someone&rsquo;s full attention belongs to you and nothing else.
            The dark wood, the brass fixtures, the low amber light pooling
            over cracked-leather chairs older than half our clients: none of
            it is decoration. It&rsquo;s a room built to make you exhale.
          </p>
          <p>
            We don&rsquo;t rush the lather. We don&rsquo;t glance at the
            clock. Every towel is warmed before it touches your skin, every
            blade drawn slow enough to feel deliberate. This is what it
            means to be looked after by someone who has spent years
            mastering exactly this: the fade, the line, the edge of a
            straight razor against a jaw.
          </p>
          <p className="font-serif text-2xl italic text-foreground">
            You don&rsquo;t come to Masters to check a box. You come because
            for one hour, you are the only person in the room who matters.
          </p>
        </div>
      </div>
    </section>
  );
}
