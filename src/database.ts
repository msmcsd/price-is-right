import { GroceryItem } from "./types/types";

export async function loadItems() : Promise<GroceryItem[]> {
  const response = await fetch(process.env.REACT_APP_PRICE_IS_RIGHT_SERVER as string + "/list", {
    mode: "cors",
    method: "GET"
  });

  const items: GroceryItem[] = await response.json();
  return items;
}

