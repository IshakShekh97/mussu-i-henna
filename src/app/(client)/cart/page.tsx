"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  ArrowLeft,
  CheckCircle2,
  Minus,
  Package,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
  Truck,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type CheckoutValues, checkoutSchema } from "@/lib/schemas";
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
    // Client-side demo simulation for now; ready for server actions
    const generatedOrderId = `MH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    const whatsappSummary = encodeURIComponent(
      `Hello Mussu!\n\n*NEW ATELIER ORDER: ${generatedOrderId}*\n\n*Customer Details:*\n• Name: ${data.fullName}\n• Phone: ${data.phone}\n• Email: ${data.email}\n• Address: ${data.address}, ${data.city} - ${data.postalCode}\n\n*Order Items:*\n${items
        .map(
          (i) =>
            `• ${i.quantity}x ${i.product.name} (${i.product.price}) = ₹${(Number(i.product.price.replace(/[^0-9.]/g, "")) || 0) * i.quantity}`,
        )
        .join(
          "\n",
        )}\n\nSubtotal: ₹${currentSubtotal}\nDiscount: ₹${discountAmount}\nShipping: ${shippingFee === 0 ? "FREE" : `₹${shippingFee}`}\n*Final Total: ₹${finalTotal}*\n\nPlease confirm dispatch dates and payment details!`,
    );

    // Open WhatsApp order link in new tab
    window.open(`https://wa.me/919830000000?text=${whatsappSummary}`, "_blank");

    setOrderConfirmed(generatedOrderId);
    clearCart();
  };

  return (
    <main className="relative w-full min-h-screen pt-24 pb-20 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden ">
      {/* ── Background Subtle Ambient Lights ── */}
      <div className="absolute top-24 left-1/4 -translate-x-1/2 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-96 right-1/4 w-96 h-96 bg-amber-500/6 rounded-full blur-3xl pointer-events-none" />

      {/* ── Navigation Header ── */}
      <div className="relative z-10 w-full mb-8 sm:mb-10">
        <Link
          href="/shop"
          className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
          <span>Continue Shopping</span>
        </Link>

        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-mono tracking-wider uppercase mb-2 w-fit">
          <Sparkles className="size-3" />
          <span>ATELIER CHECKOUT | 01</span>
        </div>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
          SHOPPING BAG &amp; CHECKOUT
        </h1>
      </div>

      {/* ── Order Confirmation Modal ── */}
      <AnimatePresence>
        {orderConfirmed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-3xl bg-card border border-border p-6 sm:p-8 text-center shadow-2xl"
            >
              <div className="size-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 className="size-8" />
              </div>
              <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground">
                Order Inquiry Dispatched!
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-2 leading-relaxed">
                Thank you! Your order reference is{" "}
                <strong className="text-primary font-mono">
                  {orderConfirmed}
                </strong>
                . We have opened WhatsApp with your exact order summary for
                instant confirmation and dispatch coordination.
              </p>

              <div className="mt-6 flex flex-col gap-2.5">
                <Link
                  href="/track-order"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground py-3 text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
                >
                  <Truck className="size-4" />
                  <span>Track Your Order</span>
                </Link>

                <button
                  type="button"
                  onClick={() => setOrderConfirmed(null)}
                  className="w-full rounded-full border border-border bg-secondary py-2.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                >
                  Close &amp; Return to Atelier
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main Layout ── */}
      {items.length === 0 ? (
        <div className="rounded-3xl border border-border/70 bg-card/70 backdrop-blur-xl p-10 sm:p-16 text-center max-w-2xl mx-auto my-12 shadow-xs">
          <div className="size-20 rounded-full bg-muted/40 text-muted-foreground flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="size-10 stroke-1" />
          </div>
          <h2 className="font-heading text-2xl font-bold text-foreground">
            Your Bag is Empty
          </h2>
          <p className="text-sm text-muted-foreground font-sans mt-2 max-w-md mx-auto">
            You haven&apos;t added any artisanal henna cones, aftercare balms,
            or bridal suites to your bag yet.
          </p>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary text-primary-foreground px-8 py-3 text-xs font-bold uppercase tracking-wider shadow-xs hover:bg-primary/90 transition-all cursor-pointer"
          >
            <Sparkles className="size-4" />
            <span>Explore Artisan Catalog</span>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* ── Left Column: Items List (lg:col-span-7) ── */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            <div className="rounded-3xl border border-border/70 bg-card/85 backdrop-blur-xl p-5 sm:p-7 shadow-xs">
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-border/40">
                <h2 className="font-heading text-lg font-bold text-foreground">
                  Order Items ({items.length})
                </h2>
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-xs font-mono text-muted-foreground hover:text-destructive transition-colors cursor-pointer"
                >
                  Clear Bag
                </button>
              </div>

              <div className="divide-y divide-border/40">
                {items.map(({ product, quantity }) => {
                  const priceNum =
                    Number(product.price.replace(/[^0-9.]/g, "")) || 0;
                  return (
                    <div
                      key={product.id}
                      className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="relative size-16 sm:size-20 rounded-2xl overflow-hidden bg-muted/30 border border-border/50 shrink-0">
                          <Image
                            src={product.image}
                            alt={product.name}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-primary uppercase">
                            {product.category}
                          </span>
                          <h3 className="font-heading text-sm font-bold text-foreground">
                            {product.name}
                          </h3>
                          <div className="text-xs font-mono text-muted-foreground mt-0.5">
                            {product.price} each
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-5">
                        {/* Quantity controls */}
                        <div className="inline-flex items-center border border-border/60 rounded-xl bg-background overflow-hidden">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, quantity - 1)
                            }
                            aria-label="Decrease quantity"
                            className="size-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                          >
                            <Minus className="size-3" />
                          </button>
                          <span className="w-8 text-center font-mono text-xs font-semibold text-foreground">
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(product.id, quantity + 1)
                            }
                            aria-label="Increase quantity"
                            className="size-7 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-pointer"
                          >
                            <Plus className="size-3" />
                          </button>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="font-mono text-sm font-bold text-foreground">
                            ₹{priceNum * quantity}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="text-[11px] font-sans text-muted-foreground hover:text-destructive transition-colors cursor-pointer mt-0.5"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Packaging Assurance Card */}
            <div className="rounded-3xl border border-border/60 bg-muted/20 p-5 sm:p-6 flex items-start gap-4">
              <div className="size-10 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center shrink-0">
                <ShieldCheck className="size-5" />
              </div>
              <div className="text-xs font-sans text-muted-foreground leading-relaxed">
                <strong className="text-foreground font-semibold block text-sm mb-0.5">
                  Artisanal Freshness Guarantee
                </strong>
                Every cone is hand-churned in fresh batches with triple-sifted
                Bengal Lawsonia and Nilgiri eucalyptus oils. Shipped in thermal
                cold-packs for maximum dye longevity.
              </div>
            </div>
          </div>

          {/* ── Right Column: Delivery Form & Order Summary (lg:col-span-5) ── */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Delivery Details Form */}
            <div className="rounded-3xl border border-border/70 bg-card/85 backdrop-blur-xl p-5 sm:p-7 shadow-xs">
              <h2 className="font-heading text-lg font-bold text-foreground pb-3 mb-4 border-b border-border/40">
                Delivery Information
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label
                    htmlFor="checkoutFullName"
                    className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                  >
                    FULL NAME *
                  </label>
                  <input
                    id="checkoutFullName"
                    type="text"
                    placeholder="Debolina Banerjee"
                    {...register("fullName")}
                    className="w-full rounded-xl bg-background border border-border/60 px-3.5 py-2.5 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                  {errors.fullName && (
                    <span className="text-[11px] text-destructive mt-1 block">
                      {errors.fullName.message}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="checkoutEmail"
                      className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                    >
                      EMAIL *
                    </label>
                    <input
                      id="checkoutEmail"
                      type="email"
                      placeholder="debolina@example.com"
                      {...register("email")}
                      className="w-full rounded-xl bg-background border border-border/60 px-3.5 py-2.5 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                    {errors.email && (
                      <span className="text-[11px] text-destructive mt-1 block">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="checkoutPhone"
                      className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                    >
                      PHONE / WHATSAPP *
                    </label>
                    <input
                      id="checkoutPhone"
                      type="tel"
                      placeholder="+91 98300 00000"
                      {...register("phone")}
                      className="w-full rounded-xl bg-background border border-border/60 px-3.5 py-2.5 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                    {errors.phone && (
                      <span className="text-[11px] text-destructive mt-1 block">
                        {errors.phone.message}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="checkoutAddress"
                    className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                  >
                    DELIVERY STREET ADDRESS *
                  </label>
                  <input
                    id="checkoutAddress"
                    type="text"
                    placeholder="Flat 4B, Camac Heritage Mansions, Park Street"
                    {...register("address")}
                    className="w-full rounded-xl bg-background border border-border/60 px-3.5 py-2.5 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all"
                  />
                  {errors.address && (
                    <span className="text-[11px] text-destructive mt-1 block">
                      {errors.address.message}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label
                      htmlFor="checkoutCity"
                      className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                    >
                      CITY *
                    </label>
                    <input
                      id="checkoutCity"
                      type="text"
                      placeholder="Kolkata"
                      {...register("city")}
                      className="w-full rounded-xl bg-background border border-border/60 px-3.5 py-2.5 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                    {errors.city && (
                      <span className="text-[11px] text-destructive mt-1 block">
                        {errors.city.message}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="checkoutPostalCode"
                      className="block text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold mb-1"
                    >
                      PIN CODE *
                    </label>
                    <input
                      id="checkoutPostalCode"
                      type="text"
                      placeholder="700016"
                      {...register("postalCode")}
                      className="w-full rounded-xl bg-background border border-border/60 px-3.5 py-2.5 text-xs sm:text-sm font-sans text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/40 focus:border-primary transition-all"
                    />
                    {errors.postalCode && (
                      <span className="text-[11px] text-destructive mt-1 block">
                        {errors.postalCode.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="pt-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Tag className="size-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        placeholder="Promo code (e.g. BRIDAL10)"
                        className="w-full pl-9 pr-3 py-2 rounded-xl bg-background border border-border/60 text-xs font-mono uppercase text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={applyCoupon}
                      className="px-4 py-2 rounded-xl bg-secondary hover:bg-muted text-foreground text-xs font-semibold tracking-wider uppercase border border-border/60 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                  {couponApplied && (
                    <span className="text-[11px] text-emerald-500 font-mono mt-1 block">
                      ✓ Promo &apos;BRIDAL10&apos; applied (10% off)!
                    </span>
                  )}
                  {couponError && (
                    <span className="text-[11px] text-destructive font-mono mt-1 block">
                      {couponError}
                    </span>
                  )}
                </div>

                {/* Pricing Summary Breakdown */}
                <div className="pt-4 border-t border-border/40 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-mono text-foreground font-semibold">
                      ₹{currentSubtotal}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Cold-Pack Express Delivery</span>
                    <span className="font-mono font-semibold">
                      {shippingFee === 0 ? (
                        <span className="text-emerald-500">FREE</span>
                      ) : (
                        `₹${shippingFee}`
                      )}
                    </span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="flex items-center justify-between text-emerald-500">
                      <span>Promo Discount (10%)</span>
                      <span className="font-mono font-semibold">
                        -₹{discountAmount}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center justify-between text-sm font-bold pt-2 border-t border-border/40 text-foreground">
                    <span>Total Amount</span>
                    <span className="font-mono text-lg text-primary">
                      ₹{finalTotal}
                    </span>
                  </div>
                </div>

                {/* Submit / WhatsApp Order Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-[#160B0F] hover:bg-primary text-white py-3.5 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-xs transition-all duration-200 cursor-pointer active:scale-95 disabled:opacity-50"
                >
                  <Package className="size-4 text-emerald-400" />
                  <span>
                    {isSubmitting
                      ? "Preparing Inquiry..."
                      : "Confirm Order via WhatsApp"}
                  </span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
