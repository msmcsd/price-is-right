// const { MongoClient } = require('mongodb');
// or as an es module:
import { MongoClient } from 'mongodb'
import dotenv from "dotenv";

dotenv.config();

// Connection URL
const client = new MongoClient(process.env.MONGODB_URL);

// Database Name
const dbName = "price_is_right";
const tableName = "grocery_items"

async function listDatabases(client) {
  databasesList = await client.db().admin().listDatabases();

  console.log("Databases:");
  databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

export async function getLatestPriceForEachItem() {
  // Use connect method to connect to the server
  await client.connect();
  // await listDatabases(client);

  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection(tableName);

  const result = await collection.aggregate([
    {
      $sort: { date: -1 } // Sort by PurchaseDate in descending order
    },
    {
      $group: {
        _id: '$name',
        date: { $first: '$date' },
        barcode: { $first: '$barcode' },
        price: { $first: '$price' },
        coupon: { $first: '$coupon' }
      }
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        barcode: 1,
        price: 1,
        coupon: 1,
        date: 1
      }
    }
  ]).toArray();


  return result;
}


