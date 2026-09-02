import Image from "next/image";
import logoMark from "../../public/logo-mark.png";

export function LogoMark({ size = 64 }: { size?: number }) {
  return (
    <Image
      src={logoMark}
      alt="Masters Barber Lounge emblem"
      width={size}
      height={size}
      className="rounded-full"
      priority
    />
  );
}

export default function Logo({
  variant = "horizontal",
  className = "",
}: {
  variant?: "horizontal" | "stacked";
  className?: string;
}) {
  if (variant === "stacked") {
    return (
      <div className={`flex flex-col items-center text-center ${className}`}>
        <LogoMark size={88} />
        <span className="mt-4 font-serif text-4xl italic text-foreground">
          Masters
        </span>
        <span className="mt-1 text-xs uppercase tracking-[0.5em] text-gold-soft">
          Barber Lounge
        </span>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={40} />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-2xl italic text-foreground">
          Masters
        </span>
        <span className="mt-1 text-[0.6rem] uppercase tracking-[0.4em] text-gold-soft">
          Barber Lounge
        </span>
      </span>
    </div>
  );
}
