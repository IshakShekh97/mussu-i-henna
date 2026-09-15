"use client";

import { CheckCircle2, Clock, Snowflake } from "lucide-react";
import type { Milestone } from "@/data/orders";

interface OrderMilestonesTimelineProps {
  milestones: Milestone[];
}

export default function OrderMilestonesTimeline({
  milestones,
}: OrderMilestonesTimelineProps) {
  return (
    <div className="rounded-3xl border border-border/80 bg-card/85 backdrop-blur-xl p-5 sm:p-7 shadow-xs">
      <div className="flex items-center justify-between pb-4 border-b border-border/50 mb-6">
        <div className="flex items-center gap-2">
          <Snowflake className="size-4 text-sky-500" />
          <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
            COLD-CHAIN JOURNEY LOG
          </span>
        </div>
        <span className="text-[10px] font-mono text-muted-foreground">
          Real-time Dispatch Telemetry
        </span>
      </div>

      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 sm:before:left-3.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-border/60">
        {milestones.map((milestone) => {
          return (
            <div key={milestone.title} className="relative group">
              <div
                className={`absolute -left-6 sm:-left-8 top-0.5 size-5 sm:size-7 rounded-full flex items-center justify-center border transition-all ${
                  milestone.completed
                    ? "bg-primary border-primary text-primary-foreground shadow-xs"
                    : milestone.current
                      ? "bg-amber-500 border-amber-500 text-white animate-pulse"
                      : "bg-background border-border/80 text-muted-foreground/40"
                }`}
              >
                {milestone.completed ? (
                  <CheckCircle2 className="size-3 sm:size-4" />
                ) : (
                  <Clock className="size-2.5 sm:size-3.5" />
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <h4
                  className={`text-xs sm:text-sm font-bold leading-tight ${
                    milestone.completed || milestone.current
                      ? "text-foreground"
                      : "text-muted-foreground/60"
                  }`}
                >
                  {milestone.title}
                </h4>
                <span className="text-[10px] sm:text-[11px] font-mono text-muted-foreground shrink-0">
                  {milestone.time}
                </span>
              </div>

              <p className="text-xs text-muted-foreground font-sans mt-0.5 leading-relaxed">
                {milestone.detail}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
