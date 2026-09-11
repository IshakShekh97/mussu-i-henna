"use client";

import type { LucideIcon } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export interface TabItem {
  id: string;
  title: string;
  href?: string;
  description?: string;
  icon?: LucideIcon;
  content?: React.ReactNode;
  cardContent?: React.ReactNode;
  color?: string;
}

const WaveformPath = () => (
  <motion.path
    animate={{
      x: [0, 10, 0],
      transition: {
        duration: 5,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      },
    }}
    d="M0 50 
           C 20 40, 40 30, 60 50
           C 80 70, 100 60, 120 50
           C 140 40, 160 30, 180 50
           C 200 70, 220 60, 240 50
           C 260 40, 280 30, 300 50
           C 320 70, 340 60, 360 50
           C 380 40, 400 30, 420 50
           L 420 100 L 0 100 Z"
    initial={false}
  />
);

function TabCardContent({
  title,
  description,
  fillClass,
}: {
  title: string;
  description: string;
  fillClass: string;
}) {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0 overflow-hidden">
        <svg
          aria-hidden="true"
          className="absolute bottom-0 h-32 w-full"
          preserveAspectRatio="none"
          role="presentation"
          viewBox="0 0 420 100"
        >
          <motion.g
            animate={{ opacity: 0.15 }}
            className={`fill-${fillClass} stroke-${fillClass}`}
            initial={{ opacity: 0 }}
            style={{ strokeWidth: 1 }}
            transition={{ duration: 0.5 }}
          >
            <WaveformPath />
          </motion.g>
          <motion.g
            animate={{ opacity: 0.1 }}
            className={`fill-${fillClass} stroke-${fillClass}`}
            initial={{ opacity: 0 }}
            style={{ strokeWidth: 1, transform: "translateY(10px)" }}
            transition={{ duration: 0.5 }}
          >
            <WaveformPath />
          </motion.g>
        </svg>
      </div>
      <div className="relative flex h-full flex-col p-6">
        <div className="space-y-2">
          <h3 className="bg-linear-to-r from-foreground via-foreground/90 to-foreground/70 font-semibold text-2xl tracking-tight [text-shadow:0_1px_1px_rgb(0_0_0/10%)]">
            {title}
          </h3>
          <p className="max-w-[90%] text-black/50 text-sm leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

const DEFAULT_TABS: TabItem[] = [
  {
    id: "Models",
    title: "Models",
    description: "Choose the model you want to use",
    color: "bg-blue-500 hover:bg-blue-600",
  },
  {
    id: "MCPs",
    title: "MCPs",
    description: "Choose the MCP you want to use",
    color: "bg-purple-500 hover:bg-purple-600",
  },
  {
    id: "Agents",
    title: "Agents",
    description: "Choose the agent you want to use",
    color: "bg-emerald-500 hover:bg-emerald-600",
  },
  {
    id: "Users",
    title: "Users",
    description: "Choose the user you want to use",
    color: "bg-amber-500 hover:bg-amber-600",
  },
];

export interface SmoothTabProps {
  items?: TabItem[];
  defaultTabId?: string;
  selectedId?: string;
  className?: string;
  activeColor?: string;
  showCardContent?: boolean;
  onChange?: (tabId: string) => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.95,
    position: "absolute" as const,
  }),
  center: {
    x: 0,
    opacity: 1,
    filter: "blur(0px)",
    scale: 1,
    position: "absolute" as const,
  },
  exit: (direction: number) => ({
    x: direction < 0 ? "100%" : "-100%",
    opacity: 0,
    filter: "blur(8px)",
    scale: 0.95,
    position: "absolute" as const,
  }),
};

const transition = {
  duration: 0.4,
  ease: [0.32, 0.72, 0, 1],
};

