import type { Metadata } from "next";
import Menu from "@/components/Menu";

export const metadata: Metadata = {
  title: "Menu | Masters Barber Lounge",
  description:
    "Full pricing for haircuts, hot towel shaves, beard trims, and packages at Masters Barber Lounge.",
};

export default function MenuPage() {
  return <Menu />;
}
