export { cn } from "cn";

/**
 * Extracts numeric price value from currency strings like "₹18", "₹1,200", etc.
 */
export function parsePrice(priceStr: string | number): number {
  if (typeof priceStr === "number") return priceStr;
  return Number(priceStr.replace(/[^0-9.]/g, "")) || 0;
}

/**
 * Formats a numeric amount as Indian Rupee (e.g. ₹1,200).
 */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString("en-IN")}`;
}
