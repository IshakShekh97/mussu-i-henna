export interface Milestone {
  title: string;
  detail: string;
  time: string;
  completed: boolean;
  current: boolean;
}

export interface MockOrder {
  orderId: string;
  customerName: string;
  city: string;
  courier: string;
  awb: string;
  dispatchDate: string;
  estimatedArrival: string;
  items: { name: string; quantity: number }[];
  milestones: Milestone[];
}

export const MOCK_ORDERS: Record<string, MockOrder> = {
  "MH-2026-01": {
    orderId: "MH-2026-01",
    customerName: "Debolina Banerjee",
    city: "Park Street, Kolkata",
    courier: "BlueDart Express Air Priority",
    awb: "BLD-849204128",
    dispatchDate: "14 Sep 2026, 09:30 AM",
    estimatedArrival: "16 Sep 2026 (Before Ceremony)",
    items: [
      { name: "Kolkata Bengal Organic Cones (Pack of 6)", quantity: 2 },
      { name: "Mahogany Glow Aftercare Balm", quantity: 1 },
      { name: "Pure Nilgiri Henna Essential Oil", quantity: 1 },
    ],
    milestones: [
      {
        title: "Batch Hand-Churned & Mixed",
        detail:
          "Triple-sifted Bengal Lawsonia prepared with steam-distilled eucalyptus.",
        time: "13 Sep, 11:00 AM",
        completed: true,
        current: false,
      },
      {
        title: "Inspected & Cold-Pack Packaged",
        detail:
          "Sealed with reusable cold-gel pack in insulated thermal pouch.",
        time: "13 Sep, 04:30 PM",
        completed: true,
        current: false,
      },
      {
        title: "Dispatched via Priority Air",
        detail:
          "Handed over to BlueDart Express hub (Airport transit facility).",
        time: "14 Sep, 09:30 AM",
        completed: true,
        current: true,
      },
      {
        title: "Out for Delivery",
        detail: "Courier agent will attempt delivery to your doorstep address.",
        time: "Expected 16 Sep",
        completed: false,
        current: false,
      },
      {
        title: "Delivered to Bridal Suite",
        detail:
          "Store in freezer (-18°C) until 30 minutes prior to application.",
        time: "Pending Delivery",
        completed: false,
        current: false,
      },
    ],
  },
  "MH-2026-02": {
    orderId: "MH-2026-02",
    customerName: "Priyanka Roy",
    city: "Ballygunge, Kolkata",
    courier: "DTDC Premium Cold-Chain",
    awb: "DTC-928103714",
    dispatchDate: "14 Sep 2026, 03:00 PM",
    estimatedArrival: "15 Sep 2026",
    items: [
      { name: "Bengali Bridal Kolka Box", quantity: 1 },
      { name: "Artisan Fine-Tip Kolka Cones", quantity: 3 },
    ],
    milestones: [
      {
        title: "Batch Hand-Churned & Mixed",
        detail:
          "Triple-sifted Bengal Lawsonia prepared with steam-distilled eucalyptus.",
        time: "14 Sep, 10:00 AM",
        completed: true,
        current: false,
      },
      {
        title: "Inspected & Cold-Pack Packaged",
        detail:
          "Sealed with reusable cold-gel pack in insulated thermal pouch.",
        time: "14 Sep, 02:30 PM",
        completed: true,
        current: true,
      },
      {
        title: "Dispatched via Priority Air",
        detail: "Courier pickup scheduled for afternoon transit.",
        time: "Expected Today",
        completed: false,
        current: false,
      },
      {
        title: "Out for Delivery",
        detail: "Courier agent will attempt delivery to your doorstep address.",
        time: "Expected 15 Sep",
        completed: false,
        current: false,
      },
      {
        title: "Delivered to Bridal Suite",
        detail:
          "Store in freezer (-18°C) until 30 minutes prior to application.",
        time: "Pending Delivery",
        completed: false,
        current: false,
      },
    ],
  },
  "MH-2026-03": {
    orderId: "MH-2026-03",
    customerName: "Ananya Sen",
    city: "Salt Lake Sector V, Kolkata",
    courier: "Delhivery Air Express",
    awb: "DEL-738192019",
    dispatchDate: "12 Sep 2026, 08:00 AM",
    estimatedArrival: "13 Sep 2026 (Delivered)",
    items: [
      { name: "Gaye Holud & Biye Trunk", quantity: 1 },
      { name: "Stain Protection Elixir", quantity: 2 },
    ],
    milestones: [
      {
        title: "Batch Hand-Churned & Mixed",
        detail:
          "Triple-sifted Bengal Lawsonia prepared with steam-distilled eucalyptus.",
        time: "11 Sep, 09:00 AM",
        completed: true,
        current: false,
      },
      {
        title: "Inspected & Cold-Pack Packaged",
        detail:
          "Sealed with reusable cold-gel pack in insulated thermal pouch.",
        time: "11 Sep, 03:00 PM",
        completed: true,
        current: false,
      },
      {
        title: "Dispatched via Priority Air",
        detail: "Handed over to courier express hub.",
        time: "12 Sep, 08:00 AM",
        completed: true,
        current: false,
      },
      {
        title: "Out for Delivery",
        detail: "Courier agent departed for final mile delivery.",
        time: "13 Sep, 10:15 AM",
        completed: true,
        current: false,
      },
      {
        title: "Delivered to Bridal Suite",
        detail: "Package delivered safely. Cones frozen for wedding day.",
        time: "13 Sep, 01:45 PM",
        completed: true,
        current: true,
      },
    ],
  },
};
