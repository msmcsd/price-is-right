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

export async function loadItemHistory(barcode) {
  console.log(barcode)
  await client.connect();

  const db = client.db(dbName);
  const docs = db.collection(tableName).find(
    {
      barcode: {$eq: barcode}
    }
  ).sort({ date: -1 })
  .project({ barcode: 1, name: 1, price: 1, coupon: 1, date: 1, image_url: 1, brand: 1, size: 1 })
  .toArray();

  return docs;
}

export async function upsertItem(item) {
  console.log("[database.js] Item to upsert", item.barcode)
  await client.connect();

  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection(tableName);

  const mostRecentItem = await collection
    .find({ barcode: item.barcode})
    .sort({ date: -1 }) // Sort by "itemdate" in descending order to get the latest document first
    .limit(1)
    .next();

  let insertNewPrice = false;
  if (mostRecentItem) {
    console.log("Most recent item found for", item.barcode, mostRecentItem)
    const {price: latestPrice, coupon: latestCoupon, date: latestDate} = mostRecentItem;
    console.log(latestPrice, latestCoupon, item.price, item.coupon)
    if (latestPrice !== item.price || latestCoupon !== item.coupon) {
      insertNewPrice = true;
    } else if (latestPrice === item.price && latestCoupon === item.coupon) {
      console.log("Price and coupon are the same as the latest on record. Not added to history")
      return;
    }
  } else {
    console.log("Most recen item not found for", item.barcode)
    insertNewPrice = true;
  }

  let result;
  if (insertNewPrice) {
    result = await collection.insertOne({
      name: item.name,
      barcode: item.barcode,
      price: item.price,
      coupon: item.coupon,
      image_url: item.image_url,
      brand: item.brand,
      date: item.date,
      size: item.size      
    });
    console.log('New document inserted');
  }
  else {
    const query = { barcode: item.barcode };
    const update = {
      $set: {
        name: item.name,
        barcode: item.barcode,
        price: item.price,
        coupon: item.coupon,
        image_url: item.image_url,
        brand: item.brand,
        date: item.date,
        size: item.size
      }
    };

    result = await collection.updateOne(query, update, options);
    if (result.modifiedCount > 0) {
      console.log('Document updated. _id=', result.upsertedId);
    } else {
      console.log('Document not updated');
    }
  }
 
  return result;
}

