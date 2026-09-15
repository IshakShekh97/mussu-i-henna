import CartDrawer from "@/components/layout/CartDrawer";
import Footer from "@/components/layout/Footer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer />
      <CartDrawer />
    </>
  );
}
