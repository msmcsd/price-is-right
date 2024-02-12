import React, { useEffect, useState } from "react";
import { AddItemProps, FoodApiResult, GroceryItem } from "../types/types";
import ItemHistory from "../components/ItemHistory";
import { loadItemHistory, upsertItem } from "../database";
import ItemCard from "../components/ItemCard";
import { useNavigate, useParams } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import Html5QrcodePlugin from "./Html5QrcodeScannerPlugin";
import { Html5QrcodeResult } from "html5-qrcode";

enum ApiItemStatus {
  NotFound = 0,
  Found = 1
}

const ItemLookup = () => {
  const [barcodeText, setBarcodeText] = useState<string>("");
  const [itemHistory, setItemHistory] = useState<GroceryItem[]>([]);
  const [currentItem, setCurrentItem] = useState<GroceryItem | null>();
  const [apiStatus, setApiStatus] = useState<number>(1);
  const [apiStatusMessage, setApiStatusMessage] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [coupon, setCoupon] = useState<number>(0);
  // const {id} = useParams<{id : string}>();

  const navigate = useNavigate();

  // console.log("Passed in barcode", id)

  // useEffect(() => {
  //   if (id) {
  //     setBarcodeText(id);
  //     loadItem(id);
  //   }
  // }, []);

  const loadItem = async(bar_code: string) => {
    try {
      //
      // If item histories are found, navigate to /item with history passed in.
      //
      console.log("b4 loadItemHistory")
      setCurrentItem(null)
      setItemHistory([])
      setPrice(0)
      setCoupon(0)
      setApiStatusMessage("")
      const history = await loadItemHistory(bar_code);
      console.log(history.length)
      if (history && history.length > 0) {
        setItemHistory(history);
        setCurrentItem(history[0]);
        closeCamera();
        navigate("/item/" + history[0].barcode, {state: history});
        return;
      }

      //
      // If item histories not found, try to load item info from Food API.
      //
      const result = await fetch(`https://static.openfoodfacts.org/api/v0/product/${bar_code}.json`);
      console.log("API result", result)
      const json = await result.json() as FoodApiResult;

      // Barcode returns from API has an extra leading "0". Reset to the one used for the search.
      json.code = bar_code;

      // Status from API is 1 if item is found. Navigate to /additem page with info populated.
      if (json.status === ApiItemStatus.Found) {
        setApiStatus(json.status);

        const newItem: AddItemProps = {
          name: json.product.product_name as string,
          barcode: json.code as string,
          brand: json?.product.brands as string,
          size: json?.product.quantity as string,
          imageURL: json?.product.image_front_url as string,
        }
        
        closeCamera();
        navigate("/additem", {state: newItem});
      }
      else {
        setApiStatus(ApiItemStatus.NotFound);
        setApiStatusMessage(json.status === ApiItemStatus.NotFound ? json.status_verbose : "Item not found");
      }

    }
    catch (error) {

    }
  }

  const handleLookup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    loadItem(barcodeText);
  }

  const handleBarcodeInputChange = (e: React.FormEvent<HTMLInputElement>) => {
    setBarcodeText(e.currentTarget.value);
  }

  // Assumes barcodes only contain numbers.
  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
  }

  const onNewScanResult = (decodedText: string, decodedResult: Html5QrcodeResult) => {
    setBarcodeText(decodedText);
    closeCamera();
    loadItem(decodedText);
  };

  const closeCamera = () => {
    if (isMobile) {
      const closeButton = document.getElementById("html5-qrcode-button-camera-stop") as HTMLInputElement
      closeButton?.click();  
    }
  }

  return (
    <>
      <div className="main">
        <form className="flex-form" onSubmit={handleLookup}>
          <input type="text"
            name="barcode"
            inputMode="numeric"
            placeholder="Enter Barcode"
            onChange={handleBarcodeInputChange}
            onInput={handleInput}
            value={barcodeText}
            required
          />
          <input type="submit" className="red-button" value="Look up" />
        </form>
        {isMobile &&
          <div className="App">
            <Html5QrcodePlugin
              fps={10}
              qrbox={250}
              disableFlip={false}
              qrCodeSuccessCallback={onNewScanResult}
            />
          </div>
        }
        {
          apiStatus !== ApiItemStatus.Found && <h2 style={{color: "Red", fontSize: "20px"}}>{apiStatusMessage}</h2>
        }
      </div>
    </>

  );
}

export default ItemLookup;
