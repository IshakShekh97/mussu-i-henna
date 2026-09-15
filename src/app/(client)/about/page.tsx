import type { Metadata } from "next";
import ArtistHero from "@/components/about/ArtistHero";
import WorksCarousel3D from "@/components/about/WorksCarousel3D";

export const metadata: Metadata = {
  title: "About Mussu // Master Henna Artist & Bengali Bridal Atelier",
  description:
    "Discover the story of Mussu Shekh, founder and master bridal mehndi artist specializing in bespoke Bengali Kolka, 100% organic Bengal Lawsonia paste, and sacred ceremonial adornments.",
};

export default function AboutPage() {
  return (
    <main className="relative w-full overflow-hidden">
      <ArtistHero />
      <WorksCarousel3D />
    </main>
  );
}
