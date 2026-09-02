import Link from "next/link";
import Logo from "@/components/Logo";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/menu", label: "Menu" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-hairline">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 sm:px-10 md:grid-cols-3">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
            A sanctuary for the modern gentleman. Precision cuts, hot towel
            shaves, and beard artistry in Tucson, AZ.
          </p>
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-gold-soft">
            Explore
          </span>
          <div className="mt-4 flex flex-col gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted hover:text-gold-soft"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-gold-soft">
            Visit
          </span>
          <div className="mt-4 space-y-2 text-sm text-muted">
            <p>6360 N Campbell Ave Suite 110</p>
            <p>Tucson, AZ 85718</p>
            <a href="tel:+15206385341" className="block hover:text-gold-soft">
              (520) 638-5341
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-hairline px-6 py-6 text-center sm:px-10">
        <p className="text-xs uppercase tracking-[0.3em] text-muted">
          &copy; {new Date().getFullYear()} Masters Barber Lounge. All rights
          reserved.
        </p>
      </div>
    </footer>
  );
}
