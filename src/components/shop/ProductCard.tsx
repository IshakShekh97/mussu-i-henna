"use client";

import { Heart, ShoppingCart } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
  onAddToCart?: (product: Product, e: React.MouseEvent) => void;
  onQuickView?: (product: Product) => void;
}

export default function ProductCard({
  product,
  priority = false,
  onAddToCart,
  onQuickView,
}: ProductCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 20, stiffness: 220, mass: 0.1 };
  const smoothMouseX = useSpring(mouseX, springConfig);
  const smoothMouseY = useSpring(mouseY, springConfig);

  const rotateX = useTransform(smoothMouseY, [-0.5, 0.5], [6, -6]);
  const rotateY = useTransform(smoothMouseX, [-0.5, 0.5], [-6, 6]);

  const productParallaxX = useTransform(smoothMouseX, [-0.5, 0.5], [-12, 12]);
  const productParallaxY = useTransform(smoothMouseY, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => onQuickView?.(product)}
      style={{
        rotateX,
        rotateY,
        transformPerspective: 1000,
      }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative flex flex-col justify-between p-6 sm:p-7 min-h-110 sm:min-h-117.5 select-none cursor-pointer rounded-[2.25rem] sm:rounded-[2.5rem] isolate"
    >
      <div className="absolute inset-0 rounded-[2.25rem] sm:rounded-[2.5rem] border border-white/70 bg-white/85 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.03)] group-hover:shadow-[0_25px_60px_rgba(0,0,0,0.08)] transition-shadow duration-300 pointer-events-none -z-10" />

      <div className="relative z-10 flex items-center justify-between w-full">
        <div className="flex items-center gap-2 flex-wrap">
          {product.badges.map((badge) => (
            <Badge
              key={badge}
              variant="outline"
              className="inline-flex items-center rounded-full px-3.5 py-1.5 bg-black/5 dark:bg-white/5 text-[11px] sm:text-xs font-medium text-foreground/85 tracking-normal border border-black/5 dark:border-white/10 backdrop-blur-md transition-colors"
            >
              {badge}
            </Badge>
          ))}
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon-xs"
          onClick={(e) => {
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          aria-label="Add to wishlist"
          className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-red-500 hover:bg-black/5 dark:hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Heart
            className={`size-4 transition-transform active:scale-125 ${
              isFavorite
                ? "fill-red-500 text-red-500"
                : "text-muted-foreground/60"
            }`}
          />
        </Button>
      </div>

      <div className="relative z-10 w-full h-56 sm:h-64 my-auto flex items-center justify-center p-3">
        {!imageLoaded && (
          <Skeleton className="absolute inset-4 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center justify-center">
            <span className="size-6 rounded-full border-2 border-primary/40 border-t-primary animate-spin" />
          </Skeleton>
        )}

        <motion.div
          style={{
            x: productParallaxX,
            y: productParallaxY,
            scale: isHovered ? 0.91 : 1,
          }}
          transition={{
            scale: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
          }}
          className="relative w-full h-full flex items-center justify-center origin-center"
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            priority={priority}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 25vw"
            onLoad={() => setImageLoaded(true)}
            className={`object-contain transition-opacity duration-300 ${
              imageLoaded ? "opacity-100" : "opacity-0"
            } drop-shadow-[0_15px_30px_rgba(0,0,0,0.12)]`}
          />
        </motion.div>

        <motion.div
          animate={{
            scale: isHovered ? 0.82 : 1,
            opacity: isHovered ? 0.4 : 0.2,
          }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-2 inset-x-12 h-4 bg-foreground/15 rounded-full blur-md pointer-events-none"
        />
      </div>

      <div className="relative z-10 flex items-end justify-between w-full pt-4 mt-auto border-t border-black/5">
        <div className="flex flex-col text-left pr-2">
          <h3 className="text-base sm:text-lg font-bold text-foreground tracking-tight line-clamp-1 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <p className="text-2xl sm:text-3xl font-black text-foreground tracking-tight mt-0.5 sm:mt-1">
            {product.price}
          </p>
        </div>

        <Button
          type="button"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart?.(product, e);
          }}
          aria-label={`Add ${product.name} to bag`}
          className="group/btn size-11 sm:size-12 rounded-full bg-foreground text-background flex items-center justify-center shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 shrink-0 hover:bg-primary hover:text-primary-foreground cursor-pointer"
        >
          <ShoppingCart className="size-5 transition-transform duration-200 group-hover/btn:translate-x-0.5 group-hover:translate-x-0.5" />
        </Button>
      </div>
    </motion.div>
  );
}
