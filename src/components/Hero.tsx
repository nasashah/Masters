import Image from "next/image";
import Link from "next/link";
import logoFull from "../../public/logo-full.png";

export default function Hero() {
  return (
    <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
      {/* ambient light + vignette, standing in for photography */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10%] h-[60rem] w-[60rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[160px]" />
        <div className="absolute inset-0 vignette" />
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, var(--gold) 0px, transparent 1px, transparent 140px)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 py-16 text-center">
        <div className="animate-fade-up">
          <Image
            src={logoFull}
            alt="Masters Barber Lounge"
            width={260}
            height={228}
            className="h-auto w-48 sm:w-56"
            priority
          />
        </div>

        <span
          className="animate-fade-up mt-6 text-xs uppercase tracking-[0.5em] text-gold-soft"
          style={{ animationDelay: "60ms" }}
        >
          Est. Sanctuary for the Modern Gentleman
        </span>

        <h1
          className="animate-fade-up mt-8 text-balance font-serif text-5xl leading-[1.1] text-foreground sm:text-6xl md:text-7xl"
          style={{ animationDelay: "120ms" }}
        >
          A door that closes
          <br />
          <span className="italic gold-gradient-text">the world out.</span>
        </h1>

        <p
          className="animate-fade-up mt-8 max-w-xl text-balance text-lg leading-relaxed text-muted"
          style={{ animationDelay: "260ms" }}
        >
          Push through, and the noise drops away. Leather creaks, a blade
          catches the light, and the low hum of clippers settles into
          something like a heartbeat. This is Masters. Not a stop on your
          way somewhere else, but the place you were headed all along.
        </p>

        <div
          className="animate-fade-up mt-12 flex flex-col gap-4 sm:flex-row"
          style={{ animationDelay: "380ms" }}
        >
          <Link
            href="/contact"
            className="rounded-full bg-gold px-8 py-3 text-sm uppercase tracking-[0.25em] text-black transition-transform hover:scale-[1.03]"
          >
            Claim Your Chair
          </Link>
          <Link
            href="/menu"
            className="rounded-full border border-hairline px-8 py-3 text-sm uppercase tracking-[0.25em] text-foreground transition-colors hover:border-gold hover:text-gold-soft"
          >
            View the Menu
          </Link>
        </div>
      </div>
    </section>
  );
}
