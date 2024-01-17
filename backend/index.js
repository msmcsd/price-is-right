import express from "express";
import { getLatestPriceForEachItem } from "./database.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");    
app.set("views", __dirname + "/views");


app.get("/", async (req, res) => {
  const items = await getLatestPriceForEachItem();
  res.render("index.ejs", {grocery_items: items})
});

app.get("/list", async (req, res) => {
  const items = await getLatestPriceForEachItem();
  res.send(items);
})

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
