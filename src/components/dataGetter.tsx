import json5 from "json5";

export async function downloadFoodCards() {
  const resp = await fetch("data/foodCards.json5", {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  });

  const text = await resp.text();
  return json5.parse(text);
}
