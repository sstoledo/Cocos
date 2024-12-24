import { Bebas_Neue } from "next/font/google";
import { Lato } from "next/font/google";

export const TitleFont = Bebas_Neue({
  subsets: ["latin"],
  weight: "400"
});

export const BodyFont = Lato({
  subsets: ["latin"],
  weight: ["400", "700"]
});
