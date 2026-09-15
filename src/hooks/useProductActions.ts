"use client";

import { useCallback, useState } from "react";
import type { Product } from "@/data/products";
import { useCartStore } from "@/store/useCartStore";

export function useProductActions() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleAddToCart = useCallback(
    (product: Product, e?: React.MouseEvent) => {
      e?.stopPropagation();
      useCartStore.getState().addItem(product);
      setToastMessage(`Added "${product.name}" to your bag ✨`);
      setTimeout(() => {
        setToastMessage(null);
      }, 3500);
    },
    [],
  );

  const closeQuickView = useCallback(() => {
    setSelectedProduct(null);
  }, []);

  const openQuickView = useCallback((product: Product) => {
    setSelectedProduct(product);
  }, []);

  return {
    toastMessage,
    selectedProduct,
    handleAddToCart,
    openQuickView,
    closeQuickView,
  };
}
