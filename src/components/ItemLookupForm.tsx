import { Dispatch, FormEventHandler, SetStateAction, useState } from "react";
import "../css/ItemLookup.css";
import Html5QrcodePlugin from "./Html5QrcodeScannerPlugin";
import { Html5QrcodeResult } from "html5-qrcode";
import { isMobile } from 'react-device-detect';

type ItemLookupFormProps = {
  handleTextChange: FormEventHandler,
  handleSubmit: FormEventHandler,
  setBarcode: Dispatch<SetStateAction<string>>,
  numericInput?: boolean
}

const ItemLookupForm = ({ handleTextChange, handleSubmit, setBarcode, numericInput } : ItemLookupFormProps) => {
  const [barcodeText, setBarcodeText] = useState<string>("");

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    e.currentTarget.value = e.currentTarget.value.replace(/[^0-9]/g, '');
  }

  const onNewScanResult = (decodedText: string, decodedResult: Html5QrcodeResult) => {
    setBarcodeText(decodedText);
    setBarcode(decodedText);
  };

  return (
    <>
      <form className="flex-form" onSubmit={handleSubmit}>
        <input type="text"
              name="barcode"
              inputMode={numericInput? "numeric":"text"}
              placeholder="Enter barcode"
              onChange={handleTextChange}
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
    </>
  )
}

export default ItemLookupForm;