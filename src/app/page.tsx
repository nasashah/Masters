import Link from "next/link";
import Hero from "@/components/Hero";
import Regulars from "@/components/Regulars";
import Visit from "@/components/Visit";

const explore = [
  {
    href: "/about",
    label: "About",
    body: "Since 2020, a room built around one idea: you are the only person in it who matters.",
  },
  {
    href: "/services",
    label: "Services",
    body: "Every cut, shave, and trim, treated as a ritual rather than a routine.",
  },
  {
    href: "/gallery",
    label: "Gallery",
    body: "A look inside the chairs, the light, and the details that make Masters feel like Masters.",
  },
  {
    href: "/blog",
    label: "Journal",
    body: "Notes on grooming, style, and the craft, from the chair.",
  },
];

export default function Home() {
  return (
    <>
      <Hero />

      <section className="relative border-t border-hairline">
        <div className="mx-auto max-w-6xl px-6 py-24 sm:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs uppercase tracking-[0.4em] text-gold-soft">
              Never Just a Haircut
            </span>
            <p className="mt-6 text-balance font-serif text-3xl italic leading-relaxed text-foreground sm:text-4xl">
              At Masters, a haircut is forty-five uninterrupted minutes where
              someone&rsquo;s full attention belongs to you and nothing else.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-block text-sm uppercase tracking-[0.2em] text-gold-soft underline decoration-gold/40 underline-offset-4 hover:text-gold"
            >
              Read Our Philosophy
            </Link>
          </div>

          <div className="mt-16 grid gap-px overflow-hidden rounded-2xl border border-hairline bg-hairline sm:grid-cols-2 lg:grid-cols-4">
            {explore.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-background-elevated p-8 transition-colors hover:bg-background"
              >
                <h3 className="font-serif text-xl italic text-gold-soft">
                  {item.label}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.body}
                </p>
                <span className="mt-4 inline-block text-xs uppercase tracking-[0.2em] text-gold transition-transform group-hover:translate-x-1">
                  Explore &rarr;
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Regulars />
      <Visit />
    </>
  );
}
