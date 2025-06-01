import React, { useEffect, useState } from "react";
import { AdventureCard } from "../types";

export default function PickAdventure({
  onPick
}: {
  onPick: (card: AdventureCard) => void;
}) {
  const [cards, setCards] = useState<AdventureCard[]>([]);
  useEffect(() => {
    fetch("/api/adventures")
      .then((r) => r.json())
      .then(setCards);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Pick Your Adventure</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md">
        {cards.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl shadow overflow-hidden cursor-pointer"
            onClick={() => onPick(c)}
          >
            <img src={c.image} alt={c.title} className="h-40 w-full object-cover" />
            <div className="p-4">
              <h2 className="font-semibold text-lg">{c.title}</h2>
              <p className="text-gray-600 text-sm">{c.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
