import express from "express";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, "../client")));

// Mock data
const adventures = [
  {
    id: "animals",
    title: "Animal Encounters + Picnic",
    subtitle: "Woodland Park Zoo + Green Lake",
    image: "/images/zoo.jpg"
  },
  {
    id: "forest",
    title: "Forest Hike + Donuts",
    subtitle: "Twin Falls Trail + Bakery",
    image: "/images/forest-hike.jpg"
  },
  {
    id: "beach",
    title: "Beach Play + Ice Cream",
    subtitle: "Alki Beach + Molly Moon’s",
    image: "/images/beach.jpg"
  }
];

app.get("/api/adventures", (_, res) => res.json(adventures));

app.post("/api/recommendation", (req, res) => {
  const themeId = req.body.themeId;
  const plan = makePlan(themeId);
  res.json(plan);
});

app.post("/api/refresh", (req, res) => {
  const themeId = req.body.themeId;
  // rotate to next suggestion (simplified)
  const next = adventures[(adventures.findIndex((a) => a.id === themeId) + 1) % adventures.length];
  res.json(next);
});

function makePlan(theme: string) {
  switch (theme) {
    case "animals":
      return {
        theme,
        legs: [
          { time: "10:00", label: "Leave home" },
          { time: "11:00", label: "Woodland Park Zoo" },
          { time: "13:30", label: "Picnic at Green Lake" },
          { time: "15:00", label: "Ice cream stop" },
          { time: "15:30", label: "Drive home" }
        ],
        packing: ["Snacks", "Stroller", "Sunscreen", "Blanket"]
      };
    case "forest":
      return {
        theme,
        legs: [
          { time: "09:00", label: "Leave home" },
          { time: "10:00", label: "Twin Falls Trail hike" },
          { time: "12:30", label: "Donut stop in North Bend" },
          { time: "13:30", label: "Return drive" }
        ],
        packing: ["Water", "Rain jackets", "Baby carrier"]
      };
    default:
      return {
        theme,
        legs: [
          { time: "11:00", label: "Leave home" },
          { time: "12:00", label: "Beach play at Alki" },
          { time: "14:30", label: "Ice cream" },
          { time: "15:00", label: "Head home" }
        ],
        packing: ["Beach toys", "Sunscreen", "Towels"]
      };
  }
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
