import { useState } from "react";
import PickAdventure from "./components/PickAdventure";
import RecommendedTrip from "./components/RecommendedTrip";
import TripPlan from "./components/TripPlan";
import { AdventureCard, TripPlan as TripPlanType } from "./types";

export default function App() {
  const [stage, setStage] = useState<"pick" | "recommend" | "plan">("pick");
  const [selection, setSelection] = useState<AdventureCard | null>(null);
  const [plan, setPlan] = useState<TripPlanType | null>(null);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      {stage === "pick" && (
        <PickAdventure
          onPick={(card) => {
            setSelection(card);
            setStage("recommend");
          }}
        />
      )}

      {stage === "recommend" && selection && (
        <RecommendedTrip
          card={selection}
          onRefresh={(newCard) => setSelection(newCard)}
          onChoose={(trip) => {
            setPlan(trip);
            setStage("plan");
          }}
          onFineTune={(trip) => {
            setPlan(trip);
            setStage("plan");
          }}
        />
      )}

      {stage === "plan" && plan && <TripPlan plan={plan} />}
    </main>
  );
}
