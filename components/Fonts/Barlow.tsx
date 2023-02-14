import { Barlow } from "@next/font/google";

const barlow = Barlow({
  weight: ["200", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export default barlow;
