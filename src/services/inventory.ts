import { URL } from "../constants/URL";
import { InventoryItem, MongoDBInsertOneResult, MongoDBUpdateResult } from "../types/types";

export async function loadInventories(): Promise<InventoryItem[]> {
  try {
    const response = await fetch(`${process.env.REACT_APP_PRICE_IS_RIGHT_SERVER}${URL.Inventory}`, {
      mode: "cors",
      method: "GET"
    });
    
    const items: InventoryItem[] = await response.json();
    // console.log("[inventory.ts] Loading inventories. result:", items)
    return items;
  }
  catch (error) {
    console.log(error)
  }

  return [];
}

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
  try {
    const response = await fetch(`${process.env.REACT_APP_PRICE_IS_RIGHT_SERVER}${URL.UpdateInventory}`, {
      mode: "cors",
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ payload: item }),
    });
    // console.log("update inv item", item)
    const result: MongoDBUpdateResult = await response.json();
    // console.log("Update inv item result", result)
    return result;
  }
  catch (error) {
    console.log(error);
  }
  
  return { acknowledged: false, modifiedCount: 1}; 
}