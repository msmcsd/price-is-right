import './App.css';
import React, { useState } from "react";
import { FoodApiResult, GroceryItem } from "./types/types";
import "./css/ItemLookup.css"
import ItemHistory from "./components/ItemHistory";
import { loadItemHistory, upsertItem } from "./database";
import ItemCard from "./components/ItemCard";
import ItemLookupForm from './components/ItemLookupForm';
import NavMenu from './components/NavMenu';

const App = () => {
  const [barcodeText, setBarcodeText] = useState<string>("");
  const [itemHistory, setItemHistory] = useState<GroceryItem[]>([]);
  const [currentItem, setCurrentItem] = useState<GroceryItem | null>();
  const [apiStatus, setApiStatus] = useState<number>(1);
  const [apiStatusMessage, setApiStatusMessage] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [coupon, setCoupon] = useState<number>(0);

  const handleLookup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      console.log("b4 loadItemHistory")
      setCurrentItem(null)
      setItemHistory([])
      setPrice(0)
      setCoupon(0)
      setApiStatusMessage("")
      const history = await loadItemHistory(barcodeText);
      console.log(history.length)
      if (history && history.length > 0) {
        setItemHistory(history);
        setCurrentItem(history[0]);
        return;
      }

      const result = await fetch(`https://static.openfoodfacts.org/api/v0/product/${barcodeText}.json`);
      console.log("API result", result)
      const json = await result.json() as FoodApiResult;

      json.code = barcodeText;
      if (json.status === 1) {
        // Barcode returns from API has an extra leading "0". Reset to the one used for the search.
        const product: GroceryItem = {
          name: json.product.product_name as string,
          barcode: json.code as string,
          price: price,
          coupon: coupon,
          image_url: json?.product.image_front_url as string,
          brand: json?.product.brands as string,
          size: json?.product.quantity as string,
          date: new Date()
        };
        setCurrentItem(product);
        setApiStatus(json.status);
      }
      else {
        setApiStatus(0);
        setApiStatusMessage(json.status === 0 ? json.status_verbose : "Item not found");
      }

    }
    catch (error) {

    }

  }

  const handleTextChange = (e: React.FormEvent<HTMLInputElement>) => {
    setBarcodeText(e.currentTarget.value);
  }

  const populateLookupResult = () => {
    // Populate item histories if found
    if (itemHistory && itemHistory.length > 0) {
      console.log("Populating item history", itemHistory)

      const item: GroceryItem = itemHistory[0];

      return (
        <>
          <ItemCard item={item}
                    handleCouponChange={handleCouponChange}
                    handlePriceChange={handlePriceChange}
                    addHistory={handleSubmitPrice} />
          <div className="gap"></div>
          <ItemHistory histories={itemHistory} />
        </>
      )
    }

    return populateApiResult();
  }

  const handleSubmitPrice = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handle submit price")
    e.preventDefault();

    const product: GroceryItem = {
      name: currentItem?.name as string,
      barcode: currentItem?.barcode as string,
      price: price,
      coupon: coupon,
      image_url: currentItem?.image_url as string,
      brand: currentItem?.brand as string,
      size: currentItem?.size as string,
      date: new Date()
    };

    console.log("Item to submit", product)
    const response = await upsertItem(product);

    // setItem(null)
    // setItemHistory([])
    const history = await loadItemHistory(currentItem?.barcode as string);
    if (history && history.length > 0) {
      setItemHistory(history)
      setCurrentItem(history[0])
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

   // Populates lookup result from API
  const populateApiResult = () => {
    if (!currentItem || apiStatus === 0) {
      return <div>{apiStatusMessage}</div>
    }

    console.log("Populating item from API", currentItem.barcode)
    return (
      <>
        <ItemCard item={currentItem}
                  handleCouponChange={handleCouponChange}
                  handlePriceChange={handlePriceChange}
                  addHistory={handleSubmitPrice}/>
        <div className="gap"></div>
      </>
    );
  }

  return (
    <>
      <NavMenu />
      <div className="main body-text">
        <ItemLookupForm handleSubmit={handleLookup} handleTextChange={handleTextChange} />
        <div className="gap"></div>
        {populateLookupResult()}
      </div>   
    </>

  );
}

export default App;
