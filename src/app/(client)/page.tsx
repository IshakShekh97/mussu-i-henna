import Hero from "@/components/client/Hero";
import ProductsSection from "@/components/client/ProductsSection";
import ServicesSection from "@/components/client/ServicesSection";
import TrustSection from "@/components/client/TrustSection";

const HomePage = () => {
  return (
    <main className="relative w-full overflow-hidden">
      <Hero />
      <ProductsSection />
      <TrustSection />
      <ServicesSection />
    </main>
  );
};

export default HomePage;
