import React, { useEffect, useState } from "react";
import { ManageItemProps, FoodApiResult, GroceryItem, ManageItemMode, DefaultGroceryItem } from "../types/types";
import ItemHistory from "../components/ItemHistory";
import { loadItemHistory, upsertItem } from "../database";
import ItemCard from "../components/ItemCard";
import { Link, useNavigate, useParams } from "react-router-dom";
import { isMobile } from 'react-device-detect';
import Html5QrcodePlugin from "./Html5QrcodeScannerPlugin";
import { Html5QrcodeResult } from "html5-qrcode";
import { URL } from "../constants/URL";

enum ApiItemStatus {
  NotFound = 0,
  Found = 1
}

const ItemLookup = () => {
  const [barcodeText, setBarcodeText] = useState<string>("");
  const [apiStatus, setApiStatus] = useState<number>(1);
  const [apiStatusMessage, setApiStatusMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const loadItem = async (bar_code: string) => {
    try {
      //
      // If item histories are found, navigate to /item with history passed in.
      //
      console.log("b4 loadItemHistory")
      setApiStatusMessage("");
      setApiStatus(ApiItemStatus.Found);

      setIsLoading(true);
      const history = await loadItemHistory(bar_code);
      setIsLoading(false);

      // console.log(history.length)
      if (history && history.length > 0) {
        closeCamera();
        navigate(URL.LoadItemBase + history[0].barcode, { state: history });
        return;
      }

      //
      // If item histories not found, try to load item info from Food API.
      //
      const result = await fetch(`https://static.openfoodfacts.org/api/v0/product/${bar_code}.json`);
      console.log("API result", result)
      setIsLoading(true);
      const json = await result.json() as FoodApiResult;
      setIsLoading(false);

      // Barcode returns from API has an extra leading "0". Reset to the one used for the search.
      json.code = bar_code;

      // Status from API is 1 if item is found. Navigate to /additem page with info populated.
      if (json.status === ApiItemStatus.Found) {
        setApiStatus(json.status);

        const newItem: ManageItemProps = {
          item: {
            name: json.product.product_name as string,
            barcode: json.code as string,
            brand: json?.product.brands as string,
            size: json?.product.quantity as string,
            image_url: json?.product.image_front_url as string,
            price: 0,
            coupon: 0,
            date: new Date()
          },
          mode: ManageItemMode.Add
        }

        closeCamera();
        navigate(URL.AddItem, { state: newItem });
      }
      else {
        setApiStatus(ApiItemStatus.NotFound);
        setApiStatusMessage(json.status === ApiItemStatus.NotFound ? json.status_verbose : "Item not found");
      }

    }
    catch (error) {

    }
    finally {
      setIsLoading(false);
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
    loadItem(decodedText);
  };

  const closeCamera = () => {
    if (isMobile) {
      // Id comes from https://github.com/mebjas/html5-qrcode/blob/91a7d639512305cffc887a2f348209be97698635/src/ui/scanner/base.ts
      const stopScanningButton = document.getElementById("html5-qrcode-button-camera-stop") as HTMLInputElement
      stopScanningButton?.click();
    }
  }

  const firstLetterToUpperCase = (message: string) => {
    if (!message) return message;

    return message.charAt(0).toUpperCase() + message.slice(1);
  }

  const handleAddItemOnItemNotFound = () => {
    closeCamera();
    const item : ManageItemProps = {
      item : {...DefaultGroceryItem, barcode: barcodeText},
      mode : ManageItemMode.Add
    }
    navigate(URL.AddItem, {
      state: item
    });
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
        <div className="status-area">
          <h2>{firstLetterToUpperCase(apiStatusMessage)}</h2>
          <p>{isLoading ? 
                "Loading..." : 
                apiStatus !== ApiItemStatus.Found && <p>Click <a href="" onClick={handleAddItemOnItemNotFound}>here</a> to add the item</p>}</p>
        </div>
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
      </div>
    </>
  );
}

export default ItemLookup;
