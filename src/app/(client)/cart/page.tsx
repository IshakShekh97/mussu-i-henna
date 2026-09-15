"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CartCheckoutForm from "@/components/cart/CartCheckoutForm";
import CartCouponInput from "@/components/cart/CartCouponInput";
import CartItemList from "@/components/cart/CartItemList";
import CartOrderSuccess from "@/components/cart/CartOrderSuccess";
import CartOrderSummary from "@/components/cart/CartOrderSummary";
import { Badge } from "@/components/ui/badge";
import { type CheckoutValues, checkoutSchema } from "@/lib/schemas";
import { parsePrice } from "@/lib/utils";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useCartStore } from "@/store/useCartStore";

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal, clearCart } =
    useCartStore();

  const [mounted, setMounted] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState(0);
  const [couponError, setCouponError] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      address: "",
      city: "Kolkata",
      postalCode: "",
      notes: "",
    },
  });

  if (!mounted) return null;

  const currentSubtotal = subtotal();
  const shippingFee = currentSubtotal >= 500 || currentSubtotal === 0 ? 0 : 50;
  const discountAmount = Math.round((currentSubtotal * discountPercent) / 100);
  const finalTotal = Math.max(
    0,
    currentSubtotal + shippingFee - discountAmount,
  );

  const applyCoupon = () => {
    if (couponCode.trim().toUpperCase() === "BRIDAL10") {
      setDiscountPercent(10);
      setCouponApplied(true);
      setCouponError("");
    } else {
      setCouponError("Invalid promo code. Try 'BRIDAL10' for 10% off!");
    }
  };

  const onSubmit = async (data: CheckoutValues) => {
    const generatedOrderId = `MH-${Date.now().toString().slice(-6)}`;
    const itemsList = items
      .map(
        (i) =>
          `• ${i.quantity}x ${i.product.name} (${i.product.price}) = ₹${parsePrice(i.product.price) * i.quantity}`,
      )
      .join("\n");

    const message = `*NEW ATELIER ORDER: ${generatedOrderId}*\n\n*Client Details:*\n• Name: ${data.fullName}\n• Phone: ${data.phone}\n• Email: ${data.email}\n• Address: ${data.address}, ${data.city} - ${data.postalCode}\n${data.notes ? `• Notes: ${data.notes}\n` : ""}\n*Order Items:*\n${itemsList}\n\nSubtotal: ₹${currentSubtotal}\nDiscount: ₹${discountAmount}\nShipping: ${shippingFee === 0 ? "FREE" : `₹${shippingFee}`}\n*Final Total: ₹${finalTotal}*\n\nPlease confirm dispatch dates and payment details!`;

    const whatsappUrl = buildWhatsAppUrl(message);
    window.open(whatsappUrl, "_blank");

    setOrderConfirmed(generatedOrderId);
    clearCart();
  };

  return (
    <main className="relative w-full min-h-screen pt-24 pb-20 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden">
      <div className="absolute top-24 left-1/4 -translate-x-1/2 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 right-1/4 w-96 h-96 bg-amber-500/6 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto space-y-8">
        <div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span>Continue Shopping</span>
          </Link>

          <Badge
            variant="outline"
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border-primary/20 text-primary text-xs font-mono tracking-wider uppercase mb-2 w-fit"
          >
            <Sparkles className="size-3" />
            <span>ATELIER CHECKOUT | 01</span>
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
            SHOPPING BAG &amp; CHECKOUT
          </h1>
        </div>

        {orderConfirmed ? (
          <CartOrderSuccess orderId={orderConfirmed} />
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start"
          >
            <div className="lg:col-span-7 space-y-6">
              <CartItemList
                items={items}
                updateQuantity={updateQuantity}
                removeItem={removeItem}
              />

              {items.length > 0 && (
                <CartCheckoutForm register={register} errors={errors} />
              )}
            </div>

            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
              <CartCouponInput
                couponCode={couponCode}
                setCouponCode={setCouponCode}
                applyCoupon={applyCoupon}
                couponApplied={couponApplied}
                couponError={couponError}
              />

              <CartOrderSummary
                subtotal={currentSubtotal}
                shippingFee={shippingFee}
                discountAmount={discountAmount}
                finalTotal={finalTotal}
                isSubmitting={isSubmitting}
                itemCount={items.length}
              />
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
