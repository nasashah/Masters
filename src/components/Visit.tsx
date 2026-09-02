import Link from "next/link";

export default function Visit() {
  return (
    <section className="relative border-t border-hairline bg-background-elevated">
      <div className="mx-auto max-w-4xl px-6 py-28 text-center sm:px-10">
        <h2 className="text-balance font-serif text-4xl italic text-foreground sm:text-5xl">
          Where the outside world stays outside.
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-balance leading-relaxed text-muted">
          Every visit feels like coming back, even the first time. Reserve
          your chair, or walk in and see who&rsquo;s free.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <a
            href="tel:+15206385341"
            className="rounded-full bg-gold px-8 py-3 text-sm uppercase tracking-[0.25em] text-black transition-transform hover:scale-[1.03]"
          >
            Call to Book
          </a>
          <Link
            href="/menu"
            className="rounded-full border border-hairline px-8 py-3 text-sm uppercase tracking-[0.25em] text-foreground transition-colors hover:border-gold hover:text-gold-soft"
          >
            See the Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
