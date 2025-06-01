import React from "react";
import { TripPlan } from "../types";

export default function TripPlanView({ plan }: { plan: TripPlan }) {
  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow p-4">
      <h1 className="text-xl font-bold mb-4">Your Trip Plan</h1>
      <ul className="space-y-1 text-sm text-gray-700 mb-4">
        {plan.legs.map((l) => (
          <li key={l.time}>
            <span className="font-medium">{l.time}</span> – {l.label} {l.notes && `(${l.notes})`}
          </li>
        ))}
      </ul>
      <h2 className="font-semibold mb-2">Packing List</h2>
      <ul className="list-disc list-inside text-sm text-gray-700">
        {plan.packing.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
    </div>
  );
}
