import MenuPdfViewer from "@/components/MenuPdfViewer";

const menu = [
  {
    name: "Regular Haircut",
    price: "$45",
    body: "A great haircut can do wonders for your self esteem and overall demeanor. Whether you're looking for a brand new style or just a trim, we've got you covered.",
  },
  {
    name: "Junior Haircut",
    price: "$40",
    body: "For the younger man, 12 years & under. Includes cut and style.",
  },
  {
    name: "Senior Haircut",
    price: "$43",
    body: "Haircuts for ages 65 and older. Will have you walking out of here looking 10 years younger.",
  },
  {
    name: "Straight Razor Head Shave",
    price: "$35",
    body: "A facial for the head. New life via a hot towel head shave with a straight edge razor & an invigorating scalp massage.",
  },
  {
    name: "Signature Transformation",
    price: "$75",
    body: "Been 2 to 3 months since your last cut? This one-hour service brings your style back to life: precise cutting, tailored shaping, and a polished finish that restores confidence.",
  },
  {
    name: "Nose or Ear Waxing",
    price: "$10",
    body: "Quick & painless, guys.",
  },
  {
    name: "Facial",
    price: "$45",
    body: "Feeling weathered? Our facial service will smooth and rejuvenate the skin.",
  },
  {
    name: "Standard Beard Trim",
    price: "$28",
    body: "A full beard clean-up with clippers only.",
  },
  {
    name: "Deluxe Beard Trim",
    price: "$35",
    body: "Your beard, meticulously sculpted, shaped and detailed to compliment your features, finished off with a straight razor.",
  },
  {
    name: "Classic Hot Towel Shave",
    price: "$48",
    body: "High quality products, a soothing experience: a man's version of spoiling himself with that little bit of extra he deserves.",
  },
  {
    name: "Haircut and Shave",
    price: "$88",
    body: "A relaxing straight razor shave following the haircut: steam towels, face massage, finished with a cold towel and refreshing aftershave.",
  },
  {
    name: "VIP Package",
    price: "$130",
    body: "The best that Masters has to offer. Precision haircut, traditional hot towel shave & a rejuvenating facial treatment. Leave looking and feeling like a million bucks.",
    featured: true,
  },
];

export default function Menu() {
  return (
    <section
      id="menu"
      className="relative border-t border-hairline bg-background-elevated"
    >
      <div className="mx-auto max-w-6xl px-6 py-28 sm:px-10">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-xs uppercase tracking-[0.4em] text-gold-soft">
            The Menu
          </span>
          <h2 className="mt-6 text-balance font-serif text-4xl italic text-foreground sm:text-5xl">
            Every price, every ritual.
          </h2>
          <p className="mt-4 text-muted">
            Prices current as of our latest menu update. View the full
            printed menu below, or download it for your records.
          </p>
        </div>

        {/* embedded PDF menu, rendered to canvas so it displays inline on every device */}
        <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-gold/30 bg-black/40 p-3 shadow-[0_0_60px_-15px_rgba(201,162,75,0.35)]">
          <MenuPdfViewer src="/masters-menu.pdf" />
        </div>

        <div className="mt-6 flex justify-center">
          <a
            href="/masters-menu.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm uppercase tracking-[0.2em] text-gold-soft underline decoration-gold/40 underline-offset-4 hover:text-gold"
          >
            Open Full-Size Menu (PDF)
          </a>
        </div>

        {/* accessible / mobile-friendly text menu */}
        <div className="mx-auto mt-24 max-w-3xl divide-y divide-hairline border-y border-hairline">
          {menu.map((item) => (
            <div
              key={item.name}
              className={`flex flex-col gap-2 py-6 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6 ${
                item.featured ? "text-gold-soft" : ""
              }`}
            >
              <div className="flex flex-1 items-baseline gap-4">
                <h3 className="font-serif text-xl sm:text-2xl">
                  {item.name}
                </h3>
                <span className="hidden flex-1 border-b border-dotted border-hairline sm:block" />
              </div>
              <span className="font-serif text-xl italic text-gold sm:text-2xl">
                {item.price}
              </span>
              <p className="basis-full text-sm leading-relaxed text-muted sm:basis-auto sm:max-w-xs sm:text-right">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
