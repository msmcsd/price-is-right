import express from "express";
import { getLatestPriceForEachItem } from "./database.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get("/", async (req, res) => {
  const items = await getLatestPriceForEachItem();
  res.render("index.ejs", {grocery_items: items})
});

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
