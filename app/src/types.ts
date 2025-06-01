export interface AdventureCard {
  id: string;
  title: string;
  subtitle: string;
  image: string;
}

export interface TripPlan {
  theme: string;
  legs: { time: string; label: string; notes?: string }[];
  packing: string[];
}
