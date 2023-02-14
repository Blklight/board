import { IBM_Plex_Serif } from "@next/font/google";

const ibmPlexSerif = IBM_Plex_Serif({
  weight: ["200", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export default ibmPlexSerif;
