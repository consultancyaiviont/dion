export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number; // cents
  priceDisplay: string;
  image: string;
  maxGuests: number;
  category: "jet-ski" | "water-sport" | "tour";
}

export const services: Service[] = [
  {
    id: "jet-ski-30",
    name: "Jet Ski Rental — 30 Minutes",
    description:
      "Experience the thrill of riding a jet ski across open water. Perfect for beginners and experienced riders alike. Includes safety briefing and life vest.",
    duration: 30,
    price: 7500,
    priceDisplay: "$75",
    image: "/services/jet-ski.jpg",
    maxGuests: 2,
    category: "jet-ski",
  },
  {
    id: "jet-ski-60",
    name: "Jet Ski Rental — 1 Hour",
    description:
      "Extended jet ski adventure with time to explore the coastline. Ride at your own pace and enjoy the freedom of the open water.",
    duration: 60,
    price: 12500,
    priceDisplay: "$125",
    image: "/services/jet-ski.jpg",
    maxGuests: 2,
    category: "jet-ski",
  },
  {
    id: "parasailing",
    name: "Parasailing Adventure",
    description:
      "Soar above the ocean and take in breathtaking panoramic views. Fly solo or tandem at heights up to 800 feet. An unforgettable aerial experience.",
    duration: 45,
    price: 9500,
    priceDisplay: "$95",
    image: "/services/parasailing.jpg",
    maxGuests: 3,
    category: "water-sport",
  },
  {
    id: "tubing",
    name: "Tube Ride",
    description:
      "Hold on tight for an exciting ride on an inflatable tube towed behind our speedboat. Great fun for families and groups of all ages.",
    duration: 30,
    price: 5000,
    priceDisplay: "$50",
    image: "/services/tubing.jpg",
    maxGuests: 4,
    category: "water-sport",
  },
  {
    id: "kayak",
    name: "Kayak Rental — 1 Hour",
    description:
      "Paddle through calm, crystal-clear waters at your own pace. Single and tandem kayaks available. Perfect for exploring hidden coves and marine life.",
    duration: 60,
    price: 4000,
    priceDisplay: "$40",
    image: "/services/kayak.jpg",
    maxGuests: 2,
    category: "water-sport",
  },
  {
    id: "banana-boat",
    name: "Banana Boat Ride",
    description:
      "The ultimate group activity — climb aboard our banana boat for a wild ride across the waves. Laughs and splashes guaranteed.",
    duration: 20,
    price: 3500,
    priceDisplay: "$35",
    image: "/services/banana-boat.jpg",
    maxGuests: 6,
    category: "water-sport",
  },
  {
    id: "sunset-tour",
    name: "Sunset Boat Tour",
    description:
      "Cruise along the coast as the sun dips below the horizon. Includes complimentary refreshments and a narrated tour of local landmarks. A magical evening on the water.",
    duration: 90,
    price: 15000,
    priceDisplay: "$150",
    image: "/services/sunset-tour.jpg",
    maxGuests: 10,
    category: "tour",
  },
  {
    id: "snorkel-tour",
    name: "Guided Snorkel Tour",
    description:
      "Discover vibrant coral reefs and tropical marine life with our experienced guides. All snorkeling gear included. Suitable for all skill levels.",
    duration: 90,
    price: 8500,
    priceDisplay: "$85",
    image: "/services/snorkel-tour.jpg",
    maxGuests: 8,
    category: "tour",
  },
];

export function getServiceById(id: string): Service | undefined {
  return services.find((s) => s.id === id);
}

export function getServicesByCategory(
  category: Service["category"]
): Service[] {
  return services.filter((s) => s.category === category);
}
