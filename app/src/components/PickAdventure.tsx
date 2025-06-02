import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { AdventureCard } from "../types";
import CenteredLayout from "./CenteredLayout";

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
    <CenteredLayout title="Pick Your Adventure">
      <div className="flex-1 flex flex-wrap justify-center items-center gap-24 w-full">
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
    </CenteredLayout>
  );
}
