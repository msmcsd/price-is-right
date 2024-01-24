import express from "express";
import { getLatestPriceForEachItem, loadItemHistory } from "./database.js";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname } from "path";
import bodyParser from "body-parser";
import cors from "cors"

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
  const allowedOrigins = ["https://price-is-right-client.onrender.com", "http://localhost:28"]
  let allowedOrigin = allowedOrigins[0];

  const origin = req.get('origin');
  console.log("Called from", origin)
  if (origin && allowedOrigins.includes(origin)) {
    allowedOrigin = origin;
  }

  res.set("Access-Control-Allow-Origin", allowedOrigin);
}

app.get("/list", async (req, res) => {
  setAllowedOrigin(req, res);

  const items = await getLatestPriceForEachItem();
  res.send(items);
})

app.options("/history", cors());
app.post("/history", async (req, res) => {
  setAllowedOrigin(req, res);

  console.log("in /history req body=", req.body)
  const item = req.body;
  console.log("item", item)
  const docs = await loadItemHistory(item.barcode);
  res.send(docs)
});

// app.post("/update", async (req, res) => {
//   console.log(req)
//   res.send(req.body)
// })

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
