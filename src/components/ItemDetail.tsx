import React, { useEffect, useState } from "react";
import { DefaultGroceryItem, GroceryItem } from "../types/types";
import { loadItemHistory, upsertItem } from "../database";
import ItemCard from "./ItemCard";
import { useLocation, useParams } from "react-router-dom";
import ItemHistory from "./ItemHistory";

const ItemDetail = () => {
  const [itemHistory, setItemHistory] = useState<GroceryItem[]>([]);
  const [currentItem, setCurrentItem] = useState<GroceryItem>(DefaultGroceryItem);
  const [price, setPrice] = useState<number>(0);
  const [coupon, setCoupon] = useState<number>(0);

  const { id } = useParams<{ id: string }>();
  const {state} = useLocation();

  // console.log("Passed in barcode", id)

  useEffect(() => {
    const hist = state as GroceryItem[];
    if (hist) {
      // console.log("history passed in")
      setItemHistory(hist);
      if (hist.length > 0) {
        setCurrentItem(hist[0]);
        return;
      }
    }

    if (id) {
      loadItem(id);
    }
  }, []);

  const loadItem = async (bar_code: string) => {
    try {
      console.log("b4 loadItemHistory")
      setCurrentItem(DefaultGroceryItem)
      setItemHistory([])
      setPrice(0)
      setCoupon(0)
      const history = await loadItemHistory(bar_code);
      // console.log(history.length)
      if (history && history.length > 0) {
        setItemHistory(history);
        setCurrentItem(history[0]);
        return;
      }
    }
    catch (error) {
      console.log("Loadin item history error", error)
    }
  }

  const handleSubmitPrice = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("handle submit price")
    e.preventDefault();

    const product: GroceryItem = {
      _id: currentItem?._id as string,
      name: currentItem?.name as string,
      barcode: currentItem?.barcode as string,
      price: price,
      coupon: coupon,
      image_url: currentItem?.image_url as string,
      brand: currentItem?.brand as string,
      size: currentItem?.size as string,
      date: new Date()
    };

    // console.log("Item to submit", product)
    const response = await upsertItem(product);
    console.log("Insert item history result:", response)

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

  return (
    <>
      <div className="main">
        <ItemCard item={currentItem}
          handleCouponChange={handleCouponChange}
          handlePriceChange={handlePriceChange}
          addHistory={handleSubmitPrice} />
        <ItemHistory histories={itemHistory} setHistories={setItemHistory} />
      </div>
    </>

  );
}

export default ItemDetail;