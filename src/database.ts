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
    return items;
  }
  catch (error) {
    console.log(error)
  }

  return [];
}