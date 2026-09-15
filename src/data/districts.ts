export const BENGAL_DISTRICTS = [
  "Kolkata",
  "Howrah",
  "North 24 Parganas",
  "South 24 Parganas",
  "Hooghly",
  "Nadia",
  "Purba Medinipur",
  "Paschim Medinipur",
  "Burdwan (East & West)",
  "Birbhum (Santiniketan)",
  "Murshidabad",
  "Malda",
  "Darjeeling & Siliguri",
  "Other West Bengal Location",
] as const;

export type BengalDistrict = (typeof BENGAL_DISTRICTS)[number];
