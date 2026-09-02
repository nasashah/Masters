import type { Metadata } from "next";
import Link from "next/link";
import Services from "@/components/Services";
import Experience from "@/components/Experience";

export const metadata: Metadata = {
  title: "Services | Masters Barber Lounge",
  description:
    "Precision cuts, hot towel shaves, and beard artistry at Masters Barber Lounge. See every service, and what the chair feels like.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="relative">
        <div className="mx-auto max-w-4xl px-6 pb-4 pt-16 text-center sm:px-10">
          <span className="text-xs uppercase tracking-[0.4em] text-gold-soft">
            The Craft
          </span>
          <h1 className="mt-6 text-balance font-serif text-4xl italic text-foreground sm:text-5xl">
            What We Do, and How It Feels
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-balance leading-relaxed text-muted">
            Every service at Masters is built around the same idea: nothing
            rushed, nothing generic. Below is the craft. For exact pricing,
            see our{" "}
            <Link
              href="/menu"
              className="text-gold-soft underline decoration-gold/40 underline-offset-4 hover:text-gold"
            >
              full menu
            </Link>
            .
          </p>
        </div>
      </section>

      <Services />
      <Experience />
    </>
  );
}
