import Hero from "@/components/client/Hero";
import ProductsSection from "@/components/client/ProductsSection";
import ServicesSection from "@/components/client/ServicesSection";
import WorksSection from "@/components/client/WorksSection";
import ScrollVelocity from "@/components/ScrollVelocity";

const HomePage = () => {
  return (
    <main className="relative w-full overflow-hidden">
      <Hero />
      <ScrollVelocity
        texts={[
          "✦ ZERO CHEMICALS OR PPD ✦ PURE STEAM-DISTILLED NILGIRI OILS ✦ 48-HOUR MAHOGANY STAIN ✦ HANDMADE IN FRESH BATCHES ✦ HYPOALLERGENIC & PREGNANCY SAFE",
        ]}
        velocity={50}
        className="fill-primary text-3xl font-heading font-bold tracking-widest uppercase mt-20"
        numCopies={10}
      />
      <ProductsSection />
      <ScrollVelocity
        texts={[
          "✦ BESPOKE BENGALI BRIDAL KOLKA ✦ 100% PURE LAWSONIA ✦ SACRED GAYE HOLUD ARTISTRY ✦ COMPLIMENTARY PATCH-TEST",
        ]}
        numCopies={10}
        velocity={45}
        className="px-3 text-foreground font-heading font-bold text-3xl sm:text-5xl md:text-7xl tracking-wider uppercase"
        parallaxClassName="py-1.5 sm:py-2"
      />
      <ScrollVelocity
        texts={[
          "✦ GUARANTEED 48H CEREMONIAL STAIN ✦ 14-DAY WEAR THROUGH BOU BHAT ✦ SHANKHA-POLA SAFE ✦ ADORNED 850+ BENGALI BRIDES",
        ]}
        numCopies={10}
        velocity={-45}
        className="px-3 text-primary font-heading font-bold text-3xl sm:text-5xl md:text-7xl tracking-wider uppercase"
        parallaxClassName="py-1.5 sm:py-2"
      />
      <ServicesSection />
      <WorksSection />
    </main>
  );
};

export default HomePage;
