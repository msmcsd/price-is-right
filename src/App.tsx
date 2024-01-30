import './App.css';
import React, { useState } from "react";
import { FoodApiResult, GroceryItem } from "./types/types";
import "./css/ItemLookup.css"
import ItemHistory from "./components/ItemHistory";
import { loadItemHistory, upsertItem } from "./database";
import ItemCard from "./components/ItemCard";

const App = () => {
  const [barcodeText, setBarcodeText] = useState<string>("079113481235");
  const [itemHistory, setItemHistory] = useState<GroceryItem[]>([]);
  const [item, setItem] = useState<FoodApiResult | null>();
  const [price, setPrice] = useState<number>(0)
  const [coupon, setCoupon] = useState<number>(0)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("b4 loadItemHistory")
      setItem(null)
      setItemHistory([])
      const history = await loadItemHistory(barcodeText);
      // console.log(history.length)
      if (history && history.length > 0) {
        setItemHistory(history)
        return;
      }

      const result = await fetch(`https://static.openfoodfacts.org/api/v0/product/${barcodeText}.json`);
      // console.log("API result", result)
      const json = await result.json() as FoodApiResult;

      // Barcode returns from API has an extra leading "0". Reset to the one used for the search.
      json.code = barcodeText;
      setItem(json);
    }
    catch (error) {

    }

  }

  const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    setBarcodeText(e.currentTarget.value);
  }

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
  }


  const populateResult = () => {
    // Populate item histories if found
    if (itemHistory && itemHistory.length > 0) {
      console.log("Populating item history", itemHistory)

      const item: GroceryItem = itemHistory[0];

      return (
        <>
          <ItemCard name={item.name}
            barcode={item.barcode}
            brands={item.brand}
            image_url={item.image_url}
            size={item.size} />
          <div className="gap"></div>
          {/* <AddItem /> */}
          <ItemHistory histories={itemHistory} />
        </>
      )
    }

    return populateApiResult();
  }

  const handleSubmitPrice = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const product: GroceryItem = {
      name: item?.product.product_name as string,
      barcode: item?.code as string,
      price: price,
      coupon: coupon,
      image_url: item?.product.image_front_url as string,
      brand: item?.product.brands as string,
      size: item?.product.quantity as string,
      date: new Date()
    };

    const response = upsertItem(product);

    // setItem(null)
    // setItemHistory([])
    const history = await loadItemHistory(item?.code as string);
    if (history && history.length > 0) {
      setItemHistory(history)
    }
  }

  const handlePriceChange = (e: React.FormEvent<HTMLInputElement>) => {
    setPrice(Number(e.currentTarget.value))
  }

  const handleCouponChange = (e: React.FormEvent<HTMLInputElement>) => {
    setCoupon(Number(e.currentTarget.value))
  }

  const handlePriceInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
  }

  const AddItem = () => {
    return (
      < form className="flex-form" onSubmit={handleSubmitPrice} >
        <input type="text"
          name="price"
          placeholder="Current Price"
          onChange={handlePriceChange}
          onInput={handlePriceInput}
          required
        />
        <input type="text"
          name="coupon"
          placeholder="Coupon"
          onChange={handleCouponChange}
          onInput={handlePriceInput}
        />
        <input type="submit" value="Add" />
      </form >
    )
  }

  // Populates lookup result from API
  const populateApiResult = () => {
    if (!item) {
      return <></>
    }

    if (item.status === 0) {
      return <div>{item.status_verbose}</div>
    }

    console.log("Populating item from API", item.code)
    return (
      <>
        <ItemCard name={item.product.product_name}
          barcode={item.code}
          size={item.product.quantity}
          image_url={item.product.image_front_url}
          brands={item.product.brands} />
        <div className="gap"></div>
        <AddItem />
      </>
    );
  }

  return (
    <div className="main">
      <form className="flex-form" onSubmit={handleSubmit}>
        <input type="text"
          name="barcode"
          value="079113481235"
          placeholder="Enter barcode"
          onChange={handleTextChange}
          onInput={handleInput}
          required
        />
        <input type="submit" value="Look up" />
      </form>
      <div className="gap"></div>
      {populateResult()}
    </div>
  );
}

export default App;
