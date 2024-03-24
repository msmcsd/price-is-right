import { InventoryItem, MongoDBInsertOneResult, MongoDBUpdateResult } from "../types/types";


export async function addInventoryItem(item: InventoryItem): Promise<MongoDBInsertOneResult> {
  console.log("Add inventory item", item)

  try {
    const response = await fetch(`${process.env.REACT_APP_PRICE_IS_RIGHT_SERVER}/addinventory`, {
      mode: "cors",
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload: item }),
    });

    const result: MongoDBInsertOneResult = await response.json();
    return result;
  }
  catch (error) {
    console.log(error);
  }
  return { acknowledged: false };
}

export async function updateInventoryItem(item: InventoryItem): Promise<MongoDBUpdateResult> {
  return { acknowledged: false, modifiedCount: 1}; 
}