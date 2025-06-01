import { useEffect, useState } from "react";
import { AdventureCard, TripPlan } from "../types";

export default function RecommendedTrip({
  card,
  onRefresh,
  onChoose,
  onFineTune
}: {
  card: AdventureCard;
  onRefresh: (c: AdventureCard) => void;
  onChoose: (trip: TripPlan) => void;
  onFineTune: (trip: TripPlan) => void;
}) {
  const [plan, setPlan] = useState<TripPlan | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch("/api/recommendation", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ themeId: card.id })
    })
      .then((r) => r.json())
      .then((p) => {
        setPlan(p);
        setLoading(false);
      });
  }, [card]);

  if (loading || !plan) return <p>Loading recommendation…</p>;

  return (
    <div className="w-full max-w-md">
      <h1 className="text-xl font-bold mb-4">Your Recommended Day Trip</h1>
      <div className="bg-white rounded-2xl shadow p-4 mb-4">
        <h2 className="font-semibold mb-2">{card.title}</h2>
        <ul className="space-y-1 text-sm text-gray-700 mb-2">
          {plan.legs.map((l) => (
            <li key={l.time}>
              <span className="font-medium">{l.time}</span> – {l.label}
            </li>
          ))}
        </ul>
        <p className="text-xs text-gray-500">Includes packing list & map links</p>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <button
          className="bg-gray-200 rounded-xl py-2 text-sm"
          onClick={() =>
            fetch("/api/refresh", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ themeId: card.id })
            })
              .then((r) => r.json())
              .then(onRefresh)
          }
        >
          Refresh
        </button>
        <button
          className="bg-blue-600 text-white rounded-xl py-2 text-sm"
          onClick={() => onChoose(plan)}
        >
          Choose
        </button>
        <button
          className="bg-yellow-400 rounded-xl py-2 text-sm"
          onClick={() => onFineTune(plan)}
        >
          Fine‑Tune
        </button>
      </div>
    </div>
  );
}