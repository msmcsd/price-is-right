import React, { useState } from "react";
import { FoodApiResult } from "../types/types";
import "./ItemLookup.css"
import ItemCard from "./ItemCard";

const ItemLookup = () => {
  const [barcodeText, setBarcodeText] = useState<string>("");
  const [item, setItem] = useState<FoodApiResult>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await fetch(`https://static.openfoodfacts.org/api/v0/product/${barcodeText}.json`);
      const json = await result.json() as FoodApiResult;
      setItem(json);      
    }
    catch (error) {

    }

  }

  const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    setBarcodeText(e.currentTarget.value);
  }

  const populateItem = () => {
    if (!item) {
      return <></>
    } 

    if (item.status === 0) {
      return <div>{item.status_verbose}</div>
    } 

    return (
      <ItemCard name={item.product.product_name} 
                barcode={item.code}
                size={item.product.quantity}
                image_url={item.product.image_front_url}
                brands={item.product.brands} />
    );

  }

  return (
    <div className="main">
      <form className="flex-form" onSubmit={handleSubmit}>
        <input type="text" name="barcode" placeholder="Enter barcode" onChange={handleTextChange}></input>
        <input type="submit" value="Look up" />
      </form>
      <div className="gap"></div>
      {populateItem()}
    </div>
  );
}

export default ItemLookup;