"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

interface CeremonyCalendarProps {
  selectedDate: string;
  onSelectDate: (dateString: string) => void;
  errorMessage?: string;
}

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function CeremonyCalendar({
  selectedDate,
  onSelectDate,
  errorMessage,
}: CeremonyCalendarProps) {
  const [currentMonthDate, setCurrentMonthDate] = useState(() => new Date());

  const year = currentMonthDate.getFullYear();
  const month = currentMonthDate.getMonth();

  const daysInMonth = useMemo(() => {
    return new Date(year, month + 1, 0).getDate();
  }, [year, month]);

  const firstDayOfWeek = useMemo(() => {
    return new Date(year, month, 1).getDay();
  }, [year, month]);

  const monthName = useMemo(() => {
    return currentMonthDate.toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    });
  }, [currentMonthDate]);

  const handlePrevMonth = () => {
    setCurrentMonthDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonthDate(new Date(year, month + 1, 1));
  };

  const handleDayClick = (dayNum: number) => {
    const selected = new Date(year, month, dayNum);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (selected < today) return;

    const dateString = `${selected.getFullYear()}-${String(
      selected.getMonth() + 1,
    ).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;

    onSelectDate(dateString);
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-mono uppercase tracking-widest text-primary font-bold">
          02. CEREMONY DATE *
        </span>
        {selectedDate && (
          <span className="text-xs font-mono font-bold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full border border-primary/20">
            {selectedDate}
          </span>
        )}
      </div>

      <div className="p-4 sm:p-5 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <h4 className="font-heading text-sm sm:text-base font-bold text-foreground">
            {monthName}
          </h4>
          <div className="flex items-center gap-1.5">
            <Button
              type="button"
              variant="outline"
              size="icon-xs"
              onClick={handlePrevMonth}
              aria-label="Previous Month"
              className="rounded-lg text-foreground hover:bg-muted cursor-pointer"
            >
              <ChevronLeft className="size-3.5" />
            </Button>
            <Button
              type="button"
              variant="outline"
              size="icon-xs"
              onClick={handleNextMonth}
              aria-label="Next Month"
              className="rounded-lg text-foreground hover:bg-muted cursor-pointer"
            >
              <ChevronRight className="size-3.5" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1 text-center mb-2">
          {WEEK_DAYS.map((d) => (
            <span
              key={d}
              className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground font-semibold"
            >
              {d}
            </span>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1 text-center">
          {Array.from({ length: firstDayOfWeek }).map((_, i) => (
            <div
              key={`empty-${
                // biome-ignore lint/suspicious/noArrayIndexKey: Empty spacer slots in calendar grid
                i
              }`}
              className="h-8 sm:h-9"
            />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const thisDate = new Date(year, month, dayNum);
            const isPast = thisDate < today;
            const dateStr = `${year}-${String(month + 1).padStart(
              2,
              "0",
            )}-${String(dayNum).padStart(2, "0")}`;
            const isSelected = selectedDate === dateStr;

            return (
              <button
                key={dayNum}
                type="button"
                disabled={isPast}
                onClick={() => handleDayClick(dayNum)}
                className={`h-8 sm:h-9 rounded-xl text-xs font-mono font-medium transition-all duration-150 flex items-center justify-center ${
                  isSelected
                    ? "bg-primary text-primary-foreground font-bold shadow-xs scale-105"
                    : isPast
                      ? "text-muted-foreground/30 cursor-not-allowed"
                      : "text-foreground hover:bg-muted hover:text-foreground cursor-pointer"
                }`}
              >
                {dayNum}
              </button>
            );
          })}
        </div>
      </div>

      {errorMessage && (
        <span className="text-[11px] text-destructive block font-sans">
          {errorMessage}
        </span>
      )}
    </div>
  );
}
