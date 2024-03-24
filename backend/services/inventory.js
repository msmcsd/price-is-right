// const { MongoClient } = require('mongodb');
// or as an es module:
import { MongoClient, ObjectId } from 'mongodb'
import dotenv from "dotenv";

dotenv.config();

// Connection URL
const client = new MongoClient(process.env.MONGODB_URL);

// Database Name
const dbName = "price_is_right";
const tableName = "inventories"

/*
---------------------------------------------------------------------
  Add an inventory item.
---------------------------------------------------------------------
*/
export async function addInventory(item) {
  console.log("[invenotry.js] Invenotry item to add", item.name)
  await client.connect();

  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection(tableName);

  const result = await collection.insertOne({
    name: item.name,
    barcode: item.barcode,
    count: item.count,
    image_url: item.image_url,
    date: item.expiration_date
  });

  return result;
}

/*
---------------------------------------------------------------------
  Add an inventory item.
---------------------------------------------------------------------
*/
export async function updateInventoryCount(item) {
  console.log("[invenotry.js] Invenotry item to update", item)
  await client.connect();

  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection(tableName);

  const result = await collection.updateMany(
    { _id: item._id },
    {
      $set: {
        name: item.name,
        barcode: item.barcode,
        count: item.count,
        expiration_date: item.expiration_date,
        image_url: props.item.image_url
      }
    });

  return result;
}