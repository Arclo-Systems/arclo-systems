import { Poppins, Dongle } from "next/font/google";

export const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const dongle = Dongle({
  variable: "--font-dongle",
  subsets: ["latin"],
  weight: ["700"],
  display: "swap",
});
