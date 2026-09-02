import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | Masters Barber Lounge",
  description:
    "A look inside Masters Barber Lounge: the chairs, the light, and the details.",
};

const frames = [
  { label: "The Chairs", tall: true },
  { label: "Hot Towel Ritual" },
  { label: "The Back Bar" },
  { label: "Fresh Fades" },
  { label: "The Details" },
  { label: "The Wait", tall: true },
  { label: "Straight Razor" },
  { label: "The Lounge" },
];

export default function GalleryPage() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-4xl px-6 pb-4 pt-16 text-center sm:px-10">
        <span className="text-xs uppercase tracking-[0.4em] text-gold-soft">
          The Gallery
        </span>
        <h1 className="mt-6 text-balance font-serif text-4xl italic text-foreground sm:text-5xl">
          A Look Inside
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-balance leading-relaxed text-muted">
          The chairs, the light, and the details that make Masters feel like
          Masters. Photography from our Tucson lounge is coming soon.
        </p>
      </div>

      <div className="mx-auto max-w-6xl px-6 py-16 sm:px-10">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {frames.map((frame) => (
            <div
              key={frame.label}
              className={`group relative flex items-center justify-center overflow-hidden rounded-xl border border-hairline bg-background-elevated ${
                frame.tall ? "row-span-2 aspect-[3/4]" : "aspect-square"
              }`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(201,162,75,0.12),transparent_70%)]" />
              <span className="relative text-center text-xs uppercase tracking-[0.3em] text-muted">
                {frame.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