export default function SmoothTab({
  items = DEFAULT_TABS,
  defaultTabId = DEFAULT_TABS[0].id,
  selectedId,
  className,
  activeColor = "bg-primary",
  showCardContent = false,
  onChange,
}: SmoothTabProps) {
  const [selected, setSelected] = React.useState<string>(
    selectedId ?? defaultTabId,
  );
  const [direction, setDirection] = React.useState(0);
  const [dimensions, setDimensions] = React.useState({ width: 0, left: 0 });

  // Reference for the selected button
  const buttonRefs = React.useRef<Map<string, HTMLElement>>(new Map());
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Synchronize internal selection when selectedId prop changes
  React.useEffect(() => {
    if (selectedId && selectedId !== selected) {
      const currentIndex = items.findIndex((item) => item.id === selected);
      const newIndex = items.findIndex((item) => item.id === selectedId);
      if (newIndex !== -1) {
        setDirection(newIndex > currentIndex ? 1 : -1);
        setSelected(selectedId);
      }
    }
  }, [selectedId, selected, items]);

  // Update dimensions whenever selected tab changes or on mount
  useIsomorphicLayoutEffect(() => {
    const updateDimensions = () => {
      const selectedButton = buttonRefs.current.get(selected);
      const container = containerRef.current;

      if (selectedButton && container) {
        const rect = selectedButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();

        setDimensions({
          width: rect.width,
          left: rect.left - containerRect.left,
        });
      }
    };

    // Initial update
    requestAnimationFrame(() => {
      updateDimensions();
    });

    // Update on resize
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [selected, items]);

  const handleTabClick = (tabId: string) => {
    const currentIndex = items.findIndex((item) => item.id === selected);
    const newIndex = items.findIndex((item) => item.id === tabId);
    setDirection(newIndex > currentIndex ? 1 : -1);
    setSelected(tabId);
    onChange?.(tabId);
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLElement>,
    tabId: string,
  ) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleTabClick(tabId);
    }
  };

  const selectedItem = items.find((item) => item.id === selected);

  const toolbar = (
    <div
      aria-label="Smooth tabs"
      className={cn(
        "relative flex items-center justify-between gap-1 p-1",
        "rounded-full border border-border/70 bg-card/85",
        "shadow-[0_2px_12px_rgba(0,0,0,0.04)] backdrop-blur-md",
        "transition-all duration-200",
        className,
      )}
      ref={containerRef}
      role="tablist"
    >
      {/* Sliding Background */}
      <motion.div
        animate={{
          width: dimensions.width > 0 ? dimensions.width - 6 : 0,
          x: dimensions.left + 3,
          opacity: dimensions.width > 0 ? 1 : 0,
        }}
        className={cn(
          "absolute z-1 rounded-full shadow-xs",
          selectedItem?.color || activeColor,
        )}
        initial={false}
        style={{ height: "calc(100% - 6px)", top: "3px" }}
        transition={{
          type: "spring",
          stiffness: 400,
          damping: 30,
        }}
      />

      <div
        className="relative z-2 grid w-full gap-1 items-center"
        style={{
          gridTemplateColumns: `repeat(${items.length}, minmax(0, 1fr))`,
        }}
      >
        {items.map((item) => {
          const isSelected = selected === item.id;
          const commonClasses = cn(
            "relative flex items-center justify-center gap-1.5 rounded-full px-3.5 sm:px-4 py-1.5 sm:py-2",
            "font-medium text-xs sm:text-sm transition-colors duration-200 select-none",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            "truncate cursor-pointer",
            isSelected
              ? "text-primary-foreground font-semibold"
              : "text-foreground/75 hover:text-foreground hover:bg-muted/40",
          );

          const content = (
            <>
              {item.icon && <item.icon className="size-3.5 sm:size-4" />}
              <span className="truncate">{item.title}</span>
            </>
          );

          if (item.href) {
            return (
              <Link
                key={item.id}
                href={item.href}
                id={`tab-${item.id}`}
                role="tab"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => handleTabClick(item.id)}
                onKeyDown={(e) => handleKeyDown(e, item.id)}
                ref={(el) => {
                  if (el) buttonRefs.current.set(item.id, el);
                  else buttonRefs.current.delete(item.id);
                }}
                className={commonClasses}
              >
                {content}
              </Link>
            );
          }

          return (
            <motion.button
              key={item.id}
              type="button"
              id={`tab-${item.id}`}
              role="tab"
              aria-selected={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => handleTabClick(item.id)}
              onKeyDown={(e) => handleKeyDown(e, item.id)}
              ref={(el) => {
                if (el) buttonRefs.current.set(item.id, el);
                else buttonRefs.current.delete(item.id);
              }}
              className={commonClasses}
            >
              {content}
            </motion.button>
          );
        })}
      </div>
    </div>
  );

  if (!showCardContent) {
    return toolbar;
  }

  return (
    <div className="flex h-full flex-col">
      {/* Card Content Area */}
      <div className="relative mb-4 flex-1">
        <div className="relative h-50 w-full rounded-lg border bg-card">
          <div className="absolute inset-0 overflow-hidden rounded-lg">
            <AnimatePresence
              custom={direction}
              initial={false}
              mode="popLayout"
            >
              <motion.div
                animate="center"
                className="absolute inset-0 h-full w-full bg-card will-change-transform"
                custom={direction}
                exit="exit"
                initial="enter"
                key={`card-${selected}`}
                style={{
                  backfaceVisibility: "hidden",
                  WebkitBackfaceVisibility: "hidden",
                }}
                transition={transition as any}
                variants={slideVariants as any}
              >
                {selectedItem?.cardContent ??
                  (selectedItem && (
                    <TabCardContent
                      description={selectedItem.description ?? ""}
                      fillClass={
                        selectedItem.color
                          ?.split(" ")
                          .at(0)
                          ?.replace("bg-", "") ?? "blue-500"
                      }
                      title={selectedItem.title}
                    />
                  ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Bottom Toolbar */}
      {toolbar}
    </div>
  );
}
