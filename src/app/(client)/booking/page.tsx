"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Crown } from "lucide-react";
import { motion } from "motion/react";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import BookingClientForm from "@/components/booking/BookingClientForm";
import BookingConfirmationModal from "@/components/booking/BookingConfirmationModal";
import BookingSummaryCard from "@/components/booking/BookingSummaryCard";
import CeremonyCalendar from "@/components/booking/CeremonyCalendar";
import CeremonySelector from "@/components/booking/CeremonySelector";
import PlacementSelector from "@/components/booking/PlacementSelector";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { type BookingFormValues, bookingFormSchema } from "@/lib/schemas";

function BookingContent() {
  const searchParams = useSearchParams();
  const rawParam =
    searchParams.get("occasion") ||
    searchParams.get("ceremony") ||
    searchParams.get("package") ||
    searchParams.get("quotation");

  const occasionParam = rawParam === "true" || !rawParam ? "bridal" : rawParam;

  const [confirmedBooking, setConfirmedBooking] =
    useState<BookingFormValues | null>(null);
  const [customCeremoniesList, setCustomCeremoniesList] = useState<string[]>(
    [],
  );
  const [isAddingCustom, setIsAddingCustom] = useState(
    occasionParam === "custom",
  );
  const [customInputText, setCustomInputText] = useState("");

  const initialCeremony =
    occasionParam === "guest_party"
      ? "guest_party"
      : occasionParam === "festive_occasion"
        ? "festive_occasion"
        : "bridal";

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<BookingFormValues>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
      ceremonies: [initialCeremony],
      customCeremony: "",
      city: "Kolkata",
      location: "",
      ceremonyDate: "",
      preferences: ["Hands & Arms (Elbow to Palm)"],
      requirements: "",
    },
  });

  const selectedCeremonies = watch("ceremonies") || [];
  const selectedPreferences = watch("preferences") || [];
  const selectedDate = watch("ceremonyDate");
  const currentCity = watch("city");

  useEffect(() => {
    if (occasionParam) {
      if (
        ["bridal", "guest_party", "festive_occasion"].includes(occasionParam)
      ) {
        setValue("ceremonies", [occasionParam]);
      } else if (occasionParam === "custom") {
        setIsAddingCustom(true);
      }
    }
  }, [occasionParam, setValue]);

  const handleCeremonySelect = (id: string) => {
    setValue("ceremonies", [id], { shouldValidate: true });
    if (!id.startsWith("custom:")) {
      setValue("customCeremony", "");
    }
  };

  const handleAddCustomSubmit = () => {
    const trimmed = customInputText.trim();
    if (!trimmed) return;

    if (!customCeremoniesList.includes(trimmed)) {
      setCustomCeremoniesList([...customCeremoniesList, trimmed]);
    }
    const customKey = `custom:${trimmed}`;
    setValue("ceremonies", [customKey], { shouldValidate: true });
    setValue("customCeremony", trimmed);
    setCustomInputText("");
    setIsAddingCustom(false);
  };

  const handleRemoveCustom = (customName: string) => {
    const updatedList = customCeremoniesList.filter((c) => c !== customName);
    setCustomCeremoniesList(updatedList);
    const customKey = `custom:${customName}`;
    if (selectedCeremonies.includes(customKey)) {
      setValue("ceremonies", ["bridal"], { shouldValidate: true });
      setValue("customCeremony", "");
    }
  };

  const handlePreferenceToggle = (item: string) => {
    const exists = selectedPreferences.includes(item);
    const updated = exists
      ? selectedPreferences.filter((p) => p !== item)
      : [...selectedPreferences, item];
    setValue("preferences", updated);
  };

  const handleDateSelect = (dateString: string) => {
    setValue("ceremonyDate", dateString, { shouldValidate: true });
  };

  const onSubmit = async (data: BookingFormValues) => {
    setConfirmedBooking(data);
  };

  const getOccasionLabels = (ceremonyIds: string[], customText?: string) => {
    return ceremonyIds
      .map((id) => {
        if (id === "bridal") return "Bridal / Normal Mehendi";
        if (id === "guest_party") return "Guest / Party Mehendi";
        if (id === "festive_occasion") return "Festive / Occasion Mehendi";
        if (id.startsWith("custom:")) return id.replace("custom:", "Custom: ");
        if (id === "custom")
          return customText ? `Custom (${customText})` : "Custom Occasion";
        return id;
      })
      .join(", ");
  };

  const activeOccasionLabel = getOccasionLabels(
    selectedCeremonies,
    watch("customCeremony"),
  );

  return (
    <main className="relative w-full min-h-screen pt-24 pb-20 px-4 sm:px-8 md:px-10 lg:px-12 xl:px-16 2xl:px-20 select-none overflow-hidden">
      <motion.div
        animate={{
          x: [0, 25, -20, 0],
          y: [0, -20, 15, 0],
          scale: [1, 1.08, 0.95, 1],
        }}
        transition={{
          duration: 18,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        className="absolute top-20 left-1/4 -translate-x-1/2 w-96 h-96 bg-primary/8 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 w-full mb-10 text-center max-w-2xl mx-auto">
        <Badge
          variant="outline"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 border-primary/20 text-primary text-xs font-mono tracking-wider uppercase mb-2.5"
        >
          <Crown className="size-3.5" />
          <span>BENGAL BRIDAL ATELIER</span>
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground uppercase">
          RESERVE YOUR CEREMONIAL DATE
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-2">
          Request private bridal consultations, custom Benarasi Kolka designs,
          and celebratory party bookings.
        </p>
      </div>

      <div className="relative z-10 w-full rounded-3xl border border-border/70 bg-card/85 backdrop-blur-xl p-5 sm:p-8 lg:p-10 shadow-xs">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-8 space-y-8">
              <CeremonySelector
                selectedCeremonies={selectedCeremonies}
                onSelectCeremony={handleCeremonySelect}
                customCeremoniesList={customCeremoniesList}
                isAddingCustom={isAddingCustom}
                setIsAddingCustom={setIsAddingCustom}
                customInputText={customInputText}
                setCustomInputText={setCustomInputText}
                onAddCustom={handleAddCustomSubmit}
                onRemoveCustom={handleRemoveCustom}
                errorMessage={errors.ceremonies?.message}
              />

              <CeremonyCalendar
                selectedDate={selectedDate}
                onSelectDate={handleDateSelect}
                errorMessage={errors.ceremonyDate?.message}
              />

              <PlacementSelector
                selectedPreferences={selectedPreferences}
                onTogglePreference={handlePreferenceToggle}
              />

              <BookingClientForm
                register={register}
                control={control}
                errors={errors}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  size="lg"
                  className="w-full sm:w-auto rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-mono text-xs uppercase tracking-wider px-8 py-3.5 shadow-sm cursor-pointer h-auto"
                >
                  <span>Submit Quotation Request</span>
                  <ArrowRight className="size-4 ml-1.5" />
                </Button>
              </div>
            </div>

            <BookingSummaryCard
              occasionLabel={activeOccasionLabel}
              selectedDate={selectedDate}
              city={currentCity}
            />
          </div>
        </form>
      </div>

      <BookingConfirmationModal
        confirmedBooking={confirmedBooking}
        occasionLabels={activeOccasionLabel}
        onClose={() => setConfirmedBooking(null)}
      />
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen pt-28 flex items-center justify-center text-xs font-mono text-muted-foreground">
          Loading Bridal Suite...
        </div>
      }
    >
      <BookingContent />
    </Suspense>
  );
}
