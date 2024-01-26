import { GroceryItem } from "./types/types";

export async function loadItems() : Promise<GroceryItem[]> {
  const response = await fetch(process.env.REACT_APP_PRICE_IS_RIGHT_SERVER as string + "/list", {
    mode: "cors",
    method: "GET"
  });

  const items: GroceryItem[] = await response.json();
  return items;
}

export async function loadItemHistory(bar_code: string): Promise<GroceryItem[]> {
  console.log("[database.ts] Loading item history. barcode:", bar_code)
  try {
    const response = await fetch(process.env.REACT_APP_PRICE_IS_RIGHT_SERVER as string + "/history", {
      mode: "cors",
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({barcode: bar_code}),
    });

    const items = await response.json();
    console.log("[database.ts] Loading item history. result:", items)
    return items;
  }
  catch (error) {
    console.log(error)
  }

  return [];
}

export const upsertItem = async (item: GroceryItem) => {
  console.log("Item to upsert", item)
  try {
    const response = await fetch(process.env.REACT_APP_PRICE_IS_RIGHT_SERVER as string + "/upsert", {
      mode: "cors",
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload: item }),
    });

    const items = await response.json();
    return items;
  }
  catch (error) {
    console.log(error)
  }
}