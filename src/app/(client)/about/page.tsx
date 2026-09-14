import type { Metadata } from "next";
import ArtistHero from "@/components/client/ArtistHero";
import WorksCarousel3D from "@/components/client/WorksCarousel3D";

export const metadata: Metadata = {
  title: "About Mussu // Master Henna Artist & Bengali Bridal Atelier",
  description:
    "Discover the story of Mussu Shekh, founder and master bridal mehndi artist specializing in bespoke Bengali Kolka, 100% organic Bengal Lawsonia paste, and sacred ceremonial adornments.",
};

export default function AboutPage() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* ── Section 1: Artist Hero & Complete Interactive Story ── */}
      <ArtistHero />

      {/* ── Section 2: 3D Curved/Arc Works Carousel ── */}
      <WorksCarousel3D />
    </main>
  );
}
