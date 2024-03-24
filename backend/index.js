import express from "express";
import { addItem, getLatestPriceForEachItem, loadItemHistory, upsertItem, deleteItemHistory, updateItem } from "./services/database.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import cors from "cors"
import { addInventory } from "./services/inventory.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT;

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");    
app.set("views", __dirname + "/views");
app.use(express.static(__dirname + "/public"));

app.get("/", async (req, res) => {
  const items = await getLatestPriceForEachItem();
  res.render("index.ejs", {grocery_items: items})
});

const setAllowedOrigin = (req, res) => {
  // res.set("Access-Control-Allow-Origin", "http://localhost:28");
  const allowedOrigins = ["https://pricesright.onrender.com", "http://localhost:28"]
  let allowedOrigin = allowedOrigins[0];

  const origin = req.get('origin');
  console.log("Called from", origin)
  if (origin && allowedOrigins.includes(origin)) {
    allowedOrigin = origin;
  }

  res.set("Access-Control-Allow-Origin", allowedOrigin);
}

/* 
---------------------------------------------------------------------
  Returns most recent price for each item.
---------------------------------------------------------------------
*/
app.get("/items", async (req, res) => {
  setAllowedOrigin(req, res);

  const items = await getLatestPriceForEachItem();
  res.send(items);
})

/* 
---------------------------------------------------------------------
  Loads price history of an item
---------------------------------------------------------------------
*/
app.options("/history/:barcode", cors());
app.get("/history/:barcode", async (req, res) => {
  setAllowedOrigin(req, res);

  const barcode = req.params.barcode;
  console.log("Lookup history for barcode:", barcode)
  const docs = await loadItemHistory(barcode);
  res.send(docs)
});

// app.options("/history", cors());
// app.post("/history", async (req, res) => {
//   setAllowedOrigin(req, res);

//   console.log("in /history req body=", req.body)
//   const item = req.body;
//   console.log("item", item)
//   const docs = await loadItemHistory(item.barcode);
//   res.send(docs)
// });

/* 
---------------------------------------------------------------------
  Insert/Update an item.
---------------------------------------------------------------------
*/
app.options("/upsert", cors());
app.post("/upsert", async (req, res) => {
  setAllowedOrigin(req, res);
  
  const item = req.body;
  console.log("[index.js] Item to upsert", item)
  const result = await upsertItem(item.payload);

  console.log("Upsert result", result)

  res.send(result);
})

/* 
---------------------------------------------------------------------
  Add an item manually when the item not found in Food API.
---------------------------------------------------------------------
*/
app.options("/add", cors());
app.post("/add", async (req, res) => {
  setAllowedOrigin(req, res);

  const item = req.body;
  console.log("[index.js] Item to add", item)
  const result = await addItem(item.payload);

  console.log("Add result", result)

  res.send(result);
})

/* 
---------------------------------------------------------------------
  Deletes a history of an item.
---------------------------------------------------------------------
*/
app.options("/deleteHistory/:id", cors());
app.post("/deleteHistory/:id", async (req, res) => {
  setAllowedOrigin(req, res);

  console.log("[index.js] History to delete", req.params.id)
  const result = await deleteItemHistory(req.params.id);

  console.log("Delete history result", result)

  res.send(result);
})

/* 
---------------------------------------------------------------------
  Updates items manually based on barcode value.
---------------------------------------------------------------------
*/
app.options("/update", cors());
app.post("/update", async (req, res) => {
  setAllowedOrigin(req, res);

  const item = req.body;
  console.log("[index.js] Item to update", item)
  const result = await updateItem(item.payload);

  console.log("Update result", result)

  res.send(result);
})

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);



// ---------------------------------------------- Invenotry functions ----------------------------------------------

/* 
---------------------------------------------------------------------
  Add an inventory item.
---------------------------------------------------------------------
*/
app.options("/addinventory", cors());
app.post("/addinventory", async (req, res) => {
  setAllowedOrigin(req, res);

  const item = req.body;
  console.log("[index.js] Invenotry item to add", item)
  const result = await addInventory(item.payload);

  console.log("Add invenotry result", result)

  res.send(result);
})