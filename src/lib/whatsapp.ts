import { parsePrice } from "@/lib/utils";
import type { CartItem } from "@/store/useCartStore";

export const WHATSAPP_PHONE = "919830000000";

export function buildWhatsAppUrl(message: string, phone: string = WHATSAPP_PHONE): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

export function formatCartItemsForWhatsApp(items: CartItem[]): string {
  return items
    .map(
      (i) =>
        `• ${i.quantity}x ${i.product.name} (${i.product.price}) = ₹${
          parsePrice(i.product.price) * i.quantity
        }`,
    )
    .join("\n");
}
