import React from "react";
import { GroceryItem } from "../types/types";
import "./ItemLookup.css";

type CardProps = {
  name: string,
  barcode: string,
  size: string,
  image_url: string,
  brands: string
}

const ItemCard_Old = ({name, barcode, size, image_url, brands} : CardProps) => {
  console.log("ItemCard", name)
  return (
    <div className="card">
      <img src={image_url} alt="Image not available" />
      <div className="card-info">
         <h3 className="cap">{name}</h3>
          <label className="cap">{brands}</label><br />
          <small>{size}</small><br />
          <small>{barcode}</small>
        </div>
    </div>
  );
}

export default ItemCard_Old;