import CartDrawer from "@/components/client/CartDrawer";
import Footer from "@/components/client/Footer";

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
