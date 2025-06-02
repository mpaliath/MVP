import { useState } from "react";
import { TripPlan } from "../types";
import CenteredLayout from "./CenteredLayout";

export default function EditTripPlan({ plan: initialPlan, onSave }: { plan: TripPlan; onSave: (plan: TripPlan) => void }) {
  const [plan, setPlan] = useState<TripPlan>(initialPlan);

  // For demonstration, allow editing the theme and packing list only
  return (
    <CenteredLayout title="Edit Your Trip Plan">
      <form
        className="w-full max-w-md bg-white rounded-2xl shadow p-4"
        onSubmit={e => {
          e.preventDefault();
          onSave(plan);
        }}
      >
        <label className="block font-semibold mb-2">Theme</label>
        <input
          className="border rounded px-2 py-1 mb-4 w-full"
          value={plan.theme}
          onChange={e => setPlan({ ...plan, theme: e.target.value })}
        />
        <label className="block font-semibold mb-2">Packing List (comma separated)</label>
        <input
          className="border rounded px-2 py-1 mb-4 w-full"
          value={plan.packing.join(", ")}
          onChange={e => setPlan({ ...plan, packing: e.target.value.split(/,\s*/) })}
        />
        {/* You can add more fields for legs, etc. */}
        <button type="submit" className="bg-blue-600 text-white rounded-xl py-2 px-4 mt-4">Save</button>
      </form>
    </CenteredLayout>
  );
}
