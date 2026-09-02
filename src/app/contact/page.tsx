import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Masters Barber Lounge",
  description:
    "Visit Masters Barber Lounge in Tucson, AZ. Address, phone, and hours.",
};

const hours = [
  { day: "Monday", time: "10:00 AM – 6:00 PM" },
  { day: "Tuesday", time: "9:30 AM – 5:30 PM" },
  { day: "Wednesday", time: "9:30 AM – 6:00 PM" },
  { day: "Thursday", time: "9:30 AM – 6:00 PM" },
  { day: "Friday", time: "9:30 AM – 6:00 PM" },
  { day: "Saturday", time: "9:00 AM – 4:00 PM" },
  { day: "Sunday", time: "10:00 AM – 4:00 PM" },
];

const address = "6360 N Campbell Ave Suite 110, Tucson, AZ 85718";
const phone = "(520) 638-5341";
const phoneHref = "tel:+15206385341";

export default function ContactPage() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-4xl px-6 pb-4 pt-16 text-center sm:px-10">
        <span className="text-xs uppercase tracking-[0.4em] text-gold-soft">
          Visit Us
        </span>
        <h1 className="mt-6 text-balance font-serif text-4xl italic text-foreground sm:text-5xl">
          Find Your Chair
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-balance leading-relaxed text-muted">
          Reserve ahead, or walk in and see who&rsquo;s free. Either way, the
          door closes the world out the moment you step through it.
        </p>
      </div>

      <div className="mx-auto grid max-w-5xl gap-12 px-6 py-16 sm:px-10 md:grid-cols-2">
        <div className="space-y-10">
          <div>
            <h2 className="font-serif text-2xl italic text-gold-soft">
              Address
            </h2>
            <p className="mt-3 leading-relaxed text-muted">{address}</p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                "Masters Barber Lounge, " + address
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-block text-sm uppercase tracking-[0.2em] text-gold-soft underline decoration-gold/40 underline-offset-4 hover:text-gold"
            >
              Get Directions
            </a>
          </div>

          <div>
            <h2 className="font-serif text-2xl italic text-gold-soft">
              Phone
            </h2>
            <a
              href={phoneHref}
              className="mt-3 inline-block text-lg text-muted hover:text-gold-soft"
            >
              {phone}
            </a>
          </div>

          <div>
            <h2 className="font-serif text-2xl italic text-gold-soft">
              Hours
            </h2>
            <dl className="mt-4 space-y-2">
              {hours.map((row) => (
                <div
                  key={row.day}
                  className="flex justify-between border-b border-hairline pb-2 text-sm"
                >
                  <dt className="uppercase tracking-[0.15em] text-muted">
                    {row.day}
                  </dt>
                  <dd className="text-foreground">{row.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <a
            href={phoneHref}
            className="inline-block rounded-full bg-gold px-8 py-3 text-sm uppercase tracking-[0.25em] text-black transition-transform hover:scale-[1.03]"
          >
            Call to Book
          </a>
        </div>

        <div className="overflow-hidden rounded-2xl border border-hairline">
          <iframe
            title="Masters Barber Lounge location"
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              "Masters Barber Lounge, " + address
            )}&output=embed`}
            className="h-full min-h-[420px] w-full grayscale invert-[0.92] contrast-[1.1]"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}
