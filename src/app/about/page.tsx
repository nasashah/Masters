import type { Metadata } from "next";
import Philosophy from "@/components/Philosophy";

export const metadata: Metadata = {
  title: "About | Masters Barber Lounge",
  description:
    "Since 2020, Masters Barber Lounge has been a sanctuary for the modern gentleman: precision, patience, and a room built to make you exhale.",
};

export default function AboutPage() {
  return (
    <>
      <section className="relative">
        <div className="mx-auto max-w-4xl px-6 pb-4 pt-16 text-center sm:px-10">
          <span className="text-xs uppercase tracking-[0.4em] text-gold-soft">
            Since 2020
          </span>
          <h1 className="mt-6 text-balance font-serif text-4xl italic text-foreground sm:text-5xl">
            Our Story
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance leading-relaxed text-muted">
            Masters opened with a simple conviction: a barbershop should feel
            like a break from the day, not another stop in it. Every detail,
            from the leather chairs to the hot towels, was chosen to slow
            things down rather than speed them up.
          </p>
        </div>
      </section>

      <Philosophy />

      <section className="relative border-t border-hairline bg-background-elevated">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-24 sm:px-10 md:grid-cols-3">
          <div>
            <span className="font-serif text-2xl italic text-gold-soft">
              Patience
            </span>
            <p className="mt-4 leading-relaxed text-muted">
              No appointment is rushed to make room for the next. Your time
              in the chair is yours alone.
            </p>
          </div>
          <div>
            <span className="font-serif text-2xl italic text-gold-soft">
              Precision
            </span>
            <p className="mt-4 leading-relaxed text-muted">
              Every fade, every line, checked and rechecked. Close enough has
              never been good enough here.
            </p>
          </div>
          <div>
            <span className="font-serif text-2xl italic text-gold-soft">
              Consistency
            </span>
            <p className="mt-4 leading-relaxed text-muted">
              The same care, the same attention, whether it is your first
              visit or your fiftieth.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
