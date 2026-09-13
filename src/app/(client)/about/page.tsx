import type { Metadata } from "next";
import ArtistHero from "@/components/client/ArtistHero";
import WorksCarousel3D from "@/components/client/WorksCarousel3D";
import ScrollVelocity from "@/components/ScrollVelocity";

export const metadata: Metadata = {
  title: "About Mussu // Master Henna Artist & Bengali Bridal Atelier",
  description:
    "Discover the story of Mussu Shekh, founder and master bridal mehndi artist specializing in bespoke Bengali Kolka, 100% organic Sojat henna paste, and sacred ceremonial adornments.",
};

export default function AboutPage() {
  return (
    <main className="relative w-full overflow-hidden ">
      <ArtistHero />

      {/* ── Ticker: Artisanal Philosophy & Trust Badges ── */}
      <ScrollVelocity
        texts={[
          "✦ 100% ORGANIC LAWSONIA ✦ PURE SOJAT PASTE ✦ ZERO CHEMICAL PRESERVATIVES ✦ HYPOALLERGENIC FOR ALL BRIDES ✦ 48-HOUR MAHOGANY STAIN",
        ]}
        velocity={40}
        className="fill-primary text-2xl sm:text-3xl font-heading font-bold tracking-widest uppercase my-8 sm:my-12 text-primary"
        numCopies={8}
      />

      {/* ── Section 2: Artisanal Story & Bengali Heritage Narrative ── */}
      <section className="relative w-full py-16 sm:py-24 px-4 sm:px-8 md:px-12 lg:px-16 2xl:px-20 select-none">
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row items-start justify-between gap-10 md:gap-16">
          {/* Left Column: Script & Philosophy */}
          <div className="w-full md:w-5/12 flex flex-col items-start">
            <span className="text-xs font-mono tracking-[0.25em] uppercase text-primary mb-2">
              {"ঐতিহ্য ও ভালোবাসা | HERITAGE & DEVOTION"}
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-light font-sans tracking-tight text-foreground leading-tight">
              Honoring Generations of{" "}
              <span className="font-serif italic font-normal text-primary">
                Bengali Bridal
              </span>{" "}
              Rituals.
            </h2>
            <p className="font-serif italic text-base sm:text-lg text-muted-foreground mt-4 leading-relaxed">
              &ldquo;In Bengal, bridal mehndi is not merely a design — it is a
              sacred blessing, a visual prayer worn on the hands of the bride as
              she steps into a new life.&rdquo;
            </p>
          </div>

          {/* Right Column: Detailed Narrative with Monospace & Sans-Serif Contrast */}
          <div className="w-full md:w-7/12 flex flex-col gap-6 text-sm sm:text-base font-sans text-muted-foreground leading-relaxed">
            <p>
              Founded by{" "}
              <strong className="text-foreground">Mussu Shekh</strong>, the
              Mussu Henna Atelier is rooted in an unwavering dedication to
              authentic Bengali ceremonial artistry. From intricate floral Kolka
              vines for Gaye Holud to elaborate Shankha-Pola arm suites for
              traditional Biye, each pattern is drafted entirely freehand,
              tailored specifically to the bride&apos;s story and bridal attire.
            </p>
            <p>
              Unlike mass-market cones loaded with synthetic chemical dyes and
              toxic PPD, every batch of Mussu Henna is freshly mixed in-house
              using triple-sifted organic Sojat leaves, steam-distilled Nilgiri
              eucalyptus oils, and pure cane sugar. This guarantees a safe,
              soothing application with a rich, natural mahogany stain that
              deepens over 48 hours and lasts through Bou Bhat celebrations.
            </p>

            {/* Quick Atelier Metric Pillars */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border/50">
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-foreground">
                  850+
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-1">
                  Brides Adorned
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-primary">
                  100%
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-1">
                  Organic Sojat
                </div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-heading font-black text-foreground">
                  48h
                </div>
                <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground mt-1">
                  Peak Rich Stain
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 3: 3D Curved/Arc Works Carousel (Image 2 Style with Zero Modals) ── */}
      <WorksCarousel3D />
    </main>
  );
}
