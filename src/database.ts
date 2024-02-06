import { DeleteItemResult, GroceryItem } from "./types/types";

export async function loadItems() : Promise<GroceryItem[]> {
  const response = await fetch(process.env.REACT_APP_PRICE_IS_RIGHT_SERVER as string + "/items", {
    mode: "cors",
    method: "GET"
  });

  const items: GroceryItem[] = await response.json();
  return items;
}

export async function loadItemHistory(bar_code: string): Promise<GroceryItem[]> {
  console.log("[database.ts] Loading item history. barcode:", bar_code)
  try {
    const response = await fetch(`${process.env.REACT_APP_PRICE_IS_RIGHT_SERVER}/history/${bar_code}`, {
      mode: "cors",
      method: "GET"
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

// export async function loadItemHistory(bar_code: string): Promise<GroceryItem[]> {
//   console.log("[database.ts] Loading item history. barcode:", bar_code)
//   try {
//     const response = await fetch(process.env.REACT_APP_PRICE_IS_RIGHT_SERVER as string + "/history", {
//       mode: "cors",
//       method: "POST",
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({barcode: bar_code}),
//     });

//     const items = await response.json();
//     console.log("[database.ts] Loading item history. result:", items)
//     return items;
//   }
//   catch (error) {
//     console.log(error)
//   }

//   return [];
// }

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

export const addItem = async (item: GroceryItem) => {
  console.log("Add item", item)

  try {
    const response = await fetch(`${process.env.REACT_APP_PRICE_IS_RIGHT_SERVER}/add`, {
      mode: "cors",
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload: item }),
    });

    const result = await response.json();
    return result;
  }
  catch (error)
  {
    console.log(error);
  }
}

export async function deleteHistory(_id: string): Promise<DeleteItemResult> {
  console.log("[database.ts] Deleting history. _id:", _id)

  try {
    const response = await fetch(`${process.env.REACT_APP_PRICE_IS_RIGHT_SERVER}/deleteHistory/${_id}`, {
      mode: "cors",
      method: "POST"
    });

    const result : DeleteItemResult = await response.json();
    console.log("[database.ts] Delete item history. result:", result)
    return result;
  }
  catch (error) {
    console.log(error)
  }

  return {acknowledged: false, deletedCount: 0};
}