import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
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
      <div className="flex flex-wrap justify-center gap-6">
        {cards.map((c) => (
          <Card
            key={c.id}
            className="cursor-pointer w-full max-w-xs"
            onClick={() => onPick(c)}
          >
            <CardHeader>
              <CardTitle>{c.title}</CardTitle>
            </CardHeader>
            <CardContent className="justify-between p-4">
              <img src={c.image} alt={c.title} className="w-full aspect-square object-cover rounded-t-xl" />
              <CardDescription>{c.subtitle}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
