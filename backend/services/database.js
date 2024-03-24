// const { MongoClient } = require('mongodb');
// or as an es module:
import { MongoClient, ObjectId } from 'mongodb'
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
        coupon: { $first: '$coupon' },
        image_url: { $first: '$image_url' },
        brand: { $first: '$brand' },
        size: { $first: '$size' },
      }
    },
    {
      $project: {
        _id: 0,
        name: '$_id',
        barcode: 1,
        price: 1,
        coupon: 1,
        date: 1,
        image_url: 1,
        brand: 1,
        size: 1
      }
    },
    {
      $sort: { name: 1 }
    }
  ]).toArray();

  console.log("getLatestPriceForEachItem count", result.length);

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

/*
---------------------------------------------------------------------
  Update or insert an item
---------------------------------------------------------------------
*/
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

/*
---------------------------------------------------------------------
  Add an item manually when the item is not found from Food API.
---------------------------------------------------------------------
*/
export async function addItem (item) {
  console.log("[database.js] Item to Add", item.barcode)
  await client.connect();

  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection(tableName);

  const result = await collection.insertOne({
    name: item.name,
    barcode: item.barcode,
    brand: item.brand,
    size: item.size,
    price: item.price,
    coupon: item.coupon,
    image_url: item.image_url,
    date: new Date()
  });

  return result;
}

/*
---------------------------------------------------------------------
  Deletes a history of an item.
---------------------------------------------------------------------
*/
export async function deleteItemHistory(id) {
  console.log("[database.js] history to delete", id)
  await client.connect();

  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection(tableName);

  const result = await collection.deleteOne({
    _id: new ObjectId(id)
  });

  return result;
}

/*
---------------------------------------------------------------------
  Updates item info except price and coupon.
---------------------------------------------------------------------
*/
export async function updateItem(props) {
  console.log("[database.js] Item to update", props)
  await client.connect();

  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection(tableName);

  const result = await collection.updateMany(
    { barcode: props.oldBarcode },
    {
      $set: {
        name: props.item.name,
        barcode: props.item.barcode,
        brand: props.item.brand,
        size: props.item.size,
        image_url: props.item.image_url
      }
    });

  return result;
}