import { TripPlan } from "../types";
import CenteredLayout from "./CenteredLayout";

export default function TripPlanView({ plan }: { plan: TripPlan }) {
  return (
    <CenteredLayout title="Your Trip Plan">
      <div className="w-full max-w-md bg-white rounded-2xl shadow p-4">
        <ul className="space-y-1 text-sm text-gray-700 mb-4">
          {plan.legs.map((l) => (
            <li key={l.time}>
              <span className="font-medium">{l.time}</span> – {l.label}{" "}
              {l.notes && `(${l.notes})`}
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
    </CenteredLayout>
  );
}
