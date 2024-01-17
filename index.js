import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.render("index.ejs", {grocery_items: [
    {
      name: "nuts",
      barcode: "12345",
      price: 11.99,
      date: "2022/1/1"
    }
    ]})
});

app.listen(port, () =>
  console.log(`Listening on port ${port}`)
);
